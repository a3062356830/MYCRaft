'use client';

import React, { useState } from 'react';
import { PixelCard, PixelBadge, PixelButton, PixelProgress } from '@/components/pixel';

interface RAGResource {
  id: string;
  title: string;
  type: '教程' | '示例' | '模板' | '案例' | '指南';
  relevance: number;
  hitSnippet: string;
  whyRecommend: string;
  solveProblems: string[];
  tags: string[];
  summary?: {
    coreConcept: string;
    useCase: string;
    howToApply: string;
  };
}

interface RAGSearchResultCardProps {
  resource: RAGResource;
}

export default function RAGSearchResultCard({ resource }: RAGSearchResultCardProps) {
  const [showSummary, setShowSummary] = useState(false);
  const [addedToList, setAddedToList] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case '教程': return '📖';
      case '示例': return '💻';
      case '模板': return '📄';
      case '案例': return '📊';
      default: return '📄';
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case '教程': return 'fun';
      case '示例': return 'neutral';
      case '模板': return 'honor';
      case '案例': return 'success';
      default: return 'neutral';
    }
  };

  const handleAddToList = () => {
    setAddedToList(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  return (
    <div className="relative">
      <PixelCard>
        <div className="flex items-start gap-4">
          <div className="text-4xl flex-shrink-0">
            {getTypeIcon(resource.type)}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-slate-200 font-bold text-lg">{resource.title}</h4>
                  <PixelBadge variant={getTypeBadgeVariant(resource.type)}>
                    {resource.type}
                  </PixelBadge>
                </div>
                <PixelProgress value={resource.relevance} label="相关度" />
              </div>
            </div>

            <div className="mb-4">
              <div className="text-slate-400 text-sm mb-2 flex items-center gap-2">
                <span className="text-amber-500">📍</span>
                命中片段
              </div>
              <p className="text-amber-400 bg-slate-900 p-3 border-2 border-amber-800 italic">
                {'\"'}{resource.hitSnippet}{'\"'}
              </p>
            </div>

            <div className="mb-4">
              <div className="text-slate-400 text-sm mb-2 flex items-center gap-2">
                <span className="text-blue-400">🎯</span>
                为什么推荐
              </div>
              <p className="text-slate-300 bg-slate-900 p-3 border-2 border-slate-700">
                {resource.whyRecommend}
              </p>
            </div>

            <div className="mb-4">
              <div className="text-slate-400 text-sm mb-2 flex items-center gap-2">
                <span className="text-green-400">💪</span>
                适合解决的问题
              </div>
              <div className="flex flex-wrap gap-2">
                {resource.solveProblems.map((problem, idx) => (
                  <PixelBadge key={idx} variant="neutral">
                    {problem}
                  </PixelBadge>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag, idx) => (
                  <PixelBadge key={idx} variant="fun">
                    {tag}
                  </PixelBadge>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <PixelButton 
                variant="secondary" 
                onClick={() => setShowSummary(!showSummary)}
                className="flex-1"
              >
                {showSummary ? '收起摘要' : '查看摘要'}
              </PixelButton>
              <PixelButton 
                variant={addedToList ? 'ghost' : 'primary'} 
                onClick={handleAddToList}
                disabled={addedToList}
                className="flex-1"
              >
                {addedToList ? '✅ 已加入' : '➕ 加入学习清单'}
              </PixelButton>
            </div>

            {showSummary && resource.summary && (
              <div className="mt-4 pt-4 border-t-2 border-slate-600 space-y-3">
                <div>
                  <div className="text-slate-400 text-sm mb-1">核心概念</div>
                  <p className="text-slate-200 bg-slate-900 p-2 border border-slate-700">
                    {resource.summary.coreConcept}
                  </p>
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">适用场景</div>
                  <p className="text-slate-200 bg-slate-900 p-2 border border-slate-700">
                    {resource.summary.useCase}
                  </p>
                </div>
                <div>
                  <div className="text-slate-400 text-sm mb-1">如何应用到当前任务</div>
                  <p className="text-slate-200 bg-slate-900 p-2 border border-slate-700">
                    {resource.summary.howToApply}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </PixelCard>

      {showToast && (
        <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 border-2 border-green-800 font-bold z-10">
          ✅ 已加入本次任务学习清单（Mock）
        </div>
      )}
    </div>
  );
}
