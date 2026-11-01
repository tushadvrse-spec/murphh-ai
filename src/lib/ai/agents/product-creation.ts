import { generateObject, generateText } from 'ai';
import { getWritingModel } from '../config';
import {
  ProductOutlineSchema,
  GeneratedSectionContentSchema,
  ProductOutline,
  GeneratedSectionContent,
  ProductIdeaCard,
} from '@/types/creator';

export async function generateProductOutline(
  creatorName: string,
  idea: ProductIdeaCard
): Promise<ProductOutline> {
  const model = getWritingModel();

  if (model) {
    try {
      const prompt = `
You are the Product Creation Agent for the AI Creator Business Platform.
Generate a structured, modular outline for a premium digital product.

Creator Name: ${creatorName}
Product Title: ${idea.title}
Format: ${idea.format}
Target Audience: ${idea.targetAudience}
Problem Solved: ${idea.problemSolved}
Value Proposition: ${idea.valueProposition}

Generate an outline with:
- Catchy, punchy tagline
- Clear target audience summary
- Short introduction summary
- 3 to 5 logical sections/modules. For each section, include:
  * Unique ID (e.g. "sec-1", "sec-2")
  * Engaging title and descriptive subtitle
  * 3 key learning objectives
  * 3 key discussion points / subsections
  * A practical action exercise or checklist for the reader
- A motivating conclusion summary

Ensure each section is self-contained so it can be generated cleanly section-by-section.
`;

      const result = await generateObject({
        model,
        schema: ProductOutlineSchema,
        prompt,
      });

      return result.object;
    } catch (err) {
      console.warn('AI outline generation failed, using structured template:', err);
    }
  }

  // Fallback high-yield outline
  return {
    title: idea.title,
    tagline: `The definitive practical guide to solving ${idea.problemSolved.toLowerCase()}`,
    targetAudience: idea.targetAudience,
    introductionSummary: `Why standard approaches fail and how this systematic framework gives you clarity, speed, and dependable results.`,
    sections: [
      {
        id: 'sec-1',
        title: 'Module 1: The Foundation & Baseline Audit',
        subtitle: 'Diagnosing the current friction points before building solutions',
        learningObjectives: [
          'Identify hidden bottlenecks in your current workflow',
          'Calculate the actual cost of unoptimized routines',
          'Establish a clean baseline metric for tracking progress',
        ],
        keyPoints: [
          'The 3 critical mistakes 90% of beginners make',
          'How to run a 15-minute friction audit',
          'Setting clear boundaries and success criteria',
        ],
        actionExercise: 'Complete the self-diagnostic checklist and note your top 2 priority areas.',
      },
      {
        id: 'sec-2',
        title: 'Module 2: The Core Framework & Implementation',
        subtitle: 'Step-by-step tactical execution with zero fluff',
        learningObjectives: [
          'Implement the core system in under 60 minutes',
          'Configure your digital workspace for minimal distraction',
          'Automate or eliminate repetitive low-value steps',
        ],
        keyPoints: [
          'The 4-step implementation sequence',
          'Real-world case studies and before/after comparisons',
          'Pre-built scripts and templates to copy immediately',
        ],
        actionExercise: 'Execute Step 1 of the sequence and customize the master template for your needs.',
      },
      {
        id: 'sec-3',
        title: 'Module 3: Advanced Optimization & Long-Term Mastery',
        subtitle: 'Maintaining consistency, troubleshooting friction, and scaling up',
        learningObjectives: [
          'Diagnose edge cases when routine disruptions occur',
          'Build sustainable weekly check-in habits',
          'Compound your daily output over 30, 60, and 90 days',
        ],
        keyPoints: [
          'The 10-minute Sunday reset ritual',
          'Troubleshooting guide for unexpected roadblocks',
          'Next steps and recommended tools for ongoing momentum',
        ],
        actionExercise: 'Schedule a recurring 15-minute weekly review block on your calendar.',
      },
    ],
    conclusionSummary: 'Consistency beats intensity. Review your key takeaways, celebrate early wins, and continue executing your customized system.',
  };
}

export async function generateSectionContent(
  productTitle: string,
  section: {
    id: string;
    title: string;
    subtitle?: string;
    learningObjectives: string[];
    keyPoints: string[];
    actionExercise?: string;
  },
  creatorName: string
): Promise<GeneratedSectionContent> {
  const model = getWritingModel();

  if (model) {
    try {
      const prompt = `
You are the Product Creation Agent writing a section for the digital product "${productTitle}" by ${creatorName}.
Write the complete, highly engaging, and actionable section content in rich Markdown.

Section Title: ${section.title}
Subtitle: ${section.subtitle || ''}
Key Learning Objectives: ${section.learningObjectives.join('; ')}
Key Points to Cover: ${section.keyPoints.join('; ')}
Action Exercise: ${section.actionExercise || 'None'}

Style guidelines:
- Tone: authoritative, empathetic, practical, and punchy (no filler buzzwords).
- Use clear subheadings (###), bullet points, blockquotes (>) for golden rules, and bold emphasis.
- Provide concrete examples, scripts, or step-by-step instructions.
- Provide a summary callout and 2-3 specific action items for the reader.
`;

      const result = await generateObject({
        model,
        schema: GeneratedSectionContentSchema,
        prompt,
      });

      return result.object;
    } catch (err) {
      console.warn('AI section writing failed, falling back to rich boilerplate:', err);
    }
  }

  // Fallback rich section content
  const markdown = `### ${section.title}
*${section.subtitle || 'Tactical guide and implementation'}*

#### Core Principles
To make meaningful progress in this area, you must shift your mindset from reactive scrambling to proactive system design. Most people fail not because they lack motivation, but because their friction points are unaddressed.

${section.keyPoints.map((point) => `- **${point}**: Clear execution requires zero ambiguity. Break this down into repeatable micro-actions rather than one overwhelming task.`).join('\n\n')}

> **Key Rule**: "Systems create freedom. When you don't have to decide what to do next, you preserve mental energy for high-leverage execution."

#### Step-by-Step Walkthrough
1. **Prepare Your Environment**: Clear all extraneous tabs and distractions before starting.
2. **Apply the Framework**: Follow the prescribed steps in sequence without skipping ahead.
3. **Verify Output**: Check your progress against the objective criteria before moving to the next module.

#### Practical Action Exercise
${section.actionExercise || 'Review the core points above and write down your immediate next step.'}
`;

  return {
    sectionId: section.id,
    title: section.title,
    contentMarkdown: markdown,
    actionItems: [
      'Read through the core principles and highlight what applies to your current setup',
      'Complete the action exercise before moving to the next module',
      'Share your initial findings or takeaways with your accountability partner'
    ],
    summaryCallout: `Mastering ${section.title} provides the bedrock for all subsequent improvements. Stay disciplined with the action exercise.`,
  };
}

export type RewriteAction = 'expand' | 'summarize' | 'make_actionable' | 'simplify';

export async function rewriteContent(
  text: string,
  action: RewriteAction
): Promise<string> {
  const model = getWritingModel();

  const instructions: Record<RewriteAction, string> = {
    expand: 'Expand on the concepts in this text, adding realistic examples, nuance, and tactical depth without fluff.',
    summarize: 'Condense this text into crisp, high-impact bullet points and core takeaways.',
    make_actionable: 'Rewrite this text into immediate step-by-step instructions, checklist items, and copy-paste templates.',
    simplify: 'Simplify the language, eliminate unnecessary jargon, and make it engaging and accessible for a general audience.',
  };

  if (model) {
    try {
      const response = await generateText({
        model,
        prompt: `${instructions[action]}\n\nOriginal Text:\n${text}`,
      });
      return response.text;
    } catch (err) {
      console.warn('AI rewrite failed:', err);
    }
  }

  if (action === 'summarize') {
    return `### Key Takeaways\n- ${text.split('. ').slice(0, 3).join('.\n- ')}.`;
  }
  if (action === 'make_actionable') {
    return `### Action Checklist\n1. Review: ${text.slice(0, 80)}...\n2. Implement immediately in your daily workflow.\n3. Verify your results.`;
  }
  return text;
}
