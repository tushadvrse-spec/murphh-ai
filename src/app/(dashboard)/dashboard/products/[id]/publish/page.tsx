'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  CheckCircle,
  ExternalLink,
  Copy,
  Check,
  Globe,
  CreditCard,
  DownloadCloud,
  ArrowRight,
  ShieldAlert,
  ShoppingBag,
} from 'lucide-react';
import { WorkflowProgressBar } from '@/components/workflow/WorkflowProgressBar';
import { initialProduct, initialCreatorProfile } from '@/lib/mock-storage';
import { formatCurrency } from '@/lib/utils';

export default function PublishProductPage() {
  const router = useRouter();
  const [product, setProduct] = useState(initialProduct);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(product.status);

  const publicUrl = `/elena/async-playbook`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + publicUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleTogglePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      const nextStatus = status === 'published' ? 'draft' : 'published';
      setStatus(nextStatus);
      setProduct({ ...product, status: nextStatus });
      setIsPublishing(false);
    }, 500);
  };

  return (
    <div>
      <WorkflowProgressBar
        currentStep="publish"
        stepStatusText="Your product is ready to publish. Payment processing and automated digital fulfillment are configured."
      />

      <div className="p-6 sm:p-8 lg:p-10 w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Ready for Launch</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-950">
              Publish & Launch Your Product
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Your digital product and branded landing page are compiled and ready to accept customer orders.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTogglePublish}
              disabled={isPublishing}
              className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl transition-all shadow-2xs ${
                status === 'published'
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <CheckCircle className="w-4 h-4" />
              <span>{isPublishing ? 'Updating...' : status === 'published' ? 'Product is Live' : 'Publish Now'}</span>
            </button>
          </div>
        </div>

        {/* Live Storefront URL Card */}
        <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b border-gray-200 pb-3">
            <Globe className="w-4 h-4 text-indigo-600" />
            <span>Public Storefront Link</span>
          </div>

          <p className="text-xs text-gray-500">
            Share this link with your audience across Twitter, YouTube, Instagram bio, or newsletter:
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <div className="flex-1 bg-gray-50 border border-gray-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-mono text-gray-800 truncate">
              {typeof window !== 'undefined' ? window.location.origin : 'https://murphh.ai'}
              {publicUrl}
            </div>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-2xs"
            >
              {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{isCopied ? 'Copied!' : 'Copy Link'}</span>
            </button>

            <Link
              href={publicUrl}
              target="_blank"
              className="inline-flex items-center justify-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2.5 rounded-xl text-xs font-semibold transition-colors border border-indigo-200"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Visit Page</span>
            </Link>
          </div>
        </div>

        {/* Verification Checkpoints */}
        <div className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900 border-b border-gray-200 pb-3">
            Pre-Flight System Verification
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-gray-50 rounded-xl space-y-1.5 border border-gray-100">
              <div className="flex items-center gap-2 font-bold text-gray-900">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Product Content Verified</span>
              </div>
              <p className="text-gray-500 text-[11px]">
                3 chapters formatted, action items included, printable PDF generated.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl space-y-1.5 border border-gray-100">
              <div className="flex items-center gap-2 font-bold text-gray-900">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Payment Processing Ready</span>
              </div>
              <p className="text-gray-500 text-[11px]">
                Stripe Checkout configured at {formatCurrency(product.price)} with instant webhook receipt.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl space-y-1.5 border border-gray-100">
              <div className="flex items-center gap-2 font-bold text-gray-900">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Automated Fulfillment Active</span>
              </div>
              <p className="text-gray-500 text-[11px]">
                Secure 48-hour expiring signed download links created upon verified payment.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl space-y-1.5 border border-gray-100">
              <div className="flex items-center gap-2 font-bold text-gray-900">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Creator Storefront Linked</span>
              </div>
              <p className="text-gray-500 text-[11px]">
                Indexed under @{initialCreatorProfile.creator_name.toLowerCase().replace(' ', '')} storefront.
              </p>
            </div>
          </div>
        </div>

        {/* Test Order Simulator */}
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                Creator Test Tool
              </span>
              <h4 className="text-sm font-bold text-indigo-950">
                Simulate a Customer Purchase & Test Delivery
              </h4>
              <p className="text-xs text-indigo-700/90">
                Test the complete checkout confirmation, webhook simulation, and expiring download page as an end customer.
              </p>
            </div>

            <Link
              href="/download/d8e4f1a2-3b4c-4d5e-9f0a-1b2c3d4e5f60"
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0 shadow-2xs"
            >
              <DownloadCloud className="w-4 h-4" />
              <span>Test Download Page</span>
            </Link>
          </div>
        </div>

        {/* Return to Dashboard */}
        <div className="text-center pt-4">
          <Link
            href="/dashboard"
            className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Return to Creator Dashboard Overview
          </Link>
        </div>
      </div>
    </div>
  );
}
