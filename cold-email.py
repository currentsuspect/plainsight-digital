#!/usr/bin/env python3
"""
Cold Email CLI Tool for Plainsight Digital
Research, draft, and send personalized cold emails at scale.
"""

import argparse
import base64
import json
import os
import sys
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import urllib.request
import urllib.error
import urllib.parse
from pathlib import Path

# Config
CREDENTIALS_DIR = Path.home() / '.openclaw' / 'credentials'
TOKEN_FILE = CREDENTIALS_DIR / 'gmail-token.json'
CLIENT_FILE = CREDENTIALS_DIR / 'gmail-client.json'
TEMPLATES_FILE = Path(__file__).parent / 'email-templates.json'

class ColdEmailCLI:
    def __init__(self):
        self.token = None
        self.client_id = None
        self.client_secret = None
        self.refresh_token = None
        self._load_credentials()
    
    def _load_credentials(self):
        """Load Gmail API credentials"""
        if TOKEN_FILE.exists():
            with open(TOKEN_FILE) as f:
                data = json.load(f)
                self.token = data.get('token')
                self.refresh_token = data.get('refresh_token')
                self.client_id = data.get('client_id')
                self.client_secret = data.get('client_secret')
        
        if CLIENT_FILE.exists():
            with open(CLIENT_FILE) as f:
                data = json.load(f)
                if not self.client_id:
                    self.client_id = data.get('client_id')
                if not self.client_secret:
                    self.client_secret = data.get('client_secret')
    
    def _refresh_token(self):
        """Refresh OAuth token"""
        if not self.refresh_token:
            print("❌ No refresh token. Run: cold-email auth")
            return False
        
        url = 'https://oauth2.googleapis.com/token'
        data = urllib.parse.urlencode({
            'refresh_token': self.refresh_token,
            'client_id': self.client_id,
            'client_secret': self.client_secret,
            'grant_type': 'refresh_token'
        }).encode()
        
        try:
            req = urllib.request.Request(url, data=data, method='POST')
            with urllib.request.urlopen(req) as resp:
                new_tokens = json.loads(resp.read().decode())
                self.token = new_tokens['access_token']
                # Save updated token
                with open(TOKEN_FILE, 'r') as f:
                    data = json.load(f)
                data['token'] = self.token
                with open(TOKEN_FILE, 'w') as f:
                    json.dump(data, f, indent=2)
                return True
        except urllib.error.HTTPError as e:
            print(f"❌ Token refresh failed: {e.read().decode()}")
            print("Run: cold-email auth")
            return False
    
    def auth(self):
        """Generate OAuth URL for Gmail authentication"""
        if not self.client_id:
            print("❌ No client credentials found.")
            print("Create a Gmail OAuth app at https://console.cloud.google.com/")
            return
        
        redirect_uri = "urn:ietf:wg:oauth:2.0:oob"
        scope = "https://www.googleapis.com/auth/gmail.send"
        
        auth_url = (
            f"https://accounts.google.com/o/oauth2/v2/auth?"
            f"client_id={self.client_id}&"
            f"redirect_uri={redirect_uri}&"
            f"scope={scope}&"
            f"response_type=code&"
            f"access_type=offline&"
            f"prompt=consent"
        )
        
        print("🔗 Open this URL in your browser:")
        print(auth_url)
        print("\n📋 After authorization, you'll get a code.")
        print("Run: cold-email auth-code <CODE>")
    
    def auth_code(self, code):
        """Exchange auth code for tokens"""
        url = 'https://oauth2.googleapis.com/token'
        data = urllib.parse.urlencode({
            'code': code,
            'client_id': self.client_id,
            'client_secret': self.client_secret,
            'redirect_uri': 'urn:ietf:wg:oauth:2.0:oob',
            'grant_type': 'authorization_code'
        }).encode()
        
        try:
            req = urllib.request.Request(url, data=data, method='POST')
            with urllib.request.urlopen(req) as resp:
                tokens = json.loads(resp.read().decode())
                
                # Save credentials
                CREDENTIALS_DIR.mkdir(parents=True, exist_ok=True)
                creds = {
                    'token': tokens['access_token'],
                    'refresh_token': tokens.get('refresh_token'),
                    'token_uri': 'https://oauth2.googleapis.com/token',
                    'client_id': self.client_id,
                    'client_secret': self.client_secret,
                    'scopes': ['https://www.googleapis.com/auth/gmail.send']
                }
                with open(TOKEN_FILE, 'w') as f:
                    json.dump(creds, f, indent=2)
                
                print("✅ Authentication successful!")
                print(f"📁 Credentials saved to {TOKEN_FILE}")
        except urllib.error.HTTPError as e:
            print(f"❌ Auth failed: {e.read().decode()}")
    
    def send(self, to, subject, body, from_name="Dylan Makori", from_email="makoridylan@gmail.com"):
        """Send an email via Gmail API"""
        if not self.token:
            print("❌ Not authenticated. Run: cold-email auth")
            return
        
        # Try to send, refresh token if needed
        result = self._send_email(to, subject, body, from_name, from_email)
        if not result and self._refresh_token():
            result = self._send_email(to, subject, body, from_name, from_email)
        
        return result
    
    def _send_email(self, to, subject, body, from_name, from_email):
        """Internal email sending"""
        msg = MIMEText(body)
        msg['To'] = to
        msg['From'] = f"{from_name} <{from_email}>"
        msg['Subject'] = subject
        
        raw_msg = base64.urlsafe_b64encode(msg.as_bytes()).decode()
        
        url = 'https://gmail.googleapis.com/gmail/v1/users/me/messages/send'
        headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
        data = json.dumps({'raw': raw_msg}).encode()
        
        try:
            req = urllib.request.Request(url, data=data, headers=headers, method='POST')
            with urllib.request.urlopen(req) as resp:
                result = json.loads(resp.read().decode())
                print(f"✅ Email sent to {to}")
                print(f"   Message ID: {result.get('id', 'N/A')}")
                return True
        except urllib.error.HTTPError as e:
            if e.code == 401:
                return False  # Token expired, needs refresh
            print(f"❌ Failed to send: {e.read().decode()}")
            return False
    
    def template(self, name, industry="generic"):
        """Get email template"""
        templates = {
            "clinic": {
                "subject": "{company} website question",
                "body": """Hi {name},

I was looking at {company}'s website and noticed the appointment booking process requires patients to call during business hours.

In our research, 73% of patients prefer WhatsApp or online booking — especially for {specialty} where people want quick answers.

I'm Dylan, founder of Plainsight Digital. We help Nairobi healthcare providers turn websites into patient booking engines.

We recently helped a similar clinic implement one-click WhatsApp booking and saw patient inquiries increase 3x in 60 days.

Worth a 10-minute conversation to see if there's a fit?

Best,
Dylan Makori
Founder, Plainsight Digital
www.plainsightdigital.dev
"""
            },
            "law": {
                "subject": "{company} website question", 
                "body": """Hi {name},

I was reviewing {company}'s website and noticed the contact process funnels all inquiries through a single generic form.

Most potential clients abandon because they're not sure if their specific case fits your expertise.

We recently helped a Nairobi law firm implement case-specific intake flow — visitors answer 3 questions and get routed to the right partner. Qualified leads increased 150%.

Worth a conversation?

Best,
Dylan Makori
Founder, Plainsight Digital
www.plainsightdigital.dev
"""
            },
            "school": {
                "subject": "{company} enrollment inquiry question",
                "body": """Hi {name},

I was looking at {company}'s website and noticed the parent inquiry process requires navigating multiple pages to find the admissions form.

During enrollment season, busy parents often abandon and move to schools with more streamlined processes.

We recently helped a similar school implement automated inquiry + tour booking. Result: 80% more tour bookings, 60% less admin time.

Worth a 10-minute conversation?

Best,
Dylan Makori
Founder, Plainsight Digital
www.plainsightdigital.dev
"""
            }
        }
        return templates.get(industry, templates["clinic"])
    
    def draft(self, to, company, name, industry="clinic", specialty=""):
        """Draft and preview email"""
        template = self.template(industry)
        subject = template['subject'].format(company=company)
        body = template['body'].format(
            name=name,
            company=company,
            specialty=specialty or "your services"
        )
        
        print(f"\n{'='*60}")
        print(f"TO: {to}")
        print(f"SUBJECT: {subject}")
        print(f"{'='*60}")
        print(body)
        print(f"{'='*60}\n")
        
        return {'to': to, 'subject': subject, 'body': body}
    
    def batch(self, csv_file):
        """Send batch emails from CSV"""
        import csv
        
        if not os.path.exists(csv_file):
            print(f"❌ File not found: {csv_file}")
            return
        
        sent = 0
        failed = 0
        
        with open(csv_file, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                to = row.get('email')
                company = row.get('company', 'Your Company')
                name = row.get('name', 'there')
                industry = row.get('industry', 'clinic')
                
                if not to:
                    continue
                
                template = self.template(industry)
                subject = template['subject'].format(company=company)
                body = template['body'].format(name=name, company=company, specialty=row.get('specialty', ''))
                
                if self.send(to, subject, body):
                    sent += 1
                else:
                    failed += 1
        
        print(f"\n📊 Batch complete: {sent} sent, {failed} failed")


def main():
    parser = argparse.ArgumentParser(description='Cold Email CLI for Plainsight Digital')
    subparsers = parser.add_subparsers(dest='command', help='Commands')
    
    # Auth
    auth_parser = subparsers.add_parser('auth', help='Authenticate with Gmail')
    
    auth_code_parser = subparsers.add_parser('auth-code', help='Complete auth with code')
    auth_code_parser.add_argument('code', help='OAuth authorization code')
    
    # Send
    send_parser = subparsers.add_parser('send', help='Send single email')
    send_parser.add_argument('--to', required=True, help='Recipient email')
    send_parser.add_argument('--subject', required=True, help='Email subject')
    send_parser.add_argument('--body', required=True, help='Email body')
    
    # Draft
    draft_parser = subparsers.add_parser('draft', help='Draft email from template')
    draft_parser.add_argument('--to', required=True, help='Recipient email')
    draft_parser.add_argument('--company', required=True, help='Company name')
    draft_parser.add_argument('--name', default='there', help='Recipient name')
    draft_parser.add_argument('--industry', choices=['clinic', 'law', 'school'], default='clinic')
    draft_parser.add_argument('--specialty', default='', help='Specific specialty')
    
    # Batch
    batch_parser = subparsers.add_parser('batch', help='Send batch from CSV')
    batch_parser.add_argument('file', help='CSV file with columns: email, company, name, industry')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return
    
    cli = ColdEmailCLI()
    
    if args.command == 'auth':
        cli.auth()
    elif args.command == 'auth-code':
        cli.auth_code(args.code)
    elif args.command == 'send':
        cli.send(args.to, args.subject, args.body)
    elif args.command == 'draft':
        cli.draft(args.to, args.company, args.name, args.industry, args.specialty)
    elif args.command == 'batch':
        cli.batch(args.file)


if __name__ == '__main__':
    main()
