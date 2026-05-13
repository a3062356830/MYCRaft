'use client';

import React from 'react';
import { PixelCard, PixelBadge, PixelProgress } from '@/components/pixel';

interface RubricItem {
  name: string;
  icon: string;
  score: number;
  maxScore: number;
}

interface FeynmanRubricProps {
  rubrics: RubricItem[];
}

export default function FeynmanRubric({ rubrics }: FeynmanRubricProps) {
  const totalScore = rubrics.reduce((sum, item) => sum + item.score, 0);
  const maxTotalScore = rubrics.reduce((sum, item) => sum + item.maxScore, 0);

  const getScoreColor = (score: number, maxScore: number) => {
    const percent = (score / maxScore) * 100;
    if (percent >= 80) return 'bg-green-500';
    if (percent >= 60) return 'bg-amber-500';
    if (percent >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <PixelCard className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-amber-400 font-bold flex items-center gap-2">
          <span>📋</span>
          评分标准
        </h3>
        <PixelBadge variant="honor">
          总分 {totalScore} / {maxTotalScore}
        </PixelBadge>
      </div>
      
      <div className="space-y-4">
        {rubrics.map((item, index) => (
          <div key={index} className="p-3 bg-slate-900 border-2 border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{item.icon}</span>
                <span className="text-slate-200 font-medium">{item.name}</span>
              </div>
              <PixelBadge variant={
                (item.score / item.maxScore) >= 0.8 ? 'success' :
                (item.score / item.maxScore) >= 0.6 ? 'neutral' : 'warning'
              }>
                {item.score} / {item.maxScore}
              </PixelBadge>
            </div>
            <div className="w-full h-3 bg-slate-800 border-2 border-slate-700">
              <div 
                className={`h-full ${getScoreColor(item.score, item.maxScore)}`}
                style={{ width: `${(item.score / item.maxScore) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </PixelCard>
  );
}
