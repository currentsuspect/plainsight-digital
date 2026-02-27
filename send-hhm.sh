#!/bin/bash
# Send cold email to Dentons Hamilton Harrison & Mathews

CONFIG_FILE="$HOME/.openclaw/credentials/smtp-config.json"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Not configured. Run: ./setup-cold-email.sh"
    exit 1
fi

# Try common email patterns for HHM
# Uncomment the one you want to use:

# Option 1: General contact
# TARGET="info@dentonshhm.com"

# Option 2: Alternative general
# TARGET="contact@dentonshhm.com"

# Option 3: Managing Partner (if known)
# TARGET="firstname.lastname@dentonshhm.com"

# EDIT THIS LINE with the email you want to use:
TARGET="info@dentonshhm.com"

python3 << 'EOF'
import smtplib
import json
import os
from email.mime.text import MIMEText

config_file = os.path.expanduser('~/.openclaw/credentials/smtp-config.json')
with open(config_file) as f:
    config = json.load(f)

body = """Hi there,

I was reviewing Dentons Hamilton Harrison & Mathews' website and noticed the contact process funnels all inquiries through a single generic form.

Most potential clients abandon because they're not sure if their specific case fits your expertise — whether it's banking, corporate, real estate, or dispute resolution.

I'm Dylan, founder of Plainsight Digital. We specialize in websites for Kenyan law firms that actually capture qualified leads.

We recently helped a Nairobi law firm implement case-specific intake flow — visitors answer 3 questions and get routed to the right partner immediately. Their qualified leads increased 150% in 90 days.

I made a quick audit showing exactly what I'd change on your site to capture more corporate clients: https://www.plainsightdigital.dev/audit

Worth a look?

Best,
Dylan Makori
Founder, Plainsight Digital
www.plainsightdigital.dev
P.S. Your recent work advising Gulf Energy on the Tullow Kenya acquisition shows the caliber of matters you handle. Worth making sure your digital presence matches that prestige.
"""

msg = MIMEText(body)
msg['Subject'] = 'HHM website question'
msg['From'] = f"Dylan Makori <{config['email']}>"
msg['To'] = 'info@dentonshhm.com'

try:
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.login(config['email'], config['password'])
    server.send_message(msg)
    print("✅ Email sent to info@dentonshhm.com")
except Exception as e:
    print(f"❌ Failed: {e}")
EOF
