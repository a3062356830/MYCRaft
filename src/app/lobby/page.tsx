import React, { Suspense } from 'react';
import LobbyContent from './LobbyContent';

export default function LobbyPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading...</div>}>
      <LobbyContent />
    </Suspense>
  );
}
