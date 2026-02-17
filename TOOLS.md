# TOOLS.md - Environment-Specific Notes

Quick reference for infrastructure, devices, and preferences.

## SSH Access

| Host | Address | User | Key |
|------|---------|------|-----|
| VPS (Azure) | `4.161.44.125` | `currentsuspect` | `~/.openclaw/credentials/vps-4.161.44.125.pem` |
| VPS (Tailscale) | `100.115.33.63` | `currentsuspect` | Same key |
| Phone (Termux) | `100.89.84.76:8022` | `u0_a480` | Tailscale only |

## Tailscale Network

| Device | IP |
|--------|-----|
| VPS | `100.115.33.63` |
| Phone (Infinix Hot 12 Play) | `100.89.84.76` |

## VPS Services

| Service | Port | Access |
|---------|------|--------|
| Gateway | `18789` | Loopback only |
| lifeos-api | `8088` | `0.0.0.0` |
| ttyd (web terminal) | `7681` | Tailscale only |
| Cloudflare tunnel | `443` | `openclaw.currentsuspect.me`, `ssh.currentsuspect.me` |

## Cloudflare Tunnel

- Tunnel ID: `83a5ab92-dc33-4102-a585-fe4cd83d008e`
- DNS: `openclaw.currentsuspect.me`, `ssh.currentsuspect.me`
- Config: `/etc/cloudflared/config.yml`

## Azure

- Subscription: Azure for Students (`d233b1c6-f632-4408-9f6f-ad00229e930d`)
- VM: `currentsuspect` in `ZT_TGRC` RG, UAE North
- Size: `Standard_B2als_v2` (4GB RAM, 2 vCPU)
- Auto-shutdown: 22:00 UTC (01:00 EAT)

## Everything Vault

- Path: `/home/currentsuspect/Everything`
- Structure: PARA (Projects, Areas, Resources, Permanent, Fleeting, Daily)
- API: `POST http://localhost:8088/notes/capture`, `POST /notes/daily/append`

## Projects

| Project | Path | Description |
|---------|------|-------------|
| Resonance (LifeOS) | `~/workspace/resonance` | Flutter app |
| Aestra | `~/workspace/Aestra` | AI project |
| valentines-kat | `~/workspace/valentines-kat` | Valentine's site for Kat |

## Auth Providers

| Provider | Account | Status |
|----------|---------|--------|
| Google (Antigravity) | `99niccur@gmail.com` | OAuth, occasional refresh issues |
| OpenAI (Codex) | `default` | OAuth, stable (8d expiry) |

## Model Fallback Order

1. Antigravity (Google)
2. Codex (OpenAI)
3. Groq
4. Gemini API-key
5. OpenRouter free

## Dylan's Preferences

- **Timezone:** EAT (UTC+3)
- **Explanation style:** Detailed, opinionated, proactive
- **Writing style:** Em dashes, italics for thoughts, narrative flow, specific numbers
