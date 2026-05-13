'use client';

import React from 'react';

interface DemoHighlightProps {
  children: React.ReactNode;
  targetStep: number;
  currentStep: number;
  label?: string;
  className?: string;
}

export default function DemoHighlight({
  children,
  targetStep,
  currentStep,
  label = '当前演示操作区',
  className = ''
}: DemoHighlightProps) {
  const isActive = targetStep === currentStep;
  
  if (!isActive) {
    return <>{children}</>;
  }
  
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -top-2 -right-2 z-10">
        <div className="px-3 py-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold rounded border-2 border-indigo-400 animate-pulse">
          🎯 {label}
        </div>
      </div>
      <div
        className="relative rounded-lg border-4 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.4)] animate-pulse"
      >
        {children}
      </div>
    </div>
  );
}
