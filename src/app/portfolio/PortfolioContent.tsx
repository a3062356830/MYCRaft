'use client';

import React, { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppShell, PageHeader, PageContainer } from '@/components/layout';
import { PixelButton, PixelCard, PixelBadge } from '@/components/pixel';
import DemoGuideBar from '@/components/demo/DemoGuideBar';
import {
  PortfolioHeader,
  PortfolioStats,
  PortfolioSkillSummary,
  PortfolioMissionHistory,
  PortfolioBadges,
  PortfolioReviewHighlights
} from '@/components/portfolio';
import { useMissionStore } from '@/stores/missionStore';
import { missions } from '@/data';
import { skillTrees } from '@/data/skills';
import { MissionStatus } from '@/types';
import { ROUTES } from '@/constants';

const allBadges = [
  { id: 'data-detective', name: '数据侦探', icon: '🔍', description: '完成数据分析入门任务', earned: false },
  { id: 'sql-treasure', name: 'SQL 寻宝者', icon: '🗄️', description: '精通 SQL 查询', earned: false },
  { id: 'bug-hunter', name: '漏洞捕手', icon: '🐛', description: '找到并修复代码缺陷', earned: false },
  { id: 'test-guardian', name: '单测守门人', icon: '✅', description: '写出高质量的测试用例', earned: false },
  { id: 'api-forger', name: 'API 铸造师', icon: '🔌', description: '设计优雅的 API', earned: false },
  { id: 'log-tracker', name: '日志追踪者', icon: '📝', description: '从日志中发现问题', earned: false }
];

const badgeMissionMap: Record<string, string[]> = {
  'data-detective': ['da-data-detective', 'da-mvp-user-activity', 'community-activity-drop'],
  'sql-treasure': ['da-sql-treasure'],
  'bug-hunter': ['se-bug-hunter'],
  'test-guardian': ['se-unit-test'],
  'api-forger': ['se-api-builder'],
  'log-tracker': ['se-log-tracker']
};

export default function PortfolioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemoMode = searchParams.get('demo') === '1';
  const { missionStatuses, resetMissionStatuses } = useMissionStore();

  const handleResetAndRestartDemo = () => {
    resetMissionStatuses();
    router.push('/career/data-analyst?demo=1');
  };

  const allMissions = useMemo(() => {
    return Object.values(missions).flat();
  }, []);

  const portfolioData = useMemo(() => {
    const userMissions = allMissions.filter(mission => 
      missionStatuses[mission.id] && 
      missionStatuses[mission.id] !== MissionStatus.LOCKED &&
      missionStatuses[mission.id] !== MissionStatus.AVAILABLE
    );

    const acceptedMissions = userMissions.filter(m => 
      missionStatuses[m.id] === MissionStatus.ACCEPTED
    );
    const submittedMissions = userMissions.filter(m => 
      missionStatuses[m.id] === MissionStatus.SUBMITTED
    );
    const completedMissions = userMissions.filter(m => 
      missionStatuses[m.id] === MissionStatus.COMPLETED
    );

    const totalXP = completedMissions.reduce((sum, m) => sum + m.rewardExp, 0);

    const seSkills = skillTrees['software-engineer'] || [];
    const daSkills = skillTrees['data-analyst'] || [];

    const completedMissionIds = new Set(completedMissions.map(m => m.id));
    const updatedSeSkills = seSkills.map(skill => {
      const hasCompletedRelevantMission = completedMissions.some(m => 
        m.rewardSkills.includes(skill.id)
      );
      return {
        ...skill,
        unlocked: skill.unlocked || hasCompletedRelevantMission,
        level: hasCompletedRelevantMission ? Math.min(skill.level + 1, skill.maxLevel) : skill.level,
        exp: hasCompletedRelevantMission ? skill.exp + 100 : skill.exp
      };
    });

    const updatedDaSkills = daSkills.map(skill => {
      const hasCompletedRelevantMission = completedMissions.some(m => 
        m.rewardSkills.includes(skill.id)
      );
      return {
        ...skill,
        unlocked: skill.unlocked || hasCompletedRelevantMission,
        level: hasCompletedRelevantMission ? Math.min(skill.level + 1, skill.maxLevel) : skill.level,
        exp: hasCompletedRelevantMission ? skill.exp + 100 : skill.exp
      };
    });

    const unlockedSkills = [...updatedSeSkills, ...updatedDaSkills].filter(s => s.unlocked).length;

    const totalMissionsCount = allMissions.length;
    const completionRate = totalMissionsCount > 0 
      ? Math.round((completedMissions.length / totalMissionsCount) * 100) 
      : 0;

    const seCompleted = completedMissions.filter(m => m.careerId === 'software-engineer').length;
    const daCompleted = completedMissions.filter(m => m.careerId === 'data-analyst').length;
    let currentDirection = '多职业探索者';
    if (seCompleted > daCompleted && seCompleted > 0) {
      currentDirection = '软件工程';
    } else if (daCompleted > seCompleted && daCompleted > 0) {
      currentDirection = '数据分析';
    }

    const level = Math.floor(totalXP / 500) + 1;

    const badges = allBadges.map(badge => {
      const missionIds = badgeMissionMap[badge.id] || [];
      const earned = isDemoMode || missionIds.some(id => completedMissionIds.has(id));
      return { ...badge, earned };
    });

    const reviews = completedMissions.slice(0, 3).map(mission => {
      const score = 80 + Math.floor(Math.random() * 15);
      const grade = score >= 90 ? 'S' : score >= 80 ? 'A' : score >= 70 ? 'B+' : 'B';
      return {
        missionId: mission.id,
        missionTitle: mission.title,
        score,
        maxScore: 100,
        grade,
        comment: '做得很棒！你对任务目标的理解很到位，任务完成质量很高！'
      };
    });

    let recentCareerId: string | null = null;
    if (completedMissions.length > 0 && completedMissions[0].careerId) {
      recentCareerId = completedMissions[0].careerId;
    } else if (submittedMissions.length > 0 && submittedMissions[0].careerId) {
      recentCareerId = submittedMissions[0].careerId;
    } else if (acceptedMissions.length > 0 && acceptedMissions[0].careerId) {
      recentCareerId = acceptedMissions[0].careerId;
    }

    return {
      userName: 'CareerCraft 学员',
      currentDirection,
      totalXP,
      completedMissionsCount: completedMissions.length,
      submittedMissionsCount: submittedMissions.length + completedMissions.length,
      badgesCount: badges.filter(b => b.earned).length,
      level,
      completionRate,
      unlockedSkills,
      softwareEngineerSkills: updatedSeSkills,
      dataAnalystSkills: updatedDaSkills,
      missionHistory: userMissions.map(m => ({
        id: m.id,
        title: m.title,
        careerId: m.careerId!,
        status: missionStatuses[m.id] || m.status,
        rewardExp: m.rewardExp,
        hasFeedback: missionStatuses[m.id] === MissionStatus.COMPLETED
      })),
      badges,
      reviews,
      recentCareerId
    };
  }, [allMissions, missionStatuses, isDemoMode]);

  return (
    <AppShell>
      <PageHeader 
        title="我的成长档案"
        description="记录你的职业成长历程"
        showBackButton
        backRoute={ROUTES.LOBBY}
      />

      <PageContainer maxWidth="7xl">
        {isDemoMode && (
          <DemoGuideBar 
            currentStep={8} 
            nextStepTitle="重新体验 MVP 演示"
            nextStepAction={handleResetAndRestartDemo}
          />
        )}
        
        {isDemoMode && (
          <div className="mb-6">
            <PixelCard title="🎉 恭喜！Demo 完成！" className="p-4 bg-indigo-900/30 border-indigo-600">
              <div className="space-y-4 text-center">
                <div className="text-4xl animate-bounce">🎊</div>
                <div>
                  <p className="text-xl font-bold text-indigo-300 mb-2">
                    你完成了完整的 MVP 演示流程！
                  </p>
                  <p className="text-slate-400 text-sm">
                    从选择职业 → 接受任务 → 查找资源 → 完成挑战 → 提交评审 → 查看成长，
                    全流程体验完毕！
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2 justify-center">
                  <PixelBadge variant="success">✅ 进入数据山脉</PixelBadge>
                  <PixelBadge variant="success">✅ 接受任务</PixelBadge>
                  <PixelBadge variant="success">✅ RAG 学习</PixelBadge>
                  <PixelBadge variant="success">✅ 费曼挑战</PixelBadge>
                  <PixelBadge variant="success">✅ 提交报告</PixelBadge>
                  <PixelBadge variant="success">✅ AI 评审</PixelBadge>
                  <PixelBadge variant="success">✅ 查看成长</PixelBadge>
                </div>
                
                <div className="pt-2">
                  <p className="text-slate-500 text-sm mb-3">
                    接下来可以做什么？
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <PixelButton 
                      variant="primary"
                      onClick={() => router.push(ROUTES.CAREER('data-analyst'))}
                    >
                      💻 继续做数据分析任务
                    </PixelButton>
                    <PixelButton 
                      variant="primary"
                      onClick={() => router.push(ROUTES.CAREER('software-engineer'))}
                    >
                      🧑‍💻 试试软件工程方向
                    </PixelButton>
                    <PixelButton 
                      variant="secondary"
                      onClick={() => router.push(ROUTES.LOBBY)}
                    >
                      🏠 返回职业大厅
                    </PixelButton>
                  </div>
                </div>
              </div>
            </PixelCard>
          </div>
        )}
        
        <div className="border-4 border-slate-700 bg-slate-900/50 p-4 space-y-4">
          <div className="border-b-4 border-slate-700 pb-4">
            <PortfolioHeader
              userName={portfolioData.userName}
              currentDirection={portfolioData.currentDirection}
              totalXP={portfolioData.totalXP}
              completedMissions={portfolioData.completedMissionsCount}
              badgesCount={portfolioData.badgesCount}
              level={portfolioData.level}
            />
          </div>

          <div>
            <PortfolioStats
              totalXP={portfolioData.totalXP}
              completedMissions={portfolioData.completedMissionsCount}
              submittedMissions={portfolioData.submittedMissionsCount}
              unlockedSkills={portfolioData.unlockedSkills}
              completionRate={portfolioData.completionRate}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-1 space-y-4">
              <div className="border-2 border-slate-700 bg-slate-800/30 p-1">
                <PortfolioBadges badges={portfolioData.badges} />
              </div>
              <div className="border-2 border-slate-700 bg-slate-800/30 p-1">
                <PortfolioReviewHighlights reviews={portfolioData.reviews} />
              </div>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <div className="border-2 border-slate-700 bg-slate-800/30 p-1">
                <PortfolioSkillSummary
                  softwareEngineerSkills={portfolioData.softwareEngineerSkills}
                  dataAnalystSkills={portfolioData.dataAnalystSkills}
                />
              </div>
              <div className="border-2 border-slate-700 bg-slate-800/30 p-1">
                <PortfolioMissionHistory missions={portfolioData.missionHistory} />
              </div>
            </div>
          </div>

          <div className="border-t-4 border-slate-700 pt-4">
            <div className="flex flex-wrap gap-3 justify-center">
              {portfolioData.recentCareerId && (
                <PixelButton 
                  onClick={() => router.push(ROUTES.CAREER(portfolioData.recentCareerId!))}
                >
                  返回最近职业
                </PixelButton>
              )}
              <PixelButton 
                variant="secondary"
                onClick={() => router.push(ROUTES.LOBBY)}
              >
                返回职业大厅
              </PixelButton>
            </div>
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}
