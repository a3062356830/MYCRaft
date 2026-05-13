'use client';

import React, { Suspense } from 'react';

interface SuspenseClientWrapperProps {
  children: React.ReactNode;
}

export default function SuspenseClientWrapper({ children }: SuspenseClientWrapperProps) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      {children}
    </Suspense>
  );
}
