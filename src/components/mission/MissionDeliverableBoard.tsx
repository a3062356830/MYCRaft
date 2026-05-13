import React, { useState } from 'react';
import { PixelBadge } from '@/components/pixel';

// 交付物类型
interface DeliverableItem {
  id: string;
  title: string;
  type: 'required' | 'suggested' | 'bonus';
}

// 默认交付物配置
const DEFAULT_DELIVERABLES: DeliverableItem[] = [
  { id: 'd1', title: '任务完成说明文档', type: 'required' },
  { id: 'd2', title: '核心问题解决方案', type: 'required' },
  { id: 'd3', title: '思考过程记录', type: 'required' },
  { id: 'd4', title: '截图或代码片段', type: 'suggested' },
  { id: 'd5', title: '额外的优化方案', type: 'suggested' },
  { id: 'd6', title: '相关资源和参考', type: 'bonus' },
];

export default function MissionDeliverableBoard() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);
  };

  const getTypeStyle = (type: DeliverableItem['type']) => {
    switch (type) {
      case 'required':
        return {
          badge: <PixelBadge variant="warning">必交</PixelBadge>,
          color: 'border-amber-600',
        };
      case 'suggested':
        return {
          badge: <PixelBadge variant="neutral">建议</PixelBadge>,
          color: 'border-slate-600',
        };
      case 'bonus':
        return {
          badge: <PixelBadge variant="success">加分</PixelBadge>,
          color: 'border-green-600',
        };
    }
  };

  // 分组
  const required = DEFAULT_DELIVERABLES.filter(d => d.type === 'required');
  const suggested = DEFAULT_DELIVERABLES.filter(d => d.type === 'suggested');
  const bonus = DEFAULT_DELIVERABLES.filter(d => d.type === 'bonus');

  return (
    <div className="border-4 border-slate-700 bg-slate-800/80 p-6">
      {/* 标题 */}
      <div className="flex items-center justify-center mb-6">
        <span className="text-2xl mr-2">📦</span>
        <h2 className="text-xl font-bold text-amber-500">交付物看板</h2>
        <span className="text-2xl ml-2">📦</span>
      </div>

      {/* 必交项 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <PixelBadge variant="warning">📌 必交</PixelBadge>
        </div>
        <div className="space-y-2">
          {required.map(item => {
            const style = getTypeStyle(item.type);
            const isChecked = checkedItems.has(item.id);
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-3 bg-slate-900/50 border-2 ${style.color} cursor-pointer hover:bg-slate-700/50 transition-colors`}
                onClick={() => toggleItem(item.id)}
              >
                <div className={`w-6 h-6 border-2 flex items-center justify-center ${isChecked ? 'bg-green-700 border-green-500' : 'bg-slate-800 border-slate-600'}`}>
                  {isChecked && <span className="text-green-300 text-sm">✓</span>}
                </div>
                <span className={`flex-1 ${isChecked ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                  {item.title}
                </span>
                {style.badge}
              </div>
            );
          })}
        </div>
      </div>

      {/* 建议补充 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <PixelBadge variant="neutral">💡 建议补充</PixelBadge>
        </div>
        <div className="space-y-2">
          {suggested.map(item => {
            const style = getTypeStyle(item.type);
            const isChecked = checkedItems.has(item.id);
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-3 bg-slate-900/50 border-2 ${style.color} cursor-pointer hover:bg-slate-700/50 transition-colors`}
                onClick={() => toggleItem(item.id)}
              >
                <div className={`w-6 h-6 border-2 flex items-center justify-center ${isChecked ? 'bg-green-700 border-green-500' : 'bg-slate-800 border-slate-600'}`}>
                  {isChecked && <span className="text-green-300 text-sm">✓</span>}
                </div>
                <span className={`flex-1 ${isChecked ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                  {item.title}
                </span>
                {style.badge}
              </div>
            );
          })}
        </div>
      </div>

      {/* 加分项 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <PixelBadge variant="success">⭐ 加分项</PixelBadge>
        </div>
        <div className="space-y-2">
          {bonus.map(item => {
            const style = getTypeStyle(item.type);
            const isChecked = checkedItems.has(item.id);
            return (
              <div
                key={item.id}
                className={`flex items-center gap-3 p-3 bg-slate-900/50 border-2 ${style.color} cursor-pointer hover:bg-slate-700/50 transition-colors`}
                onClick={() => toggleItem(item.id)}
              >
                <div className={`w-6 h-6 border-2 flex items-center justify-center ${isChecked ? 'bg-green-700 border-green-500' : 'bg-slate-800 border-slate-600'}`}>
                  {isChecked && <span className="text-green-300 text-sm">✓</span>}
                </div>
                <span className={`flex-1 ${isChecked ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                  {item.title}
                </span>
                {style.badge}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
