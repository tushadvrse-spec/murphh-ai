'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  RefreshCw,
  Save,
  CheckCircle,
  Eye,
  DollarSign,
  ShieldCheck,
  HelpCircle,
  LayoutTemplate,
  ExternalLink,
} from 'lucide-react';
import { WorkflowProgressBar } from '@/components/workflow/WorkflowProgressBar';
import {
  initialProduct,
  initialLandingPage,
  initialCreatorProfile,
} from '@/lib/mock-storage';
import { LandingPageData } from '@/types/creator';
import { generateLandingPageCopy } from '@/lib/ai/agents/landing-page';
import { formatCurrency } from '@/lib/utils';

export default function LandingPageBuilderPage() {
  const router = useRouter();
  const [product, setProduct] = useState(initialProduct);
  const [pageData, setPageData] = useState<LandingPageData>(initialLandingPage.page_json);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    try {
      const freshCopy = await generateLandingPageCopy(
        product,
        initialCreatorProfile.creator_name,
        initialCreatorProfile.bio || ''
      );
      setPageData(freshCopy);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2500);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div>
      <WorkflowProgressBar
        currentStep="customize"
        stepStatusText="Customize your product landing page, pricing, and sales copy before publishing."
      />

      <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-950">
              Landing Page & Sales Copy Builder
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              AI generates structured, high-converting copy rendered securely through trusted templates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="inline-flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors border border-indigo-200/60"
            >
              <Sparkles className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>{isRegenerating ? 'Writing Sales Copy...' : 'Regenerate Copy with AI'}</span>
            </button>

            <button
              onClick={() => router.push(`/dashboard/products/${product.id}/publish`)}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-2xs"
            >
              <span>Next: Publish & Launch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isSaved && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Landing page configuration updated!</span>
          </div>
        )}

        {/* Pricing & Offer Settings */}
        <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b border-gray-200 pb-3">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>Pricing & Checkout Configuration</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Selling Price (USD)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-gray-400 font-bold">$</span>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) || 0 })}
                  className="w-full text-sm pl-8 pr-3.5 py-2.5 border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-bold bg-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Call-To-Action Button Label
              </label>
              <input
                type="text"
                value={pageData.ctaText}
                onChange={(e) => setPageData({ ...pageData, ctaText: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Hero Badge Tag
              </label>
              <input
                type="text"
                value={pageData.heroBadge || ''}
                onChange={(e) => setPageData({ ...pageData, heroBadge: e.target.value })}
                className="w-full text-sm px-3.5 py-2.5 border border-gray-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Hero Copy */}
        <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b border-gray-200 pb-3">
            <LayoutTemplate className="w-4 h-4 text-indigo-600" />
            <span>Primary Sales Headlines</span>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Headline
            </label>
            <input
              type="text"
              value={pageData.headline}
              onChange={(e) => setPageData({ ...pageData, headline: e.target.value })}
              className="w-full text-base font-bold text-gray-950 px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Subheadline
            </label>
            <textarea
              rows={2}
              value={pageData.subheadline}
              onChange={(e) => setPageData({ ...pageData, subheadline: e.target.value })}
              className="w-full text-sm text-gray-700 px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* What You Will Learn & Target Audience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600">
              Key Deliverables & Outcomes
            </label>
            <div className="space-y-2">
              {pageData.whatYouWillLearn.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 mt-2 shrink-0" />
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...pageData.whatYouWillLearn];
                      updated[i] = e.target.value;
                      setPageData({ ...pageData, whatYouWillLearn: updated });
                    }}
                    className="w-full text-xs text-gray-800 border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-hidden focus:border-indigo-500 bg-white"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-red-600">
              Target Problems Solved
            </label>
            <div className="space-y-2">
              {pageData.targetProblems.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-red-500 font-bold mt-1 shrink-0 text-xs">•</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...pageData.targetProblems];
                      updated[i] = e.target.value;
                      setPageData({ ...pageData, targetProblems: updated });
                    }}
                    className="w-full text-xs text-gray-800 border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-hidden focus:border-indigo-500 bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQs and Guarantee */}
        <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b border-gray-200 pb-3">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>Frequently Asked Questions & Guarantee</span>
          </div>

          <div className="space-y-3">
            {pageData.faqs.map((faq, i) => (
              <div key={i} className="p-3.5 bg-gray-50 rounded-xl space-y-2">
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) => {
                    const updated = [...pageData.faqs];
                    updated[i] = { ...updated[i], question: e.target.value };
                    setPageData({ ...pageData, faqs: updated });
                  }}
                  className="w-full text-xs font-bold text-gray-900 border border-gray-200 rounded-lg px-3 py-1.5 bg-white"
                />
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => {
                    const updated = [...pageData.faqs];
                    updated[i] = { ...updated[i], answer: e.target.value };
                    setPageData({ ...pageData, faqs: updated });
                  }}
                  className="w-full text-xs text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 bg-white"
                />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Guarantee Statement
            </label>
            <input
              type="text"
              value={pageData.guaranteeText}
              onChange={(e) => setPageData({ ...pageData, guaranteeText: e.target.value })}
              className="w-full text-xs text-gray-700 px-3.5 py-2.5 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 px-4 py-2.5 rounded-xl hover:bg-gray-50 transition-colors shadow-2xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Draft</span>
          </button>

          <button
            onClick={() => router.push(`/dashboard/products/${product.id}/publish`)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-2xs"
          >
            <span>Proceed to Step 5: Publish & Sell</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
