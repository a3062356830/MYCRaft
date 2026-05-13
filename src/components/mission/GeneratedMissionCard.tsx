import React from 'react';
import { PixelCard, PixelBadge, PixelButton } from '@/components/pixel';

// 生成的任务数据结构
export interface GeneratedMission {
  id: string;
  title: string;
  aiLead: string;
  businessBackground: string;
  objectives: string[];
  deliverables: string[];
  reviewCriteria: string[];
  recommendedSkills: string[];
  recommendedResources: string[];
  estimatedTime: string;
  rewardXP: number;
  difficulty: string;
  type: string;
}

interface GeneratedMissionCardProps {
  mission: GeneratedMission;
  onAccept: () => void;
  onRegenerate: () => void;
  onClose: () => void;
}

const DIFFICULTY_COLOR = {
  easy: { badge: 'fun', text: '⭐ 入门' },
  medium: { badge: 'honor', text: '⭐⭐ 进阶' },
  hard: { badge: 'warning', text: '⭐⭐⭐ 挑战' },
};

const TYPE_COLOR = {
  ticket: { badge: 'neutral', text: '企业工单' },
  project: { badge: 'honor', text: '项目委托' },
  interview: { badge: 'warning', text: '面试实战' },
  feynman: { badge: 'fun', text: '费曼挑战' },
};

export default function GeneratedMissionCard({ 
  mission, 
  onAccept, 
  onRegenerate, 
  onClose 
}: GeneratedMissionCardProps) {
  const difficultyConfig = DIFFICULTY_COLOR[mission.difficulty as keyof typeof DIFFICULTY_COLOR] || DIFFICULTY_COLOR.easy;
  const typeConfig = TYPE_COLOR[mission.type as keyof typeof TYPE_COLOR] || TYPE_COLOR.ticket;

  return (
    <div className="space-y-4">
      {/* 头部信息 */}
      <PixelCard title={`📋 ${mission.title}`}>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <PixelBadge variant={difficultyConfig.badge as any}>
              {difficultyConfig.text}
            </PixelBadge>
            <PixelBadge variant={typeConfig.badge as any}>
              {typeConfig.text}
            </PixelBadge>
            <PixelBadge variant="honor">
              +{mission.rewardXP} XP
            </PixelBadge>
            <PixelBadge variant="neutral">
              ⏱️ {mission.estimatedTime}
            </PixelBadge>
          </div>
          
          <div className="bg-slate-800 border-2 border-slate-700 p-3">
            <div className="text-amber-500 text-sm font-bold mb-1">
              🤖 {mission.aiLead}
            </div>
          </div>
        </div>
      </PixelCard>

      {/* 业务背景 */}
      <PixelCard title="🏢 业务背景">
        <p className="text-slate-300 text-sm">{mission.businessBackground}</p>
      </PixelCard>

      {/* 任务目标 */}
      <PixelCard title="🎯 任务目标">
        <ul className="space-y-1">
          {mission.objectives.map((obj, idx) => (
            <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-green-500">•</span>
              <span>{obj}</span>
            </li>
          ))}
        </ul>
      </PixelCard>

      {/* 交付物 */}
      <PixelCard title="📦 交付物">
        <ul className="space-y-1">
          {mission.deliverables.map((del, idx) => (
            <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-blue-500">☑️</span>
              <span>{del}</span>
            </li>
          ))}
        </ul>
      </PixelCard>

      {/* 评审标准 */}
      <PixelCard title="✅ 评审标准">
        <ul className="space-y-1">
          {mission.reviewCriteria.map((crit, idx) => (
            <li key={idx} className="flex items-start gap-2 text-slate-300 text-sm">
              <span className="text-purple-500">✓</span>
              <span>{crit}</span>
            </li>
          ))}
        </ul>
      </PixelCard>

      {/* 推荐资源 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PixelCard title="🏆 推荐技能">
          <div className="flex flex-wrap gap-2">
            {mission.recommendedSkills.map((skill, idx) => (
              <PixelBadge key={idx} variant="fun">
                +{skill}
              </PixelBadge>
            ))}
          </div>
        </PixelCard>

        <PixelCard title="📚 推荐资源">
          <ul className="space-y-1">
            {mission.recommendedResources.map((resource, idx) => (
              <li key={idx} className="text-slate-300 text-sm">
                <span className="text-amber-500 mr-2">•</span>
                {resource}
              </li>
            ))}
          </ul>
        </PixelCard>
      </div>

      {/* 操作按钮 */}
      <div className="flex flex-wrap gap-3 justify-end">
        <PixelButton variant="secondary" onClick={onClose}>
          关闭
        </PixelButton>
        <PixelButton variant="secondary" onClick={onRegenerate}>
          🔄 重新生成
        </PixelButton>
        <PixelButton onClick={onAccept}>
          ✅ 接受这个任务
        </PixelButton>
      </div>
    </div>
  );
}
