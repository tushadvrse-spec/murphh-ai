'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Store,
  ExternalLink,
  Globe,
  Palette,
  Sparkles,
  Save,
  CheckCircle,
} from 'lucide-react';
import { initialCreatorProfile, initialProduct } from '@/lib/mock-storage';

export default function StorefrontSettingsPage() {
  const [profile, setProfile] = useState(initialCreatorProfile);
  const [brandColor, setBrandColor] = useState(profile.brand_preferences.primaryColor || '#4f46e5');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="p-6 sm:p-10 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-950">
            Creator Storefront & Branding
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure your public creator profile, brand palette, and custom bio.
          </p>
        </div>

        <Link
          href="/elena/async-playbook"
          target="_blank"
          className="inline-flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl border border-indigo-200/60 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>View Public Storefront</span>
        </Link>
      </div>

      {isSaved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>Storefront branding updated!</span>
        </div>
      )}

      {/* Storefront Settings Form */}
      <div className="bg-white border border-gray-200/80 rounded-2xl p-6 shadow-2xs space-y-6">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 border-b border-gray-100 pb-3">
          <Palette className="w-4 h-4 text-indigo-600" />
          <span>Brand Identity & Visual Tone</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Storefront Name
            </label>
            <input
              type="text"
              value={profile.creator_name}
              onChange={(e) => setProfile({ ...profile, creator_name: e.target.value })}
              className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Public Handle / URL Slug
            </label>
            <div className="flex items-center">
              <span className="bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl px-3 py-2.5 text-xs text-gray-500 font-mono">
                murphh.ai/
              </span>
              <input
                type="text"
                defaultValue="elena"
                className="w-full text-sm border border-gray-200 rounded-r-xl px-3 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 font-mono"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Storefront Bio & Creator Manifesto
          </label>
          <textarea
            rows={3}
            value={profile.bio || ''}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            className="w-full text-sm border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-xs text-gray-400">
            Changes reflect immediately across all public product pages.
          </span>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-2xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Storefront</span>
          </button>
        </div>
      </div>
    </div>
  );
}
