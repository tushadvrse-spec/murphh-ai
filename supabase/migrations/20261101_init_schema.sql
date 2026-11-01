-- ==============================================================================
-- AI Creator Business Platform (Murphh AI) Database Schema
-- Supabase / PostgreSQL initial migration
-- ==============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Creator Profiles
CREATE TABLE IF NOT EXISTS public.creator_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    creator_name VARCHAR(255) NOT NULL,
    niche VARCHAR(255),
    bio TEXT,
    audience_description TEXT,
    brand_preferences JSONB DEFAULT '{"primaryColor": "#4f46e5", "accentColor": "#6366f1", "fontFamily": "Inter", "tone": "professional-friendly"}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_user_profile UNIQUE (user_id)
);

-- 2. Connected Profiles & Content Sources
CREATE TABLE IF NOT EXISTS public.connected_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    platform VARCHAR(50) NOT NULL, -- 'youtube', 'twitter', 'tiktok', 'instagram', 'blog_rss', 'manual_paste'
    profile_url TEXT,
    external_profile_id VARCHAR(255),
    connection_status VARCHAR(50) DEFAULT 'connected', -- 'connected', 'analyzing', 'synced', 'error'
    metadata JSONB DEFAULT '{}'::jsonb, -- bio, follower_count, raw_samples, transcripts
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Creator Profile Analyses
CREATE TABLE IF NOT EXISTS public.creator_analyses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES public.connected_profiles(id) ON DELETE SET NULL,
    analysis_json JSONB NOT NULL, -- { niche, themes, audience_problems, expertise_areas, monetization_opportunities }
    source_metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Product Ideas
CREATE TABLE IF NOT EXISTS public.product_ideas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    format VARCHAR(100) NOT NULL, -- 'ebook', 'playbook', 'checklist', 'prompt_pack', 'workbook'
    target_audience TEXT NOT NULL,
    problem_solved TEXT NOT NULL,
    value_proposition TEXT NOT NULL,
    demand_evidence TEXT,
    suggested_price DECIMAL(10, 2) NOT NULL DEFAULT 29.00,
    confidence VARCHAR(50) DEFAULT 'high', -- 'high', 'medium', 'exploratory'
    status VARCHAR(50) DEFAULT 'recommended', -- 'recommended', 'accepted', 'archived', 'in_progress'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Products
CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_idea_id UUID REFERENCES public.product_ideas(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    format VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'generating', 'review', 'published', 'archived'
    price DECIMAL(10, 2) NOT NULL DEFAULT 29.00,
    currency VARCHAR(10) DEFAULT 'USD',
    content_json JSONB DEFAULT '{"sections": []}'::jsonb,
    branding_json JSONB DEFAULT '{}'::jsonb,
    cover_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Product Versions
CREATE TABLE IF NOT EXISTS public.product_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    version_number INT NOT NULL,
    content_json JSONB NOT NULL,
    file_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Product Assets
CREATE TABLE IF NOT EXISTS public.product_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    asset_type VARCHAR(50) NOT NULL, -- 'cover_art', 'pdf', 'worksheet', 'bonus'
    storage_path TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Storefronts
CREATE TABLE IF NOT EXISTS public.storefronts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    theme_json JSONB DEFAULT '{"primaryColor": "#4f46e5", "layout": "clean"}'::jsonb,
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Landing Pages
CREATE TABLE IF NOT EXISTS public.landing_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
    storefront_id UUID REFERENCES public.storefronts(id) ON DELETE SET NULL,
    page_json JSONB NOT NULL, -- structured page blocks: hero, benefits, modules, bio, faqs, cta
    published_url TEXT,
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'published'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_product_landing_page UNIQUE (product_id)
);

-- 10. Orders
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- the creator seller
    product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE RESTRICT,
    customer_email VARCHAR(255) NOT NULL,
    customer_name VARCHAR(255),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    payment_provider VARCHAR(50) DEFAULT 'stripe',
    payment_reference VARCHAR(255) UNIQUE, -- Stripe session_id or payment_intent_id
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'refunded', 'disputed'
    download_token UUID DEFAULT uuid_generate_v4() UNIQUE,
    download_expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '48 hours'),
    download_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Workflow Runs
CREATE TABLE IF NOT EXISTS public.workflow_runs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    workflow_type VARCHAR(100) NOT NULL, -- 'analyze_creator', 'generate_ideas', 'create_product', 'generate_landing_page'
    current_step VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'running', -- 'pending', 'running', 'paused_for_approval', 'completed', 'failed'
    state_json JSONB DEFAULT '{}'::jsonb,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. Workflow Tasks
CREATE TABLE IF NOT EXISTS public.workflow_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workflow_run_id UUID NOT NULL REFERENCES public.workflow_runs(id) ON DELETE CASCADE,
    task_name VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
    input_json JSONB DEFAULT '{}'::jsonb,
    output_json JSONB DEFAULT '{}'::jsonb,
    retry_count INT DEFAULT 0,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_creator_profiles_user ON public.creator_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_product_ideas_user ON public.product_ideas(user_id);
CREATE INDEX IF NOT EXISTS idx_products_user ON public.products(user_id);
CREATE INDEX IF NOT EXISTS idx_storefronts_slug ON public.storefronts(slug);
CREATE INDEX IF NOT EXISTS idx_orders_user ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_download_token ON public.orders(download_token);
CREATE INDEX IF NOT EXISTS idx_workflow_runs_user ON public.workflow_runs(user_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connected_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.creator_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.storefronts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.landing_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_tasks ENABLE ROW LEVEL SECURITY;

-- Creator access policies: Creators can only read and manage their own records
CREATE POLICY "Users manage own creator profile" ON public.creator_profiles
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own connected profiles" ON public.connected_profiles
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own creator analyses" ON public.creator_analyses
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own product ideas" ON public.product_ideas
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own products" ON public.products
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users view own product versions" ON public.product_versions
    FOR ALL USING (EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_versions.product_id AND p.user_id = auth.uid()));

CREATE POLICY "Users manage own product assets" ON public.product_assets
    FOR ALL USING (EXISTS (SELECT 1 FROM public.products p WHERE p.id = product_assets.product_id AND p.user_id = auth.uid()));

CREATE POLICY "Users manage own storefronts" ON public.storefronts
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own landing pages" ON public.landing_pages
    FOR ALL USING (EXISTS (SELECT 1 FROM public.products p WHERE p.id = landing_pages.product_id AND p.user_id = auth.uid()));

CREATE POLICY "Users view own orders" ON public.orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users manage own workflow runs" ON public.workflow_runs
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users manage own workflow tasks" ON public.workflow_tasks
    FOR ALL USING (EXISTS (SELECT 1 FROM public.workflow_runs w WHERE w.id = workflow_tasks.workflow_run_id AND w.user_id = auth.uid()));

-- Public policies: Anyone can view published landing pages and active storefronts
CREATE POLICY "Public read published landing pages" ON public.landing_pages
    FOR SELECT USING (status = 'published');

CREATE POLICY "Public read active storefronts" ON public.storefronts
    FOR SELECT USING (status = 'active');
