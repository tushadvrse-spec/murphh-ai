import { z } from 'zod';

// ============================================================================
// AGENT 1: Audience Intelligence Agent Schemas
// ============================================================================
export const AudienceAnalysisSchema = z.object({
  niche: z.string().describe('The core niche or domain of the creator'),
  subNiches: z.array(z.string()).describe('Specific specialized sub-verticals'),
  mainThemes: z.array(z.string()).describe('Frequent topics and recurring ideas'),
  expertiseAreas: z.array(z.string()).describe('Core competencies and authority markers'),
  audienceInterests: z.array(z.string()).describe('What the audience cares deeply about'),
  commonAudienceProblems: z.array(z.string()).describe('Top pain points, bottlenecks, or obstacles'),
  potentialMonetizationOpportunities: z.array(z.string()).describe('High-leverage digital product opportunities'),
  audiencePersona: z.object({
    demographics: z.string().describe('Audience profile, experience level, context'),
    painPoints: z.array(z.string()),
    desires: z.array(z.string()),
    purchasingMotivations: z.array(z.string()),
  }),
});

export type AudienceAnalysis = z.infer<typeof AudienceAnalysisSchema>;

// ============================================================================
// AGENT 2: Product Strategy Agent Schemas
// ============================================================================
export const ProductIdeaCardSchema = z.object({
  id: z.string().optional(),
  user_id: z.string().optional(),
  title: z.string().describe('High-converting title of the digital product'),
  format: z.enum(['ebook', 'playbook', 'checklist', 'prompt_pack', 'workbook', 'course', 'template']),
  targetAudience: z.string().describe('Exact avatar who needs this'),
  problemSolved: z.string().describe('Specific acute problem this product fixes'),
  valueProposition: z.string().describe('Why this product is unique and worth buying'),
  demandEvidence: z.string().describe('Observations, market trends, or audience signals supporting demand'),
  suggestedPrice: z.number().describe('Recommended pricing in USD ($19 to $99 typical)'),
  confidence: z.enum(['high', 'medium', 'exploratory']),
  status: z.string().optional(),
  limitations: z.string().describe('Realistic constraints or prerequisite creator involvement'),
  created_at: z.string().optional(),
});

export const ProductStrategyOutputSchema = z.object({
  ideas: z.array(ProductIdeaCardSchema),
});

export type ProductIdeaCard = z.infer<typeof ProductIdeaCardSchema>;

// ============================================================================
// AGENT 3: Product Creation Agent Schemas
// ============================================================================
export const OutlineSectionSchema = z.object({
  id: z.string(),
  title: z.string(),
  subtitle: z.string().optional(),
  learningObjectives: z.array(z.string()),
  keyPoints: z.array(z.string()),
  actionExercise: z.string().optional(),
});

export const ProductOutlineSchema = z.object({
  title: z.string(),
  tagline: z.string(),
  targetAudience: z.string(),
  introductionSummary: z.string(),
  sections: z.array(OutlineSectionSchema),
  conclusionSummary: z.string(),
});

export const GeneratedSectionContentSchema = z.object({
  sectionId: z.string(),
  title: z.string(),
  contentMarkdown: z.string().describe('Comprehensive, engaging section content in rich markdown with examples and exercises'),
  actionItems: z.array(z.string()),
  summaryCallout: z.string(),
});

export type ProductOutline = z.infer<typeof ProductOutlineSchema>;
export type GeneratedSectionContent = z.infer<typeof GeneratedSectionContentSchema>;

// ============================================================================
// AGENT 5: Landing Page Agent Schemas
// ============================================================================
export const LandingPageSchema = z.object({
  headline: z.string().describe('Compelling, benefit-driven primary headline'),
  subheadline: z.string().describe('Clarity-focused secondary statement explaining how and for whom'),
  ctaText: z.string().describe('Action-oriented CTA button label, e.g. "Get Instant Access - $29"'),
  heroBadge: z.string().optional().describe('Badge like "Top Rated Playbook" or "Instant Digital Download"'),
  whatYouWillLearn: z.array(z.string()).describe('4-6 tangible outcomes/takeaways'),
  whoIsThisFor: z.array(z.string()).describe('Target audience profile qualifications'),
  targetProblems: z.array(z.string()).describe('Pain points addressed directly'),
  creatorBio: z.string().describe('Author credentials and message to the reader'),
  curriculumOverview: z.array(z.object({
    title: z.string(),
    description: z.string(),
  })),
  faqs: z.array(z.object({
    question: z.string(),
    answer: z.string(),
  })),
  guaranteeText: z.string().describe('14-day or 30-day satisfaction guarantee guarantee statement'),
});

export type LandingPageData = z.infer<typeof LandingPageSchema>;

// ============================================================================
// Persistent Workflow Step Navigation
// ============================================================================
export type WorkflowStep = 'profile' | 'ideas' | 'create' | 'customize' | 'publish';

export interface WorkflowProgressState {
  currentStep: WorkflowStep;
  completedSteps: WorkflowStep[];
  productId?: string;
  hasUnsavedChanges?: boolean;
}
