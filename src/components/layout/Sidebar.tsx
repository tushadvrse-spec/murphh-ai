'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Store,
  BarChart3,
  Settings,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  creatorName?: string;
}

export function Sidebar({ creatorName = 'Elena Vance' }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Products', href: '/dashboard/products', icon: Package },
    { label: 'My Storefront', href: '/dashboard/storefront', icon: Store },
    { label: 'Sales & Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-gray-300 bg-white flex flex-col shrink-0 min-h-screen shadow-xs">
      {/* Brand Header */}
      <div className="h-16 px-6 border-b border-gray-200 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-xs">
            M
          </div>
          <div>
            <span className="font-semibold text-gray-950 text-sm tracking-tight block">
              Murphh AI
            </span>
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider block">
              Creator Studio
            </span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-3 space-y-1 flex-1">
        <div className="px-3 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          Platform
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 font-semibold'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Creator Profile Footer */}
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs border border-indigo-200">
            {creatorName.slice(0, 2).toUpperCase()}
          </div>
          <div className="truncate flex-1">
            <p className="text-xs font-semibold text-gray-900 truncate">{creatorName}</p>
            <p className="text-[11px] text-gray-500 truncate">Pro Creator Plan</p>
          </div>
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
        </div>
      </div>
    </aside>
  );
}
