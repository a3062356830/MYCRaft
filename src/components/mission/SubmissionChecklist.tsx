import React, { useState, useEffect } from 'react';
import { PixelCard, PixelProgress } from '@/components/pixel';

const CHECKLIST_ITEMS = [
  { id: 'background', label: '是否说明任务背景' },
  { id: 'problems', label: '是否列出关键问题' },
  { id: 'deliverables', label: '是否完成交付物' },
  { id: 'solution', label: '是否解释解决思路' },
  { id: 'criteria', label: '是否对照评分标准检查' }
];

interface SubmissionChecklistProps {
  missionId: string;
}

export default function SubmissionChecklist({ missionId }: SubmissionChecklistProps) {
  const STORAGE_KEY = `careercraft-submission-checklist-${missionId}`;

  // 从localStorage加载状态
  const getInitialState = () => {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  };

  const [checklist, setChecklist] = useState<Record<string, boolean>>(getInitialState);
  const completedItems = Object.values(checklist).filter(Boolean).length;
  const totalItems = CHECKLIST_ITEMS.length;
  const qualityScore = completedItems;
  const progressPercent = (completedItems / totalItems) * 100;

  // 保存到localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist));
  }, [checklist, STORAGE_KEY]);

  const toggleItem = (itemId: string) => {
    setChecklist(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  return (
    <PixelCard title="✅ 质量自检">
      <div className="space-y-4">
        {/* 质量分显示 */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-slate-300 text-sm">质量自检得分</span>
          <span className="text-amber-500 font-bold text-lg">
            {qualityScore} / {totalItems}
          </span>
        </div>
        <PixelProgress
          value={progressPercent}
          color={qualityScore >= 4 ? '#10b981' : qualityScore >= 2 ? '#f59e0b' : '#ef4444'}
        />

        {/* 检查项 */}
        <div className="space-y-2 mt-4">
          {CHECKLIST_ITEMS.map(item => {
            const isChecked = checklist[item.id] || false;
            
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`
                  p-3 border-2 cursor-pointer transition-all duration-150
                  ${isChecked 
                    ? 'bg-green-900/30 border-green-700' 
                    : 'bg-slate-800 border-slate-700 hover:border-amber-500'}
                `}
                style={{
                  boxShadow: isChecked 
                    ? 'inset -2px -2px 0px 0px #1e3a2e, inset 2px 2px 0px 0px #134e4a'
                    : 'inset -2px -2px 0px 0px #0f172a, inset 2px 2px 0px 0px #334155'
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`
                      w-5 h-5 flex items-center justify-center border-2
                      ${isChecked ? 'bg-green-600 border-green-500' : 'bg-slate-700 border-slate-600'}
                    `}
                  >
                    {isChecked && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`text-sm ${isChecked ? 'text-green-400 line-through' : 'text-slate-300'}`}>
                    {item.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PixelCard>
  );
}
