'use client';

import React, { useState } from 'react';
import { PixelCard, PixelButton, PixelBadge } from '@/components/pixel';
import ResourceRecommendDialog from '@/components/resource/ResourceRecommendDialog';
import RAGSearchDrawer from '@/components/resource/RAGSearchDrawer';
import MentorChatDialog from '@/components/mentor/MentorChatDialog';
import AIAgentPanel from '@/components/mentor/AIAgentPanel';
import { Resource, Mission } from '@/types';
import { careerIslands } from '@/data/careers';

interface CareerResourcePanelProps {
  resources: Resource[];
  careerId: string;
  missions: Mission[];
  missionId?: string;
  isDemoMode?: boolean;
  onScrollToTasks?: () => void;
}

export default function CareerResourcePanel({ 
  resources, 
  careerId,
  missions,
  missionId,
  isDemoMode,
  onScrollToTasks
}: CareerResourcePanelProps) {
  const [showResourceDialog, setShowResourceDialog] = useState(false);
  const [showMentorDialog, setShowMentorDialog] = useState(false);
  const [showRAGDrawer, setShowRAGDrawer] = useState(false);
  
  // 获取导师信息
  const careerIsland = careerIslands.find(island => island.id === careerId);

  return (
    <>
      {/* 新的 AI Agent 面板 */}
      <AIAgentPanel 
        careerId={careerId} 
        resources={resources}
        missionId={missionId}
        isDemoMode={isDemoMode}
        onOpenResourceDialog={() => setShowResourceDialog(true)}
        onOpenRAGDrawer={() => setShowRAGDrawer(true)}
        onScrollToTasks={onScrollToTasks}
      />

      {/* 成就徽章（保持原样）*/}
      <PixelCard title="🏆 成就徽章">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-slate-800 border-2 border-slate-700 text-center opacity-50">
            <span className="text-3xl">🔒</span>
            <p className="text-xs text-slate-400 mt-1">未解锁</p>
          </div>
          <div className="p-3 bg-slate-800 border-2 border-slate-700 text-center opacity-50">
            <span className="text-3xl">🔒</span>
            <p className="text-xs text-slate-400 mt-1">未解锁</p>
          </div>
          <div className="p-3 bg-slate-800 border-2 border-slate-700 text-center opacity-50">
            <span className="text-3xl">🔒</span>
            <p className="text-xs text-slate-400 mt-1">未解锁</p>
          </div>
          <div className="p-3 bg-slate-800 border-2 border-slate-700 text-center opacity-50">
            <span className="text-3xl">🔒</span>
            <p className="text-xs text-slate-400 mt-1">未解锁</p>
          </div>
        </div>
      </PixelCard>

      {/* 弹窗组件（保持原样）*/}
      <ResourceRecommendDialog
        open={showResourceDialog}
        onClose={() => setShowResourceDialog(false)}
      />

      <MentorChatDialog
        open={showMentorDialog}
        onClose={() => setShowMentorDialog(false)}
      />

      <RAGSearchDrawer
        open={showRAGDrawer}
        onClose={() => setShowRAGDrawer(false)}
        taskType={careerId as any}
      />
    </>
  );
}
