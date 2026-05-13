import React from 'react';
import { PixelCard, PixelProgress, PixelBadge } from '@/components/pixel';

interface EvaluationDimensionProps {
  title: string;
  score: number;
  maxScore: number;
  observation: string;
}

export default function EvaluationDimensionCard({
  title,
  score,
  maxScore,
  observation
}: EvaluationDimensionProps) {
  const percentage = (score / maxScore) * 100;
  
  const getColor = () => {
    if (percentage >= 90) return '#10b981';
    if (percentage >= 75) return '#3b82f6';
    if (percentage >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <PixelCard title={title}>
      <div className="space-y-3">
        {/* 分数和进度 */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-amber-400">
              {score}
            </span>
            <span className="text-slate-500 text-sm">
              / {maxScore}
            </span>
          </div>
          <PixelBadge variant="success">
            {percentage >= 90 ? '优秀' : percentage >= 75 ? '良好' : percentage >= 60 ? '合格' : '需改进'}
          </PixelBadge>
        </div>

        <PixelProgress 
          value={percentage} 
          color={getColor()} 
        />

        {/* AI 观察 */}
        <div className="bg-slate-800/70 border-2 border-slate-700 p-3 mt-3">
          <div className="text-amber-400 text-xs font-bold mb-1 flex items-center gap-1">
            <span>🤖</span>
            <span>AI 观察</span>
          </div>
          <p className="text-slate-300 text-sm italic">
            “{observation}”
          </p>
        </div>
      </div>
    </PixelCard>
  );
}
