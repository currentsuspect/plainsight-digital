#!/bin/bash
# Send cold email to Brookhouse School

CONFIG_FILE="$HOME/.openclaw/credentials/smtp-config.json"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Not configured. Run: ./setup-cold-email.sh"
    exit 1
fi

# Try common email patterns for Brookhouse
# Uncomment the one you want to use:

# Option 1: Admissions
# TARGET="admissions@brookhouse.ac.ke"

# Option 2: General info
# TARGET="info@brookhouse.ac.ke"

# Option 3: Enquiries
# TARGET="enquiries@brookhouse.ac.ke"

# EDIT THIS LINE with the email you want to use:
TARGET="admissions@brookhouse.ac.ke"

python3 << 'EOF'
import smtplib
import json
import os
from email.mime.text import MIMEText

config_file = os.path.expanduser('~/.openclaw/credentials/smtp-config.json')
with open(config_file) as f:
    config = json.load(f)

body = """Hi there,

I was looking at Brookhouse School's website and noticed the parent inquiry process requires navigating multiple pages to find the admissions form.

During enrollment season, busy parents often abandon at that point and move to schools with more streamlined inquiry processes — especially international parents researching from abroad.

I'm Dylan, founder of Plainsight Digital. We help Nairobi schools optimize their digital presence for enrollment growth.

We recently helped a similar school implement automated inquiry + tour booking system. Result: 80% more tour bookings, 60% less admin time for the admissions team, and parents get instant WhatsApp confirmations.

I made a quick 2-minute video showing what that could look like for Brookhouse: https://www.plainsightdigital.dev/audit

No obligation — just thought you'd find it useful, especially with enrollment season approaching.

Best,
Dylan Makori
Founder, Plainsight Digital
www.plainsightdigital.dev
P.S. Your new STEM facility and VR learning spaces are impressive — worth making sure prospective parents can easily book a tour to see them!
"""

msg = MIMEText(body)
msg['Subject'] = 'Brookhouse enrollment inquiry question'
msg['From'] = f"Dylan Makori <{config['email']}>"
msg['To'] = 'admissions@brookhouse.ac.ke'

try:
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.login(config['email'], config['password'])
    server.send_message(msg)
    print("✅ Email sent to admissions@brookhouse.ac.ke")
except Exception as e:
    print(f"❌ Failed: {e}")
EOF
