import React from 'react';
import { PixelButton, PixelBadge, PixelCard } from '@/components/pixel';
import AgentThinkingPanel from './AgentThinkingPanel';
import AgentMissionFeed from './AgentMissionFeed';
import FeynmanChallengeCard from './FeynmanChallengeCard';
import { Resource } from '@/types';

interface AIAgentPanelProps {
  careerId: string;
  resources: Resource[];
  missionId?: string;
  isDemoMode?: boolean;
  onOpenResourceDialog?: () => void;
  onOpenRAGDrawer?: () => void;
  onScrollToTasks?: () => void;
}

const mentorConfig = {
  'software-engineer': {
    name: 'AI 技术主管',
    avatar: '🤖',
    status: '在线',
    mode: '分析任务中',
    prompt: '我正在检查你的问题复现思路。',
    avatarPath: '/assets/agents/growth-data-lead.png' // TODO: 需要用户补充素材
  },
  'data-analyst': {
    name: '增长数据 Lead',
    avatar: '📊',
    status: '在线',
    mode: '任务准备中',
    prompt: '我已经为你准备了一个适合初级数据分析师的企业场景任务。',
    avatarPath: '/assets/agents/growth-data-lead.png' // TODO: 需要用户补充素材
  }
};

export default function AIAgentPanel({ 
  careerId, 
  resources, 
  missionId,
  isDemoMode,
  onOpenResourceDialog,
  onOpenRAGDrawer,
  onScrollToTasks
}: AIAgentPanelProps) {
  const config = mentorConfig[careerId as keyof typeof mentorConfig] 
    || mentorConfig['software-engineer'];
  const isDataAnalyst = careerId === 'data-analyst';

  return (
    <div className="space-y-4">
      {/* Demo 主线提示 */}
      {isDemoMode && isDataAnalyst && (
        <PixelCard className="bg-indigo-900/20 border-indigo-600">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🎯</span>
            <div>
              <h4 className="text-indigo-300 font-bold mb-1">
                主线任务提示
              </h4>
              <p className="text-slate-300 text-sm mb-3">
                我已经为你准备了一个适合初级数据分析师的企业场景任务。
              </p>
              <PixelButton
                variant="primary"
                onClick={onScrollToTasks}
                className="w-full text-sm"
              >
                📋 查看主管任务
              </PixelButton>
            </div>
          </div>
        </PixelCard>
      )}

      {/* AI 状态区（顶部）*/}
      <div className="border-4 border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="relative">
            {/* TODO: 占位符 - 用户后续可以替换为真实图片 */}
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-indigo-800 border-3 border-indigo-500 flex items-center justify-center">
              <span className="text-2xl">{config.avatar}</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-indigo-400">{config.name}</h3>
            <div className="flex items-center gap-2">
              <PixelBadge variant="success" className="text-xs">
                {config.status}
              </PixelBadge>
              <PixelBadge variant="neutral" className="text-xs">
                {config.mode}
              </PixelBadge>
            </div>
          </div>
        </div>
        <div className="p-2 bg-slate-800/50 border-2 border-slate-700">
          <p className="text-slate-300 text-xs italic">
            💬 {'\"'}{config.prompt}{'\"'}
          </p>
        </div>
      </div>

      {/* 当前任务分析 */}
      <AgentThinkingPanel careerId={careerId} />

      {/* 推荐资源（RAG模拟）*/}
      <AgentMissionFeed 
        resources={resources} 
        careerId={careerId}
        onOpenRAGDrawer={onOpenRAGDrawer}
      />

      {/* 费曼挑战（核心亮点）*/}
      <FeynmanChallengeCard careerId={careerId} missionId={missionId} />

      {/* 快捷操作区 */}
      <div className="border-4 border-slate-700 bg-slate-800/50 p-3">
        <h4 className="text-slate-400 text-xs mb-2 font-medium">快捷操作</h4>
        <div className="grid grid-cols-2 gap-2">
          <PixelButton variant="secondary" className="text-xs py-2">
            继续任务
          </PixelButton>
          <PixelButton variant="secondary" className="text-xs py-2">
            查看反馈
          </PixelButton>
          <PixelButton 
            variant="secondary" 
            className="text-xs py-2"
            onClick={onOpenResourceDialog}
          >
            推荐资源
          </PixelButton>
          <PixelButton 
            variant="primary" 
            className="text-xs py-2"
            onClick={onOpenRAGDrawer}
          >
            🔍 RAG 检索
          </PixelButton>
        </div>
      </div>
    </div>
  );
}
