import React, { useState } from 'react';
import { PixelButton, PixelBadge, PixelDialog } from '@/components/pixel';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMissionStore } from '@/stores/missionStore';
import { Mission, MissionStatus } from '@/types';
import { ROUTES } from '@/constants';
import DemoHighlight from '@/components/demo/DemoHighlight';
import { MVP_RAG_RESOURCES } from '@/utils/demoFlow';

interface MissionStartPanelProps {
  mission: Mission;
}

export default function MissionStartPanel({ mission }: MissionStartPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemoMode = searchParams.get('demo') === '1';
  const demoStep = parseInt(searchParams.get('step') || '1', 10);
  const isMvpMission = mission.id === 'community-activity-drop';
  const [ragDialogOpen, setRagDialogOpen] = useState(false);
  const { acceptMission, getMissionStatus } = useMissionStore();
  const currentStatus = getMissionStatus(mission.id, mission.status);

  const getStatusLabel = (status: MissionStatus) => {
    switch (status) {
      case MissionStatus.AVAILABLE: return '可接受';
      case MissionStatus.ACCEPTED: return '进行中';
      case MissionStatus.SUBMITTED: return '待评审';
      case MissionStatus.COMPLETED: return '已完成';
      case MissionStatus.LOCKED: return '未解锁';
      default: return '未知';
    }
  };

  const handleAction = () => {
    const demoParam = isDemoMode ? '?demo=1' : '';
    switch (currentStatus) {
      case MissionStatus.AVAILABLE:
        acceptMission(mission.id);
        // Demo模式下，根据当前步骤决定跳转
        if (isDemoMode) {
          if (demoStep === 5) {
            // 步骤5：接受任务后跳转到提交报告页面
            router.push(ROUTES.MISSION_SUBMIT(mission.id) + demoParam + '&step=6');
          } else {
            // 其他步骤保持原逻辑
            router.push(ROUTES.CAREER('data-analyst') + demoParam);
          }
        } else {
          router.push(ROUTES.MISSION_SUBMIT(mission.id) + demoParam);
        }
        break;
      case MissionStatus.ACCEPTED:
        // Demo模式下，跳转到费曼挑战
        if (isDemoMode) {
          router.push(`/feynman/${mission.id}${demoParam}`);
        } else {
          router.push(ROUTES.MISSION_SUBMIT(mission.id) + demoParam);
        }
        break;
      case MissionStatus.SUBMITTED:
      case MissionStatus.COMPLETED:
        router.push(ROUTES.MISSION_FEEDBACK(mission.id) + demoParam);
        break;
    }
  };

  const getActionButtonText = () => {
    switch (currentStatus) {
      case MissionStatus.AVAILABLE: return '接受任务并开始';
      case MissionStatus.ACCEPTED: return '继续提交';
      case MissionStatus.SUBMITTED: return '查看评审';
      case MissionStatus.COMPLETED: return '查看报告';
      case MissionStatus.LOCKED: return '任务未解锁';
      default: return '开始';
    }
  };

  const getRecommendedAction = () => {
    switch (currentStatus) {
      case MissionStatus.AVAILABLE: return '阅读任务需求，准备开始';
      case MissionStatus.ACCEPTED: return '准备提交任务';
      case MissionStatus.SUBMITTED: return '等待 AI 导师评审';
      case MissionStatus.COMPLETED: return '查看反馈，继续下一个任务';
      case MissionStatus.LOCKED: return '完成前置任务后解锁';
      default: return '';
    }
  };

  return (
    <>
      <div 
        className={`
          border-4 bg-gradient-to-br from-slate-800 to-slate-900 p-6
          ${isDemoMode && isMvpMission && demoStep === 5 ? 'animate-pulse' : ''}
        `}
        style={{
          borderColor: isDemoMode && isMvpMission && demoStep === 5 ? '#6366f1' : '#334155',
          boxShadow: isDemoMode && isMvpMission && demoStep === 5 
            ? '0 0 30px rgba(99, 102, 241, 0.4)'
            : 'none',
        }}
      >
        {/* 标题 */}
        <div className="flex items-center justify-center mb-6">
          <span className="text-2xl mr-2">🚀</span>
          <h2 className="text-xl font-bold text-amber-500">任务控制台</h2>
          <span className="text-2xl ml-2">🚀</span>
        </div>

        {/* 当前状态 */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">当前状态</span>
            <PixelBadge 
              variant={
                currentStatus === MissionStatus.COMPLETED ? 'success' :
                currentStatus === MissionStatus.ACCEPTED ? 'warning' : 'neutral'
              }
            >
              {getStatusLabel(currentStatus)}
            </PixelBadge>
          </div>
        </div>

        {/* 推荐行动 */}
        <div className="mb-6 bg-slate-900/60 border-2 border-slate-700 p-4">
          <div className="text-slate-400 text-xs mb-1">推荐行动</div>
          <p className="text-slate-300">{getRecommendedAction()}</p>
        </div>

        {/* 预计耗时 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-400 text-sm">预计耗时</span>
            <span className="text-amber-400 font-bold">20-40 分钟</span>
          </div>
        </div>

        {/* 推荐资源 - Demo模式步骤3高亮 */}
        <DemoHighlight targetStep={3} currentStep={demoStep} label="推荐学习资源">
          <div className="mb-4 p-3 bg-slate-800/30 border-2 border-slate-700/50 rounded">
            <div className="text-slate-400 text-xs mb-2 flex items-center gap-2">
              <span className="text-lg">📚</span>
              <span className="font-bold">推荐学习资源</span>
            </div>
            <div className="space-y-2">
              <PixelButton
                fullWidth
                variant="secondary"
                onClick={() => setRagDialogOpen(true)}
                className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-600"
              >
                🔍 RAG 知识库检索
              </PixelButton>
              <p className="text-xs text-slate-500 text-center">
                查找相关学习材料
              </p>
            </div>
          </div>
        </DemoHighlight>

        {/* 准备度提示 */}
        <div className="mb-6 p-3 bg-amber-900/20 border-2 border-amber-700">
          <div className="flex items-center gap-2">
            <span className="text-amber-500">💡</span>
            <span className="text-amber-300 text-sm">准备好开始了吗？仔细阅读任务说明后再开始！</span>
          </div>
        </div>

        {/* 费曼挑战入口 */}
        <div className="mb-6">
          <PixelButton
            fullWidth
            variant="secondary"
            onClick={() => router.push(`/feynman/${mission.id}${isDemoMode ? '?demo=1' : ''}`)}
          >
            🧠 费曼理解挑战
          </PixelButton>
          <p className="text-xs text-slate-500 mt-2 text-center">
            先验证理解，再开始任务
          </p>
        </div>

        {/* 操作按钮 - Demo模式步骤5高亮 */}
        <DemoHighlight targetStep={5} currentStep={demoStep} label="接受任务">
          <div className="p-2 bg-slate-800/30 border-2 border-slate-700/50 rounded">
            <PixelButton
              fullWidth
              onClick={handleAction}
              disabled={currentStatus === MissionStatus.LOCKED}
              variant={isDemoMode && isMvpMission && demoStep === 5 ? 'primary' : 'primary'}
              className={isDemoMode && isMvpMission && demoStep === 5 ? 'bg-gradient-to-r from-green-900/50 to-green-800/50 border-green-500 text-green-200' : ''}
            >
              {getActionButtonText()}
            </PixelButton>
          </div>
        </DemoHighlight>
      </div>

      {/* RAG知识库检索弹窗 */}
      <PixelDialog
        open={ragDialogOpen}
        onClose={() => setRagDialogOpen(false)}
        title="🔍 RAG 知识库检索"
      >
        <div className="space-y-4">
          <p className="text-slate-300">
            以下是为这个任务推荐的学习资源：
          </p>
          
          {/* 搜索结果列表 */}
          <div className="space-y-3">
            {MVP_RAG_RESOURCES.map((resource) => (
              <div 
                key={resource.id}
                className="p-4 bg-slate-800/50 border-2 border-slate-600 hover:border-indigo-500 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-indigo-400 font-bold">{resource.category}</span>
                  <span className="text-slate-400 text-xs">•</span>
                </div>
                <h4 className="text-slate-200 font-bold mb-1">{resource.title}</h4>
                <p className="text-slate-400 text-sm">{resource.description}</p>
              </div>
            ))}
          </div>

          {/* Demo模式下添加前往费曼挑战的按钮 */}
          {isDemoMode && (
            <div className="pt-4 border-t-2 border-slate-600">
              <PixelButton
                fullWidth
                onClick={() => {
                  setRagDialogOpen(false);
                  router.push(`/feynman/${mission.id}?demo=1&step=4`);
                }}
              >
                ➜ 完成费曼挑战 (步骤4)
              </PixelButton>
            </div>
          )}
        </div>
      </PixelDialog>
    </>
  );
}
