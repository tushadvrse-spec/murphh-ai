'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  Save,
  Eye,
  Edit3,
  CheckCircle2,
  Plus,
  Trash2,
  Wand2,
  Layers,
  FileDown,
  RefreshCw,
  BookOpen,
} from 'lucide-react';
import { WorkflowProgressBar } from '@/components/workflow/WorkflowProgressBar';
import { initialProduct, initialCreatorProfile } from '@/lib/mock-storage';
import { Product, ProductSection } from '@/types/database';
import { rewriteContent, RewriteAction, generateSectionContent } from '@/lib/ai/agents/product-creation';
import { ProductDocumentPreview } from '@/components/pdf/ProductDocumentPreview';

export default function ProductEditorPage() {
  const router = useRouter();
  const [product, setProduct] = useState<Product>(initialProduct);
  const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'editor' | 'preview'>('editor');
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSaved, setLastSaved] = useState<string>('Just now');
  const [isRewriting, setIsRewriting] = useState<boolean>(false);
  const [rewriteStatus, setRewriteStatus] = useState<string>('');

  const activeSection: ProductSection = product.content_json.sections[activeSectionIndex] || {
    id: 'sec-new',
    title: 'Untitled Chapter',
    content: '',
    order: 1,
    learningObjectives: [],
    actionItems: [],
  };

  const handleUpdateSectionContent = (newContent: string) => {
    const updatedSections = [...product.content_json.sections];
    updatedSections[activeSectionIndex] = {
      ...updatedSections[activeSectionIndex],
      content: newContent,
    };
    setProduct({
      ...product,
      content_json: {
        ...product.content_json,
        sections: updatedSections,
      },
    });
    triggerAutosave();
  };

  const handleUpdateSectionField = (field: keyof ProductSection, val: unknown) => {
    const updatedSections = [...product.content_json.sections];
    updatedSections[activeSectionIndex] = {
      ...updatedSections[activeSectionIndex],
      [field]: val,
    };
    setProduct({
      ...product,
      content_json: {
        ...product.content_json,
        sections: updatedSections,
      },
    });
    triggerAutosave();
  };

  const triggerAutosave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSaved(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 600);
  };

  const handleAIRewrite = async (action: RewriteAction) => {
    if (!activeSection.content) return;
    setIsRewriting(true);
    setRewriteStatus(`AI is applying: ${action.replace('_', ' ')}...`);
    try {
      const rewritten = await rewriteContent(activeSection.content, action);
      handleUpdateSectionContent(rewritten);
      setRewriteStatus('Rewriting applied!');
      setTimeout(() => setRewriteStatus(''), 2500);
    } catch (e) {
      console.error(e);
      setRewriteStatus('Rewrite error');
    } finally {
      setIsRewriting(false);
    }
  };

  const handleAddSection = () => {
    const newSec: ProductSection = {
      id: `sec-${Date.now()}`,
      title: `Chapter ${product.content_json.sections.length + 1}: Implementation Strategy`,
      subtitle: 'Practical exercises and checklists',
      content: '### New Section\nEnter your section content here or use AI to generate it...',
      order: product.content_json.sections.length + 1,
      learningObjectives: ['Objective 1', 'Objective 2'],
      actionItems: ['Immediate action step'],
    };
    setProduct({
      ...product,
      content_json: {
        ...product.content_json,
        sections: [...product.content_json.sections, newSec],
      },
    });
    setActiveSectionIndex(product.content_json.sections.length);
    triggerAutosave();
  };

  const handleDeleteActiveSection = () => {
    if (product.content_json.sections.length <= 1) return;
    const filtered = product.content_json.sections.filter((_, i) => i !== activeSectionIndex);
    setProduct({
      ...product,
      content_json: {
        ...product.content_json,
        sections: filtered,
      },
    });
    setActiveSectionIndex(0);
    triggerAutosave();
  };

  return (
    <div>
      <WorkflowProgressBar
        currentStep="create"
        stepStatusText="Editing product content section-by-section. Outline approved and verified."
      />

      {/* Editor Sub-header */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 capitalize">
            {product.format} Studio
          </span>
          <span className="font-bold text-sm text-gray-900 truncate max-w-xs sm:max-w-md">
            {product.title}
          </span>
          <span className="text-gray-300">|</span>
          <span className="text-xs text-gray-400 flex items-center gap-1.5">
            <Save className={`w-3.5 h-3.5 ${isSaving ? 'text-amber-500 animate-pulse' : 'text-emerald-500'}`} />
            {isSaving ? 'Autosaving...' : `Saved at ${lastSaved}`}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 p-1 rounded-xl text-xs font-medium">
            <button
              onClick={() => setViewMode('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'editor' ? 'bg-white text-gray-900 shadow-2xs font-semibold' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Editor
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${
                viewMode === 'preview' ? 'bg-white text-gray-900 shadow-2xs font-semibold' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              PDF Preview
            </button>
          </div>

          <button
            onClick={() => router.push(`/dashboard/products/${product.id}/landing`)}
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors shadow-2xs"
          >
            <span>Next: Landing Page</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {viewMode === 'preview' ? (
        <div className="p-6 sm:p-10 bg-gray-100/60 min-h-[calc(100vh-130px)]">
          <ProductDocumentPreview
            product={product}
            creatorName={initialCreatorProfile.creator_name}
          />
        </div>
      ) : (
        <div className="flex min-h-[calc(100vh-130px)]">
          {/* Chapter / Module Sidebar Navigation */}
          <aside className="w-72 border-r border-gray-200 bg-white p-4 space-y-4 shrink-0 hidden md:block">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Chapters & Modules
              </span>
              <button
                onClick={handleAddSection}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-indigo-600 transition-colors"
                title="Add Section"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-1.5">
              {product.content_json.sections.map((sec, idx) => (
                <button
                  key={sec.id || idx}
                  onClick={() => setActiveSectionIndex(idx)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-colors flex items-start gap-2.5 ${
                    activeSectionIndex === idx
                      ? 'bg-indigo-50/80 text-indigo-900 font-semibold border border-indigo-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] shrink-0 font-bold ${
                      activeSectionIndex === idx ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <div className="truncate">
                    <p className="truncate">{sec.title}</p>
                    <p className="text-[10px] text-gray-400 font-normal">
                      {sec.subtitle || 'Chapter content'}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 text-[11px] text-gray-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>{product.content_json.sections.length} total chapters</span>
            </div>
          </aside>

          {/* Main Chapter Content Editor */}
          <div className="flex-1 p-6 sm:p-10 max-w-4xl mx-auto space-y-6">
            {/* AI Assistant Rewrite Toolbar */}
            <div className="bg-white border border-indigo-100/80 rounded-2xl p-4 shadow-2xs space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-900">
                  <Wand2 className="w-4 h-4 text-indigo-600" />
                  <span>AI Assistant Actions:</span>
                  {rewriteStatus && (
                    <span className="text-indigo-600 text-[11px] font-normal animate-pulse">
                      {rewriteStatus}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleAIRewrite('expand')}
                    disabled={isRewriting}
                    className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    + Expand Content
                  </button>
                  <button
                    onClick={() => handleAIRewrite('make_actionable')}
                    disabled={isRewriting}
                    className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    Make Actionable (Checklists)
                  </button>
                  <button
                    onClick={() => handleAIRewrite('summarize')}
                    disabled={isRewriting}
                    className="text-xs bg-violet-50 hover:bg-violet-100 text-violet-700 px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    Summarize Key Takeaways
                  </button>
                  <button
                    onClick={() => handleAIRewrite('simplify')}
                    disabled={isRewriting}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded-lg font-medium transition-colors"
                  >
                    Simplify Tone
                  </button>
                </div>
              </div>
            </div>

            {/* Chapter Header Form */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  Chapter {activeSectionIndex + 1}
                </span>
                {product.content_json.sections.length > 1 && (
                  <button
                    onClick={handleDeleteActiveSection}
                    className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete Chapter
                  </button>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Chapter Title
                </label>
                <input
                  type="text"
                  value={activeSection.title}
                  onChange={(e) => handleUpdateSectionField('title', e.target.value)}
                  className="w-full text-base font-bold text-gray-950 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Subtitle / Learning Goal
                </label>
                <input
                  type="text"
                  value={activeSection.subtitle || ''}
                  onChange={(e) => handleUpdateSectionField('subtitle', e.target.value)}
                  className="w-full text-xs text-gray-600 border border-gray-200 rounded-xl px-3.5 py-2 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Rich Markdown Editor Body */}
            <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-2xs space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                  Chapter Content (Markdown Supported)
                </label>
                <span className="text-[11px] text-gray-400">
                  Supports headers (###), bold, quotes (&gt;), and bullet points
                </span>
              </div>

              <textarea
                rows={16}
                value={activeSection.content}
                onChange={(e) => handleUpdateSectionContent(e.target.value)}
                className="w-full font-mono text-sm leading-relaxed text-gray-800 border border-gray-200 rounded-xl p-4 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
