import { CreatorProfile, Product, LandingPage, Order, CreatorAnalysis } from '@/types/database';
import { ProductIdeaCard } from '@/types/creator';

export const initialCreatorProfile: CreatorProfile = {
  id: 'profile-1',
  user_id: 'user-default-1',
  creator_name: 'Elena Vance',
  niche: 'Productivity & Remote Team Leadership',
  bio: 'Former VP of Operations turned creator. Helping 45,000+ knowledge workers build async work habits, eliminate useless meetings, and work without burnout.',
  audience_description: 'Mid-career managers, startup leads, software developers, and remote professionals struggling with meeting overload, Slack distractions, and poor task prioritization.',
  brand_preferences: {
    primaryColor: '#111827',
    accentColor: '#1f2937',
    fontFamily: 'Inter',
    tone: 'actionable, crisp, and empathetic',
  },
  created_at: new Date(Date.now() - 86400000 * 14).toISOString(),
  updated_at: new Date().toISOString(),
};

export const initialCreatorAnalysis: CreatorAnalysis = {
  id: 'analysis-1',
  user_id: 'user-default-1',
  profile_id: 'conn-1',
  analysis_json: {
    niche: 'Productivity & Remote Work Systems',
    subNiches: ['Async Communication', 'Meeting Reduction', 'Personal Energy Management'],
    mainThemes: ['Calendar defense', 'Documentation-first culture', 'Deep work blocks', 'Weekly reviews'],
    expertiseAreas: ['Executive operations', 'Remote team design', 'Habit engineering'],
    audienceInterests: ['Time-blocking tools', 'Notion/Obsidian workflows', 'Work-life balance', 'Focus hacks'],
    commonAudienceProblems: [
      'Stuck in 20+ hours of pointless Zoom calls every week',
      'Fragmented attention span; cannot get 2 consecutive hours of deep work',
      'Anxious about feeling "unresponsive" on Slack/Teams',
      'No structured system to prioritize high-leverage vs low-leverage work'
    ],
    potentialMonetizationOpportunities: [
      'The Async Meeting Elimination Playbook (Step-by-step audit & transition kit)',
      'The 4-Hour Deep Work System (Checklists, calendar scripts, habit planner)',
      'Executive Weekly Review Notion & Printable Kit'
    ],
    audiencePersona: {
      demographics: 'Ages 26-42, remote & hybrid professionals, senior ICs and first-time team managers',
      painPoints: ['Calendar dread', 'Context switching fatigue', 'Evening catch-up work'],
      desires: ['Leave work at 5pm guilt-free', 'Clear measurable output', 'Control over daily schedule'],
      purchasingMotivations: ['Immediately actionable templates', 'Copy-paste scripts', 'Battle-tested frameworks'],
    },
  },
  source_metadata: { platform: 'twitter_and_newsletter', samplePostCount: 42 },
  created_at: new Date().toISOString(),
};

export const initialProductIdeas: ProductIdeaCard[] = [
  {
    id: 'idea-1',
    user_id: 'user-default-1',
    title: 'The Async Meeting Elimination Playbook',
    format: 'playbook',
    targetAudience: 'Remote managers and knowledge workers overwhelmed by meeting clutter',
    problemSolved: 'Transforms reactive calendar chaos into a calm, async documentation culture',
    valueProposition: 'Exact scripts, meeting audit matrices, and communication protocols to cut 8-12 meeting hours weekly',
    demandEvidence: 'Top 3 most engaged newsletter issues with 1,200+ bookmarks and 87 replies requesting templates',
    suggestedPrice: 29.00,
    confidence: 'high',
    status: 'accepted',
    limitations: 'Requires manager buy-in for team-wide adoption; include individual boundary scripts',
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'idea-2',
    user_id: 'user-default-1',
    title: 'The 4-Hour Deep Work Blueprint',
    format: 'ebook',
    targetAudience: 'Software engineers, designers, and writers fighting Slack distraction',
    problemSolved: 'Inability to find uninterrupted focus blocks during regular business hours',
    valueProposition: 'A realistic step-by-step habit stack to defend 4 hours of daily deep work without getting fired',
    demandEvidence: 'Viral thread with 450k impressions and high demand for calendar templates',
    suggestedPrice: 24.00,
    confidence: 'high',
    status: 'recommended',
    limitations: 'Must address company cultures with aggressive immediate-response expectations',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'idea-3',
    user_id: 'user-default-1',
    title: 'Executive Weekly Review & Priority Planner',
    format: 'workbook',
    targetAudience: 'New founders and team leads juggling multiple projects',
    problemSolved: 'Sunday evening anxiety and lack of clarity on what actually moves the needle',
    valueProposition: 'A guided 45-minute Sunday ritual workbook with diagnostic checklists and priority matrices',
    demandEvidence: 'Frequent DM requests asking for the creator’s personal planning spreadsheet',
    suggestedPrice: 19.00,
    confidence: 'medium',
    status: 'recommended',
    limitations: 'High user drop-off without an initial onboarding guide or companion audio walkthrough',
    created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
  },
];

export const initialProduct: Product = {
  id: 'prod-1',
  user_id: 'user-default-1',
  product_idea_id: 'idea-1',
  title: 'The Async Meeting Elimination Playbook',
  description: 'The proven framework to audit, decline, and convert 60% of recurring meetings into high-velocity async memos.',
  format: 'playbook',
  status: 'published',
  price: 29.00,
  currency: 'USD',
  content_json: {
    tagline: 'Get 10 hours of your week back without damaging relationships or slowing down decisions.',
    introduction: 'If you feel like your entire workday is spent talking about work instead of actually doing work, you are not alone. The modern knowledge worker spends an average of 21.5 hours per week in meetings, with over 70% of those meetings reported as unproductive. This playbook gives you the exact tools to break free.',
    sections: [
      {
        id: 'sec-1',
        title: 'Module 1: The Brutal Calendar Audit',
        subtitle: 'Diagnosing the 4 types of meeting bloat',
        content: `### 1.1 The Meeting Health Assessment

Before you can decline a meeting, you must categorize it. Look at your calendar for the last 14 days and assign every recurring meeting into one of these four quadrants:

1. **Status Broadcasts (Kill Immediately)**: One person speaks while 8 people scroll Twitter on mute. Solution: Replace with a 3-bullet Slack update or Loom video.
2. **Brainstorming Swarms (Prune)**: Unstructured discussions without an agenda. Solution: Require a 1-page writeup 24 hours prior.
3. **Consensus Gatherers (Refactor)**: Meetings scheduled because someone is afraid to make a decision alone. Solution: Define single owner (DRI) and invite only essential decision makers.
4. **True Problem Solvers (Keep & Optimize)**: Complex, high-stakes trade-off evaluations where rapid back-and-forth is required. Cap at 25 minutes.

> **Rule of Thumb**: If the meeting has no agenda attached 4 hours before start time, it does not exist.`,
        order: 1,
        learningObjectives: ['Audit recurring calendar meetings', 'Identify high-cost broadcast meetings', 'Calculate meeting tax per team member'],
        actionItems: ['Color-code your next week into the 4 meeting quadrants', 'Mark at least 3 meetings for async conversion'],
      },
      {
        id: 'sec-2',
        title: 'Module 2: The Art of the Diplomatic "No"',
        subtitle: 'Polite, boundary-defending email and Slack scripts',
        content: `### 2.1 The Value-Aligned Rejection Framework

Declining a meeting should never sound lazy or dismissive. It should sound like an obsession with delivering high-value output.

#### Script A: When Invited as an "Optional" or Passive Observer
> *"Hi [Name], thanks for the invite. To make sure I hit our target for [High Priority Project] by Friday, I'm staying heads-down on focus work. Could you tag me in the recap notes or async decision doc if anything touches my domain? Happy to chime in asynchronously!"*

#### Script B: When Asked for a "Quick Sync"
> *"Hi [Name]! Would love to help. To give you the best answer quickly, could you drop 2-3 bullets on the main decision needed or a draft doc? I'll review and reply by [Time] today, which might save us both a 30-minute block!"*

#### Script C: Pushing for an Agenda
> *"Looking forward to this. What are the key decisions or outcomes we need to leave the room with? If we can clarify the agenda, I'll prepare my inputs ahead of time so we can wrap up in 15 minutes."*`,
        order: 2,
        learningObjectives: ['Decline non-critical invites without burning social capital', 'Reframe boundaries as dedication to high-impact work', 'Provide immediate async alternatives'],
        actionItems: ['Copy these 3 scripts into your text-expansion tool', 'Use Script A on one meeting invitation this week'],
      },
      {
        id: 'sec-3',
        title: 'Module 3: The 1-Page Async Decision Memo Template',
        subtitle: 'How to make decisions 3x faster without scheduling a call',
        content: `### 3.1 The Standard Async Memo Structure

Whenever an initiative needs alignment, write a concise 1-page memo using this exact 5-part structure:

1. **Context & Problem Statement (2 sentences max)**: Why are we here right now?
2. **The Proposal**: What are we recommending, and what is the primary benefit?
3. **Alternative Options Considered**: Option A (chosen), Option B (rejected because...), Option C (status quo).
4. **Key Risks & Mitigations**: What could go wrong and how do we prevent it?
5. **Call to Action & Deadline**: "Please comment with questions or approval by Thursday 3:00 PM EST. If no blocking objections are raised, we proceed with Option A."`,
        order: 3,
        learningObjectives: ['Write crisp 1-page decision documents', 'Set async feedback timeboxes', 'Drive asynchronous consensus'],
        actionItems: ['Duplicate the Google Doc / Notion memo template', 'Use this memo for the next feature or budget decision'],
      },
    ],
    conclusion: 'Meeting freedom is not about isolating yourself from your team; it is about respecting everyone’s most precious, non-renewable resource: deep, focused attention. As you implement these systems, notice how clarity rises and stress drops.',
    bonusResources: [
      'Editable Notion Meeting Audit Template',
      'Copy-Paste Slack Rejection Snippets (Alfred/Raycast format)',
      'The 1-Page Async Decision Doc (Google Doc template)'
    ],
  },
  branding_json: {
    coverTitle: 'The Async Meeting Elimination Playbook',
    coverSubtitle: 'How to reclaim 10 hours a week and build a high-velocity focus culture',
    accentColor: '#111827',
    authorName: 'Elena Vance',
  },
  cover_image_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
  created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  updated_at: new Date().toISOString(),
};

export const initialLandingPage: LandingPage = {
  id: 'landing-1',
  product_id: 'prod-1',
  storefront_id: 'store-1',
  page_json: {
    headline: 'Stop Drowning in Zoom Calls. Reclaim 10+ Hours of Your Workweek.',
    subheadline: 'The battle-tested playbook, scripts, and async frameworks used by high-performing operators to eliminate meeting bloat without slowing down decisions.',
    ctaText: 'Get Instant Access - $29',
    heroBadge: 'Complete Digital Playbook + Notion Templates',
    whatYouWillLearn: [
      'The 4-Quadrant Calendar Audit to instantly spot and eliminate zombie meetings',
      '9 Word-for-Word Diplomatic Scripts to decline meetings with zero awkwardness',
      'The 1-Page Async Decision Memo that replaces 45-minute syncs with 5-minute reads',
      'How to establish Slack & communication boundaries without being labeled unhelpful',
      'The exact team rituals that preserve spontaneous collaboration asynchronously',
    ],
    whoIsThisFor: [
      'Remote and hybrid team leads exhausted by back-to-back calendar gridlock',
      'Individual contributors who have to work nights just to get uninterrupted focus time',
      'Founders and managers wanting to build a calm, high-output documentation culture',
    ],
    targetProblems: [
      'Ending every workday feeling drained, yet wondering what you actually accomplished',
      'Suffering from constant context switching and message notification anxiety',
      'Spending 4 hours in meetings just to make a routine 2-minute decision',
    ],
    creatorBio: 'Elena Vance spent 12 years scaling operations across distributed tech teams. After burning out from 28 weekly meetings, she redesigned her workflow to async-first, freeing up over 12 hours a week while boosting team delivery speed. Over 45,000 professionals read her weekly insights.',
    curriculumOverview: [
      {
        title: 'Module 1: The Brutal Calendar Audit',
        description: 'Categorize every recurring meeting and ruthlessly identify what to eliminate, shorten, or convert.',
      },
      {
        title: 'Module 2: The Art of the Diplomatic "No"',
        description: 'Copy-paste boundary scripts for managers, peers, and clients that protect your focus while enhancing trust.',
      },
      {
        title: 'Module 3: The 1-Page Async Decision Memo',
        description: 'The proven memo format that moves initiatives forward with clear deadlines and zero conference calls.',
      },
      {
        title: 'Module 4: Team-Wide Async Implementation Guide',
        description: 'How to transition your entire team or department step-by-step without friction.',
      },
    ],
    faqs: [
      {
        question: 'What format does this product come in?',
        answer: 'You will receive an instant downloadable PDF playbook, plus ready-to-duplicate Notion templates and copy-paste text expansion scripts.',
      },
      {
        question: 'Will this work if my boss or company loves meetings?',
        answer: 'Yes! Module 2 includes scripts tailored for corporate environments that show you how to decline non-essential invites while over-communicating value.',
      },
      {
        question: 'Is there a money-back guarantee?',
        answer: 'Absolutely. If you implement the scripts and don’t save at least 3 hours on your calendar in the first 14 days, email us for an immediate 100% refund.',
      },
    ],
    guaranteeText: '14-Day 100% Money Back Guarantee — No questions asked.',
  },
  published_url: '/elena/async-playbook',
  status: 'published',
  created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  updated_at: new Date().toISOString(),
};

export const initialOrders: Order[] = [
  {
    id: 'ord-101',
    user_id: 'user-default-1',
    product_id: 'prod-1',
    customer_email: 'sarah.jenkins@techcorp.io',
    customer_name: 'Sarah Jenkins',
    amount: 29.00,
    currency: 'USD',
    payment_provider: 'stripe',
    payment_reference: 'pi_3MtwxTLkdIwHu7ix28aVLBLg',
    status: 'paid',
    download_token: 'd8e4f1a2-3b4c-4d5e-9f0a-1b2c3d4e5f60',
    download_expires_at: new Date(Date.now() + 86400000 * 2).toISOString(),
    download_count: 2,
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: 'ord-102',
    user_id: 'user-default-1',
    product_id: 'prod-1',
    customer_email: 'marcus.chen@designflow.com',
    customer_name: 'Marcus Chen',
    amount: 29.00,
    currency: 'USD',
    payment_provider: 'stripe',
    payment_reference: 'pi_3MtwxTLkdIwHu7ix28aVLBLh',
    status: 'paid',
    download_token: 'e9f5a2b3-4c5d-5e6f-0a1b-2c3d4e5f6a71',
    download_expires_at: new Date(Date.now() + 86400000 * 2).toISOString(),
    download_count: 1,
    created_at: new Date(Date.now() - 3600000 * 7).toISOString(),
  },
  {
    id: 'ord-103',
    user_id: 'user-default-1',
    product_id: 'prod-1',
    customer_email: 'alex.rivera@scaleops.co',
    customer_name: 'Alex Rivera',
    amount: 29.00,
    currency: 'USD',
    payment_provider: 'stripe',
    payment_reference: 'pi_3MtwxTLkdIwHu7ix28aVLBLi',
    status: 'paid',
    download_token: 'f0a6b3c4-5d6e-6f7a-1b2c-3d4e5f6a7b82',
    download_expires_at: new Date(Date.now() + 86400000 * 1).toISOString(),
    download_count: 3,
    created_at: new Date(Date.now() - 3600000 * 22).toISOString(),
  },
];
