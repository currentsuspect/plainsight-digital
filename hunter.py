#!/usr/bin/env python3
"""
Hunter.io CLI — Email Discovery for Cold Outreach
Find verified email addresses via Hunter API
"""

import argparse
import csv
import json
import os
import sys
import urllib.request
import urllib.error
from pathlib import Path

HUNTER_API_KEY = os.environ.get('HUNTER_API_KEY')
BASE_URL = "https://api.hunter.io/v2"

class HunterCLI:
    def __init__(self, api_key=None):
        self.api_key = api_key or HUNTER_API_KEY
        if not self.api_key:
            print("❌ No API key found. Set HUNTER_API_KEY environment variable.")
            print("Get your key at: https://hunter.io/api_keys")
            sys.exit(1)
    
    def _request(self, endpoint, params=None):
        """Make API request"""
        url = f"{BASE_URL}/{endpoint}?api_key={self.api_key}"
        if params:
            for key, value in params.items():
                url += f"&{key}={urllib.parse.quote(str(value))}"
        
        try:
            req = urllib.request.Request(url, headers={'Accept': 'application/json'})
            with urllib.request.urlopen(req) as resp:
                return json.loads(resp.read().decode())
        except urllib.error.HTTPError as e:
            error = json.loads(e.read().decode())
            print(f"❌ API Error: {error.get('errors', [{}])[0].get('details', 'Unknown error')}")
            return None
        except Exception as e:
            print(f"❌ Request failed: {e}")
            return None
    
    def domain_search(self, domain, limit=10):
        """Search emails by domain"""
        print(f"🔍 Searching {domain}...")
        
        result = self._request("domain-search", {
            'domain': domain,
            'limit': limit
        })
        
        if not result or 'data' not in result:
            return []
        
        emails = result['data'].get('emails', [])
        
        print(f"\n📧 Found {len(emails)} email(s):\n")
        print(f"{'Email':<35} {'Position':<25} {'Confidence':<12}")
        print("-" * 72)
        
        found = []
        for email in emails:
            addr = email.get('value', 'N/A')
            position = email.get('position', 'N/A')[:24]
            confidence = f"{email.get('confidence', 0)}%"
            print(f"{addr:<35} {position:<25} {confidence:<12}")
            found.append({
                'email': addr,
                'position': email.get('position'),
                'confidence': email.get('confidence'),
                'first_name': email.get('first_name'),
                'last_name': email.get('last_name'),
                'department': email.get('department')
            })
        
        # Pattern info
        pattern = result['data'].get('pattern', '')
        if pattern:
            print(f"\n📋 Email pattern: {pattern}")
        
        return found
    
    def email_finder(self, domain, first_name, last_name):
        """Find specific person's email"""
        print(f"🔍 Finding email for {first_name} {last_name} at {domain}...")
        
        result = self._request("email-finder", {
            'domain': domain,
            'first_name': first_name,
            'last_name': last_name
        })
        
        if not result or 'data' not in result:
            return None
        
        data = result['data']
        email = data.get('email')
        confidence = data.get('confidence', 0)
        
        if email:
            print(f"\n✅ Found: {email}")
            print(f"   Confidence: {confidence}%")
            print(f"   Position: {data.get('position', 'Unknown')}")
            return {
                'email': email,
                'confidence': confidence,
                'position': data.get('position')
            }
        else:
            print("❌ No email found")
            return None
    
    def email_verifier(self, email):
        """Verify if email is valid"""
        print(f"🔍 Verifying {email}...")
        
        result = self._request("email-verifier", {'email': email})
        
        if not result or 'data' not in result:
            return None
        
        data = result['data']
        status = data.get('status', 'unknown')
        score = data.get('score', 0)
        
        status_emoji = {
            'valid': '✅',
            'invalid': '❌',
            'accept_all': '⚠️',
            'webmail': '✅',
            'disposable': '❌',
            'unknown': '❓'
        }.get(status, '❓')
        
        print(f"\n{status_emoji} Status: {status}")
        print(f"📊 Score: {score}/100")
        
        if data.get('regexp') is False:
            print("⚠️  Format looks invalid")
        if data.get('gibberish') is True:
            print("⚠️  Looks like gibberish")
        if data.get('disposable') is True:
            print("⚠️  Disposable email detected")
        
        return {
            'email': email,
            'status': status,
            'score': score,
            'valid': status in ['valid', 'webmail', 'accept_all']
        }
    
    def account_info(self):
        """Get account usage info"""
        result = self._request("account")
        
        if not result or 'data' not in result:
            return
        
        data = result['data']
        print("\n📊 Account Info:")
        print(f"   Plan: {data.get('plan_name', 'Unknown')}")
        print(f"   Requests used: {data.get('calls', {}).get('used', 0)}")
        print(f"   Requests available: {data.get('calls', {}).get('available', 0)}")
        print(f"   Resets: {data.get('calls', {}).get('reset_date', 'Unknown')}")


def main():
    parser = argparse.ArgumentParser(
        description='Hunter.io CLI — Email Discovery',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  hunter.py domain example.com              # Search domain
  hunter.py find example.com John Doe       # Find specific person
  hunter.py verify john@example.com         # Verify email
  hunter.py account                         # Check API usage
  hunter.py batch targets.csv -o leads.csv  # Batch process
        """
    )
    
    subparsers = parser.add_subparsers(dest='command', help='Commands')
    
    # Domain search
    domain_parser = subparsers.add_parser('domain', help='Search emails by domain')
    domain_parser.add_argument('domain', help='Domain to search (e.g., example.com)')
    domain_parser.add_argument('--limit', type=int, default=10, help='Max results')
    domain_parser.add_argument('-o', '--output', help='Save to CSV file')
    
    # Email finder
    find_parser = subparsers.add_parser('find', help='Find specific person\'s email')
    find_parser.add_argument('domain', help='Company domain')
    find_parser.add_argument('first_name', help='First name')
    find_parser.add_argument('last_name', help='Last name')
    
    # Email verifier
    verify_parser = subparsers.add_parser('verify', help='Verify email address')
    verify_parser.add_argument('email', help='Email to verify')
    
    # Account info
    subparsers.add_parser('account', help='Show account usage')
    
    # Batch processing
    batch_parser = subparsers.add_parser('batch', help='Batch process from CSV')
    batch_parser.add_argument('input', help='Input CSV file')
    batch_parser.add_argument('-o', '--output', default='hunter_results.csv', help='Output file')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return
    
    hunter = HunterCLI()
    
    if args.command == 'domain':
        results = hunter.domain_search(args.domain, args.limit)
        if args.output and results:
            with open(args.output, 'w', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=['email', 'position', 'confidence', 'first_name', 'last_name', 'department'])
                writer.writeheader()
                writer.writerows(results)
            print(f"\n💾 Saved to {args.output}")
    
    elif args.command == 'find':
        hunter.email_finder(args.domain, args.first_name, args.last_name)
    
    elif args.command == 'verify':
        hunter.email_verifier(args.email)
    
    elif args.command == 'account':
        hunter.account_info()
    
    elif args.command == 'batch':
        print(f"🔄 Processing {args.input}...")
        all_results = []
        
        with open(args.input, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                domain = row.get('domain')
                if domain:
                    print(f"\n🔍 {domain}...")
                    results = hunter.domain_search(domain, limit=5)
                    for r in results:
                        r['source_domain'] = domain
                        r['target_company'] = row.get('company', '')
                    all_results.extend(results)
        
        if all_results:
            with open(args.output, 'w', newline='') as f:
                writer = csv.DictWriter(f, fieldnames=['source_domain', 'target_company', 'email', 'position', 'confidence', 'first_name', 'last_name', 'department'])
                writer.writeheader()
                writer.writerows(all_results)
            print(f"\n💾 Saved {len(all_results)} results to {args.output}")


if __name__ == '__main__':
    main()
