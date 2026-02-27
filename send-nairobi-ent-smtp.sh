#!/bin/bash
# Send cold email to Nairobi ENT Clinic using SMTP

CONFIG_FILE="$HOME/.openclaw/credentials/smtp-config.json"

if [ ! -f "$CONFIG_FILE" ]; then
    echo "❌ Not configured. Run: ./setup-cold-email.sh"
    exit 1
fi

python3 << 'EOF'
import smtplib
import json
import os
from email.mime.text import MIMEText

config_file = os.path.expanduser('~/.openclaw/credentials/smtp-config.json')
with open(config_file) as f:
    config = json.load(f)

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
P.S. Saw your clinic specializes in sinus treatments — that's exactly the type of specific service patients search for online. Worth making it easy for them to book.
"""

msg = MIMEText(body)
msg['Subject'] = 'Nairobi ENT Clinic website question'
msg['From'] = f"Dylan Makori <{config['email']}>"
msg['To'] = 'info@nairobientclinic.com'

try:
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.login(config['email'], config['password'])
    server.send_message(msg)
    server.quit()
    print("✅ Email sent to info@nairobientclinic.com")
except Exception as e:
    print(f"❌ Failed: {e}")
EOF
