import React, { Suspense } from 'react';
import MissionFeedbackContent from './MissionFeedbackContent';

export async function generateStaticParams() {
  return [
    { missionId: 'community-activity-drop' },
    { missionId: 'software-engineer-1' },
    { missionId: 'software-engineer-2' },
    { missionId: 'software-engineer-3' },
    { missionId: 'data-analyst-1' },
    { missionId: 'data-analyst-2' },
    { missionId: 'data-analyst-3' },
  ];
}

export default function MissionFeedbackPage({ params }: { params: { missionId: string } }) {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <MissionFeedbackContent />
    </Suspense>
  );
}
