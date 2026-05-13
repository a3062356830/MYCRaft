'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { AppShell, PageHeader, PageContainer } from '@/components/layout';
import { ErrorState } from '@/components/common';
import { PixelCard } from '@/components/pixel';
import DemoGuideBar from '@/components/demo/DemoGuideBar';
import DemoHighlight from '@/components/demo/DemoHighlight';
import { missionService, careerService } from '@/services';
import { useMissionStore } from '@/stores/missionStore';
import { Mission, MissionStatus } from '@/types';
import { ROUTES } from '@/constants';
import { isDemoMode, getDemoStep, MVP_MISSION_ID } from '@/utils/demoFlow';
import {
  MissionQuestHeader,
  MissionBriefScroll,
  MissionClientRequest,
  MissionDeliverableBoard,
  MissionMentorHint,
  MissionStartPanel,
} from '@/components/mission';

export default function MissionWorkspaceContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const missionId = params.missionId as string;
  const isDemo = isDemoMode(searchParams);
  const currentStep = getDemoStep(searchParams);
  const isMvpMission = missionId === MVP_MISSION_ID;

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [mission, setMission] = React.useState<Mission | null>(null);
  const [careerName, setCareerName] = React.useState<string>('');
  const { getMissionStatus } = useMissionStore();

  React.useEffect(() => {
    const loadMission = async () => {
      try {
        setLoading(true);
        setError(null);
        const missionData = await missionService.getMissionById(missionId);
        if (!missionData) {
          setError('任务不存在');
          return;
        }
        setMission(missionData);

        if (missionData.careerId) {
          const career = await careerService.getCareerIslandById(missionData.careerId);
          if (career) {
            setCareerName(career.name);
          }
        }
      } catch (err) {
        setError('加载任务失败');
        console.error('Failed to load mission:', err);
      } finally {
        setLoading(false);
      }
    };
    loadMission();
  }, [missionId]);

  const handleStep4Next = () => {
    router.push(`/feynman/${missionId}?demo=1&step=4`);
  };

  const backRoute = mission?.careerId 
    ? ROUTES.CAREER(mission.careerId) 
    : ROUTES.LOBBY;

  if (loading) {
    return (
      <AppShell>
        <PageContainer>
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-4xl animate-spin">⏳</div>
          </div>
        </PageContainer>
      </AppShell>
    );
  }

  if (error || !mission) {
    return (
      <AppShell>
        <PageContainer>
          <ErrorState 
            title="加载失败" 
            message={error || '任务不存在'} 
            onRetry={() => router.back()}
          />
        </PageContainer>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <PageHeader 
        title={mission.title}
        description={careerName}
        showBackButton
        backRoute={backRoute}
      />
      <PageContainer maxWidth="6xl">
        {isDemo && isMvpMission && currentStep === 3 && (
          <>
            <DemoGuideBar 
              currentStep={3} 
              nextStepTitle="费曼理解挑战"
              nextStepAction={handleStep4Next}
            />
            <PixelCard className="mb-6 p-4 bg-gradient-to-r from-blue-900/30 to-blue-800/20 border-blue-600">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📖</span>
                <p className="text-blue-300">仔细阅读任务要求，理解需求后，点击{'接受任务并开始'}进入下一步！</p>
              </div>
            </PixelCard>
          </>
        )}

        <DemoHighlight targetStep={3} currentStep={currentStep} label="阅读任务要求">
          <div className="space-y-6">
            <MissionQuestHeader mission={mission} careerName={careerName} />
            
            <MissionBriefScroll mission={mission} />
            
            <MissionClientRequest mission={mission} />
            
            <MissionDeliverableBoard />
            
            <MissionMentorHint careerId={mission?.careerId} />
            
            <MissionStartPanel mission={mission} />
          </div>
        </DemoHighlight>
      </PageContainer>
    </AppShell>
  );
}
