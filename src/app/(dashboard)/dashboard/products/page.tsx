'use client';

import React from 'react';
import Link from 'next/link';
import {
  PlusCircle,
  ExternalLink,
  Edit3,
  Layers,
  BookOpen,
  FileCheck,
  Zap,
  Tag,
  ArrowRight,
} from 'lucide-react';
import { initialProduct, initialProductIdeas } from '@/lib/mock-storage';
import { formatCurrency, formatDate } from '@/lib/utils';

export default function ProductsListPage() {
  const products = [initialProduct];

  return (
    <div className="p-6 sm:p-8 lg:p-10 w-full space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-950">
            My Digital Products
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage your ebooks, playbooks, checklists, and prompt packs.
          </p>
        </div>

        <Link
          href="/dashboard/discover"
          className="inline-flex items-center gap-2 bg-gray-950 hover:bg-black text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-2xs shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create New Product</span>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white border border-gray-300 rounded-2xl p-6 shadow-sm hover:border-gray-500 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-300 capitalize">
                    {product.status}
                  </span>
                  <span className="text-xs text-gray-500 capitalize font-medium">
                    {product.format} Format
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-950">{product.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-xs text-gray-400 block uppercase font-medium">Price</span>
                <span className="text-2xl font-extrabold text-gray-950">
                  {formatCurrency(product.price)}
                </span>
                <span className="text-xs text-gray-400 block mt-0.5">
                  {product.content_json.sections.length} chapters
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-gray-400">
                Last updated {formatDate(product.updated_at)}
              </span>

              <div className="flex items-center gap-2">
                <Link
                  href={`/dashboard/products/${product.id}/edit`}
                  className="inline-flex items-center gap-1.5 font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors border border-gray-200"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  Edit Studio
                </Link>

                <Link
                  href={`/dashboard/products/${product.id}/landing`}
                  className="inline-flex items-center gap-1.5 font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-lg transition-colors border border-gray-200"
                >
                  <span>Landing Page</span>
                </Link>

                <Link
                  href={product.slug ? `/elena/${product.slug}` : '/elena/async-playbook'}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 font-semibold text-gray-950 bg-white border border-gray-300 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Live Storefront
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
