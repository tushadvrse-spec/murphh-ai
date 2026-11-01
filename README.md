# Murphh AI — AI Creator Business Platform

An AI-powered digital product creation and commerce platform built specifically for content creators, influencers, educators, coaches, and niche experts.

Murphh AI enables creators to turn their expertise, content, and audience into a profitable digital product business in **under 30 minutes** with minimal manual effort.

---

## Key Features

- **Audience Intelligence Agent**: Ingests creator bios, past posts, newsletters, and video transcripts to extract high-friction audience pain points and monetization opportunities.
- **Product Strategy Agent**: Generates ranked digital product concepts (Playbooks, Ebooks, Checklists, Prompt Packs, and Workbooks) with supporting demand signals, value propositions, and suggested pricing.
- **Product Creation & Editor Studio**:
  - Section-by-section AI content drafting that avoids single-call context limits.
  - Distraction-free chapter navigation and real-time autosave.
  - Inline AI rewrite assistant (*Expand*, *Summarize*, *Make Actionable Checklists*, *Simplify Tone*).
  - Printable PDF preview and direct export.
- **Landing Page & Storefront Builder**: AI generates structured JSON sales copy (headlines, outcomes, FAQs, guarantee) rendered securely through trusted React components.
- **Commerce & Instant Fulfillment**:
  - Stripe Checkout integration with verified webhook listeners.
  - Tokenized, 48-hour expiring signed download fulfillment.
  - Sales & conversion analytics ledger.

---

## Tech Stack

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **AI Orchestration**: [Vercel AI SDK](https://sdk.vercel.ai/) (supporting Gemini 2.5/3.8 Flash, Claude 3.5 Sonnet, and OpenAI GPT-4o)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security)
- **Payments**: [Stripe](https://stripe.com/) Checkout & Connect
- **Transactional Delivery**: [Resend](https://resend.com/)

---

## 5-Step Creator Pipeline

```
Profile & Audience ───▶ Product Ideas ───▶ Create & Edit ───▶ Landing Page ───▶ Publish & Sell
```

1. **Profile & Audience**: `/dashboard/audience`
2. **Ideas Discovery**: `/dashboard/discover`
3. **Creation Studio**: `/dashboard/products/[id]/edit`
4. **Landing Page Builder**: `/dashboard/products/[id]/landing`
5. **Publish & Launch**: `/dashboard/products/[id]/publish`

---

## Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/tushadvrse-spec/murphh-ai.git
cd murphh-ai
npm install
```

### 2. Configure Environment Variables

Copy the example environment template:

```bash
cp .env.example .env.local
```

Fill in your API keys (optional for initial mock demo exploration):
- `GEMINI_API_KEY` or `OPENAI_API_KEY`
- `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `STRIPE_SECRET_KEY` & `STRIPE_WEBHOOK_SECRET`

### 3. Database Migration

Run the migration in your Supabase SQL editor:

```bash
supabase/migrations/20261101_init_schema.sql
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

- Creator Workspace: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
- Sample Storefront: [http://localhost:3000/elena/async-playbook](http://localhost:3000/elena/async-playbook)
- Customer Delivery Page: [http://localhost:3000/download/d8e4f1a2-3b4c-4d5e-9f0a-1b2c3d4e5f60](http://localhost:3000/download/d8e4f1a2-3b4c-4d5e-9f0a-1b2c3d4e5f60)

---

## License

MIT License. Designed and built with Murphh AI.
