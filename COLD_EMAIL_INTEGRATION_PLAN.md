# Cold Email Integration Plan — Plainsight Digital Admin

## 🎯 Goal
Integrate the CLI cold email system into the web admin dashboard for easier management.

## 📊 Features to Add

### 1. Admin Dashboard Section
- **Cold Email Stats Card**
  - Emails sent today/week/month
  - Response rate
  - Open rate (if tracking enabled)
  - Pending follow-ups

### 2. Cold Email Management Page (`/admin/cold-email`)
- **Target List**
  - Add/edit/delete targets
  - Import from CSV
  - Filter by industry (clinic, law, school)
  - Status tracking (Not Sent, Sent, Replied, Meeting Booked)

- **Email Templates**
  - View/edit templates
  - Industry-specific templates
  - Preview before send

- **Send History**
  - Log of all emails sent
  - Timestamps
  - Delivery status
  - Reply tracking

- **Quick Send**
  - One-click send to targets
  - Batch send with confirmation
  - Schedule sends

### 3. API Endpoints (`/api/admin/cold-email`)
- `GET /targets` — List all targets
- `POST /targets` — Add new target
- `PUT /targets/:id` — Update target
- `DELETE /targets/:id` — Delete target
- `POST /send` — Send email to target
- `POST /batch-send` — Send to multiple targets
- `GET /history` — Get send history
- `GET /templates` — Get email templates

### 4. Data Storage
- **JSON Store** (use existing store.ts pattern)
  - `cold-email-targets.json`
  - `cold-email-history.json`

### 5. UI Components
- TargetTable — List of targets with actions
- EmailComposer — Compose/preview emails
- StatsCard — Cold email metrics
- SendModal — Confirm before sending

## 📁 Files to Create

```
src/app/admin/cold-email/page.tsx       # Main cold email page
src/app/api/admin/cold-email/route.ts   # API endpoints
src/components/ColdEmailTargetTable.tsx # Target list component
src/components/ColdEmailStats.tsx       # Stats display
src/lib/coldEmailStore.ts               # Data storage functions
```

## 🔐 Security
- Only authenticated admin access
- Rate limiting on send endpoints
- Email validation
- Confirmation before bulk send

## 🎨 UI Design
- Match existing admin dark theme
- Use existing components (cards, tables, buttons)
- Responsive layout
- Real-time status updates

## 📅 Phase 1 (MVP)
1. Target list CRUD
2. Single email send
3. Send history
4. Basic stats

## 📅 Phase 2 (Advanced)
1. Batch send
2. Email templates UI
3. Schedule follow-ups
4. Open/reply tracking
5. Import from CSV

## 🚀 Implementation Order
1. Create store functions
2. Create API endpoints
3. Create admin page
4. Add dashboard widget
5. Test end-to-end
