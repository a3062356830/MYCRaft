import React, { Suspense } from 'react';
import PortfolioContent from './PortfolioContent';

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}
