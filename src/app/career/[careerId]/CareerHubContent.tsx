'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
  CareerSkillTree,
  CareerTaskBoard,
  CareerResourcePanel,
  CareerDashboard,
  CareerPathRoadmap,
  CareerIslandHero,
  CareerProgressBanner,
  CareerQuickActions,
  CareerAtmospherePanel
} from '@/components/career';
import { LoadingState, EmptyState, ErrorState } from '@/components/common';
import { AppShell, PageHeader, PageContainer } from '@/components/layout';
import { PixelButton, PixelCard } from '@/components/pixel';
import DemoGuideBar from '@/components/demo/DemoGuideBar';
import DemoHighlight from '@/components/demo/DemoHighlight';
import { careerService, missionService, skillService, resourceService } from '@/services';
import { useMissionStore } from '@/stores/missionStore';
import { CareerIsland, Mission, SkillNode, Resource, MissionStatus } from '@/types';
import { ROUTES } from '@/constants';
import { isDemoMode, getDemoStep, MVP_MISSION_ID } from '@/utils/demoFlow';

export default function CareerHubContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const careerId = params.careerId as string;
  const isDemo = isDemoMode(searchParams);
  const currentStep = getDemoStep(searchParams);
  const isDataAnalyst = careerId === 'data-analyst';
  const { getMissionStatus, resetMissionStatuses } = useMissionStore();

  const taskBoardRef = useRef<HTMLDivElement>(null);
  const skillTreeRef = useRef<HTMLDivElement>(null);

  const handleScrollToTasks = () => {
    taskBoardRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const [careerInfo, setCareerInfo] = useState<CareerIsland | undefined>();
  const [skills, setSkills] = useState<SkillNode[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      if (isDemo && isDataAnalyst) {
        resetMissionStatuses();
      }
      
      const [career, skillData, missionData, resourceData] = await Promise.all([
        careerService.getCareerIslandById(careerId),
        skillService.getSkillsByCareerId(careerId),
        missionService.getMissionsByCareerId(careerId),
        resourceService.getResourcesByCareerId(careerId)
      ]);

      if (!career) {
        setError('该职业不存在');
        return;
      }

      setCareerInfo(career);
      setSkills(skillData);
      setMissions(missionData);
      setResources(resourceData);
    } catch (err) {
      setError('加载数据失败，请重试');
      console.error('Failed to load career data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleScrollToSkills = () => {
    skillTreeRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAskMentor = () => {
    console.log('Ask mentor clicked');
  };

  const mvpMission = missions.find(m => m.id === MVP_MISSION_ID);

  useEffect(() => {
    loadData();
  }, [careerId]);

  const handleDemoNext = () => {
    if (currentStep === 1) {
      router.push(`/mission/${MVP_MISSION_ID}?demo=1&step=2`);
    }
  };

  if (loading) {
    return (
      <AppShell>
        <PageContainer>
          <LoadingState message="加载职业中心..." />
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

  if (!careerInfo) {
    return (
      <AppShell>
        <PageContainer>
          <ErrorState 
            title="职业不存在" 
            message={`未找到 ID 为 ${careerId} 的职业`} 
            onRetry={() => router.push(ROUTES.LOBBY)}
          />
        </PageContainer>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader 
        title={careerInfo.name}
        description={careerInfo.description}
        showBackButton
        backRoute={ROUTES.LOBBY}
      />

      <PageContainer maxWidth="6xl">
        {isDemo && isDataAnalyst && (
          <>
            {currentStep === 1 && (
              <DemoGuideBar 
                currentStep={1} 
                nextStepTitle="查看主管任务"
                nextStepAction={handleDemoNext}
              />
            )}
            {currentStep === 2 && (
              <DemoGuideBar 
                currentStep={2} 
                nextStepTitle="查看任务详情"
                nextStepAction={`/mission/${MVP_MISSION_ID}?demo=1&step=2`}
              />
            )}
          </>
        )}

        <div className="mb-6 text-center">
          <PixelButton 
            variant="secondary"
            onClick={() => router.push(ROUTES.PORTFOLIO)}
          >
            📂 我的成长档案
          </PixelButton>
        </div>

        <div className="mb-6">
          <DemoHighlight targetStep={1} currentStep={currentStep} label="欢迎来到数据山脉">
            <CareerIslandHero 
              careerId={careerId} 
              careerName={careerInfo.name} 
            />
          </DemoHighlight>
        </div>

        <div className="mb-6">
          <CareerProgressBanner
            currentStage="入门试炼"
            nextStage="核心能力"
            currentGoal="完成 1 个基础任务"
            progress={35}
          />
        </div>

        <div className="mb-6">
          <CareerQuickActions
            onScrollToTasks={handleScrollToTasks}
            onScrollToSkills={handleScrollToSkills}
            onAskMentor={handleAskMentor}
          />
        </div>

        <div className="mb-6">
          <CareerDashboard
            missions={missions}
            skills={skills}
          />
        </div>

        <div ref={taskBoardRef} id="career-task-board" className="mb-6">
          <DemoHighlight targetStep={2} currentStep={currentStep} label="查看AI主管推荐的任务">
            <CareerTaskBoard
              missions={missions}
              careerId={careerId}
              isDemoMode={isDemo}
            />
          </DemoHighlight>
        </div>

        <div className="mb-6">
          <CareerResourcePanel
            resources={resources}
            careerId={careerId}
            missions={missions}
            isDemoMode={isDemo}
            onScrollToTasks={handleScrollToTasks}
          />
        </div>

        <div ref={skillTreeRef} className="mb-6">
          <CareerSkillTree skills={skills} />
        </div>

        <div className="mb-6">
          <CareerPathRoadmap careerId={careerId} missions={missions} />
        </div>

        <div className="mb-6">
          <CareerAtmospherePanel careerId={careerId} />
        </div>
      </PageContainer>
    </AppShell>
  );
}
