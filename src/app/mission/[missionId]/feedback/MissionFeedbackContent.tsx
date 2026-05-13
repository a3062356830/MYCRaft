'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { PixelBadge, PixelButton, PixelCard } from '@/components/pixel';
import { LoadingState, ErrorState } from '@/components/common';
import DemoGuideBar from '@/components/demo/DemoGuideBar';
import DemoHighlight from '@/components/demo/DemoHighlight';
import { AppShell, PageHeader, PageContainer } from '@/components/layout';
import {
  FeedbackScoreCard,
  FeedbackDimensionBreakdown,
  FeedbackMentorComment,
  FeedbackSkillGrowth,
  FeedbackNextAction,
  FeedbackReviewTimeline,
  AIEvaluationProcess
} from '@/components/feedback';
import { missionService, feedbackService } from '@/services';
import { useMissionStore } from '@/stores/missionStore';
import { Mission, Feedback, MissionStatus } from '@/types';
import { ROUTES } from '@/constants';
import { getCareerRouteByMissionId, isMvpMission as checkIsMvpMission } from '@/utils';

export default function MissionFeedbackContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const missionId = params.missionId as string;
  const isDemoMode = searchParams.get('demo') === '1';
  const currentStep = isDemoMode ? parseInt(searchParams.get('step') || '7', 10) : 7;
  const isMvpMission = checkIsMvpMission(missionId);
  
  const [mission, setMission] = useState<Mission | undefined>();
  const [feedback, setFeedback] = useState<Feedback | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allMissions, setAllMissions] = useState<Mission[]>([]);
  
  const { completeMission } = useMissionStore();

  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [missionData, feedbackData, missionsData] = await Promise.all([
        missionService.getMissionById(missionId),
        feedbackService.getFeedbackByMissionId(missionId),
        missionService.getMissions()
      ]);

      if (!missionData) {
        setError('该任务不存在');
        return;
      }
      
      setMission(missionData);
      setFeedback(feedbackData);
      setAllMissions(missionsData);
      
      completeMission(missionId);
    } catch (err) {
      setError('加载反馈失败，请重试');
      console.error('Failed to load feedback:', err);
    } finally {
      setLoading(false);
    }
  }, [missionId, completeMission]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const isSoftwareEngineer = !!(mission?.careerId === 'software-engineer' || 
    mission?.id?.includes('software') || 
    mission?.id?.includes('se-'));

  const feedbackData = feedback ? {
    totalScore: feedback.score,
    maxScore: feedback.maxScore,
    grade: feedback.score >= 90 ? 'S' : feedback.score >= 80 ? 'A' : feedback.score >= 70 ? 'B+' : feedback.score >= 60 ? 'B' : 'C',
    conclusion: feedback.score >= 80 
      ? '表现优秀，具备进入下一阶段的能力！' 
      : feedback.score >= 70 
        ? '交付物基本完整，具备进入下一阶段训练的能力。' 
        : '需要继续努力，建议复习相关知识后重试。',
    mentorName: isSoftwareEngineer ? '代码大师' : '数据智者',
    mentorAvatar: isSoftwareEngineer ? '🧙‍♂️' : '🎓',
    mentorComment: feedback.comment,
    dimensions: [
      { name: '任务完成度', score: 22, maxScore: 25, color: '#10b981' },
      { name: '技术正确性', score: 20, maxScore: 25, color: '#3b82f6' },
      { name: '表达清晰度', score: 18, maxScore: 25, color: '#f59e0b' },
      { name: '业务理解', score: 22, maxScore: 25, color: '#8b5cf6' }
    ],
    highlights: feedback.strengths,
    suggestions: feedback.improvements,
    expGained: (feedback.skillExpGained || []).map(exp => ({ 
      name: exp.skillId, 
      xp: exp.expGained,
      progress: 75
    })),
    badge: (feedback.badgesEarned || [])[0] || (isSoftwareEngineer ? '漏洞捕手' : '数据侦探')
  } : isDemoMode && isMvpMission ? {
    totalScore: 82,
    maxScore: 100,
    grade: 'A-',
    conclusion: '你能够从用户活跃度下降问题中拆解时间趋势、用户分层和功能使用三个方向，具备初级数据分析任务的完成能力。',
    mentorName: '增长数据 Lead',
    mentorAvatar: '🎓',
    mentorComment: '你的分析比较清晰！特别是按用户分层找到老用户流失是主要原因这一点很有价值。建议下一步可以深入分析老用户流失的具体原因。',
    dimensions: [
      { name: '问题拆解', score: 23, maxScore: 25, color: '#10b981' },
      { name: '数据口径', score: 21, maxScore: 25, color: '#3b82f6' },
      { name: '可视化表达', score: 19, maxScore: 25, color: '#f59e0b' },
      { name: '建议可行性', score: 19, maxScore: 25, color: '#8b5cf6' }
    ],
    highlights: [
      '能抓住核心指标进行分析',
      '从时间、用户、功能三个维度进行拆解',
      '没有堆砌专业术语，表达清晰易懂'
    ],
    suggestions: [
      '可以增加一个具体例子说明趋势变化',
      '建议补充用户访谈计划',
      '可视化图表可以更丰富一些'
    ],
    expGained: [
      { name: '数据清洗', xp: 10, progress: 85 },
      { name: '分组聚合', xp: 8, progress: 78 },
      { name: '数据可视化', xp: 5, progress: 70 },
      { name: '业务表达', xp: 5, progress: 72 }
    ],
    badge: '数据侦探'
  } : {
    totalScore: 82,
    maxScore: 100,
    grade: 'B+',
    conclusion: '交付物基本完整，具备进入下一阶段训练的能力。',
    mentorName: isSoftwareEngineer ? '代码大师' : '数据智者',
    mentorAvatar: isSoftwareEngineer ? '🧙‍♂️' : '🎓',
    mentorComment: '你的表现非常不错！整体完成度很高，继续保持这种学习热情！',
    dimensions: [
      { name: '任务完成度', score: 22, maxScore: 25, color: '#10b981' },
      { name: '技术正确性', score: 20, maxScore: 25, color: '#3b82f6' },
      { name: '表达清晰度', score: 18, maxScore: 25, color: '#f59e0b' },
      { name: '业务理解', score: 22, maxScore: 25, color: '#8b5cf6' }
    ],
    highlights: [
      '你准确理解了任务背景',
      '交付物结构比较完整',
      '能够说明关键问题和解决思路'
    ],
    suggestions: [
      '可以补充更多边界情况',
      '结论部分可以更具体',
      '建议增加数据或测试结果支撑'
    ],
    expGained: [
      { name: isSoftwareEngineer ? '代码调试' : '数据清洗', xp: 10, progress: 80 },
      { name: isSoftwareEngineer ? '单元测试' : '问题拆解', xp: 8, progress: 75 },
      { name: isSoftwareEngineer ? '技术沟通' : '表达清晰度', xp: 6, progress: 70 }
    ],
    badge: isSoftwareEngineer ? '漏洞捕手' : '数据侦探'
  };

  const backRoute = mission ? getCareerRouteByMissionId(missionId) : ROUTES.LOBBY;
  
  const careerMissions = allMissions.filter(m => m.careerId === mission?.careerId);
  const completedMissions = careerMissions.filter(m => 
    useMissionStore.getState().getMissionStatus(m.id, m.status) === MissionStatus.COMPLETED
  );
  const availableMissions = careerMissions.filter(m => 
    useMissionStore.getState().getMissionStatus(m.id, m.status) === MissionStatus.AVAILABLE
  );
  
  const hasAvailableTasks = availableMissions.length > 0;
  const allTasksCompleted = careerMissions.length > 0 && completedMissions.length === careerMissions.length;
  const totalXP = feedbackData.expGained.reduce((sum, exp) => sum + exp.xp, 0);

  if (loading) {
    return (
      <AppShell>
        <PageContainer>
          <LoadingState message="加载反馈..." />
        </PageContainer>
      </AppShell>
    );
  }

  if (error) {
    return (
      <AppShell>
        <PageContainer>
          <ErrorState 
            title="加载失败" 
            message={error} 
            onRetry={loadData}
          />
        </PageContainer>
      </AppShell>
    );
  }

  if (!mission) {
    return (
      <AppShell>
        <PageContainer>
          <ErrorState 
            title="任务不存在" 
            message={`未找到 ID 为 ${missionId} 的任务`} 
            onRetry={() => router.back()}
          />
        </PageContainer>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader 
        title="AI 导师评审报告"
        description={mission.title}
        showBackButton
        backRoute={backRoute}
      />

      <PageContainer maxWidth="6xl">
        {isDemoMode && isMvpMission && (
          <>
            {currentStep === 7 && (
              <>
                <DemoGuideBar 
                  currentStep={7} 
                  nextStepTitle="获得成长反馈"
                  nextStepAction={() => {
                    router.push(ROUTES.MISSION_FEEDBACK(missionId) + '?demo=1&step=8');
                  }}
                />
                <PixelCard className="mb-6 p-4 bg-gradient-to-r from-cyan-900/30 to-cyan-800/20 border-cyan-600">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    <p className="text-cyan-300">查看 AI 导师的详细评审报告，了解你的表现！</p>
                  </div>
                </PixelCard>
              </>
            )}
            {currentStep === 8 && (
              <>
                <DemoGuideBar 
                  currentStep={8} 
                  nextStepTitle="查看成长档案"
                  nextStepAction={ROUTES.PORTFOLIO + '?demo=1'}
                />
                <PixelCard className="mb-6 p-4 bg-gradient-to-r from-green-900/30 to-green-800/20 border-green-600">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏆</span>
                    <p className="text-green-300">查看你的技能成长和获得的徽章奖励！</p>
                  </div>
                </PixelCard>
              </>
            )}
          </>
        )}

        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-400 animate-pulse">
            🎉 任务完成！
          </h2>
          <div className="mt-2">
            <PixelBadge variant="success">
              状态：已评审
            </PixelBadge>
          </div>
        </div>

        <DemoHighlight targetStep={7} currentStep={currentStep} label="查看 AI 评审">
          <div className="mb-8">
            <AIEvaluationProcess
              isSoftwareEngineer={isSoftwareEngineer}
            />
          </div>
        </DemoHighlight>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-6">
            <FeedbackScoreCard 
              totalScore={feedbackData.totalScore}
              maxScore={feedbackData.maxScore}
              grade={feedbackData.grade}
              conclusion={feedbackData.conclusion}
            />
            <DemoHighlight targetStep={8} currentStep={currentStep} label="获得成长反馈">
              <FeedbackSkillGrowth 
                skills={feedbackData.expGained}
                badge={feedbackData.badge}
                totalXP={totalXP}
              />
            </DemoHighlight>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <FeedbackDimensionBreakdown 
              dimensions={feedbackData.dimensions}
            />
            <FeedbackMentorComment 
              mentorName={feedbackData.mentorName}
              mentorAvatar={feedbackData.mentorAvatar}
              summaryComment={feedbackData.mentorComment}
              highlights={feedbackData.highlights}
              suggestions={feedbackData.suggestions}
            />
          </div>

          <div className="lg:col-span-3 space-y-6">
            <FeedbackReviewTimeline />
            <FeedbackNextAction 
              hasAvailableTasks={hasAvailableTasks}
              allTasksCompleted={allTasksCompleted}
              onBackToHub={() => router.push(backRoute)}
              onNextMission={() => router.push(backRoute)}
              onBackToLobby={() => router.push(ROUTES.LOBBY)}
            />
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}
