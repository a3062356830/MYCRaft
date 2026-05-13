'use client';

import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
  className?: string;
}

export default function AppShell({ children, className = '' }: AppShellProps) {
  return (
    <div className={`min-h-screen bg-slate-900 ${className}`}>
      {children}
    </div>
  );
}
