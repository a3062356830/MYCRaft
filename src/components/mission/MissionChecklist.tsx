import React, { useState, useEffect } from 'react';
import { PixelCard, PixelProgress } from '@/components/pixel';
import { Mission } from '@/types';

interface MissionChecklistProps {
  mission: Mission;
}

const CHECKLIST_ITEMS = [
  { id: 'understand', label: '我已理解任务背景' },
  { id: 'key-questions', label: '我已列出关键问题' },
  { id: 'deliverables', label: '我已完成交付物' },
  { id: 'review', label: '我已对照评分标准检查' },
  { id: 'submit', label: '我已准备提交给 AI导师' }
];

export default function MissionChecklist({ mission }: MissionChecklistProps) {
  const STORAGE_KEY = `careercraft-checklist-${mission.id}`;
  
  // 从 localStorage 读取状态
  const getInitialChecklist = () => {
    if (typeof window === 'undefined') {
      return {} as Record<string, boolean>;
    }
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return {};
      }
    }
    return {};
  };
  
  const [checklist, setChecklist] = useState<Record<string, boolean>>(getInitialChecklist);
  
  // 保存到 localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist));
  }, [checklist, STORAGE_KEY]);
  
  // 计算进度
  const completedItems = Object.values(checklist).filter(Boolean).length;
  const progress = Math.round((completedItems / CHECKLIST_ITEMS.length) * 100);
  
  const toggleCheck = (itemId: string) => {
    setChecklist(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };
  
  return (
    <PixelCard title="✅ 任务检查清单">
      <div className="space-y-4">
        {/* 进度条 */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">完成进度</span>
            <span className="text-sm font-bold text-amber-500">
              {completedItems}/{CHECKLIST_ITEMS.length}
            </span>
          </div>
          <PixelProgress 
            value={progress} 
            color={progress === 100 ? '#10b981' : '#f59e0b'}
          />
        </div>
        
        {/* 检查清单 */}
        <div className="space-y-2">
          {CHECKLIST_ITEMS.map((item) => {
            const isChecked = checklist[item.id] || false;
            
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
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
        
        {/* 交付物和评审标准 */}
        <div className="mt-6 pt-4 border-t-2 border-slate-700 space-y-4">
          {/* 交付物 */}
          <div className="bg-slate-800 p-3 border-2 border-slate-700">
            <h4 className="text-blue-500 font-bold mb-2">📦 交付物清单</h4>
            <ul className="space-y-1">
              {(mission.deliverables || []).map((del, idx) => (
                <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-blue-500">☑️</span>
                  {del}
                </li>
              ))}
            </ul>
          </div>
          
          {/* 评审标准 */}
          <div className="bg-slate-800 p-3 border-2 border-slate-700">
            <h4 className="text-purple-500 font-bold mb-2">✅ 评审标准</h4>
            <ul className="space-y-1">
              {(mission.criteria || []).map((crit, idx) => (
                <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                  <span className="text-purple-500">✓</span>
                  {crit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </PixelCard>
  );
}
