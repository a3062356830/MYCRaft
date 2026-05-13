'use client';

import React from 'react';
import { PixelBadge } from '@/components/pixel';

interface KnowledgeSource {
  name: string;
  hitCount: number;
  confidence: '高' | '中' | '低';
  type: '剧本库' | '笔记库' | '案例库';
}

interface KnowledgeSourceBadgeProps {
  source: KnowledgeSource;
}

export default function KnowledgeSourceBadge({ source }: KnowledgeSourceBadgeProps) {
  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case '高': return 'success';
      case '中': return 'neutral';
      case '低': return 'warning';
      default: return 'neutral';
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case '剧本库': return 'honor';
      case '笔记库': return 'fun';
      case '案例库': return 'neutral';
      default: return 'neutral';
    }
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case '剧本库': return '🎭';
      case '笔记库': return '📝';
      case '案例库': return '📊';
      default: return '📚';
    }
  };

  return (
    <div className="p-4 bg-slate-800 border-2 border-slate-600 hover:border-amber-500 transition-all">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-slate-200 font-bold flex items-center gap-2">
          <span className="text-2xl">{getSourceIcon(source.type)}</span>
          {source.name}
        </h4>
        <PixelBadge variant={getTypeBadgeVariant(source.type)}>
          {source.type}
        </PixelBadge>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-400">
          命中: <span className="text-amber-500 font-bold">{source.hitCount}</span> 条
        </span>
        <PixelBadge variant={getConfidenceColor(source.confidence)}>
          可信度: {source.confidence}
        </PixelBadge>
      </div>
    </div>
  );
}
