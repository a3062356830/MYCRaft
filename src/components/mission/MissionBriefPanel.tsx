import React from 'react';
import { PixelCard, PixelBadge } from '@/components/pixel';
import { Mission, MissionStatus } from '@/types';
import { useMissionStore } from '@/stores/missionStore';

interface MissionBriefPanelProps {
  mission: Mission;
}

export default function MissionBriefPanel({ mission }: MissionBriefPanelProps) {
  const { getMissionStatus } = useMissionStore();
  const currentStatus = getMissionStatus(mission.id, mission.status);

  function getDifficultyBadge(difficulty: string) {
    switch (difficulty) {
      case 'easy': return { variant: 'fun' as const, text: '⭐ 简单' };
      case 'medium': return { variant: 'honor' as const, text: '⭐⭐ 中等' };
      case 'hard': return { variant: 'warning' as const, text: '⭐⭐⭐ 困难' };
      default: return { variant: 'neutral' as const, text: '未知' };
    }
  }

  function getStatusBadge(status: MissionStatus) {
    switch (status) {
      case MissionStatus.LOCKED: return { variant: 'neutral' as const, text: '🔒 未解锁' };
      case MissionStatus.AVAILABLE: return { variant: 'fun' as const, text: '✨ 可接受' };
      case MissionStatus.ACCEPTED: return { variant: 'honor' as const, text: '📝 进行中' };
      case MissionStatus.SUBMITTED: return { variant: 'neutral' as const, text: '⏳ 评审中' };
      case MissionStatus.COMPLETED: return { variant: 'honor' as const, text: '✅ 已完成' };
      default: return { variant: 'neutral' as const, text: '未知' };
    }
  }

  const difficultyBadge = getDifficultyBadge(mission.difficulty);
  const statusBadge = getStatusBadge(currentStatus);

  return (
    <PixelCard title="📋 任务概要">
      <div className="space-y-4">
        {/* 标题与状态 */}
        <div>
          <h3 className="text-lg font-bold text-white mb-2">{mission.title}</h3>
          <p className="text-slate-400 text-sm mb-3">{mission.description}</p>
          <div className="flex flex-wrap gap-2">
            <PixelBadge variant={difficultyBadge.variant}>
              {difficultyBadge.text}
            </PixelBadge>
            <PixelBadge variant={statusBadge.variant}>
              {statusBadge.text}
            </PixelBadge>
            <PixelBadge variant="honor">
              +{mission.rewardExp} XP
            </PixelBadge>
          </div>
        </div>

        {/* 任务背景 */}
        <div className="bg-slate-800 p-3 border-2 border-slate-700">
          <h4 className="text-amber-500 font-bold mb-2">📖 任务背景</h4>
          <p className="text-slate-300 text-sm">{mission.background}</p>
        </div>

        {/* 任务目标 */}
        <div className="bg-slate-800 p-3 border-2 border-slate-700">
          <h4 className="text-green-500 font-bold mb-2">🎯 任务目标</h4>
          <ul className="space-y-1">
            {(mission.objectives || []).map((obj, idx) => (
              <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                <span className="text-green-500">•</span>
                {obj}
              </li>
            ))}
          </ul>
        </div>

        {/* 关联技能 */}
        {mission.rewardSkills && mission.rewardSkills.length > 0 && (
          <div className="bg-slate-800 p-3 border-2 border-slate-700">
            <h4 className="text-blue-500 font-bold mb-2">🏆 关联技能</h4>
            <div className="flex flex-wrap gap-1">
              {mission.rewardSkills.map((skill, idx) => (
                <PixelBadge key={idx} variant="neutral" className="text-xs">
                  {skill}
                </PixelBadge>
              ))}
            </div>
          </div>
        )}
      </div>
    </PixelCard>
  );
}
