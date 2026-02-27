#!/bin/bash
# Quick setup for cold email SMTP

CONFIG_FILE="$HOME/.openclaw/credentials/smtp-config.json"

echo "🔐 Cold Email SMTP Setup"
echo "========================"
echo ""
echo "1. Go to: https://myaccount.google.com/apppasswords"
echo "2. Generate app password for 'Mail'"
echo "3. Enter details below:"
echo ""

read -p "Your Gmail address: " EMAIL
read -s -p "App password (16 chars): " PASSWORD
echo ""

# Create config directory
mkdir -p "$HOME/.openclaw/credentials"

# Save config
cat > "$CONFIG_FILE" << EOF
{
  "email": "$EMAIL",
  "password": "$PASSWORD"
}
EOF

echo ""
echo "🔄 Testing connection..."

# Test
python3 << PYEOF
import smtplib
import json
import os

config_file = os.path.expanduser('~/.openclaw/credentials/smtp-config.json')
with open(config_file) as f:
    config = json.load(f)

try:
    server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
    server.login(config['email'], config['password'])
    server.quit()
    print("✅ Setup complete! Ready to send emails.")
except Exception as e:
    print(f"❌ Error: {e}")
    print("Check your app password and try again.")
PYEOF
