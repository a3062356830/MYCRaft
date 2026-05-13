'use client';

import React from 'react';
import { PixelCard, PixelBadge } from '@/components/pixel';

interface RAGQueryInsightProps {
  taskType?: 'data-analyst' | 'software-engineer';
}

export default function RAGQueryInsight({ taskType = 'software-engineer' }: RAGQueryInsightProps) {
  const dataAnalystInsight = {
    keywords: ['用户活跃度', '分组聚合', '趋势分析', '可视化'],
    learningNeed: '需要先理解指标口径，再进行分组统计和趋势展示',
    searchStrategy: '优先查找 Pandas 聚合与 Matplotlib 可视化教程'
  };

  const softwareEngineerInsight = {
    keywords: ['Bug 复现', '日志定位', '单元测试'],
    learningNeed: '需要先复现问题，再定位根因，最后补充测试',
    searchStrategy: '优先查找调试流程、日志分析和测试用例示例'
  };

  const insight = taskType === 'data-analyst' ? dataAnalystInsight : softwareEngineerInsight;

  return (
    <PixelCard title="🔍 查询理解">
      <div className="space-y-4">
        <div>
          <div className="text-slate-400 text-sm mb-2 flex items-center gap-2">
            <span className="text-amber-500">⚡</span>
            识别到关键词
          </div>
          <div className="flex flex-wrap gap-2">
            {insight.keywords.map((keyword, idx) => (
              <PixelBadge key={idx} variant="fun">
                {keyword}
              </PixelBadge>
            ))}
          </div>
        </div>

        <div>
          <div className="text-slate-400 text-sm mb-2 flex items-center gap-2">
            <span className="text-blue-400">💡</span>
            推断学习需求
          </div>
          <p className="text-slate-200 bg-slate-900 p-3 border-2 border-slate-700">
            {insight.learningNeed}
          </p>
        </div>

        <div>
          <div className="text-slate-400 text-sm mb-2 flex items-center gap-2">
            <span className="text-green-400">🎯</span>
            推荐检索策略
          </div>
          <p className="text-slate-200 bg-slate-900 p-3 border-2 border-slate-700">
            {insight.searchStrategy}
          </p>
        </div>
      </div>
    </PixelCard>
  );
}
