import React from 'react';
import { PixelCard, PixelProgress } from '@/components/pixel';

interface Dimension {
  name: string;
  score: number;
  maxScore: number;
  color: string;
  description?: string;
}

interface FeedbackDimensionBreakdownProps {
  dimensions: Dimension[];
}

export default function FeedbackDimensionBreakdown({
  dimensions
}: FeedbackDimensionBreakdownProps) {
  return (
    <PixelCard title="📊 分项评分">
      <div className="space-y-4">
        {dimensions.map((dim, idx) => (
          <div 
            key={idx}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-medium">{dim.name}</span>
              <span className="text-lg font-bold" style={{ color: dim.color }}>
                {dim.score} / {dim.maxScore}
              </span>
            </div>
            <PixelProgress 
              value={(dim.score / dim.maxScore) * 100} 
              color={dim.color}
            />
            {dim.description && (
              <p className="text-sm text-slate-500">{dim.description}</p>
            )}
          </div>
        ))}
      </div>
    </PixelCard>
  );
}
