'use client';

import React, { useCallback } from 'react';
import { PixelCard, PixelBadge, PixelProgress, PixelButton } from '@/components/pixel';
import { Mission, MissionStatus, SkillNode } from '@/types';
import { useMissionStore } from '@/stores/missionStore';

interface CareerDashboardProps {
  missions: Mission[];
  skills: SkillNode[];
}

export default function CareerDashboard({ 
  missions, 
  skills 
}: CareerDashboardProps) {
  const { getMissionStatus } = useMissionStore();

  // 计算指标
  const calculateStats = useCallback(() => {
    let completedCount = 0;
    let acceptedCount = 0;
    let availableCount = 0;
    let submittedCount = 0;
    let lockedCount = 0;
    let totalExp = 120; // 基础经验值
    
    missions.forEach(mission => {
      const currentStatus = getMissionStatus(mission.id, mission.status);
      
      if (currentStatus === MissionStatus.COMPLETED) {
        completedCount++;
        totalExp += mission.rewardExp;
      } else if (currentStatus === MissionStatus.ACCEPTED) {
        acceptedCount++;
      } else if (currentStatus === MissionStatus.AVAILABLE) {
        availableCount++;
      } else if (currentStatus === MissionStatus.SUBMITTED) {
        submittedCount++;
      } else if (currentStatus === MissionStatus.LOCKED) {
        lockedCount++;
      }
    });

    const skillsUnlocked = skills.filter(s => s.level > 0).length;
    
    return {
      totalExp,
      completedCount,
      acceptedCount,
      availableCount,
      submittedCount,
      lockedCount,
      skillsUnlocked,
      totalMissions: missions.length,
      totalSkills: skills.length,
      careerProgress: missions.length > 0 
        ? Math.round((completedCount / missions.length) * 100) 
        : 0,
    };
  }, [missions, skills, getMissionStatus]);

  const stats = calculateStats();

  // 推荐下一步任务
  const getRecommendedMission = useCallback(() => {
    // 首先找 accepted 的任务
    const acceptedMissions = missions.filter(mission => 
      getMissionStatus(mission.id, mission.status) === MissionStatus.ACCEPTED
    );
    if (acceptedMissions.length > 0) {
      return acceptedMissions[0];
    }
    
    // 然后找 available 的任务
    const availableMissions = missions.filter(mission => 
      getMissionStatus(mission.id, mission.status) === MissionStatus.AVAILABLE
    );
    if (availableMissions.length > 0) {
      return availableMissions[0];
    }
    
    return null;
  }, [missions, getMissionStatus]);

  const recommendedMission = getRecommendedMission();

  // 滚动到任务看板
  const handleViewMission = useCallback(() => {
    const taskBoard = document.getElementById('career-task-board');
    if (taskBoard) {
      taskBoard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // 任务状态分布数据
  const statusDistribution = [
    { label: '可接受', count: stats.availableCount, color: '#10b981' },
    { label: '进行中', count: stats.acceptedCount, color: '#3b82f6' },
    { label: '已提交', count: stats.submittedCount, color: '#f59e0b' },
    { label: '已完成', count: stats.completedCount, color: '#8b5cf6' },
    { label: '未解锁', count: stats.lockedCount, color: '#64748b' },
  ];

  return (
    <div className="space-y-6">
      {/* 1. 总览卡片 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <PixelCard>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-500 mb-1">
              Lv.1
            </div>
            <div className="text-slate-400 text-sm">当前等级</div>
          </div>
        </PixelCard>

        <PixelCard>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-500 mb-1">
              {stats.totalExp} XP
            </div>
            <div className="text-slate-400 text-sm">总经验值</div>
          </div>
        </PixelCard>

        <PixelCard>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-500 mb-1">
              {stats.completedCount} / {stats.totalMissions}
            </div>
            <div className="text-slate-400 text-sm">已完成任务</div>
          </div>
        </PixelCard>

        <PixelCard>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-500 mb-1">
              {stats.skillsUnlocked} / {stats.totalSkills}
            </div>
            <div className="text-slate-400 text-sm">技能掌握</div>
          </div>
        </PixelCard>
      </div>

      {/* 2. 职业成长进度条 */}
      <PixelCard title="📊 职业成长进度">
        <div className="space-y-3">
          <PixelProgress 
            value={stats.careerProgress} 
            label={`${stats.careerProgress}%`}
            color="#f59e0b"
          />
          <div className="text-slate-400 text-sm text-center">
            继续完成任务来解锁更多内容！
          </div>
        </div>
      </PixelCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3. 任务状态分布 */}
        <PixelCard title="🎯 任务状态分布" className="lg:col-span-1">
          <div className="space-y-3">
            {statusDistribution.map((status, idx) => {
              const percentage = stats.totalMissions > 0 
                ? Math.round((status.count / stats.totalMissions) * 100) 
                : 0;
              
              return (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">{status.label}</span>
                    <span 
                      className="font-bold" 
                      style={{ color: status.color }}
                    >
                      {status.count}
                    </span>
                  </div>
                  <div 
                    className="h-3 bg-slate-800 border-2 border-slate-700"
                    style={{ boxShadow: 'inset -2px -2px 0px 0px #0f172a' }}
                  >
                    <div 
                      className="h-full transition-all duration-500"
                      style={{ 
                        width: `${percentage}%`, 
                        backgroundColor: status.color 
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </PixelCard>

        {/* 4. 技能掌握可视化 */}
        <PixelCard title="⚡ 技能掌握" className="lg:col-span-2">
          <div className="space-y-4">
            {skills.slice(0, 6).map((skill, idx) => {
              const expPercentage = skill.expToNext > 0 
                ? Math.round((skill.exp / skill.expToNext) * 100) 
                : 0;
              
              return (
                <div key={skill.id} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className={`font-bold ${skill.level > 0 ? 'text-amber-500' : 'text-slate-500'}`}>
                      {skill.name}
                    </span>
                    <span className="text-slate-400">
                      Lv.{skill.level} / {skill.maxLevel}
                    </span>
                  </div>
                  <PixelProgress 
                    value={expPercentage} 
                    color={skill.level > 0 ? '#10b981' : '#334155'}
                    height="h-2"
                  />
                </div>
              );
            })}
          </div>
        </PixelCard>
      </div>

      {/* 5. 推荐下一步任务 */}
      <PixelCard title="🎮 推荐下一步">
        {recommendedMission ? (
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="text-lg font-bold text-amber-500">
                  {recommendedMission.title}
                </h4>
                <PixelBadge 
                  variant={
                    recommendedMission.difficulty === 'easy' ? 'fun' : 
                    recommendedMission.difficulty === 'medium' ? 'honor' : 
                    'warning'
                  }
                >
                  {recommendedMission.difficulty === 'easy' ? '⭐ 简单' : 
                   recommendedMission.difficulty === 'medium' ? '⭐⭐ 中等' : 
                   '⭐⭐⭐ 困难'}
                </PixelBadge>
                <PixelBadge variant="neutral">
                  +{recommendedMission.rewardExp} XP
                </PixelBadge>
              </div>
              <p className="text-slate-400 text-sm">
                {recommendedMission.description}
              </p>
            </div>
            
            <PixelButton onClick={handleViewMission}>
              查看任务
            </PixelButton>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="text-4xl mb-3">🎉</div>
            <p className="text-slate-400">
              当前阶段任务已完成，敬请期待更多内容！
            </p>
          </div>
        )}
      </PixelCard>
    </div>
  );
}
