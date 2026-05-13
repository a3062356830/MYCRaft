'use client';

import React, { useState } from 'react';
import { PixelDialog, PixelBadge, PixelButton } from '@/components/pixel';
import { getRecommendResources } from '@/data/resources';
import RAGSearchDrawer from './RAGSearchDrawer';

interface ResourceRecommendDialogProps {
  open: boolean;
  onClose: () => void;
  taskType?: 'data-analyst' | 'software-engineer';
}

export default function ResourceRecommendDialog({
  open,
  onClose,
  taskType = 'software-engineer',
}: ResourceRecommendDialogProps) {
  // 从 data 目录获取推荐资源
  const resources = getRecommendResources(taskType).slice(0, 4);
  const [showRAGDrawer, setShowRAGDrawer] = useState(false);

  const getResourceIcon = (type: string) => {
    switch (type) {
      case '文档': return '📚';
      case '课程': return '🎓';
      case '教程': return '📖';
      case '练习': return '✏️';
      case '指南': return '📋';
      case '速查表': return '📝';
      case '规范': return '📏';
      case '模板': return '📄';
      case '案例': return '📊';
      case '平台': return '🌐';
      default: return '📄';
    }
  };

  const handleOpenRAGSearch = () => {
    onClose();
    setShowRAGDrawer(true);
  };

  return (
    <>
      <PixelDialog
        open={open}
        onClose={onClose}
        title="📚 推荐资源"
      >
        <div className="mb-4">
          <PixelButton 
            variant="primary" 
            onClick={handleOpenRAGSearch}
            className="w-full"
          >
            🔍 寻找更多资源（RAG 检索）
          </PixelButton>
        </div>

        {resources.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">📚</div>
            <p className="text-slate-400">暂无推荐资源</p>
          </div>
        ) : (
          <div className="space-y-3">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className="p-4 bg-slate-800 border-2 border-slate-700 hover:border-amber-500 transition-all hover:translate-x-1"
                style={{
                  boxShadow: 'inset -2px -2px 0px 0px #0f172a, inset 2px 2px 0px 0px #475569',
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getResourceIcon(resource.type)}</span>
                  <div className="flex-1">
                    <h4 className="text-slate-200 font-bold">{resource.title}</h4>
                    <p className="text-slate-400 text-sm mt-1">{resource.summary}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <PixelBadge variant="neutral" className="text-xs">
                        {resource.type}
                      </PixelBadge>
                      {resource.relevance && (
                        <PixelBadge variant="fun" className="text-xs">
                          🔥 相关度 {resource.relevance}%
                        </PixelBadge>
                      )}
                    </div>
                  </div>
                  <span className="text-amber-500">→</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </PixelDialog>

      <RAGSearchDrawer
        open={showRAGDrawer}
        onClose={() => setShowRAGDrawer(false)}
        taskType={taskType}
      />
    </>
  );
}
