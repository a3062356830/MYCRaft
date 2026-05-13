'use client';

import React, { useState } from 'react';
import { PixelProgress, PixelDialog, PixelButton } from '@/components/pixel';
import CareerStageCard, { StageStatus } from './CareerStageCard';
import { useMissionStore } from '@/stores/missionStore';
import { MissionStatus } from '@/types';
import { Mission } from '@/types';

interface CareerStage {
  stageNumber: number;
  name: string;
  description: string;
  recommendedMissions: number;
  reward: string;
  objectives: string[];
  recommendedMissionIds: string[];
  unlockCondition: string;
}

const careerStages: Record<string, CareerStage[]> = {
  'software-engineer': [
    {
      stageNumber: 1,
      name: '入门试炼',
      description: '掌握软件开发的基本技能，完成第一个实战项目',
      recommendedMissions: 1,
      reward: '🏆 漏洞捕手徽章',
      objectives: [
        '学习代码调试技巧',
        '完成第一个实战任务',
        '建立开发自信心'
      ],
      recommendedMissionIds: ['se-bug-hunter'],
      unlockCondition: '无需前置条件'
    },
    {
      stageNumber: 2,
      name: '核心能力',
      description: '深入学习核心技术，掌握单元测试和API开发',
      recommendedMissions: 2,
      reward: '🏆 单测守门人徽章',
      objectives: [
        '掌握单元测试框架',
        '学习API设计规范',
        '提升代码质量'
      ],
      recommendedMissionIds: ['se-unit-test', 'se-api-builder'],
      unlockCondition: '完成至少 1 个任务'
    },
    {
      stageNumber: 3,
      name: '综合项目',
      description: '挑战更复杂的项目，学习持续集成和性能优化',
      recommendedMissions: 2,
      reward: '🏆 API 铸造师徽章',
      objectives: [
        '搭建CI/CD流水线',
        '学习性能优化技巧',
        '掌握代码重构'
      ],
      recommendedMissionIds: ['se-ci-ninja', 'se-refactor-guru'],
      unlockCondition: '完成至少 2 个任务'
    },
    {
      stageNumber: 4,
      name: '职业认证',
      description: '完成所有核心技能，获得职业认证',
      recommendedMissions: 2,
      reward: '👨‍💻 初级软件工程师认证',
      objectives: [
        '完成所有核心任务',
        '掌握日志分析',
        '获得职业认证'
      ],
      recommendedMissionIds: ['se-log-tracker', 'se-perf-warrior'],
      unlockCondition: '完成至少 3 个任务'
    }
  ],
  'data-analyst': [
    {
      stageNumber: 1,
      name: '入门试炼',
      description: '掌握数据分析的基础技能，完成第一个实战项目',
      recommendedMissions: 1,
      reward: '🏆 数据侦探徽章',
      objectives: [
        '学习数据清洗技巧',
        '完成第一个分析任务',
        '建立数据分析思维'
      ],
      recommendedMissionIds: ['da-data-detective'],
      unlockCondition: '无需前置条件'
    },
    {
      stageNumber: 2,
      name: '核心能力',
      description: '深入学习SQL和数据可视化，掌握核心分析技能',
      recommendedMissions: 2,
      reward: '🏆 SQL 寻宝者徽章',
      objectives: [
        '掌握SQL查询技巧',
        '学习数据可视化',
        '提升分析深度'
      ],
      recommendedMissionIds: ['da-sql-treasure', 'da-chart-wizard'],
      unlockCondition: '完成至少 1 个任务'
    },
    {
      stageNumber: 3,
      name: '综合项目',
      description: '挑战更复杂的分析项目，学习转化率分析和实验设计',
      recommendedMissions: 2,
      reward: '🏆 转化率炼金术士徽章',
      objectives: [
        '掌握转化率分析',
        '学习A/B测试设计',
        '提升商业洞察'
      ],
      recommendedMissionIds: ['da-conversion-alchemist', 'da-ab-scientist'],
      unlockCondition: '完成至少 2 个任务'
    },
    {
      stageNumber: 4,
      name: '职业认证',
      description: '完成所有核心技能，获得职业认证',
      recommendedMissions: 2,
      reward: '👨‍💼 商业分析见习顾问',
      objectives: [
        '完成所有核心任务',
        '掌握预测分析',
        '获得职业认证'
      ],
      recommendedMissionIds: ['da-report-forger', 'da-predict-prophet'],
      unlockCondition: '完成至少 3 个任务'
    }
  ]
};

interface CareerPathRoadmapProps {
  careerId: string;
  missions: Mission[];
}

interface StageDetailModal {
  open: boolean;
  stage: CareerStage | null;
  status: StageStatus;
}

export default function CareerPathRoadmap({ careerId, missions = [] }: CareerPathRoadmapProps) {
  const { missionStatuses } = useMissionStore();
  const [stageModal, setStageModal] = useState<StageDetailModal>({
    open: false,
    stage: null,
    status: 'upcoming'
  });

  const stages = careerStages[careerId] || careerStages['software-engineer'];

  // 计算已完成的任务数
  const completedMissionCount = missions.filter(mission => {
    const status = missionStatuses[mission.id] || mission.status;
    return status === MissionStatus.COMPLETED;
  }).length;

  const totalMissionCount = missions.length;
  const overallProgress = totalMissionCount > 0 
    ? Math.round((completedMissionCount / totalMissionCount) * 100) 
    : 0;

  // 计算每个阶段的状态
  const getStageStatus = (stageNumber: number): StageStatus => {
    if (stageNumber === 1 && completedMissionCount === 0) return 'current';
    if (stageNumber === 1 && completedMissionCount >= 1) return 'completed';
    
    if (stageNumber === 2) {
      if (completedMissionCount < 1) return 'locked';
      if (completedMissionCount >= 1 && completedMissionCount < 2) return 'current';
      return 'completed';
    }
    
    if (stageNumber === 3) {
      if (completedMissionCount < 2) return 'locked';
      if (completedMissionCount >= 2 && completedMissionCount < 3) return 'current';
      return 'completed';
    }
    
    if (stageNumber === 4) {
      if (completedMissionCount < 3) return 'locked';
      if (completedMissionCount >= 3 && completedMissionCount < totalMissionCount) return 'current';
      return 'completed';
    }
    
    return 'upcoming';
  };

  // 计算阶段已完成的任务数
  const getStageCompletedMissions = (stage: CareerStage): number => {
    return stage.recommendedMissionIds.filter(missionId => {
      const mission = missions.find(m => m.id === missionId);
      if (!mission) return false;
      const status = missionStatuses[mission.id] || mission.status;
      return status === MissionStatus.COMPLETED;
    }).length;
  };

  const handleStageClick = (stage: CareerStage, status: StageStatus) => {
    setStageModal({
      open: true,
      stage,
      status
    });
  };

  const closeModal = () => {
    setStageModal({
      open: false,
      stage: null,
      status: 'upcoming'
    });
  };

  return (
    <>
      <div className="border-4 border-slate-700 bg-slate-800/50 p-4">
        {/* 头部标题和进度 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-amber-500 flex items-center gap-2">
              <span>🛤️</span>
              <span>职业路径 Roadmap</span>
            </h2>
            <div className="text-right">
              <div className="text-slate-400 text-sm">整体进度</div>
              <div className="text-xl font-bold text-amber-500">{overallProgress}%</div>
            </div>
          </div>
          <PixelProgress value={overallProgress} color="#f59e0b" />
        </div>

        {/* 阶段卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stages.map((stage) => {
            const status = getStageStatus(stage.stageNumber);
            const completed = getStageCompletedMissions(stage);
            
            return (
              <CareerStageCard
                key={stage.stageNumber}
                stageNumber={stage.stageNumber}
                stageName={stage.name}
                description={stage.description}
                status={status}
                recommendedMissions={stage.recommendedMissions}
                completedMissions={completed}
                reward={stage.reward}
                onClick={() => handleStageClick(stage, status)}
              />
            );
          })}
        </div>
      </div>

      {/* 阶段详情弹窗 */}
      <PixelDialog
        open={stageModal.open}
        onClose={closeModal}
        title={stageModal.stage ? `${stageModal.stage.stageNumber}. ${stageModal.stage.name}` : '阶段详情'}
      >
        {stageModal.stage && (
          <div className="space-y-4">
            {/* 阶段状态 */}
            <div className="flex items-center gap-2 mb-4">
              {stageModal.status === 'locked' ? (
                <span className="px-3 py-1 bg-slate-700 text-slate-400 border-2 border-slate-600 text-sm font-bold">🔒 未解锁</span>
              ) : stageModal.status === 'completed' ? (
                <span className="px-3 py-1 bg-green-900/50 text-green-400 border-2 border-green-600 text-sm font-bold">✅ 已完成</span>
              ) : stageModal.status === 'current' ? (
                <span className="px-3 py-1 bg-amber-900/50 text-amber-400 border-2 border-amber-600 text-sm font-bold">🎯 进行中</span>
              ) : (
                <span className="px-3 py-1 bg-slate-700 text-slate-400 border-2 border-slate-600 text-sm font-bold">⏳ 即将解锁</span>
              )}
            </div>

            {/* 阶段说明 */}
            <p className="text-slate-300">{stageModal.stage.description}</p>

            {/* 阶段目标 */}
            <div>
              <h4 className="text-amber-500 font-bold mb-2">🎯 阶段目标</h4>
              <ul className="space-y-1">
                {stageModal.stage.objectives.map((obj, idx) => (
                  <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                    <span className="text-green-500">•</span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 推荐任务 */}
            <div>
              <h4 className="text-amber-500 font-bold mb-2">📋 推荐任务</h4>
              <div className="space-y-2">
                {stageModal.stage.recommendedMissionIds.map((missionId) => {
                  const mission = missions.find(m => m.id === missionId);
                  if (!mission) return null;
                  const status = missionStatuses[mission.id] || mission.status;
                  const isCompleted = status === MissionStatus.COMPLETED;
                  
                  return (
                    <div key={missionId} className="flex items-center justify-between p-2 bg-slate-700/50 border-2 border-slate-600">
                      <div>
                        <div className="text-slate-200 text-sm font-medium">{mission.title}</div>
                        <div className="text-slate-400 text-xs">{mission.description}</div>
                      </div>
                      <div>
                        {isCompleted ? (
                          <span className="text-green-500 text-sm font-bold">✅</span>
                        ) : (
                          <span className="text-slate-400 text-sm">⏳</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 阶段奖励 */}
            <div>
              <h4 className="text-amber-500 font-bold mb-2">🏆 阶段奖励</h4>
              <div className="p-3 bg-amber-900/30 border-2 border-amber-700">
                <span className="text-amber-300 font-bold">{stageModal.stage.reward}</span>
              </div>
            </div>

            {/* 解锁条件 */}
            <div>
              <h4 className="text-amber-500 font-bold mb-2">🔓 解锁条件</h4>
              <div className="p-3 bg-slate-700/50 border-2 border-slate-600">
                <span className="text-slate-300">{stageModal.stage.unlockCondition}</span>
              </div>
            </div>

            <div className="pt-2">
              <PixelButton onClick={closeModal} className="w-full">
                知道了
              </PixelButton>
            </div>
          </div>
        )}
      </PixelDialog>
    </>
  );
}
