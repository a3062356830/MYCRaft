'use client';

import React from 'react';
import { PixelCard } from '@/components/pixel';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ 
  message = '加载中...' 
}: LoadingStateProps) {
  return (
    <PixelCard className="p-8">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="text-4xl mb-4 animate-pulse">⏳</div>
        <p className="text-slate-300 text-lg">{message}</p>
      </div>
    </PixelCard>
  );
}
