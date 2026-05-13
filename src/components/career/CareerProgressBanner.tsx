import React from 'react';
import { PixelProgress, PixelBadge } from '@/components/pixel';

interface CareerProgressBannerProps {
  currentStage: string;
  nextStage: string;
  currentGoal: string;
  progress: number;
}

export default function CareerProgressBanner({
  currentStage,
  nextStage,
  currentGoal,
  progress
}: CareerProgressBannerProps) {
  return (
    <div className="border-4 border-amber-700 bg-gradient-to-r from-amber-900/40 to-orange-900/30 p-5">
      {/* 进度标题区 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🚀</span>
          <div>
            <h3 className="text-xl font-bold text-amber-400">
              职业进度
            </h3>
            <p className="text-slate-300 text-sm">
              {currentStage} → {nextStage}
            </p>
          </div>
        </div>
        <PixelBadge variant="honor">
          {progress}% 完成
        </PixelBadge>
      </div>

      {/* 进度条 */}
      <div className="mb-4">
        <PixelProgress value={progress} color="#f59e0b" />
      </div>

      {/* 当前目标 */}
      <div className="flex items-center gap-3 bg-slate-800/60 border-2 border-slate-700 p-3">
        <span className="text-2xl">🎯</span>
        <div>
          <div className="text-slate-400 text-xs mb-1">当前目标</div>
          <div className="text-amber-300 font-medium">{currentGoal}</div>
        </div>
      </div>
    </div>
  );
}
