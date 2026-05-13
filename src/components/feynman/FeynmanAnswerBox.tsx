'use client';

import React from 'react';
import { PixelCard, PixelButton, PixelTextarea, PixelBadge } from '@/components/pixel';

interface FeynmanAnswerBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
}

export default function FeynmanAnswerBox({ 
  value, 
  onChange, 
  onSubmit, 
  disabled = false 
}: FeynmanAnswerBoxProps) {
  const wordCount = value.length;
  const minWordCount = 30;
  const meetsRequirement = wordCount >= minWordCount;
  const progressPercent = Math.min((wordCount / minWordCount) * 100, 100);

  return (
    <PixelCard className="mb-6">
      <h3 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
        <span>✍️</span>
        你的解释
      </h3>
      
      <PixelTextarea
        value={value}
        onChange={onChange}
        placeholder="像给完全不懂技术的人解释一样回答..."
        rows={6}
        disabled={disabled}
      />
      
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-2">
          <PixelBadge variant={meetsRequirement ? 'success' : 'warning'}>
            {wordCount} / {minWordCount} 字
          </PixelBadge>
          {!meetsRequirement && (
            <span className="text-xs text-slate-500">
              至少需要 {minWordCount - wordCount} 字
            </span>
          )}
        </div>
      </div>
      
      {/* 进度条 */}
      <div className="mt-3">
        <div className="w-full h-2 bg-slate-800 border-2 border-slate-700">
          <div 
            className={`h-full transition-all ${meetsRequirement ? 'bg-green-500' : 'bg-amber-500'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
      
      <PixelButton
        onClick={onSubmit}
        disabled={!meetsRequirement || disabled}
        className="w-full mt-4"
        variant="primary"
      >
        🧠 提交解释
      </PixelButton>
    </PixelCard>
  );
}
