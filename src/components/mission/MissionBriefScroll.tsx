import React from 'react';
import { PixelBadge } from '@/components/pixel';
import { Mission } from '@/types';

interface MissionBriefScrollProps {
  mission: Mission;
}

export default function MissionBriefScroll({ mission }: MissionBriefScrollProps) {
  return (
    <div className="border-4 border-slate-700 bg-slate-800/80 p-6">
      {/* 标题装饰 */}
      <div className="flex items-center justify-center mb-6">
        <span className="text-2xl mr-2">📜</span>
        <h2 className="text-xl font-bold text-amber-500">任务说明书</h2>
        <span className="text-2xl ml-2">📜</span>
      </div>

      {/* 1. 任务背景 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <PixelBadge variant="neutral">1</PixelBadge>
          <h3 className="font-bold text-slate-300">任务背景</h3>
        </div>
        <div className="bg-slate-900/50 border-2 border-slate-700 p-4">
          <p className="text-slate-400">{mission.description}</p>
        </div>
      </div>

      {/* 2. 任务目标 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <PixelBadge variant="warning">2</PixelBadge>
          <h3 className="font-bold text-slate-300">任务目标</h3>
        </div>
        <div className="bg-slate-900/50 border-2 border-slate-700 p-4">
          <ul className="space-y-2">
            {mission.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500">🎯</span>
                <span className="text-slate-300">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 3. 为什么这个任务重要 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <PixelBadge variant="success">3</PixelBadge>
          <h3 className="font-bold text-slate-300">为什么这个任务重要</h3>
        </div>
        <div className="bg-slate-900/50 border-2 border-slate-700 p-4">
          <p className="text-slate-400">
            完成这个任务后，你将掌握实际工作中常用的技能，并能在真实项目中应用。通过实战练习，你将建立解决问题的思维方式。
          </p>
        </div>
      </div>

      {/* 4. 你将训练哪些能力 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <PixelBadge variant="honor">4</PixelBadge>
          <h3 className="font-bold text-slate-300">你将训练哪些能力</h3>
        </div>
        <div className="bg-slate-900/50 border-2 border-slate-700 p-4">
          <div className="flex flex-wrap gap-2">
            {mission.rewardSkills.map((skill, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 px-3 py-1 bg-green-900/30 text-green-400 border border-green-700 text-sm">
                +{skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
