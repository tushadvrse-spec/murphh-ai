'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Lock,
  ArrowRight,
  BookOpen,
  ChevronDown,
  ChevronUp,
  FileText,
  Clock,
  Layers,
  Star,
} from 'lucide-react';
import {
  initialProduct,
  initialLandingPage,
  initialCreatorProfile,
} from '@/lib/mock-storage';
import { formatCurrency } from '@/lib/utils';

export default function PublicProductLandingPage() {
  const router = useRouter();
  const product = initialProduct;
  const page = initialLandingPage.page_json;
  const creator = initialCreatorProfile;

  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);

  const handleStartCheckout = () => {
    setShowCheckoutModal(true);
  };

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail) return;

    setIsCheckingOut(true);
    // In live mode, this calls /api/checkout to create a Stripe session.
    // For instant demonstration, it redirects to the secure customer download page!
    setTimeout(() => {
      setIsCheckingOut(false);
      router.push(`/download/d8e4f1a2-3b4c-4d5e-9f0a-1b2c3d4e5f60?email=${encodeURIComponent(customerEmail)}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-gray-900 font-sans antialiased">
      {/* Top Banner */}
      <div className="bg-indigo-900 text-indigo-100 text-xs py-2 px-4 text-center font-medium">
        <span>Instant Digital Access • Secure 256-Bit Encrypted Checkout</span>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          {page.heroBadge && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{page.heroBadge}</span>
            </div>
          )}

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-950 max-w-3xl mx-auto leading-tight">
            {page.headline}
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto font-normal leading-relaxed">
            {page.subheadline}
          </p>

          {/* Pricing & CTA Box */}
          <div className="pt-4 flex flex-col items-center justify-center gap-3">
            <button
              onClick={handleStartCheckout}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white text-base sm:text-lg font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>{page.ctaText}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 text-xs text-gray-500 font-medium">
              <span className="flex items-center gap-1">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                Stripe Verified
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                Instant Delivery
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-gray-600" />
                14-Day Guarantee
              </span>
            </div>
          </div>
        </div>

        {/* Product Visual Card / What's Included */}
        <div className="bg-white border border-gray-200/90 rounded-3xl p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                What You Get Inside
              </span>
              <h2 className="text-2xl font-bold text-gray-950 mt-1">
                The Complete {product.format.toUpperCase()} Package
              </h2>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-gray-400 block">Total Investment</span>
              <span className="text-2xl font-extrabold text-gray-900">
                {formatCurrency(product.price)}
              </span>
            </div>
          </div>

          {/* Key Deliverables Checkmarks */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Core Takeaways & Outcomes
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {page.whatYouWillLearn.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50/80 border border-gray-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-gray-800 font-medium leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Breakdown */}
          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Included Modules & Chapters
            </h3>
            <div className="space-y-3">
              {page.curriculumOverview.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-gray-200/70 hover:border-indigo-200 transition-colors bg-white">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 font-bold flex items-center justify-center text-xs shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Two Columns: Who is this for & Target Problems */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Who This Is Perfect For
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              {page.whoIsThisFor.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-indigo-600 font-bold shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-red-600">
              Sound Familiar?
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              {page.targetProblems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Creator Bio Section */}
        <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-2xs flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-indigo-600 text-white font-extrabold text-2xl flex items-center justify-center shrink-0 shadow-md">
            {creator.creator_name.slice(0, 2).toUpperCase()}
          </div>
          <div className="space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Meet the Creator
            </span>
            <h3 className="text-xl font-bold text-gray-950">{creator.creator_name}</h3>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-xl">
              {page.creatorBio}
            </p>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-2xs space-y-6">
          <div className="text-center max-w-md mx-auto space-y-1">
            <h3 className="text-2xl font-bold text-gray-950">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-gray-500">
              Everything you need to know about your purchase and access.
            </p>
          </div>

          <div className="space-y-3 divide-y divide-gray-100">
            {page.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="pt-3">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left py-2 flex items-center justify-between text-sm font-semibold text-gray-900"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                  </button>
                  {isOpen && (
                    <p className="text-xs sm:text-sm text-gray-600 mt-2 pb-2 leading-relaxed">
                      {faq.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Satisfaction Guarantee Banner */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2">
          <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
          <h4 className="text-base font-bold text-emerald-950">
            {page.guaranteeText}
          </h4>
          <p className="text-xs text-emerald-700 max-w-lg mx-auto">
            Try the frameworks. If you do not see a tangible difference in your focus and meeting reduction, simply reach out within 14 days for a prompt, courteous refund.
          </p>
        </div>

        {/* Final CTA Box */}
        <div className="text-center py-8 space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
            Reclaim Your Time Today
          </h3>
          <button
            onClick={handleStartCheckout}
            className="inline-flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white text-base sm:text-lg font-bold px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer"
          >
            <span>{page.ctaText}</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 border-t border-gray-200/60 pt-8 space-y-2">
          <p>© {new Date().getFullYear()} {creator.creator_name}. Powered by Murphh AI.</p>
          <div className="flex justify-center gap-4 text-[11px] text-gray-500">
            <Link href="#" className="hover:underline">Terms of Service</Link>
            <span>•</span>
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <span>•</span>
            <Link href="#" className="hover:underline">Refund Policy</Link>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                  M
                </div>
                <span className="font-bold text-sm text-gray-900">Secure Order</span>
              </div>
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-gray-950">{product.title}</h3>
              <p className="text-xs text-gray-500">Instant Digital Delivery via Email & Browser</p>
              <div className="pt-2 flex items-baseline justify-between">
                <span className="text-xs text-gray-400 uppercase font-semibold">Total Due</span>
                <span className="text-2xl font-black text-indigo-600">
                  {formatCurrency(product.price)}
                </span>
              </div>
            </div>

            <form onSubmit={handleCompleteOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Your Email Address (where product will be sent)
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="p-3 bg-gray-50 rounded-xl border border-gray-200 text-xs text-gray-600 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-gray-900">
                  <Lock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Test Checkout Mode</span>
                </div>
                <p className="text-[11px] text-gray-500">
                  Stripe Test integration active. Submitting will simulate a verified webhook and redirect immediately to the secure expiring download page.
                </p>
              </div>

              <button
                type="submit"
                disabled={isCheckingOut}
                className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold py-3 px-4 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>{isCheckingOut ? 'Processing Payment...' : `Complete Order - ${formatCurrency(product.price)}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
