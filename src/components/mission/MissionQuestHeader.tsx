import React from 'react';
import { PixelBadge } from '@/components/pixel';
import { Mission, MissionStatus } from '@/types';
import { BadgeVariant } from '@/constants/designSystem';

interface MissionQuestHeaderProps {
  mission: Mission;
  careerName: string;
}

// 任务图标映射
const MISSION_ICONS = ['📋', '🎯', '🔍', '💻', '📊', '🚀', '🎮', '⚡'];

// 状态颜色映射
const STATUS_COLORS: Record<MissionStatus, BadgeVariant> = {
  [MissionStatus.AVAILABLE]: 'neutral',
  [MissionStatus.ACCEPTED]: 'warning',
  [MissionStatus.SUBMITTED]: 'neutral',
  [MissionStatus.COMPLETED]: 'success',
  [MissionStatus.LOCKED]: 'neutral',
};

const STATUS_LABELS: Record<MissionStatus, string> = {
  [MissionStatus.AVAILABLE]: '可接受',
  [MissionStatus.ACCEPTED]: '进行中',
  [MissionStatus.SUBMITTED]: '待评审',
  [MissionStatus.COMPLETED]: '已完成',
  [MissionStatus.LOCKED]: '未解锁',
};

export default function MissionQuestHeader({ 
  mission, 
  careerName 
}: MissionQuestHeaderProps) {
  const icon = MISSION_ICONS[mission.id.split('').reduce((a, b) => (a + b.charCodeAt(0)), 0) % MISSION_ICONS.length];
  
  return (
    <div className="border-4 border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-6">
      {/* 顶部装饰线 */}
      <div className="flex items-center justify-center mb-4">
        <div className="h-1 bg-slate-600 flex-1 mx-2"></div>
        <span className="text-3xl">{icon}</span>
        <div className="h-1 bg-slate-600 flex-1 mx-2"></div>
      </div>

      {/* 文案引导 */}
      <p className="text-slate-400 text-center mb-4 italic">
        {'\"'}你收到了一份来自职业岛的任务委托。{'\"'}
      </p>

      {/* 任务标题 */}
      <h1 className="text-2xl font-bold text-amber-500 text-center mb-4">
        {mission.title}
      </h1>

      {/* 状态和奖励行 */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
        {/* 难度 */}
        <PixelBadge variant={
          mission.difficulty === 'easy' ? 'neutral' : 
          mission.difficulty === 'medium' ? 'warning' : 'success'
        }>
          {mission.difficulty === 'easy' ? '⭐ 入门级' : 
           mission.difficulty === 'medium' ? '⭐⭐ 进阶级' : '⭐⭐⭐ 专家级'}
        </PixelBadge>

        {/* 状态 */}
        <PixelBadge variant={STATUS_COLORS[mission.status]}>
          {STATUS_LABELS[mission.status]}
        </PixelBadge>

        {/* XP 奖励 */}
        <PixelBadge variant="honor">
          +{mission.rewardExp} XP
        </PixelBadge>

        {/* 所属职业 */}
        <PixelBadge variant="neutral">
          🏛️ {careerName}
        </PixelBadge>
      </div>

      {/* 底部装饰线 */}
      <div className="flex items-center justify-center">
        <div className="h-1 bg-slate-600 flex-1 mx-2"></div>
        <span className="text-slate-600 text-sm">任务卷轴</span>
        <div className="h-1 bg-slate-600 flex-1 mx-2"></div>
      </div>
    </div>
  );
}
