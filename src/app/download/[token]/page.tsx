'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Download,
  BookOpen,
  Lock,
  Clock,
  Printer,
  Sparkles,
  ShieldCheck,
  FileText,
  ExternalLink,
} from 'lucide-react';
import {
  initialProduct,
  initialCreatorProfile,
  initialOrders,
} from '@/lib/mock-storage';
import { ProductDocumentPreview } from '@/components/pdf/ProductDocumentPreview';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function SecureCustomerDownloadPage() {
  const product = initialProduct;
  const creator = initialCreatorProfile;
  const order = initialOrders[0];

  const [downloadCount, setDownloadCount] = useState<number>(order.download_count);
  const [downloadMessage, setDownloadMessage] = useState<string>('');

  const handleDownload = () => {
    setDownloadCount((prev) => prev + 1);
    setDownloadMessage('Preparing your signed PDF download...');
    setTimeout(() => {
      window.print();
      setDownloadMessage('Download initiated! You can save or print your copy.');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-gray-900 font-sans antialiased py-10 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Receipt / Success Header */}
        <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Payment Confirmed • Verified Delivery
                </span>
                <h1 className="text-2xl font-extrabold text-gray-950 mt-0.5">
                  Thank You for Your Order!
                </h1>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-gray-400 block font-mono">Order Ref</span>
              <span className="text-xs font-mono font-bold text-gray-700">
                {order.payment_reference.slice(0, 16)}...
              </span>
            </div>
          </div>

          {/* Order Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-gray-50/70 p-4 rounded-2xl border border-gray-100">
            <div>
              <span className="text-gray-400 block uppercase font-medium text-[10px]">Product</span>
              <span className="font-bold text-gray-900 line-clamp-1">{product.title}</span>
            </div>
            <div>
              <span className="text-gray-400 block uppercase font-medium text-[10px]">Purchaser</span>
              <span className="font-semibold text-gray-800 truncate block">{order.customer_email}</span>
            </div>
            <div>
              <span className="text-gray-400 block uppercase font-medium text-[10px]">Amount Paid</span>
              <span className="font-bold text-emerald-600">{formatCurrency(order.amount)}</span>
            </div>
            <div>
              <span className="text-gray-400 block uppercase font-medium text-[10px]">Security</span>
              <span className="font-medium text-gray-600 flex items-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                Signed Token
              </span>
            </div>
          </div>

          {/* Download Action Box */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold text-indigo-900">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>Expiring Signed Access: Valid for 48 Hours</span>
              </div>
              <p className="text-xs text-indigo-700">
                Downloaded {downloadCount} time{downloadCount === 1 ? '' : 's'}. A permanent confirmation email has also been sent to your inbox.
              </p>
              {downloadMessage && (
                <p className="text-xs text-emerald-700 font-semibold mt-1">
                  {downloadMessage}
                </p>
              )}
            </div>

            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Playbook</span>
            </button>
          </div>
        </div>

        {/* Read Online / Embedded Document Preview */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-2">
            <div>
              <h2 className="text-lg font-bold text-gray-950 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" />
                <span>Read Online or Save Offline</span>
              </h2>
              <p className="text-xs text-gray-500">
                You can read your purchased playbook directly in your browser below:
              </p>
            </div>
          </div>

          <ProductDocumentPreview
            product={product}
            creatorName={creator.creator_name}
            onDownloadPdf={handleDownload}
          />
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 py-6 border-t border-gray-200">
          Need support or have questions? Email {creator.creator_name} at support@murphh.ai.
        </div>
      </div>
    </div>
  );
}
