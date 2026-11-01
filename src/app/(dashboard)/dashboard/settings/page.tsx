'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  Key,
  Shield,
  Save,
  CheckCircle,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { initialCreatorProfile } from '@/lib/mock-storage';

export default function SettingsPage() {
  const [profile, setProfile] = useState(initialCreatorProfile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-6 sm:p-10 max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-950">
          Account & Integration Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your payout account, connected AI services, and security preferences.
        </p>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Settings successfully updated!</span>
        </div>
      )}

      {/* Stripe Connect Card */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
          <CreditCard className="w-4 h-4 text-indigo-600" />
          <span>Payouts & Payment Gateway (Stripe Connect)</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-gray-50 border border-gray-200/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-gray-900">
                Stripe Express Connected
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Direct deposit active. Customer payments are deposited into your bank account after platform fee.
            </p>
          </div>

          <button
            onClick={() => alert('Opening Stripe Express Dashboard...')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 px-3.5 py-2 rounded-xl hover:bg-gray-100 transition-colors shadow-2xs shrink-0"
          >
            <span>Stripe Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* AI Engine & API Keys Card */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
          <Key className="w-4 h-4 text-indigo-600" />
          <span>AI Engine Configuration</span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-xl space-y-1">
            <span className="font-bold text-indigo-950">Multi-Model Orchestrator Active</span>
            <p className="text-indigo-800/80 leading-relaxed">
              Murphh AI routes content research to Gemini 2.5/3.8 Flash (fast, 1M context) and chapter generation to Claude 3.5 Sonnet / GPT-4o. You can configure your own BYOK (Bring Your Own Key) in <code className="font-mono text-indigo-900">.env.local</code>.
            </p>
          </div>
        </div>
      </div>

      {/* Security & Access */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
          <Shield className="w-4 h-4 text-emerald-600" />
          <span>Security & Row Level Isolation</span>
        </div>

        <p className="text-xs text-gray-600 leading-relaxed">
          PostgreSQL Row Level Security (RLS) policies are active. All customer transaction data, generated book chapters, and subscriber analytics are strictly isolated to your creator ID. Digital assets are served through signed single-use URLs.
        </p>
      </div>
    </div>
  );
}
