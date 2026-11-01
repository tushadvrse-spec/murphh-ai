'use client';

import React from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  PlusCircle,
  Eye,
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Clock,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import {
  initialCreatorProfile,
  initialProduct,
  initialOrders,
  initialProductIdeas,
} from '@/lib/mock-storage';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function DashboardOverviewPage() {
  const totalRevenue = initialOrders.reduce((sum, order) => sum + order.amount, 0);
  const totalOrders = initialOrders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-medium border border-indigo-400/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Creator Studio Ready</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Welcome back, {initialCreatorProfile.creator_name}
          </h1>
          <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed">
            Your live playbook is converting at 4.2%. You have 2 validated product ideas ready to generate into sellable digital products in under 30 minutes.
          </p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/dashboard/discover"
              className="inline-flex items-center gap-2 bg-white text-indigo-950 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-indigo-50 transition-colors shadow-xs"
            >
              <PlusCircle className="w-4 h-4 text-indigo-600" />
              Generate Next Product
            </Link>
            <Link
              href="/elena/async-playbook"
              target="_blank"
              className="inline-flex items-center gap-2 bg-indigo-800/60 hover:bg-indigo-700/60 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl border border-indigo-400/30 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              View Live Storefront
            </Link>
          </div>
        </div>

        {/* Decorative ambient gradient circle */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium">
            <span>Total Sales Revenue</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {formatCurrency(totalRevenue)}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+18.4% this week</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium">
            <span>Completed Orders</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">{totalOrders}</p>
          <p className="text-xs text-gray-400 mt-1">Across 1 published product</p>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium">
            <span>Storefront Page Views</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">1,482</p>
          <p className="text-xs text-emerald-600 font-medium mt-1">4.2% visitor conversion</p>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium">
            <span>Average Order Value</span>
            <div className="p-2 rounded-lg bg-violet-50 text-violet-600">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900 mt-2">
            {formatCurrency(averageOrderValue)}
          </p>
          <p className="text-xs text-gray-400 mt-1">Digital playbook pricing</p>
        </div>
      </div>

      {/* Guided Creation Workflow Action Card */}
      <div className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Recommended Next Action
            </span>
            <h2 className="text-lg font-bold text-gray-950 mt-1">
              Publish Your Second Digital Product
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              The AI Strategy agent recommended &quot;The 4-Hour Deep Work Blueprint&quot; based on your recent audience comments.
            </p>
          </div>
          <Link
            href="/dashboard/discover"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0"
          >
            <span>Review Ideas & Start</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mini 5-step status */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4 text-xs">
          <div className="flex items-center gap-2 text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>1. Profile & Niche</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>2. Idea Validated</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>3. Product Generated</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-700 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>4. Landing Page Live</span>
          </div>
          <div className="flex items-center gap-2 text-indigo-700 font-semibold">
            <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
              5
            </div>
            <span>5. Generating Sales</span>
          </div>
        </div>
      </div>

      {/* Two Column Section: Products & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active & Draft Products */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">Your Digital Products</h3>
            <Link
              href="/dashboard/products"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              View all
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {/* Published Product Card */}
            <div className="bg-white border border-gray-200/80 rounded-xl p-5 hover:border-indigo-200 transition-colors shadow-2xs">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Published & Selling
                    </span>
                    <span className="text-xs text-gray-400 capitalize font-medium">
                      {initialProduct.format}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-gray-950">
                    {initialProduct.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-1">
                    {initialProduct.description}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-lg font-bold text-gray-900">
                    {formatCurrency(initialProduct.price)}
                  </p>
                  <p className="text-[11px] text-gray-400">3 modules • PDF</p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-gray-500">
                  <span>{initialOrders.length} sales</span>
                  <span>•</span>
                  <span>{formatCurrency(totalRevenue)} revenue</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/products/${initialProduct.id}/edit`}
                    className="font-medium text-gray-700 hover:text-indigo-600 px-2.5 py-1 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    Edit Content
                  </Link>
                  <Link
                    href="/elena/async-playbook"
                    target="_blank"
                    className="font-semibold text-indigo-600 hover:text-indigo-700 px-2.5 py-1 rounded-md hover:bg-indigo-50 transition-colors flex items-center gap-1"
                  >
                    Storefront
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Candidate Next Product */}
            <div className="bg-gray-50/70 border border-dashed border-gray-300 rounded-xl p-5 hover:bg-white hover:border-indigo-300 transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 text-indigo-700">
                    AI Recommended Idea
                  </span>
                  <h4 className="text-sm font-semibold text-gray-900 mt-1">
                    {initialProductIdeas[1].title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Suggested Price: {formatCurrency(initialProductIdeas[1].suggestedPrice)} • {initialProductIdeas[1].format}
                  </p>
                </div>
                <Link
                  href="/dashboard/discover"
                  className="text-xs font-semibold text-indigo-600 bg-white border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors shadow-2xs"
                >
                  Generate Outline
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900">Recent Customer Orders</h3>
            <Link
              href="/dashboard/analytics"
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-800"
            >
              See all
            </Link>
          </div>

          <div className="bg-white border border-gray-200/80 rounded-xl divide-y divide-gray-100 shadow-2xs">
            {initialOrders.map((order) => (
              <div key={order.id} className="p-4 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-gray-900 truncate max-w-[150px]">
                    {order.customer_name || order.customer_email}
                  </p>
                  <span className="text-xs font-semibold text-gray-900">
                    {formatCurrency(order.amount)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-400">
                  <span className="truncate max-w-[140px]">{order.customer_email}</span>
                  <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Delivered
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4 text-xs text-indigo-900 space-y-1">
            <p className="font-semibold flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600" />
              Automated Digital Delivery Active
            </p>
            <p className="text-[11px] text-indigo-700/80">
              When customers complete checkout, expiring signed download URLs are dispatched automatically via email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
