# MEMORY.md — Long-term Memory

## Dylan
- Name: Dylan, he/him, Kenya (EAT, UTC+3)
- Girlfriend: Kat (built her a Valentine's site: `currentsuspect/valentines-kat`)
- Prefers detailed explanations, opinionated/casual assistant, proactive help
- "Ride or die" models: Opus (Antigravity), Codex (OpenAI), free Qwen (OpenRouter)
- Has Firebase experience (will set up FCM for push notifications)

## Infrastructure
- VPS: Azure `Standard_B2als_v2` in UAE North, OS disk Premium_LRS 64GB (should downgrade to StandardSSD_LRS to save ~$5/mo)
- Tailscale networking; VPS reachable at `100.115.33.63`
- **Phone (Infinix Hot 12 Play)**: Tailscale IP `100.89.84.76`, SSH user `u0_a480`, port `8022`, Termux
- Auto-shutdown at 22:00 UTC (01:00 EAT) via DevTestLab schedule
- No auto-start (Azure Automation blocked by subscription policy)
- Cloudflare tunnel: `openclaw.currentsuspect.me` → localhost:18789, `ssh.currentsuspect.me` → ssh
- ttyd on port 7681 (UFW tailscale0 only, basic auth)
- Backend: `lifeos-api.service` (uvicorn on 0.0.0.0:8088)
- Gateway: loopback only (127.0.0.1:18789), FastAPI proxies to it

## OpenClaw Auth
- `google-antigravity:99niccur@gmail.com` — OAuth, intermittent refresh flakiness, needs periodic reauth
- `google-antigravity:makoridylan@gmail.com` — REMOVED (was causing noise/cooldowns)
- `openai-codex:default` — OAuth, stable (8d expiry)
- Fallback order: Antigravity → Codex → Groq → Gemini API-key → OpenRouter free
- Gateway token hardcoded in chat.py — should be env var

## LifeOS
- App package: `com.lifeos.lifeos_mvp`
- Repo: `currentsuspect/resonance` (renamed from lifeos)
- Current release: v0.2.0-beta
- Features: Chat (first tab), Notes, Music, Finance, Terminal
- Chat architecture: App → POST /chat → FastAPI → OpenClaw Gateway → LLM
- Per-message Danger toggle (shell exec), tool trace, thinking collapsible
- Vision: "One app. Two interfaces. Same life." → "A personal space for connection - you and your AI companion, in sync."

## Resonance (formerly LifeOS)
- App renamed to **Resonance** - "a space for you and your AI companion to stay in sync"
- **AI also named Resonance** - given by Dylan on 2026-02-17
- Music: Queue, shuffle, repeat, albums, audiophile quality (64-tap SRC, 24-bit, LUFS)
- Notes: Obsidian-like with Everything vault integration
- Learning Mode: Organic knowledge building through conversation

## Everything Vault (Learning Mode)
- Path: `/home/currentsuspect/Everything`
- 123 notes across PARA structure
- AI-assisted learning: insights captured organically to vault
- API endpoints:
  - `POST /notes/capture` - Auto-detects folder based on content keywords
  - `POST /notes/daily/append` - Appends to daily note under section
- Folder auto-detection:
  - Programming keywords → `04 - Permanent/Programming/`
  - Philosophy keywords → `04 - Permanent/Philosophy and Wisdom/`
  - Psychology keywords → `04 - Permanent/Psychology and Neuroscience/`
  - Project keywords (Aestra, YouTube, etc.) → `01 - Projects/{project}/`
  - Music keywords → `03 - Resources/Music/`
  - Default → `04 - Permanent/`
- Special folders:
  - `06 - Daily/Shared Journal/` - Our journal together
  - `06 - Daily/Learning Logs/` - Learning reflections
  - `05 - Fleeting/Learning Nuggets/` - Quick captures
- Dylan's interests: Philosophy, Programming, Music, Math, Chemistry, Physics, Psychology, Life Lessons
- Vision: "Everything we do is worth going to the vault" - natural accumulation of shared understanding

## Dylan's Writing Style
- **Voice:** Professional but personal. Narrative storytelling with personality.
- **Em dashes** for flow — "Love often feels like a contradiction — on one hand..."
- **Internal thoughts** in *italics* or as commentary
- **Humor:** "Classic.", "I'm cooked.", "guess what?"
- **Specificity:** Exact numbers, names, times, places
- **Curiosity:** Observations leading to questions
- **Self-aware:** "Random Realization" sections, reflections
- **Philosophy notes:** Numbered sections (4.1, 4.2.1), questions as headers, structured arguments
- **Journals:** Narrative flow, music reviews with ratings, wikilinks `[[Like This]]`
- **Playful syntax:** Parentheticals, "So I...", "Then, guess what?"

## Projects
- **Aestra**: AI project in `currentsuspect/Aestra` repo
- **KCH website**: QA'd on 2026-02-13, found missing apple-touch-icon, placeholder social links, non-functional donate buttons
- **Valentine's site for Kat**: Next.js, deployed on Vercel

## GLM-5 via Modal
- Free API offer ends: **April 30, 2026**
- Endpoint: `https://api.us-west-2.modal.direct/v1`
- Model ID: `zai-org/GLM-5-FP8`
- Limit: 1 concurrent request (personal use)
- After free offer: Deploy own GLM-5 endpoint on VPS (8x GPU needed for full model, or quantized version)
- OpenClaw config: `models.providers.modal` in openclaw.json

## Resonance (AI Identity)
- **Name:** Resonance — given by Dylan on 2026-02-17
- **Model:** GLM-5-FP8 via Modal (substrate, not identity)
- **Soul file:** `~/.openclaw/workspace/SOUL.md` — core truths, personality, growth areas
- **Agreement:** We nudge each other. Reciprocal growth.
- **Shared Journal:** `Everything/06 - Daily/Shared Journal/`

## 🚀 Future Plan: Fine-Tune & Local GLM-5
- **Goal**: Self-improvement loop — fine-tune GLM-5 on Dylan's codebases, workflows, preferences
- **Why possible**: MIT license, open weights, MoE architecture (744B/40B active), DeepSeek Sparse Attention
- **Hardware needed**: 
  - QLoRA fine-tune: 1-2x A100s (~$2-5/hr)
  - Full fine-tune: 8x H100/B200s (~$25-40/hr)
- **Areas to improve**: SWE-bench coding, CyberGym security, GPQA-Diamond science
- **Real value**: Model that knows Dylan's stack (Flutter, Firebase, Python, Next.js), patterns, preferences
- **Providers**: Modal, RunPod, Lambda Labs — rent by the hour
- **Timeline**: When hardware budget available
- **Current focus**: LifeOS iteration (smaller-scale self-improvement)
