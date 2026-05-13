'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { PixelCard, PixelButton, PixelBadge } from '@/components/pixel';
import { LoadingState, ErrorState } from '@/components/common';
import DemoGuideBar from '@/components/demo/DemoGuideBar';
import DemoHighlight from '@/components/demo/DemoHighlight';
import { AppShell, PageHeader, PageContainer } from '@/components/layout';
import { missionService } from '@/services';
import { useMissionStore } from '@/stores/missionStore';
import { Mission, MissionStatus } from '@/types';
import { ROUTES } from '@/constants';
import { getCareerRouteByMissionId, isMvpMission as checkIsMvpMission } from '@/utils';
import { MVP_MOCK_REPORT } from '@/utils/demoFlow';
import SubmissionEditor from '@/components/mission/SubmissionEditor';
import SubmissionChecklist from '@/components/mission/SubmissionChecklist';
import SubmissionQualityPanel from '@/components/mission/SubmissionQualityPanel';
import SubmissionHistoryPanel from '@/components/mission/SubmissionHistoryPanel';

interface ValidationErrors {
  report?: string;
}

const exampleReport = MVP_MOCK_REPORT;

export default function MissionSubmitContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const missionId = params.missionId as string;
  const isDemo = searchParams.get('demo') === '1';
  const currentStep = parseInt(searchParams.get('step') || '1', 10);
  const isMvpMission = checkIsMvpMission(missionId);

  const [mission, setMission] = useState<Mission | null>(null);
  const [report, setReport] = useState('');
  const [code, setCode] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { saveDraft, getDraft, submitMission } = useMissionStore();

  useEffect(() => {
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

        const savedDraft = getDraft(missionId);
        if (savedDraft) {
          setReport(savedDraft.report);
        }
      } catch (err) {
        setError('加载任务失败');
        console.error('Failed to load mission:', err);
      } finally {
        setLoading(false);
      }
    };
    loadMission();
  }, [missionId, getDraft]);

  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft(missionId, { report, code: '' });
    }, 1000);
    return () => clearTimeout(timer);
  }, [report, missionId, saveDraft]);

  const validate = useCallback(() => {
    const newErrors: ValidationErrors = {};
    if (!report.trim()) {
      newErrors.report = '请填写分析报告';
    } else if (report.trim().length < 100) {
      newErrors.report = '报告内容至少需要100个字符';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [report]);

  const handleSubmit = async () => {
    if (!validate()) return;

    setSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      submitMission(missionId);
      const demoParam = isDemo ? '?demo=1&step=7' : '';
      router.push(ROUTES.MISSION_FEEDBACK(missionId) + demoParam);
    } catch (err) {
      setError('提交失败，请重试');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFillExample = () => {
    setReport(exampleReport);
  };

  const handleClear = () => {
    setReport('');
    setErrors({});
  };

  const getStatusBadge = (status: MissionStatus) => {
    switch (status) {
      case MissionStatus.ACCEPTED:
        return { label: '进行中', variant: 'warning' as const };
      case MissionStatus.SUBMITTED:
        return { label: '已提交', variant: 'neutral' as const };
      case MissionStatus.COMPLETED:
        return { label: '已完成', variant: 'success' as const };
      default:
        return { label: '未知', variant: 'neutral' as const };
    }
  };

  if (loading) {
    return (
      <AppShell>
        <PageContainer>
          <LoadingState message="加载中..." />
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

  const statusBadge = getStatusBadge(mission.status);
  const backRoute = getCareerRouteByMissionId(missionId) || ROUTES.MISSION(missionId);

  return (
    <AppShell>
      <PageHeader 
        title={mission.title}
        description="提交分析报告"
        showBackButton
        backRoute={backRoute}
      />
      <PageContainer maxWidth="6xl">
        {isDemo && isMvpMission && currentStep === 6 && (
          <>
            <DemoGuideBar 
              currentStep={6} 
              nextStepTitle="查看AI评审反馈"
              nextStepAction={ROUTES.MISSION_FEEDBACK(missionId) + '?demo=1&step=7'}
            />
            <PixelCard className="mb-6 p-4 bg-gradient-to-r from-amber-900/30 to-amber-800/20 border-amber-600">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📝</span>
                <p className="text-amber-300">点击下方{'填充示例报告'}按钮，一键填入报告内容，然后提交给 AI 导师评审！</p>
              </div>
            </PixelCard>
          </>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <DemoHighlight targetStep={6} currentStep={currentStep} label="提交分析报告">
              <PixelCard className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-amber-400">分析报告</h3>
                  <PixelBadge variant={statusBadge.variant}>
                    {statusBadge.label}
                  </PixelBadge>
                </div>
                
                {errors.report && (
                  <div className="mb-4 p-3 bg-red-900/30 border-2 border-red-700 text-red-300 text-sm">
                    ⚠️ {errors.report}
                  </div>
                )}

                <SubmissionEditor
                  report={report}
                  code={code}
                  onReportChange={setReport}
                  onCodeChange={setCode}
                  hasUnsavedChanges={hasUnsavedChanges}
                />

                <div className="flex flex-wrap gap-3 mt-4">
                  <PixelButton 
                    variant="secondary" 
                    onClick={handleFillExample}
                    className="gap-2"
                  >
                    📋 填充示例报告
                  </PixelButton>
                  <PixelButton 
                    variant="secondary" 
                    onClick={handleClear}
                    className="gap-2"
                  >
                    🗑️ 清空内容
                  </PixelButton>
                  <PixelButton 
                    variant="secondary" 
                    onClick={() => setShowHistory(true)}
                    className="gap-2"
                  >
                    📜 历史记录
                  </PixelButton>
                </div>

                <div className="mt-6 flex justify-end">
                  <PixelButton 
                    variant="primary" 
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="gap-2"
                  >
                    {submitting ? (
                      <>⏳ 提交中...</>
                    ) : (
                      <>🚀 提交给 AI 导师评审</>
                    )}
                  </PixelButton>
                </div>
              </PixelCard>
            </DemoHighlight>
          </div>

          <div className="space-y-6">
            <SubmissionChecklist
              missionId={missionId}
            />
            <SubmissionQualityPanel report={report} />
          </div>
        </div>

        <SubmissionHistoryPanel
          missionId={missionId}
        />
      </PageContainer>
    </AppShell>
  );
}
