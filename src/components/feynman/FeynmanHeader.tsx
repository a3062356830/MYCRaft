'use client';

import React from 'react';
import { PixelCard, PixelBadge } from '@/components/pixel';

interface FeynmanHeaderProps {
  missionId: string;
}

export default function FeynmanHeader({ missionId }: FeynmanHeaderProps) {
  return (
    <PixelCard className="mb-6">
      <div className="text-center">
        <div className="text-5xl mb-4">🧠</div>
        <h1 className="text-2xl font-bold text-indigo-400 mb-2">费曼挑战</h1>
        <p className="text-slate-300 text-sm mb-4">
          请用最简单的语言解释当前任务中的核心概念，证明你真的理解了它。
        </p>
        <div className="flex justify-center gap-2">
          <PixelBadge variant="warning">理解检测</PixelBadge>
          <PixelBadge variant="success">任务 #{missionId}</PixelBadge>
        </div>
      </div>
    </PixelCard>
  );
}
