export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface CreatorProfile {
  id: string;
  user_id: string;
  creator_name: string;
  niche: string | null;
  bio: string | null;
  audience_description: string | null;
  brand_preferences: {
    primaryColor?: string;
    accentColor?: string;
    fontFamily?: string;
    tone?: string;
  };
  created_at: string;
  updated_at: string;
}

export interface ConnectedProfile {
  id: string;
  user_id: string;
  platform: 'youtube' | 'twitter' | 'tiktok' | 'instagram' | 'blog_rss' | 'manual_paste';
  profile_url: string | null;
  external_profile_id: string | null;
  connection_status: 'connected' | 'analyzing' | 'synced' | 'error';
  metadata: {
    bio?: string;
    follower_count?: number;
    raw_samples?: string;
    transcripts?: string[];
  };
  created_at: string;
}

export interface CreatorAnalysis {
  id: string;
  user_id: string;
  profile_id: string | null;
  analysis_json: {
    niche: string;
    subNiches: string[];
    mainThemes: string[];
    expertiseAreas: string[];
    audienceInterests: string[];
    commonAudienceProblems: string[];
    potentialMonetizationOpportunities: string[];
    audiencePersona: {
      demographics: string;
      painPoints: string[];
      desires: string[];
      purchasingMotivations: string[];
    };
  };
  source_metadata: Record<string, unknown>;
  created_at: string;
}

export interface ProductIdea {
  id: string;
  user_id?: string;
  title: string;
  format: 'ebook' | 'playbook' | 'checklist' | 'prompt_pack' | 'workbook' | 'course' | 'template' | string;
  target_audience?: string;
  targetAudience?: string;
  problem_solved?: string;
  problemSolved?: string;
  value_proposition?: string;
  valueProposition?: string;
  demand_evidence?: string;
  demandEvidence?: string;
  suggested_price?: number;
  suggestedPrice?: number;
  confidence: 'high' | 'medium' | 'exploratory';
  status?: 'recommended' | 'accepted' | 'archived' | 'in_progress';
  limitations?: string;
  created_at?: string;
}

export interface ProductSection {
  id: string;
  title: string;
  subtitle?: string;
  content: string; // Markdown or rich text
  order: number;
  learningObjectives?: string[];
  actionItems?: string[];
}

export interface Product {
  id: string;
  user_id: string;
  product_idea_id: string | null;
  title: string;
  description: string | null;
  format: string;
  status: 'draft' | 'generating' | 'review' | 'published' | 'archived';
  price: number;
  currency: string;
  content_json: {
    tagline?: string;
    introduction?: string;
    sections: ProductSection[];
    conclusion?: string;
    bonusResources?: string[];
  };
  branding_json: {
    coverTitle?: string;
    coverSubtitle?: string;
    accentColor?: string;
    coverImageUrl?: string;
    authorName?: string;
  };
  cover_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface LandingPageContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  heroBadge?: string;
  whatYouWillLearn: string[];
  whoIsThisFor: string[];
  targetProblems: string[];
  creatorBio: string;
  curriculumOverview: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  guaranteeText: string;
}

export interface LandingPage {
  id: string;
  product_id: string;
  storefront_id: string | null;
  page_json: LandingPageContent;
  published_url: string | null;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
}

export interface Storefront {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  theme_json: {
    primaryColor: string;
    layout: string;
    bannerUrl?: string;
    bio?: string;
  };
  status: 'active' | 'inactive';
  created_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  product_id: string;
  customer_email: string;
  customer_name: string | null;
  amount: number;
  currency: string;
  payment_provider: string;
  payment_reference: string;
  status: 'pending' | 'paid' | 'refunded' | 'disputed';
  download_token: string;
  download_expires_at: string;
  download_count: number;
  created_at: string;
}

export interface WorkflowRun {
  id: string;
  user_id: string;
  product_id: string | null;
  workflow_type: 'analyze_creator' | 'generate_ideas' | 'create_product' | 'generate_landing_page';
  current_step: string;
  status: 'pending' | 'running' | 'paused_for_approval' | 'completed' | 'failed';
  state_json: Record<string, unknown>;
  error_message: string | null;
  created_at: string;
  updated_at: string;
}
