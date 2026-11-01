'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
  Edit3,
  CheckCircle,
  FileText,
  Target,
  BrainCircuit,
  Lightbulb,
} from 'lucide-react';
import { WorkflowProgressBar } from '@/components/workflow/WorkflowProgressBar';
import { initialCreatorProfile, initialCreatorAnalysis } from '@/lib/mock-storage';
import { analyzeCreatorAudience } from '@/lib/ai/agents/audience-intelligence';

export default function AudienceIntelligencePage() {
  const router = useRouter();
  const [profile, setProfile] = useState(initialCreatorProfile);
  const [analysis, setAnalysis] = useState(initialCreatorAnalysis.analysis_json);
  const [sampleInput, setSampleInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeCreatorAudience({
        creatorName: profile.creator_name,
        niche: profile.niche || '',
        bio: profile.bio || '',
        audienceDescription: profile.audience_description || '',
        sampleContent: sampleInput,
      });
      setAnalysis(result);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div>
      <WorkflowProgressBar
        currentStep="profile"
        stepStatusText="Audience Intelligence Agent has extracted your core themes and buyer pain points."
      />

      <div className="p-6 sm:p-8 lg:p-10 w-full space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-950">
              Creator Profile & Audience Intelligence
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Connect your content samples and let AI identify your audience’s most urgent, monetizable problems.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-2xs"
            >
              <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing Content...' : 'Re-Analyze Content'}</span>
            </button>
            <button
              onClick={() => router.push('/dashboard/discover')}
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
            >
              <span>Next: Discover Ideas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isSaved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Audience analysis updated and saved!</span>
          </div>
        )}

        {/* Input & Source Section */}
        <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b border-gray-200 pb-3">
            <FileText className="w-4 h-4 text-indigo-600" />
            <span>Content Ingestion & Profile Inputs</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Creator or Brand Name
              </label>
              <input
                type="text"
                value={profile.creator_name}
                onChange={(e) => setProfile({ ...profile, creator_name: e.target.value })}
                className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Core Niche or Industry
              </label>
              <input
                type="text"
                value={profile.niche || ''}
                onChange={(e) => setProfile({ ...profile, niche: e.target.value })}
                className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Creator Bio & Authority Markers
            </label>
            <textarea
              rows={2}
              value={profile.bio || ''}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Add Sample Content, Video Transcripts, or Viral Post Texts (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Paste newsletter excerpts, YouTube transcripts, popular threads, or common audience questions here to enrich the AI analysis..."
              value={sampleInput}
              onChange={(e) => setSampleInput(e.target.value)}
              className="w-full text-sm border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-gray-400 bg-white"
            />
          </div>
        </div>

        {/* AI Analysis Cards Grid */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
            <BrainCircuit className="w-4 h-4 text-indigo-600" />
            <span>Extracted Audience Intelligence Report</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Primary & Sub-Niches */}
            <div className="bg-white border border-gray-300 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Target Niche & Sub-Verticals
                </span>
                <span className="p-1 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100">
                  <Target className="w-3.5 h-3.5" />
                </span>
              </div>
              <h3 className="text-base font-bold text-gray-950">{analysis.niche}</h3>
              <div className="flex flex-wrap gap-2 pt-1">
                {analysis.subNiches.map((sub, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200"
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>

            {/* Main Themes */}
            <div className="bg-white border border-gray-300 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Core Content Themes
                </span>
                <span className="p-1 rounded-md bg-violet-50 text-violet-600 border border-violet-100">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-gray-700">
                {analysis.mainThemes.map((theme, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-600 mt-2 shrink-0" />
                    <span>{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Audience Core Problems */}
            <div className="bg-white border-2 border-red-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-red-700">
                  High-Friction Audience Problems
                </span>
                <span className="text-xs text-red-600 font-semibold bg-red-50 px-2 py-0.5 rounded-md border border-red-200">
                  Buyer pain points
                </span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-800">
                {analysis.commonAudienceProblems.map((problem, i) => (
                  <li key={i} className="flex items-start gap-2 bg-red-50/60 p-2.5 rounded-xl border border-red-200">
                    <span className="text-red-600 font-bold shrink-0">!</span>
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Monetization Opportunities */}
            <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Identified Monetization Angles
                </span>
                <span className="p-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-200">
                  <Lightbulb className="w-3.5 h-3.5" />
                </span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-800">
                {analysis.potentialMonetizationOpportunities.map((opp, i) => (
                  <li key={i} className="flex items-start gap-2 bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-200">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="font-semibold text-gray-900">{opp}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Step Progression CTA */}
        <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div>
            <h4 className="text-sm font-bold text-indigo-950">
              Ready to see your recommended product opportunities?
            </h4>
            <p className="text-xs text-indigo-700 mt-0.5">
              The Product Strategy Agent will match these pain points with downloadable formats and pricing models.
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard/discover')}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shrink-0 shadow-xs"
          >
            <span>Proceed to Step 2: Product Ideas</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
