'use client';

import React from 'react';
import { PixelCard, PixelBadge } from '@/components/pixel';

interface Question {
  id: string;
  text: string;
  type: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface FeynmanQuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
}

export default function FeynmanQuestionCard({ 
  question, 
  questionNumber, 
  totalQuestions 
}: FeynmanQuestionCardProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'definition': return '📖';
      case 'why': return '🤔';
      case 'how': return '🔧';
      case 'comparison': return '⚖️';
      default: return '💡';
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <PixelBadge variant="success">简单</PixelBadge>;
      case 'medium': return <PixelBadge variant="neutral">中等</PixelBadge>;
      case 'hard': return <PixelBadge variant="warning">困难</PixelBadge>;
      default: return <PixelBadge variant="neutral">中等</PixelBadge>;
    }
  };

  return (
    <PixelCard className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{getTypeIcon(question.type)}</span>
          <div>
            <div className="text-slate-400 text-xs">问题 {questionNumber} / {totalQuestions}</div>
            <h3 className="text-amber-400 font-bold">{question.type}</h3>
          </div>
        </div>
        {getDifficultyBadge(question.difficulty)}
      </div>
      
      <div className="bg-slate-900 p-4 border-2 border-slate-700">
        <p className="text-slate-200 text-lg">{question.text}</p>
      </div>
      
      <div className="mt-3 text-xs text-slate-500 flex items-center gap-2">
        <span>💡</span>
        <span>像给完全不懂技术的人解释一样回答</span>
      </div>
    </PixelCard>
  );
}
