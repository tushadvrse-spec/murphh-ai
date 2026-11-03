import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  Zap,
  BookOpen,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers,
  BarChart3,
  ExternalLink,
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fafaf9] text-gray-950 font-sans antialiased selection:bg-gray-200">
      {/* Top Navbar */}
      <header className="border-b border-gray-200/80 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gray-950 flex items-center justify-center text-white font-bold text-sm shadow-xs">
              M
            </div>
            <span className="font-extrabold text-base tracking-tight text-gray-950">
              Murphh AI
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/elena/async-playbook"
              className="text-xs font-semibold text-gray-600 hover:text-gray-950 px-3 py-2 rounded-lg transition-colors hidden sm:block"
            >
              Sample Storefront
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-gray-950 hover:bg-black text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-xs"
            >
              <span>Launch Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 sm:pt-24 pb-16 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-300 text-gray-900 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The AI Creator Business Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-gray-950 max-w-4xl mx-auto leading-tight">
          Turn your content and expertise into digital products you can sell —{' '}
          <span className="text-gray-950 underline decoration-gray-400">in 30 minutes</span>.
        </h1>

        <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-normal">
          Connect your profile or content samples. Murphh AI discovers high-converting product opportunities, writes premium playbooks and guides, builds branded landing pages, and connects Stripe for instant fulfillment.
        </p>

        {/* Action CTAs */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/dashboard"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-950 hover:bg-black text-white text-base font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <span>Enter Creator Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/elena/async-playbook"
            target="_blank"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 text-base font-semibold px-6 py-3.5 rounded-2xl shadow-2xs transition-all"
          >
            <span>View Published Storefront</span>
            <ExternalLink className="w-4 h-4 text-gray-400" />
          </Link>
        </div>

        <div className="pt-2 flex items-center justify-center gap-6 text-xs text-gray-500 font-medium">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            No design or coding required
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Stripe payments ready
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Export styled PDFs
          </span>
        </div>
      </section>

      {/* 5-Step Guided Workflow Banner */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white border border-gray-300 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-950">
              The Guided 5-Step Creator Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              From raw content to your first paid order in approximately 30 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100 space-y-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-900 font-bold text-xs flex items-center justify-center">
                1
              </div>
              <h3 className="text-sm font-bold text-gray-900">Profile & Niche</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                AI analyzes your bios, posts, and audience comments to isolate high-leverage pain points.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100 space-y-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-900 font-bold text-xs flex items-center justify-center">
                2
              </div>
              <h3 className="text-sm font-bold text-gray-900">Idea Discovery</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Ranked product opportunity cards with target audience, suggested price, and demand signals.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100 space-y-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-900 font-bold text-xs flex items-center justify-center">
                3
              </div>
              <h3 className="text-sm font-bold text-gray-900">Create & Edit</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Section-by-section AI drafting, Notion-like distraction-free editor, and PDF export.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100 space-y-2">
              <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-900 font-bold text-xs flex items-center justify-center">
                4
              </div>
              <h3 className="text-sm font-bold text-gray-900">Landing Page</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                High-converting sales copy, FAQs, guarantee statements, and responsive mobile layouts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-gray-50/70 border border-gray-100 space-y-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">
                5
              </div>
              <h3 className="text-sm font-bold text-gray-900">Publish & Sell</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Stripe checkout, instant delivery emails, and signed expiring download fulfillment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} Murphh AI • The AI Creator Business Platform</p>
      </footer>
    </div>
  );
}
