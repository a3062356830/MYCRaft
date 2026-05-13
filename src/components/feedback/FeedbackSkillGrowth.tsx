import React from 'react';
import { PixelCard, PixelProgress, PixelBadge } from '@/components/pixel';

interface SkillGrowth {
  name: string;
  xp: number;
  progress?: number;
}

interface FeedbackSkillGrowthProps {
  skills: SkillGrowth[];
  badge: string;
  totalXP: number;
}

export default function FeedbackSkillGrowth({
  skills,
  badge,
  totalXP
}: FeedbackSkillGrowthProps) {
  return (
    <>
      <PixelCard title="🏆 获得徽章">
        <div className="text-center space-y-4">
          <div>
            <div className="mx-auto w-32 h-32 bg-gradient-to-br from-amber-500 to-yellow-600 border-4 border-amber-400 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl mb-2">🔍</div>
              </div>
            </div>
            <div className="mt-4">
              <PixelBadge variant="honor" className="text-xl px-4 py-2">
                「{badge}」
              </PixelBadge>
            </div>
          </div>
        </div>
      </PixelCard>

      <PixelCard title="✨ 获得经验">
        <div className="text-center mb-4">
          <span className="text-3xl font-bold text-green-500">+{totalXP} XP</span>
        </div>
        <div className="space-y-3">
          {skills.map((skill, idx) => (
            <div 
              key={idx} 
              className="p-3 bg-slate-800 border-2 border-slate-700"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-300">{skill.name}</span>
                <span className="text-green-500 font-bold">+{skill.xp} XP</span>
              </div>
              <PixelProgress 
                value={skill.progress || 75} 
                color="#10b981"
              />
              <div className="text-xs text-green-600 mt-1">已计入成长记录</div>
            </div>
          ))}
        </div>
      </PixelCard>
    </>
  );
}
