import React from 'react';
import { PixelBadge } from '@/components/pixel';

interface CareerIslandHeroProps {
  careerId: string;
  careerName: string;
}

const CAREER_CONFIG: Record<string, {
  islandName: string;
  icons: string[];
  welcomeMessage: string;
  mentorName: string;
  mentorAvatar: string;
}> = {
  'software-engineer': {
    islandName: '软件工程岛',
    icons: ['💻', '🛠️', '🧪', '🐞'],
    welcomeMessage: '欢迎来到软件工程岛，真正的工程师从复现问题开始。',
    mentorName: '架构大师',
    mentorAvatar: '👨‍💻'
  },
  'data-analyst': {
    islandName: '数据山脉',
    icons: ['📊', '🧭', '🗂️', '💎'],
    welcomeMessage: '欢迎来到数据山脉，先从混乱数据中找到线索。',
    mentorName: '数据探险家',
    mentorAvatar: '👨‍🔬'
  }
};

export default function CareerIslandHero({ careerId, careerName }: CareerIslandHeroProps) {
  const config = CAREER_CONFIG[careerId] || CAREER_CONFIG['software-engineer'];

  return (
    <div className="relative overflow-hidden border-4 border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-6">
      {/* 装饰性岛屿视觉元素 */}
      <div className="absolute top-4 right-4 opacity-20 text-6xl">
        {config.icons[0]}
      </div>
      <div className="absolute bottom-4 right-12 opacity-15 text-4xl">
        {config.icons[1]}
      </div>
      
      <div className="relative z-10">
        {/* 职业岛名称 */}
        <div className="flex items-center gap-3 mb-3">
          {config.icons.map((icon, idx) => (
            <span key={idx} className="text-3xl">{icon}</span>
          ))}
          <h1 className="text-3xl font-bold text-amber-500 tracking-wider">
            {config.islandName}
          </h1>
        </div>

        {/* 职业名称 */}
        <div className="text-xl text-slate-300 mb-4 font-medium">
          🎯 {careerName}
        </div>

        {/* 导师信息 */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-700 border-4 border-amber-500 flex items-center justify-center flex-shrink-0">
            <span className="text-4xl">{config.mentorAvatar}</span>
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold text-amber-400 mb-1">
              {config.mentorName}
            </div>
            <p className="text-slate-300 leading-relaxed">
              {'\"'}{config.welcomeMessage}{'\"'}
            </p>
          </div>
        </div>

        {/* 当前阶段 */}
        <div className="flex items-center gap-3">
          <PixelBadge variant="warning">
            📍 当前阶段：入门试炼
          </PixelBadge>
        </div>
      </div>
    </div>
  );
}
