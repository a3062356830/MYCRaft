'use client';

import React, { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppShell, PageContainer } from '@/components/layout';
import { PixelButton, PixelCard, PixelBadge } from '@/components/pixel';
import CareerWorldMap from '@/components/lobby/CareerWorldMap';
import WorldMapLegend from '@/components/lobby/WorldMapLegend';
import CareerPreviewPanel from '@/components/lobby/CareerPreviewPanel';
import DemoGuideBar from '@/components/demo/DemoGuideBar';
import { IslandStatus } from '@/components/lobby/CareerIslandNode';

interface CareerIsland {
  id: string;
  name: string;
  islandName: string;
  icon: string;
  status: IslandStatus;
  description: string;
  position: { x: number; y: number };
  mentor: string;
  currentTheme: string;
  representativeTask: string;
  skills: string[];
  targetAudience: string;
}

export default function LobbyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemoMode = searchParams.get('demo') === '1';
  const [selectedIsland, setSelectedIsland] = useState<CareerIsland | null>(null);

  const handleIslandSelect = (island: CareerIsland | null) => {
    setSelectedIsland(island);
  };

  return (
    <AppShell>
      <PageContainer maxWidth="7xl" className="py-6">
        {isDemoMode && (
          <DemoGuideBar 
            currentStep={7} 
            nextStepTitle="重新体验 MVP 演示"
            nextStepAction="/career/data-analyst?demo=1"
          />
        )}

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-indigo-400 mb-2">
            🌍 职业大陆
          </h1>
          <p className="text-slate-400">
            选择一座职业岛，开始你的 AI 驱动职业训练。
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          <PixelBadge variant="primary" className="text-sm">
            🤖 AI 主管生成任务
          </PixelBadge>
          <PixelBadge variant="success" className="text-sm">
            📚 RAG 精准资源推荐
          </PixelBadge>
          <PixelBadge variant="warning" className="text-sm">
            🧠 费曼挑战理解检测
          </PixelBadge>
          <PixelBadge variant="primary" className="text-sm">
            🌱 技能树成长反馈
          </PixelBadge>
        </div>

        <div className="text-center mb-8">
          <div className={`
            inline-block p-4 
            ${!isDemoMode ? 'animate-pulse bg-gradient-to-r from-indigo-900/40 via-indigo-800/30 to-indigo-900/40 border-2 border-indigo-400 rounded-lg shadow-lg shadow-indigo-500/30' : ''}
          `}>
            <PixelButton
              variant="primary"
              onClick={() => router.push('/career/data-analyst?demo=1')}
              className={`text-lg px-8 py-4 ${!isDemoMode ? 'animate-bounce' : ''}`}
            >
              🚀 开始 MVP 演示
            </PixelButton>
          </div>
          <p className="text-slate-500 text-sm mt-2">
            体验完整的 AI 驱动职业训练流程
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <CareerWorldMap onIslandSelect={handleIslandSelect} />
            <WorldMapLegend />

            <div className="grid grid-cols-2 gap-4">
              <div className="relative group">
                <div className={`
                  absolute inset-0 rounded-lg
                  ${!isDemoMode ? 'bg-gradient-to-r from-indigo-600/30 to-indigo-500/20 animate-pulse' : ''}
                `} />
                <PixelButton
                  variant="primary"
                  onClick={() => router.push('/career/data-analyst')}
                  className="w-full text-base py-3 relative z-10"
                >
                  📊 进入数据山脉
                </PixelButton>
              </div>
              <PixelButton
                variant="primary"
                onClick={() => router.push('/career/software-engineer')}
                className="w-full"
              >
                💻 进入软件工程岛
              </PixelButton>
            </div>

            <div className="text-center">
              <PixelButton
                variant="secondary"
                onClick={() => router.push('/portfolio')}
              >
                📂 查看成长档案
              </PixelButton>
            </div>
          </div>

          <div className="lg:col-span-1">
            <CareerPreviewPanel career={selectedIsland} />
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-slate-500 text-sm">
            💡 点击地图上的岛屿查看详细信息，然后开始你的冒险之旅！
          </p>
        </div>
      </PageContainer>
    </AppShell>
  );
}
