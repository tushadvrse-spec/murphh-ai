'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  BarChart3,
  Settings,
  Store,
  Users,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronsUpDown,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  creatorName?: string;
}

export function Sidebar({ creatorName = 'Elena Vance' }: SidebarProps) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile menu on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsProfileOpen(false);
      }
    }

    if (isProfileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isProfileOpen]);

  const navItems = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { label: 'My Products', href: '/dashboard/products', icon: Package },
    { label: 'Sales & Analytics', href: '/dashboard/analytics', icon: BarChart3 },
    { label: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-gray-300 bg-white flex flex-col shrink-0 min-h-screen shadow-xs">
      {/* Brand Header */}
      <div className="h-16 px-6 border-b border-gray-200 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gray-950 flex items-center justify-center text-white font-bold text-base shadow-xs">
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
                  ? 'bg-gray-900 text-white font-semibold shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Functional Creator Profile Footer & Popover Menu */}
      <div className="relative p-3 border-t border-gray-200 bg-gray-50/50" ref={profileMenuRef}>
        {/* Popover Flyout Menu */}
        {isProfileOpen && (
          <div className="absolute bottom-full left-2 right-2 mb-2 bg-white border border-gray-300 rounded-2xl shadow-xl p-2 z-50 text-xs space-y-1 animate-in fade-in slide-in-from-bottom-2 duration-150">
            {/* User Header */}
            <div className="p-2.5 pb-2 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gray-950 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                  {creatorName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-950 text-xs leading-none">{creatorName}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">elena@vancecreator.com</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-gray-900 bg-gray-100 border border-gray-300 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Pro
              </span>
            </div>

            {/* Shifted Core Settings */}
            <div className="pt-1 space-y-0.5">
              <Link
                href="/dashboard/storefront"
                onClick={() => setIsProfileOpen(false)}
                className={`flex items-center justify-between w-full p-2 rounded-xl transition-colors ${
                  pathname === '/dashboard/storefront'
                    ? 'bg-gray-900 text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${pathname === '/dashboard/storefront' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    <Store className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-xs">Storefront & Branding</span>
                    <span className={`text-[10px] block ${pathname === '/dashboard/storefront' ? 'text-gray-300' : 'text-gray-500'}`}>Manage bio, slug & visual palette</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>

              <Link
                href="/dashboard/audience"
                onClick={() => setIsProfileOpen(false)}
                className={`flex items-center justify-between w-full p-2 rounded-xl transition-colors ${
                  pathname === '/dashboard/audience'
                    ? 'bg-gray-900 text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${pathname === '/dashboard/audience' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    <Users className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-xs">Audience & Niche</span>
                    <span className={`text-[10px] block ${pathname === '/dashboard/audience' ? 'text-gray-300' : 'text-gray-500'}`}>AI persona & problem audit</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>

              <Link
                href="/dashboard/settings"
                onClick={() => setIsProfileOpen(false)}
                className={`flex items-center justify-between w-full p-2 rounded-xl transition-colors ${
                  pathname === '/dashboard/settings'
                    ? 'bg-gray-900 text-white font-semibold'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`p-1.5 rounded-lg ${pathname === '/dashboard/settings' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
                    <Settings className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-semibold block text-xs">Account & Integrations</span>
                    <span className={`text-[10px] block ${pathname === '/dashboard/settings' ? 'text-gray-300' : 'text-gray-500'}`}>Stripe payouts, Gemini keys</span>
                  </div>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
            </div>

            <div className="my-1 border-t border-gray-100" />

            {/* Plan & Billing */}
            <div className="px-1 py-0.5 space-y-0.5">
              <Link
                href="/dashboard/settings"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center justify-between w-full p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <CreditCard className="w-3.5 h-3.5 text-gray-500" />
                  <span className="font-medium text-gray-800 text-xs">Pro Creator Plan</span>
                </div>
                <span className="text-[10px] font-semibold text-gray-600 bg-gray-100 px-2 py-0.5 rounded-md">$49/mo</span>
              </Link>

              <Link
                href="/dashboard"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center justify-between w-full p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-3.5 h-3.5 text-gray-500" />
                  <span className="font-medium text-gray-800 text-xs">Creator Guide & Docs</span>
                </div>
                <span className="text-[10px] text-gray-900 font-bold">v1.0</span>
              </Link>
            </div>

            <div className="my-1 border-t border-gray-100" />

            {/* Log Out */}
            <div className="pt-0.5">
              <Link
                href="/"
                onClick={() => setIsProfileOpen(false)}
                className="flex items-center gap-2.5 w-full p-2 rounded-xl text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors font-medium text-xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log out</span>
              </Link>
            </div>
          </div>
        )}

        {/* Profile Trigger Button */}
        <button
          onClick={() => setIsProfileOpen(!isProfileOpen)}
          aria-expanded={isProfileOpen}
          aria-haspopup="true"
          className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-gray-100 transition-all text-left group focus:outline-hidden border border-transparent hover:border-gray-300"
        >
          <div className="flex items-center gap-2.5 truncate">
            <div className="w-9 h-9 rounded-full bg-gray-950 text-white font-bold flex items-center justify-center text-xs border border-gray-800 shrink-0">
              {creatorName.slice(0, 2).toUpperCase()}
            </div>
            <div className="truncate flex-1">
              <p className="text-xs font-semibold text-gray-900 truncate">{creatorName}</p>
              <p className="text-[11px] text-gray-500 truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Pro Creator Plan
              </p>
            </div>
          </div>
          <ChevronsUpDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 shrink-0 ml-1" />
        </button>
      </div>
    </aside>
  );
}
