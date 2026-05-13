import React, { Suspense } from 'react';
import CareerHubContent from './CareerHubContent';

export async function generateStaticParams() {
  return [
    { careerId: 'software-engineer' },
    { careerId: 'data-analyst' },
  ];
}

export default function CareerHubPage({ params }: { params: { careerId: string } }) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <CareerHubContent />
    </Suspense>
  );
}
