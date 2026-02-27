# Hunter.io CLI Setup

## 🔑 Get API Key

1. Go to: https://hunter.io/api_keys
2. Sign up / Sign in (free tier: 25 searches/month)
3. Copy your API key

## ⚙️ Configure

**Option 1: Environment Variable (Recommended)**
```bash
export HUNTER_API_KEY="your_api_key_here"
```

Add to `~/.bashrc` or `~/.zshrc` to persist:
```bash
echo 'export HUNTER_API_KEY="your_key"' >> ~/.bashrc
```

**Option 2: Config File**
```bash
echo '{"api_key": "your_key"}' > ~/.openclaw/credentials/hunter.json
```

## 🚀 Usage Examples

### Search a Domain
```bash
python3 hunter.py domain hhm.co.ke
python3 hunter.py domain brookhouse.ac.ke --limit 5
```

### Find Specific Person
```bash
python3 hunter.py find hhm.co.ke John Smith
```

### Verify Email
```bash
python3 hunter.py verify info@hhm.co.ke
```

### Batch Process
```bash
# Create targets.csv with columns: domain, company, target_title
python3 hunter.py batch targets.csv -o leads.csv
```

### Check API Usage
```bash
python3 hunter.py account
```

## 📊 Free Tier Limits

- 25 searches per month
- 50 verifications per month
- Perfect for small campaigns

Upgrade at: https://hunter.io/pricing
