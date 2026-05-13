import React from 'react';
import { PixelBadge } from '@/components/pixel';

interface CareerAtmospherePanelProps {
  careerId: string;
}

const ATMOSPHERE_CONFIG: Record<string, {
  islandStatus: string;
  trainingTheme: string;
  mentorTip: string;
  practiceMethod: string;
}> = {
  'software-engineer': {
    islandStatus: 'Bug 活跃',
    trainingTheme: '复现、定位、修复',
    mentorTip: '先写出最小复现场景，再考虑解决方案。',
    practiceMethod: '在本地环境中刻意练习调试技巧'
  },
  'data-analyst': {
    islandStatus: '数据雾气较重',
    trainingTheme: '从异常值中识别业务问题',
    mentorTip: '不要急着画图，先理解字段含义。',
    practiceMethod: '用真实数据集做探索性分析'
  }
};

export default function CareerAtmospherePanel({ careerId }: CareerAtmospherePanelProps) {
  const config = ATMOSPHERE_CONFIG[careerId] || ATMOSPHERE_CONFIG['software-engineer'];

  return (
    <div className="border-4 border-slate-700 bg-slate-800/60 p-5">
      <h3 className="text-lg font-bold text-amber-500 mb-4 flex items-center gap-2">
        <span>🌤️</span>
        <span>今日岛屿状态</span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 岛屿状态 */}
        <div className="bg-slate-900/70 border-2 border-slate-700 p-3">
          <div className="text-slate-400 text-xs mb-1">🏝️ 今日岛屿</div>
          <div className="text-amber-400 font-medium">{config.islandStatus}</div>
        </div>

        {/* 训练主题 */}
        <div className="bg-slate-900/70 border-2 border-slate-700 p-3">
          <div className="text-slate-400 text-xs mb-1">📚 训练主题</div>
          <div className="text-green-400 font-medium">{config.trainingTheme}</div>
        </div>

        {/* 导师提示 */}
        <div className="bg-slate-900/70 border-2 border-slate-700 p-3 md:col-span-2">
          <div className="text-slate-400 text-xs mb-2">💡 导师提示</div>
          <p className="text-slate-300 text-sm italic">
            {'\"'}{config.mentorTip}{'\"'}
          </p>
        </div>

        {/* 推荐练习 */}
        <div className="bg-slate-900/70 border-2 border-slate-700 p-3 md:col-span-2">
          <div className="flex items-center gap-2">
            <PixelBadge variant="neutral" className="text-xs">
              推荐练习
            </PixelBadge>
            <span className="text-slate-300 text-sm">
              {config.practiceMethod}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
