'use client';

import React from 'react';
import Link from 'next/link';
import {
  DollarSign,
  ShoppingBag,
  TrendingUp,
  Eye,
  CheckCircle2,
  Calendar,
  Download,
  CreditCard,
  Layers,
  ArrowUpRight,
  ExternalLink,
} from 'lucide-react';
import {
  initialOrders,
  initialProduct,
  initialCreatorProfile,
} from '@/lib/mock-storage';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function AnalyticsPage() {
  const totalRevenue = initialOrders.reduce((sum, o) => sum + o.amount, 0);
  const totalOrders = initialOrders.length;
  const pageViews = 1482;
  const conversionRate = ((totalOrders / pageViews) * 100).toFixed(1);

  return (
    <div className="p-6 sm:p-10 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-950">
            Sales & Commerce Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Real-time transaction tracking, customer receipts, and product conversion performance.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Stripe Webhooks Live</span>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold uppercase tracking-wider">
            <span>Gross Revenue</span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-2">
            {formatCurrency(totalRevenue)}
          </p>
          <div className="flex items-center gap-1 text-xs text-emerald-600 font-medium mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+100% since publishing</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold uppercase tracking-wider">
            <span>Paid Customer Orders</span>
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-2">
            {totalOrders}
          </p>
          <p className="text-xs text-gray-400 mt-1">0 refunds / 0 disputes</p>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold uppercase tracking-wider">
            <span>Visitor Conversion</span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-600">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-2">
            {conversionRate}%
          </p>
          <p className="text-xs text-emerald-600 font-medium mt-1">
            {totalOrders} buyers / {pageViews} visitors
          </p>
        </div>

        <div className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-400 text-xs font-semibold uppercase tracking-wider">
            <span>Time-To-Product</span>
            <div className="p-2 rounded-lg bg-violet-50 text-violet-600">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-gray-950 mt-2">
            24 mins
          </p>
          <p className="text-xs text-gray-400 mt-1">Idea to first live sale</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-gray-200/80 rounded-2xl shadow-2xs overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-4">
          <div>
            <h3 className="text-base font-bold text-gray-950">Customer Order Ledger</h3>
            <p className="text-xs text-gray-500">
              Verified Stripe checkout transactions with automated expiring download fulfillment.
            </p>
          </div>
          <span className="text-xs text-gray-400 font-medium">
            Showing {initialOrders.length} transactions
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 uppercase font-semibold text-[10px] tracking-wider">
                <th className="py-3 px-3">Customer</th>
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Payment Provider</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {initialOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="py-3.5 px-3">
                    <p className="font-bold text-gray-950">{order.customer_name || 'Customer'}</p>
                    <p className="text-gray-400 text-[11px] font-mono">{order.customer_email}</p>
                  </td>
                  <td className="py-3.5 px-3 font-medium text-gray-900 max-w-xs truncate">
                    {initialProduct.title}
                  </td>
                  <td className="py-3.5 px-3 text-gray-500">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="py-3.5 px-3 font-bold text-gray-900">
                    {formatCurrency(order.amount)}
                  </td>
                  <td className="py-3.5 px-3 font-mono text-gray-500 text-[11px]">
                    Stripe ({order.payment_reference.slice(0, 10)}...)
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" />
                      Paid & Delivered
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right">
                    <Link
                      href={`/download/${order.download_token}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-800 text-[11px]"
                    >
                      <span>Delivery Page</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
