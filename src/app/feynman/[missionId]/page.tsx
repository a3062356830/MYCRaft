import React, { Suspense } from 'react';
import { AppShell, PageContainer } from '@/components/layout';
import FeynmanHeader from '@/components/feynman/FeynmanHeader';
import FeynmanChallengeContent from './FeynmanChallengeContent';

export async function generateStaticParams() {
  return [
    { missionId: 'community-activity-drop' },
    { missionId: 'software-engineer-1' },
    { missionId: 'data-analyst-1' },
  ];
}

export default function FeynmanChallengePage({ params }: { params: { missionId: string } }) {
  const { missionId } = params;
  
  return (
    <AppShell>
      <PageContainer maxWidth="7xl" className="py-6">
        <div className="space-y-6">
          <FeynmanHeader missionId={missionId} />
          <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
            <FeynmanChallengeContent missionId={missionId} />
          </Suspense>
        </div>
      </PageContainer>
    </AppShell>
  );
}
