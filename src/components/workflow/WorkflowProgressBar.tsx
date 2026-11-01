'use client';

import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { WorkflowStep } from '@/types/creator';

interface WorkflowProgressBarProps {
  currentStep: WorkflowStep;
  productId?: string;
  stepStatusText?: string;
}

interface StepConfig {
  id: WorkflowStep;
  name: string;
  description: string;
  href: (productId?: string) => string;
}

const STEPS: StepConfig[] = [
  {
    id: 'profile',
    name: 'Profile & Audience',
    description: 'Niche analysis',
    href: () => '/dashboard/audience',
  },
  {
    id: 'ideas',
    name: 'Product Ideas',
    description: 'Demand signals',
    href: () => '/dashboard/discover',
  },
  {
    id: 'create',
    name: 'Create Product',
    description: 'Outline & sections',
    href: (pid) => (pid ? `/dashboard/products/${pid}/edit` : '/dashboard/discover'),
  },
  {
    id: 'customize',
    name: 'Landing Page',
    description: 'Sales copy & theme',
    href: (pid) => (pid ? `/dashboard/products/${pid}/landing` : '/dashboard/storefront'),
  },
  {
    id: 'publish',
    name: 'Publish & Sell',
    description: 'Stripe & live checkout',
    href: (pid) => (pid ? `/dashboard/products/${pid}/publish` : '/dashboard/products'),
  },
];

export function WorkflowProgressBar({
  currentStep,
  productId = 'prod-1',
  stepStatusText,
}: WorkflowProgressBarProps) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <div className="bg-white border-b border-gray-300 px-6 sm:px-8 lg:px-10 py-4 shadow-xs">
      <div className="w-full">
        {/* Step indicator sequence */}
        <div className="flex items-center justify-between">
          {STEPS.map((step, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            const href = step.href(productId);

            return (
              <React.Fragment key={step.id}>
                <Link
                  href={href}
                  className="group flex items-center gap-3 text-left focus:outline-hidden"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isCurrent
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-50 shadow-xs'
                        : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200 group-hover:text-gray-600'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4 stroke-[2.5]" /> : idx + 1}
                  </div>
                  <div className="hidden md:block">
                    <p
                      className={`text-xs font-semibold tracking-tight transition-colors ${
                        isCurrent
                          ? 'text-indigo-600'
                          : isCompleted
                          ? 'text-gray-900'
                          : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                    >
                      {step.name}
                    </p>
                    <p className="text-[11px] text-gray-400">{step.description}</p>
                  </div>
                </Link>

                {idx < STEPS.length - 1 && (
                  <div className="flex-1 mx-3 hidden sm:flex items-center">
                    <div
                      className={`h-0.5 w-full rounded-full transition-colors ${
                        idx < currentIndex ? 'bg-emerald-500' : 'bg-gray-200'
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Current contextual helper banner */}
        {stepStatusText && (
          <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>{stepStatusText}</span>
            </div>
            <span className="text-[11px] text-gray-400 font-mono">
              Step {currentIndex + 1} of 5
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
