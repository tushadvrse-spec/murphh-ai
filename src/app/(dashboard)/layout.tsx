import React, { Suspense } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { initialCreatorProfile } from '@/lib/mock-storage';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#eef1f6] flex text-gray-900">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block sticky top-0 h-screen">
        <Suspense fallback={<div className="w-64 bg-white border-r border-gray-300" />}>
          <Sidebar creatorName={initialCreatorProfile.creator_name} />
        </Suspense>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="lg:hidden h-16 border-b border-gray-200 bg-white px-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-gray-950 flex items-center justify-center text-white font-bold text-xs">
              M
            </div>
            <span className="font-bold text-sm text-gray-900">Murphh AI</span>
          </div>
          <div className="text-xs font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-full">
            {initialCreatorProfile.creator_name}
          </div>
        </header>

        {/* Content container */}
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
