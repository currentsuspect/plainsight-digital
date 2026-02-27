# Plainsight Digital — Cold Email System

## 🔐 Gmail SMTP Configuration

**Status:** ✅ Configured and operational

**Account:** makoridylan@gmail.com  
**Method:** Gmail App Password (SMTP)  
**Location:** `~/.openclaw/credentials/smtp-config.json`

### How It Works
- Uses Gmail's SMTP server (smtp.gmail.com:465)
- Authenticates via 16-character app password
- No OAuth tokens to refresh
- No browser auth required after initial setup

### Sending Emails

**Single target:**
```bash
cd ~/.openclaw/workspace/plainsight-digital
./send-nairobi-ent-smtp.sh
```

**Custom email:**
```bash
python3 cold-email-smtp.py send \
  --to "target@company.com" \
  --subject "Your Subject" \
  --body "Your message"
```

**Draft/preview:**
```bash
python3 cold-email-smtp.py draft \
  --to "test@example.com" \
  --company "Test Co" \
  --name "John" \
  --industry clinic
```

---

## 🛠️ Email Discovery (Hunter.io CLI)

**Tool:** `hunter.py` — Find verified email addresses via CLI

### Setup
```bash
# Get Hunter API key from https://hunter.io/api_keys
export HUNTER_API_KEY="your_api_key"
```

### Usage

**Find emails for a domain:**
```bash
python3 hunter.py domain hhm.co.ke
```

**Find specific person:**
```bash
python3 hunter.py find "Hamilton Harrison Mathews" "managing partner"
```

**Verify an email:**
```bash
python3 hunter.py verify info@hhm.co.ke
```

**Batch search from CSV:**
```bash
python3 hunter.py batch targets.csv --output leads.csv
```

---

## 📊 Cold Email Workflow

### Step 1: Research Targets
```bash
# Find decision makers
python3 hunter.py domain nairobientclinic.com

# Verify email
python3 hunter.py verify info@nairobientclinic.com
```

### Step 2: Draft Email
```bash
python3 cold-email-smtp.py draft \
  --to "info@nairobientclinic.com" \
  --company "Nairobi ENT Clinic" \
  --name "there" \
  --industry clinic \
  --specialty "ENT treatments"
```

### Step 3: Send
```bash
# Option A: Use template script
./send-nairobi-ent-smtp.sh

# Option B: Custom send
python3 cold-email-smtp.py send \
  --to "info@nairobientclinic.com" \
  --subject "Nairobi ENT Clinic website question" \
  --body "[your message]"
```

### Step 4: Track
Update `cold-email-campaign.md` with:
- Date sent
- Response status
- Follow-up dates

---

## 📁 File Structure

```
plainsight-digital/
├── cold-email-smtp.py          # Main SMTP email tool
├── cold-email.py               # OAuth version (backup)
├── hunter.py                   # Email discovery tool
├── send-nairobi-ent-smtp.sh    # Pre-configured send script
├── setup-cold-email.sh         # Initial setup script
├── cold-email-campaign.md      # Campaign tracking
├── ready-to-send-emails.md     # Drafted templates
└── linkedin-content-tracker.md # LinkedIn strategy
```

---

## 🔒 Security Notes

- App password stored in `~/.openclaw/credentials/` (restricted permissions)
- Never commit credentials to git
- If token expires: regenerate at https://myaccount.google.com/apppasswords
- Update `~/.openclaw/credentials/smtp-config.json` with new password

---

## 📈 Metrics to Track

| Metric | Target |
|--------|--------|
| Emails sent/week | 15-20 |
| Open rate | 40%+ |
| Reply rate | 10%+ |
| Positive replies | 2-3/week |
| Calls booked | 1-2/week |

---

## 🎯 Next Steps

1. ✅ SMTP configured
2. ✅ First email sent (Nairobi ENT Clinic)
3. 🔄 Find 2 more emails (HHM Law, Brookhouse)
4. 🔄 Send follow-up sequence
5. 🔄 Build CSV batch system

---

*Last updated: 2026-02-27*  
*Maintained by: Resonance + Dylan*
