#!/usr/bin/env python3
"""
Cold Email CLI - SMTP Version (Simpler, No OAuth)
"""

import argparse
import base64
import json
import os
import smtplib
import sys
from email.mime.text import MIMEText
from getpass import getpass
from pathlib import Path

# Config
CONFIG_DIR = Path.home() / '.openclaw' / 'credentials'
CONFIG_FILE = CONFIG_DIR / 'smtp-config.json'

class ColdEmailSMTP:
    def __init__(self):
        self.email = None
        self.password = None
        self._load_config()
    
    def _load_config(self):
        if CONFIG_FILE.exists():
            with open(CONFIG_FILE) as f:
                config = json.load(f)
                self.email = config.get('email')
                self.password = config.get('password')
    
    def setup(self):
        """Initial setup - get Gmail app password"""
        print("="*60)
        print("🔐 Cold Email SMTP Setup")
        print("="*60)
        print("\n1. Go to https://myaccount.google.com/apppasswords")
        print("2. Sign in with your Google account")
        print("3. Select 'Mail' and your device")
        print("4. Copy the 16-character app password")
        print()
        
        email = input("Your Gmail address: ").strip()
        password = getpass("App password (16 chars): ").strip()
        
        # Test connection
        print("\n🔄 Testing connection...")
        try:
            server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
            server.login(email, password)
            server.quit()
            
            # Save config
            CONFIG_DIR.mkdir(parents=True, exist_ok=True)
            with open(CONFIG_FILE, 'w') as f:
                json.dump({'email': email, 'password': password}, f)
            
            print("✅ Setup complete!")
            print(f"📁 Config saved to {CONFIG_FILE}")
            return True
        except Exception as e:
            print(f"❌ Connection failed: {e}")
            return False
    
    def send(self, to, subject, body, from_name="Dylan Makori"):
        """Send email via SMTP"""
        if not self.email or not self.password:
            print("❌ Not configured. Run: cold-email-smtp setup")
            return False
        
        msg = MIMEText(body)
        msg['Subject'] = subject
        msg['From'] = f"{from_name} <{self.email}>"
        msg['To'] = to
        
        try:
            server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
            server.login(self.email, self.password)
            server.send_message(msg)
            server.quit()
            print(f"✅ Email sent to {to}")
            return True
        except Exception as e:
            print(f"❌ Failed to send: {e}")
            return False
    
    def template(self, industry="clinic"):
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


def main():
    parser = argparse.ArgumentParser(description='Cold Email CLI (SMTP)')
    subparsers = parser.add_subparsers(dest='command', help='Commands')
    
    # Setup
    setup_parser = subparsers.add_parser('setup', help='Configure Gmail app password')
    
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
    
    # Send to Nairobi ENT
    subparsers.add_parser('send-nairobi-ent', help='Send to Nairobi ENT Clinic')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        return
    
    cli = ColdEmailSMTP()
    
    if args.command == 'setup':
        cli.setup()
    elif args.command == 'send':
        cli.send(args.to, args.subject, args.body)
    elif args.command == 'draft':
        cli.draft(args.to, args.company, args.name, args.industry, args.specialty)
    elif args.command == 'send-nairobi-ent':
        body = """Hi there,

I was looking at Nairobi ENT Clinic's website and noticed the appointment booking process requires patients to call during business hours or send an email and wait for a response.

In our research, 73% of patients prefer WhatsApp or online booking for initial consultations — especially for ENT issues where people often want quick answers about availability.

I'm Dylan, founder of Plainsight Digital. We help Nairobi healthcare providers turn websites into patient booking engines.

We recently helped a similar clinic implement one-click WhatsApp booking and saw their patient inquiries increase 3x in 60 days. Same staff, same doctors — just removed the friction.

I made a quick 2-minute video showing exactly how I'd streamline your booking flow: https://www.plainsightdigital.dev/audit

No obligation — just thought you'd find the insights useful. If it resonates, happy to discuss further.

Best,
Dylan Makori
Founder, Plainsight Digital
www.plainsightdigital.dev
P.S. Saw your clinic specializes in sinus treatments — that's exactly the type of specific service patients search for online. Worth making it easy for them to book."""
        cli.send("info@nairobientclinic.com", "Nairobi ENT Clinic website question", body)


if __name__ == '__main__':
    main()
