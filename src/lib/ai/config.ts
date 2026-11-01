import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';

export const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
});

export const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Primary fast & cost-efficient model for content extraction & idea generation
export function getAnalysisModel() {
  if (process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return google('gemini-2.5-flash');
  }
  if (process.env.OPENAI_API_KEY) {
    return openai('gpt-4o-mini');
  }
  return null;
}

// Creative & long-form writing model for chapters and landing page copywriting
export function getWritingModel() {
  if (process.env.OPENAI_API_KEY) {
    return openai('gpt-4o');
  }
  if (process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return google('gemini-2.5-pro');
  }
  return null;
}
