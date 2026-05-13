'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { PixelCard, PixelBadge, PixelDialog, PixelButton } from '@/components/pixel';
import { MissionKanbanColumn, AIMissionGenerator } from '@/components/mission';
import { Mission, MissionStatus } from '@/types';
import { useMissionStore } from '@/stores/missionStore';
import { ROUTES } from '@/constants';

interface CareerTaskBoardProps {
  missions: Mission[];
  careerId: string;
  isDemoMode?: boolean;
}

export default function CareerTaskBoard({ missions, careerId, isDemoMode = false }: CareerTaskBoardProps) {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const router = useRouter();
  
  const { getMissionStatus, acceptMission } = useMissionStore();
  
  // 判断是否是 MVP 任务
  const isMvpMission = (mission: Mission) => {
    if (!isDemoMode || careerId !== 'data-analyst') return false;
    return (
      mission.title.includes('活跃度') || 
      mission.title.includes('用户活跃') ||
      mission.id.includes('mvp') ||
      mission.id.includes('data-analyst-001')
    );
  };

  // 按状态分组任务
  const groupedMissions = useMemo(() => {
    const groups: Record<string, { mission: Mission; currentStatus: MissionStatus }[]> = {
      available: [],
      accepted: [],
      submitted: [],
      completed: [],
      locked: [],
    };

    (missions || []).forEach((mission) => {
      const currentStatus = getMissionStatus(mission.id, mission.status);
      
      switch (currentStatus) {
        case MissionStatus.AVAILABLE:
          groups.available.push({ mission, currentStatus });
          break;
        case MissionStatus.ACCEPTED:
          groups.accepted.push({ mission, currentStatus });
          break;
        case MissionStatus.SUBMITTED:
          groups.submitted.push({ mission, currentStatus });
          break;
        case MissionStatus.COMPLETED:
          groups.completed.push({ mission, currentStatus });
          break;
        case MissionStatus.LOCKED:
        default:
          groups.locked.push({ mission, currentStatus });
          break;
      }
    });

    return groups;
  }, [missions, getMissionStatus]);

  const getDifficultyBadge = useCallback((difficulty: string) => {
    switch (difficulty) {
      case 'easy': return { variant: 'fun' as const, text: '⭐ 简单' };
      case 'medium': return { variant: 'honor' as const, text: '⭐⭐ 中等' };
      case 'hard': return { variant: 'warning' as const, text: '⭐⭐⭐ 困难' };
      default: return { variant: 'neutral' as const, text: '未知' };
    }
  }, []);

  const getStatusBadge = useCallback((status: MissionStatus) => {
    switch (status) {
      case MissionStatus.LOCKED: return { variant: 'neutral' as const, text: '🔒 未解锁' };
      case MissionStatus.AVAILABLE: return { variant: 'fun' as const, text: '✨ 可接受' };
      case MissionStatus.ACCEPTED: return { variant: 'honor' as const, text: '📝 进行中' };
      case MissionStatus.SUBMITTED: return { variant: 'neutral' as const, text: '⏳ 评审中' };
      case MissionStatus.COMPLETED: return { variant: 'honor' as const, text: '✅ 已完成' };
      default: return { variant: 'neutral' as const, text: '未知' };
    }
  }, []);

  const getStatusColor = useCallback((status: MissionStatus) => {
    switch (status) {
      case MissionStatus.LOCKED: return '#64748b';
      case MissionStatus.AVAILABLE: return '#10b981';
      case MissionStatus.ACCEPTED: return '#3b82f6';
      case MissionStatus.SUBMITTED: return '#f59e0b';
      case MissionStatus.COMPLETED: return '#8b5cf6';
      default: return '#64748b';
    }
  }, []);

  const getButtonText = useCallback((status: MissionStatus) => {
    switch (status) {
      case MissionStatus.LOCKED: return '🔒 未解锁';
      case MissionStatus.AVAILABLE: return '✅ 接受任务';
      case MissionStatus.ACCEPTED: return '📝 继续任务';
      case MissionStatus.SUBMITTED: return '📋 查看反馈';
      case MissionStatus.COMPLETED: return '📋 查看报告';
      default: return '查看';
    }
  }, []);

  const handleCardClick = useCallback((mission: Mission) => {
    const currentStatus = getMissionStatus(mission.id, mission.status);
    if (currentStatus === MissionStatus.LOCKED) {
      return;
    }
    setSelectedMission(mission);
  }, [getMissionStatus]);

  const handleButtonClick = useCallback((mission: Mission, currentStatus: MissionStatus) => {
    if (currentStatus === MissionStatus.LOCKED) {
      return;
    }
    
    const demoParam = isDemoMode ? '?demo=1' : '';
    
    if (currentStatus === MissionStatus.AVAILABLE) {
      acceptMission(mission.id);
      router.push(ROUTES.MISSION_SUBMIT(mission.id) + demoParam);
    } else if (currentStatus === MissionStatus.ACCEPTED) {
      router.push(ROUTES.MISSION_SUBMIT(mission.id) + demoParam);
    } else if (currentStatus === MissionStatus.SUBMITTED || currentStatus === MissionStatus.COMPLETED) {
      router.push(ROUTES.MISSION_FEEDBACK(mission.id) + demoParam);
    }
  }, [acceptMission, router, isDemoMode]);

  return (
    <>
      <div id="career-task-board">
        {/* AI 任务生成按钮 */}
        <div className="flex justify-end mb-4">
          <PixelButton 
            onClick={() => setIsGeneratorOpen(true)}
          >
            🤖 让 AI 主管生成新任务
          </PixelButton>
        </div>

        {/* Kanban 看板 - 四列布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
          {/* 列1: 待领取 */}
          <MissionKanbanColumn
            title="待领取"
            icon="📋"
            status={MissionStatus.AVAILABLE}
            missions={groupedMissions.available}
            onCardClick={handleCardClick}
            onButtonClick={handleButtonClick}
            isMvpMission={isMvpMission}
          />
          
          {/* 列2: 进行中 */}
          <MissionKanbanColumn
            title="进行中"
            icon="📝"
            status={MissionStatus.ACCEPTED}
            missions={groupedMissions.accepted}
            onCardClick={handleCardClick}
            onButtonClick={handleButtonClick}
            isMvpMission={isMvpMission}
          />
          
          {/* 列3: 评审中 */}
          <MissionKanbanColumn
            title="评审中"
            icon="⏳"
            status={MissionStatus.SUBMITTED}
            missions={groupedMissions.submitted}
            onCardClick={handleCardClick}
            onButtonClick={handleButtonClick}
            isMvpMission={isMvpMission}
          />
          
          {/* 列4: 已完成 */}
          <MissionKanbanColumn
            title="已完成"
            icon="✅"
            status={MissionStatus.COMPLETED}
            missions={groupedMissions.completed}
            onCardClick={handleCardClick}
            onButtonClick={handleButtonClick}
            isMvpMission={isMvpMission}
          />
        </div>

        {/* 未解锁任务区域 */}
        {groupedMissions.locked.length > 0 && (
          <PixelCard title="🔒 未解锁任务">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {groupedMissions.locked.map(({ mission, currentStatus }) => (
                <div
                  key={mission.id}
                  className="p-4 border-2 opacity-60"
                  style={{
                    backgroundColor: '#1e293b',
                    borderColor: '#475569',
                    boxShadow: 'inset -2px -2px 0px 0px #0f172a, inset 2px 2px 0px 0px #334155',
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold text-slate-500">
                      {mission.title}
                    </h3>
                    <PixelBadge variant="neutral" className="text-xs">
                      🔒 未解锁
                    </PixelBadge>
                  </div>
                  
                  <p className="text-slate-600 text-xs mb-3">
                    完成前置任务后解锁
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    <PixelBadge variant="neutral" className="text-xs">
                      {mission.difficulty === 'easy' ? '⭐ 简单' : 
                       mission.difficulty === 'medium' ? '⭐⭐ 中等' : '⭐⭐⭐ 困难'}
                    </PixelBadge>
                    <PixelBadge variant="neutral" className="text-xs">
                      +{mission.rewardExp} XP
                    </PixelBadge>
                  </div>
                </div>
              ))}
            </div>
          </PixelCard>
        )}
      </div>

      {/* 任务详情弹窗 */}
      {selectedMission && (
        <PixelDialog
          open={!!selectedMission}
          onClose={() => setSelectedMission(null)}
          title={`📋 ${selectedMission.title}`}
        >
          <div className="space-y-4">
            {(() => {
              const currentStatus = getMissionStatus(selectedMission.id, selectedMission.status);
              const difficultyBadge = getDifficultyBadge(selectedMission.difficulty);
              const statusBadge = getStatusBadge(currentStatus);
              const isLocked = currentStatus === MissionStatus.LOCKED;
              
              return (
                <>
                  <div className="flex gap-2 flex-wrap">
                    <PixelBadge variant={difficultyBadge.variant}>
                      {difficultyBadge.text}
                    </PixelBadge>
                    <PixelBadge variant={statusBadge.variant}>
                      {statusBadge.text}
                    </PixelBadge>
                    <PixelBadge variant="honor">
                      +{selectedMission.rewardExp} XP
                    </PixelBadge>
                    {selectedMission.rewardSkills && selectedMission.rewardSkills.length > 0 && (
                      <PixelBadge variant="neutral">
                        🏆 {selectedMission.rewardSkills.length} 技能
                      </PixelBadge>
                    )}
                  </div>

                  <div className="bg-slate-800 p-4 border-2 border-slate-700">
                    <h4 className="text-amber-500 font-bold mb-2">📖 任务背景</h4>
                    <p className="text-slate-300">{selectedMission.background}</p>
                  </div>

                  <div className="bg-slate-800 p-4 border-2 border-slate-700">
                    <h4 className="text-green-500 font-bold mb-2">🎯 任务目标</h4>
                    <ul className="space-y-1">
                      {(selectedMission.objectives || []).map((obj, idx) => (
                        <li key={idx} className="text-slate-300 flex items-center gap-2">
                          <span className="text-green-500">•</span> {obj}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-800 p-4 border-2 border-slate-700">
                    <h4 className="text-blue-500 font-bold mb-2">📦 交付物</h4>
                    <ul className="space-y-1">
                      {(selectedMission.deliverables || []).map((del, idx) => (
                        <li key={idx} className="text-slate-300 flex items-center gap-2">
                          <span className="text-blue-500">☑️</span> {del}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-800 p-4 border-2 border-slate-700">
                    <h4 className="text-purple-500 font-bold mb-2">✅ 评审标准</h4>
                    <ul className="space-y-1">
                      {(selectedMission.criteria || []).map((crit, idx) => (
                        <li key={idx} className="text-slate-300 flex items-center gap-2">
                          <span className="text-purple-500">✓</span> {crit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <PixelButton variant="secondary" onClick={() => setSelectedMission(null)}>
                      关闭
                    </PixelButton>
                    {!isLocked && (
                      <PixelButton 
                        onClick={() => handleButtonClick(selectedMission, currentStatus)}
                        disabled={isLocked}
                      >
                        {getButtonText(currentStatus)}
                      </PixelButton>
                    )}
                  </div>
                </>
              );
            })()}
          </div>
        </PixelDialog>
      )}

      {/* AI 任务生成对话框 */}
      <AIMissionGenerator
        open={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        careerId={careerId}
      />
    </>
  );
}
