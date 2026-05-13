import React from 'react';
import { PixelCard, PixelProgress, PixelBadge } from '@/components/pixel';

interface FeedbackScoreCardProps {
  totalScore: number;
  maxScore: number;
  grade: string;
  conclusion: string;
}

export default function FeedbackScoreCard({
  totalScore,
  maxScore,
  grade,
  conclusion
}: FeedbackScoreCardProps) {
  const getGradeColor = (g: string) => {
    switch (g) {
      case 'S': return '#fbbf24';
      case 'A+': return '#f59e0b';
      case 'A': return '#d97706';
      case 'B+': return '#3b82f6';
      case 'B': return '#2563eb';
      default: return '#64748b';
    }
  };

  return (
    <PixelCard title="🎯 总评分">
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-4">
          <div className="text-6xl font-bold" style={{ color: getGradeColor(grade) }}>
            {grade}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-amber-500">
              {totalScore} / {maxScore}
            </div>
          </div>
        </div>

        <div className="pt-2">
          <PixelProgress 
            value={(totalScore / maxScore) * 100} 
            color={getGradeColor(grade)}
          />
        </div>

        <div className="pt-3 border-t-2 border-slate-700">
          <PixelBadge variant="honor" className="text-sm">
            评价：{conclusion}
          </PixelBadge>
        </div>
      </div>
    </PixelCard>
  );
}
