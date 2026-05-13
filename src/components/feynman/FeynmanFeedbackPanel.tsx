'use client';

import React from 'react';
import { PixelCard, PixelBadge, PixelButton } from '@/components/pixel';

interface Feedback {
  score: number;
  maxScore: number;
  rating: string;
  aiFeedback: string;
  strengths: string[];
  improvements: string[];
  badgeEarned: boolean;
}

interface FeynmanFeedbackPanelProps {
  feedback: Feedback;
  onBackToMission: () => void;
  onBackToSubmit: () => void;
  onRetry: () => void;
}

export default function FeynmanFeedbackPanel({ 
  feedback, 
  onBackToMission, 
  onBackToSubmit, 
  onRetry 
}: FeynmanFeedbackPanelProps) {
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case '理解深刻': return 'success';
      case '理解良好': return 'fun';
      case '基本理解': return 'neutral';
      case '需要加强': return 'warning';
      default: return 'neutral';
    }
  };

  return (
    <div className="space-y-6">
      {/* 成绩卡片 */}
      <PixelCard className="text-center">
        <div className="text-5xl mb-3">🏆</div>
        <h2 className="text-2xl font-bold text-amber-400 mb-2">挑战完成！</h2>
        
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="text-4xl font-bold text-amber-400">
            {feedback.score}
          </div>
          <div className="text-slate-500">/</div>
          <div className="text-2xl text-slate-400">{feedback.maxScore}</div>
        </div>
        
        <PixelBadge variant={getRatingColor(feedback.rating)} className="text-lg">
          {feedback.rating}
        </PixelBadge>
        
        {feedback.badgeEarned && (
          <div className="mt-4 p-3 bg-amber-900/30 border-2 border-amber-500">
            <div className="text-amber-400 font-bold flex items-center justify-center gap-2">
              <span>🎖️</span>
              获得理解力徽章
              {/* TODO: 替换为真实图标 /assets/feynman/understanding-badge.png */}
            </div>
          </div>
        )}
      </PixelCard>

      {/* AI 反馈 */}
      <PixelCard>
        <h3 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
          <span>🤖</span>
          AI 反馈
        </h3>
        <div className="p-3 bg-slate-900 border-2 border-slate-700">
          <p className="text-slate-300 italic">{feedback.aiFeedback}</p>
        </div>
      </PixelCard>

      {/* 优点 */}
      <PixelCard>
        <h3 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
          <span>✅</span>
          优点
        </h3>
        <ul className="space-y-2">
          {feedback.strengths.map((strength, index) => (
            <li key={index} className="flex items-start gap-2 p-2 bg-green-900/20 border-l-2 border-green-500">
              <span className="text-green-400 font-bold">+</span>
              <span className="text-slate-300">{strength}</span>
            </li>
          ))}
        </ul>
      </PixelCard>

      {/* 改进建议 */}
      <PixelCard>
        <h3 className="text-amber-400 font-bold mb-3 flex items-center gap-2">
          <span>💡</span>
          改进建议
        </h3>
        <ul className="space-y-2">
          {feedback.improvements.map((improvement, index) => (
            <li key={index} className="flex items-start gap-2 p-2 bg-amber-900/20 border-l-2 border-amber-500">
              <span className="text-amber-400 font-bold">→</span>
              <span className="text-slate-300">{improvement}</span>
            </li>
          ))}
        </ul>
      </PixelCard>

      {/* 操作按钮 */}
      <div className="grid grid-cols-1 gap-3">
        <PixelButton onClick={onBackToMission} variant="primary">
          返回任务工作台
        </PixelButton>
        <PixelButton onClick={onBackToSubmit} variant="secondary">
          返回提交页
        </PixelButton>
        <PixelButton onClick={onRetry} variant="ghost">
          🔄 再挑战一次
        </PixelButton>
      </div>
    </div>
  );
}
