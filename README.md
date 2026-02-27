# Plainsight Digital

High-ticket website design agency for Kenya. Built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🧪 Testing

```bash
npm test              # Run tests
npm run test:coverage # With coverage report
```

## 🔐 Required Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `JWT_SECRET` | ✅ | Secret key for JWT signing |
| `ADMIN_BASIC_USER` | ✅ | Admin login username |
| `ADMIN_BASIC_PASS` | ✅ | Admin login password |
| `RESEND_API_KEY` | ✅ | Resend API key for emails |
| `FOLLOWUP_FROM_EMAIL` | ✅ | From address for emails |
| `REPLY_TO_EMAIL` | ❌ | Reply-to address |
| `TELEGRAM_BOT_TOKEN` | ❌ | For notifications |
| `TELEGRAM_LEADS_CHAT_ID` | ❌ | For notifications |
| `SUPABASE_URL` | ❌ | For Postgres database |
| `SUPABASE_SERVICE_ROLE_KEY` | ❌ | For Postgres database |

## 🗄️ Database Setup (Optional)

By default, the app uses JSON files for storage. To use Supabase Postgres:

1. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`
2. Run migrations:
   ```bash
   npx tsx tools/migrate-db.ts
   ```

## 📁 Project Structure

```
src/
  app/           # Next.js app router
    admin/       # Admin dashboard
    api/         # API routes
    [industry]/  # Dynamic industry pages
  lib/           # Utilities and business logic
    schemas.ts   # Zod validation schemas
    db.ts        # Database queries
    emailService.ts  # Unified email sending
    errorHandler.ts  # Error tracking
  test/          # Test setup
tools/           # Migration scripts
docs/            # Documentation
  operations/    # System docs
  marketing/     # Marketing docs
  archive/       # Old docs
```

## 🏗️ Architecture

- **Auth:** JWT-based sessions (8h expiry)
- **Database:** JSON files (default) or Supabase Postgres
- **Email:** Resend API with queue system
- **Testing:** Vitest with React Testing Library
- **Validation:** Zod schemas for runtime safety

## 📧 Email System

- **Transactional:** Immediate send via `emailService.ts`
- **Cold emails:** Queue-based with retries
- **Queue processor:** `/api/admin/email-queue/process`

## 📝 License

Private - Plainsight Digital
