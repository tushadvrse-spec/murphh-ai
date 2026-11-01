'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle,
  Tag,
  AlertCircle,
  TrendingUp,
  Layers,
  BookOpen,
  FileCheck,
  Zap,
} from 'lucide-react';
import { WorkflowProgressBar } from '@/components/workflow/WorkflowProgressBar';
import { initialProductIdeas, initialCreatorAnalysis, initialCreatorProfile } from '@/lib/mock-storage';
import { ProductIdeaCard } from '@/types/creator';
import { generateProductIdeas } from '@/lib/ai/agents/product-strategy';
import { formatCurrency } from '@/lib/utils';

export default function DiscoverIdeasPage() {
  const router = useRouter();
  const [ideas, setIdeas] = useState<ProductIdeaCard[]>(initialProductIdeas);
  const [formatFilter, setFormatFilter] = useState<string>('all');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerateIdeas = async () => {
    setIsGenerating(true);
    try {
      const newIdeas = await generateProductIdeas(
        initialCreatorProfile.creator_name,
        initialCreatorAnalysis.analysis_json
      );
      setIdeas(newIdeas);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredIdeas = ideas.filter((idea) => {
    if (formatFilter === 'all') return true;
    return idea.format.toLowerCase() === formatFilter.toLowerCase();
  });

  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'ebook':
        return <BookOpen className="w-3.5 h-3.5" />;
      case 'playbook':
        return <Layers className="w-3.5 h-3.5" />;
      case 'checklist':
        return <FileCheck className="w-3.5 h-3.5" />;
      case 'prompt_pack':
        return <Zap className="w-3.5 h-3.5" />;
      default:
        return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  const handleSelectIdea = (idea: ProductIdeaCard) => {
    // In our guided flow, selecting an idea moves the creator to Step 3: Product Creation Studio
    router.push(`/dashboard/products/prod-1/edit?title=${encodeURIComponent(idea.title)}&format=${encodeURIComponent(idea.format)}`);
  };

  return (
    <div>
      <WorkflowProgressBar
        currentStep="ideas"
        stepStatusText="Select a recommended product idea to launch the Product Creation Agent."
      />

      <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-950">
              Digital Product Opportunities
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              AI-generated product concepts ranked by audience pain points, format velocity, and monetization confidence.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => router.push('/dashboard/audience')}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-2xs"
            >
              <span>Edit Niche & Content</span>
            </button>
            <button
              onClick={handleGenerateIdeas}
              disabled={isGenerating}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-2xs shrink-0"
            >
              <Sparkles className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>{isGenerating ? 'Analyzing Opportunities...' : 'Discover More Ideas'}</span>
            </button>
          </div>
        </div>

        {/* Active Niche & Source Context Banner */}
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-600" />
            <span className="text-gray-600">Currently analyzing niche:</span>
            <span className="font-bold text-indigo-950 bg-white px-2.5 py-1 rounded-lg border border-indigo-100 shadow-2xs">
              Productivity & Remote Work Systems
            </span>
          </div>
          <button
            onClick={() => router.push('/dashboard/audience')}
            className="text-indigo-600 hover:text-indigo-800 font-semibold underline underline-offset-2 flex items-center gap-1"
          >
            <span>Change niche or connect social content in Step 1 →</span>
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-gray-200/80 p-3 rounded-2xl shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 pl-2">
            <Filter className="w-3.5 h-3.5" />
            <span>Format:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {['all', 'playbook', 'ebook', 'checklist', 'prompt_pack', 'workbook'].map((fmt) => (
              <button
                key={fmt}
                onClick={() => setFormatFilter(fmt)}
                className={`text-xs px-3 py-1.5 rounded-xl capitalize font-medium transition-colors ${
                  formatFilter === fmt
                    ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200/60'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {fmt === 'prompt_pack' ? 'Prompt Pack' : fmt}
              </button>
            ))}
          </div>

          <div className="text-xs text-gray-400 pr-2">
            Showing {filteredIdeas.length} {filteredIdeas.length === 1 ? 'idea' : 'ideas'}
          </div>
        </div>

        {/* Product Idea Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredIdeas.map((idea) => (
            <div
              key={idea.id || idea.title}
              className="bg-white border border-gray-200/90 hover:border-indigo-300 rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 shadow-2xs hover:shadow-xs group"
            >
              <div className="space-y-4">
                {/* Header Tag & Price */}
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 uppercase tracking-wider">
                    {getFormatIcon(idea.format)}
                    <span>{idea.format.replace('_', ' ')}</span>
                  </span>

                  <div className="flex items-center gap-1 text-sm font-bold text-gray-900 bg-gray-50 px-2.5 py-1 rounded-lg border border-gray-100">
                    <Tag className="w-3.5 h-3.5 text-gray-400" />
                    <span>{formatCurrency(idea.suggestedPrice)}</span>
                  </div>
                </div>

                {/* Title & Audience */}
                <div>
                  <h3 className="text-lg font-bold text-gray-950 group-hover:text-indigo-600 transition-colors leading-snug">
                    {idea.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    <span className="font-semibold text-gray-700">For:</span> {idea.targetAudience}
                  </p>
                </div>

                {/* Problem & Value Prop */}
                <div className="bg-gray-50/70 rounded-xl p-3.5 space-y-2 text-xs border border-gray-100">
                  <div>
                    <span className="font-semibold text-gray-900 block text-[11px] uppercase tracking-wider text-gray-400 mb-0.5">
                      Problem Solved
                    </span>
                    <p className="text-gray-700">{idea.problemSolved}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 block text-[11px] uppercase tracking-wider text-gray-400 mb-0.5">
                      Value Proposition
                    </span>
                    <p className="text-gray-700">{idea.valueProposition}</p>
                  </div>
                </div>

                {/* Demand Evidence */}
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-[11px] uppercase tracking-wider">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Supporting Demand Signals</span>
                  </div>
                  <p className="text-gray-600 text-xs italic bg-emerald-50/40 p-2.5 rounded-lg border border-emerald-100/50">
                    &quot;{idea.demandEvidence}&quot;
                  </p>
                </div>

                {/* Evidence & Confidence Note */}
                {idea.limitations && (
                  <div className="flex items-start gap-1.5 text-[11px] text-amber-700 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/50">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{idea.limitations}</span>
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-gray-100">
                <button
                  onClick={() => handleSelectIdea(idea)}
                  className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-indigo-600 text-white text-xs font-semibold py-2.5 px-4 rounded-xl transition-all shadow-2xs"
                >
                  <span>Select & Build Product</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
