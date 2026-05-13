'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { PixelCard, PixelButton, PixelBadge } from '@/components/pixel';
import { IslandStatus } from './CareerIslandNode';

interface CareerPreviewPanelProps {
  career: {
    id: string;
    name: string;
    islandName: string;
    icon: string;
    status: IslandStatus;
    description: string;
    mentor: string;
    currentTheme: string;
    representativeTask: string;
    skills: string[];
    targetAudience: string;
  } | null;
}

export default function CareerPreviewPanel({ career }: CareerPreviewPanelProps) {
  const router = useRouter();

  if (!career) {
    return (
      <PixelCard title="📋 职业预览">
        <div className="text-center py-8">
          <div className="text-4xl mb-4">👆</div>
          <p className="text-slate-400 text-sm">
            点击地图上的岛屿查看详细信息
          </p>
        </div>
      </PixelCard>
    );
  }

  const isAvailable = career.status === 'available' || career.status === 'in-progress' || career.status === 'completed';

  return (
    <PixelCard title="📋 职业预览" className="h-full">
      <div className="space-y-4">
        {/* 头部信息 */}
        <div className="flex items-center gap-4 p-3 bg-slate-800/50 border-2 border-slate-700">
          <div className="text-5xl">{career.icon}</div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-amber-400">{career.name}</h3>
            <p className="text-slate-400 text-sm">{career.islandName}</p>
            <div className="mt-1">
              <PixelBadge
                variant={
                  career.status === 'available' ? 'success' :
                  career.status === 'in-progress' ? 'warning' :
                  career.status === 'completed' ? 'fun' : 'neutral'
                }
              >
                {career.status === 'available' ? '可进入' :
                 career.status === 'in-progress' ? '训练中' :
                 career.status === 'completed' ? '已完成' : '即将开放'}
              </PixelBadge>
            </div>
          </div>
        </div>

        {/* 导师信息 */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
            <span>👤</span> 导师
          </h4>
          <p className="text-amber-300 text-sm">{career.mentor}</p>
        </div>

        {/* 当前训练主题 */}
        {isAvailable && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <span>🎯</span> 当前训练主题
            </h4>
            <p className="text-slate-300 text-sm">{career.currentTheme}</p>
          </div>
        )}

        {/* 代表任务 */}
        {isAvailable && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <span>📝</span> 代表任务
            </h4>
            <p className="text-slate-400 text-sm">{career.representativeTask}</p>
          </div>
        )}

        {/* 可训练技能 */}
        {isAvailable && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <span>🛠️</span> 可训练技能
            </h4>
            <div className="flex flex-wrap gap-2">
              {career.skills.map((skill, index) => (
                <PixelBadge key={index} variant="neutral" className="text-xs">
                  {skill}
                </PixelBadge>
              ))}
            </div>
          </div>
        )}

        {/* 推荐人群 */}
        {isAvailable && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <span>👥</span> 推荐人群
            </h4>
            <p className="text-slate-400 text-sm">{career.targetAudience}</p>
          </div>
        )}

        {/* 操作按钮 */}
        {isAvailable && (
          <PixelButton
            variant="primary"
            className="w-full"
            onClick={() => router.push(`/career/${career.id}`)}
          >
            🚀 进入职业岛
          </PixelButton>
        )}

        {!isAvailable && (
          <div className="text-center py-4">
            <p className="text-slate-500 text-sm">⏳ 敬请期待</p>
          </div>
        )}
      </div>
    </PixelCard>
  );
}
