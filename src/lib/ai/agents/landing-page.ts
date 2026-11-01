import { generateObject } from 'ai';
import { getWritingModel } from '../config';
import { LandingPageSchema, LandingPageData } from '@/types/creator';
import { Product } from '@/types/database';

export async function generateLandingPageCopy(
  product: Product,
  creatorName: string,
  creatorBio?: string
): Promise<LandingPageData> {
  const model = getWritingModel();

  if (model) {
    try {
      const prompt = `
You are the Landing Page Agent for the AI Creator Business Platform.
Create high-converting, honest, and persuasive structured landing page copy for a digital product.

Product Title: ${product.title}
Format: ${product.format}
Price: $${product.price} ${product.currency}
Creator: ${creatorName}
Creator Bio: ${creatorBio || 'Expert and educator'}
Product Content Summary:
Tagline: ${product.content_json.tagline || ''}
Modules / Sections: ${product.content_json.sections.map((s) => s.title).join(', ')}

Guidelines:
- Benefit-driven, compelling headline that hooks the exact target buyer.
- Subheadline that explains the transformation and format.
- Action-oriented CTA text (e.g. "Get Instant Access - $${product.price}").
- 4 to 6 specific, tangible takeaways ("What you will learn").
- 3 clear target audience criteria ("Who is this for").
- 3 acute pain points the reader is struggling with right now ("Target problems").
- Concise curriculum/module breakdown.
- 3 to 4 realistic FAQs addressing common objections (format, difficulty, guarantee).
- Strong risk-reversal guarantee statement.
`;

      const result = await generateObject({
        model,
        schema: LandingPageSchema,
        prompt,
      });

      return result.object;
    } catch (err) {
      console.warn('AI landing page generation failed, falling back to structured copy:', err);
    }
  }

  // Fallback high-converting structured landing page data
  return {
    headline: `Transform How You Approach ${product.title}. Fast, Practical, and Proven.`,
    subheadline: product.content_json.tagline || `The complete ${product.format} and implementation framework by ${creatorName}.`,
    ctaText: `Get Instant Access - $${product.price}`,
    heroBadge: `Instant Digital Download • Includes All Templates`,
    whatYouWillLearn: [
      `A clear, step-by-step roadmap to eliminate guesswork`,
      `Practical templates and swipe files you can deploy immediately`,
      `Common pitfalls and mistakes to avoid from day one`,
      `Real-world frameworks used by top practitioners in the space`,
    ],
    whoIsThisFor: [
      `Busy professionals who need actionable results without fluff`,
      `Individuals ready to implement a structured, repeatable system`,
      `Anyone looking to save hours of trial and error`,
    ],
    targetProblems: [
      `Wasting hours on unstructured, inconsistent routines`,
      `Information overload from conflicting online advice`,
      `Lack of clear templates and plug-and-play resources`,
    ],
    creatorBio: creatorBio || `${creatorName} has spent years mastering this domain, sharing actionable insights and frameworks with thousands of learners worldwide.`,
    curriculumOverview: product.content_json.sections.map((sec) => ({
      title: sec.title,
      description: sec.subtitle || 'Tactical frameworks, real-world examples, and guided action exercises.',
    })),
    faqs: [
      {
        question: 'When and how do I receive the product?',
        answer: 'Immediately upon checkout! You will be redirected to your personal access page with a secure download link, and a copy will be emailed directly to your inbox.',
      },
      {
        question: 'What format does the material come in?',
        answer: `You receive a high-resolution, beautifully formatted digital PDF guide, plus any companion templates and checklists.`,
      },
      {
        question: 'Is there a money-back guarantee?',
        answer: 'Yes! We offer a 14-day 100% money-back guarantee. If you go through the materials and feel it did not deliver value, simply reply to your receipt email.',
      },
    ],
    guaranteeText: '14-Day 100% Satisfaction Guarantee — Zero Risk to You.',
  };
}
