'use client';

import React from 'react';
import { Product } from '@/types/database';
import { Download, Printer, BookOpen, CheckCircle, Sparkles } from 'lucide-react';

interface ProductDocumentPreviewProps {
  product: Product;
  creatorName?: string;
  onDownloadPdf?: () => void;
}

export function ProductDocumentPreview({
  product,
  creatorName = 'Creator',
  onDownloadPdf,
}: ProductDocumentPreviewProps) {
  const handlePrint = () => {
    if (onDownloadPdf) {
      onDownloadPdf();
    } else {
      window.print();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Action Bar */}
      <div className="flex items-center justify-between bg-white border border-gray-300 rounded-xl px-5 py-3 mb-6 shadow-sm print:hidden">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span className="font-medium text-gray-900">{product.title}</span>
          <span className="text-gray-400">•</span>
          <span className="capitalize">{product.format} Format</span>
          <span className="text-gray-400">•</span>
          <span>{product.content_json.sections.length} Chapters</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-xs"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium px-3 py-2 rounded-lg transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>

      {/* Styled Printable Document Body */}
      <div className="bg-white border border-gray-300 shadow-md rounded-2xl p-8 sm:p-14 print:p-0 print:border-none print:shadow-none space-y-12 text-gray-900">
        {/* Cover / Title Page */}
        <div className="text-center py-16 border-b border-gray-200 print:min-h-[90vh] print:flex print:flex-col print:justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            {product.format.toUpperCase()} EDITION
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 max-w-2xl mx-auto leading-tight">
            {product.title}
          </h1>
          {product.content_json.tagline && (
            <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-xl mx-auto font-normal">
              {product.content_json.tagline}
            </p>
          )}

          <div className="mt-12 pt-8 border-t border-gray-100 max-w-xs mx-auto">
            <p className="text-xs uppercase tracking-wider text-gray-400 font-medium">Prepared by</p>
            <p className="text-base font-semibold text-gray-900 mt-1">{creatorName}</p>
            <p className="text-xs text-gray-500 mt-0.5">Published via Murphh AI</p>
          </div>
        </div>

        {/* Introduction */}
        {product.content_json.introduction && (
          <div className="prose max-w-none print:break-before-page">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 border-b pb-3 mb-4">
              Introduction
            </h2>
            <div className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
              {product.content_json.introduction}
            </div>
          </div>
        )}

        {/* Table of Contents */}
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 print:break-before-page">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-4">
            Table of Contents
          </h3>
          <div className="space-y-3">
            {product.content_json.sections.map((section, idx) => (
              <div key={section.id || idx} className="flex items-baseline justify-between text-sm">
                <span className="font-medium text-gray-800">
                  <span className="text-indigo-600 font-semibold mr-2">{idx + 1}.</span>
                  {section.title}
                </span>
                <span className="text-gray-400 text-xs font-mono">Module {idx + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Chapters / Sections */}
        <div className="space-y-12">
          {product.content_json.sections.map((section, idx) => (
            <section
              key={section.id || idx}
              className="border-t border-gray-100 pt-8 print:break-before-page"
            >
              <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-2">
                Chapter {idx + 1}
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-sm font-medium text-gray-500 italic mb-6">
                  {section.subtitle}
                </p>
              )}

              {/* Objectives Banner */}
              {section.learningObjectives && section.learningObjectives.length > 0 && (
                <div className="bg-indigo-50/60 border border-indigo-100/80 rounded-xl p-4 mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-800 mb-2">
                    Learning Objectives
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs text-indigo-950">
                    {section.learningObjectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Chapter Content */}
              <div className="prose prose-indigo max-w-none text-gray-700 leading-relaxed text-sm sm:text-base whitespace-pre-line">
                {section.content}
              </div>

              {/* Action Box */}
              {section.actionItems && section.actionItems.length > 0 && (
                <div className="mt-8 bg-gray-50 border-l-4 border-indigo-600 p-5 rounded-r-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                    Action Checklist
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-gray-600">
                    {section.actionItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-4 h-4 rounded border border-gray-300 bg-white shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Conclusion & Bonus Materials */}
        {product.content_json.conclusion && (
          <div className="border-t border-gray-100 pt-8 print:break-before-page">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-4">
              Final Words & Implementation
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">
              {product.content_json.conclusion}
            </div>
          </div>
        )}

        {product.content_json.bonusResources && product.content_json.bonusResources.length > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-3">
              Included Templates & Bonus Assets
            </h3>
            <ul className="space-y-2 text-sm text-indigo-600 font-medium">
              {product.content_json.bonusResources.map((res, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  {res}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 pt-8 border-t border-gray-100">
          © {new Date().getFullYear()} {creatorName}. All Rights Reserved. Created with Murphh AI.
        </div>
      </div>
    </div>
  );
}
