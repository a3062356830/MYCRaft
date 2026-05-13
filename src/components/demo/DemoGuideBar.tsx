'use client';

import React, { useState } from 'react';
import { PixelCard, PixelButton } from '@/components/pixel';
import { DEMO_STEPS } from '@/utils/demoFlow';

interface DemoGuideBarProps {
  currentStep: number;
  nextStepTitle?: string;
  nextStepAction?: string | (() => void);
}

export default function DemoGuideBar({
  currentStep,
  nextStepTitle = '下一步',
  nextStepAction
}: DemoGuideBarProps) {
  const [showAllSteps, setShowAllSteps] = useState(false);
  const currentStepData = DEMO_STEPS.find(s => s.id === currentStep);
  const progress = (currentStep / DEMO_STEPS.length) * 100;

  const handleNext = () => {
    if (nextStepAction) {
      if (typeof nextStepAction === 'function') {
        nextStepAction();
      } else if (nextStepAction.startsWith('http') || nextStepAction.startsWith('/')) {
        window.location.href = nextStepAction;
      }
    }
  };

  return (
    <div className="mb-6">
      {/* TODO: 添加MVP演示背景图 /assets/demo/demo-guide-bg.png */}
      <PixelCard className="p-4 bg-gradient-to-r from-indigo-900/90 via-indigo-800/70 to-indigo-900/90 border-indigo-500 max-w-[1440px]">
        {/* 顶部标题和进度 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl animate-pulse">🎯</span>
            <div>
              <h3 className="text-indigo-300 font-bold text-xl">MVP 演示指引</h3>
              <p className="text-slate-400 text-sm mt-1">{currentStepData?.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-gradient-to-r from-indigo-600/50 border-2 border-indigo-400">
              <span className="text-indigo-200 font-bold text-lg">
                步骤 {currentStep} / {DEMO_STEPS.length}
              </span>
            </div>
            <button
              onClick={() => setShowAllSteps(!showAllSteps)}
              className="px-3 py-1 bg-slate-700 text-slate-300 text-sm border-2 border-slate-500 hover:bg-slate-600"
            >
              {showAllSteps ? '收起' : '展开'}
            </button>
          </div>
        </div>

        {/* 进度条 */}
        <div className="mb-4">
          <div className="w-full bg-slate-700 border-2 border-slate-600 p-1">
          <div 
            className="h-3 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
          </div>
        </div>

        {/* 桌面端横向可滚动步骤条 */}
        <div className="hidden md:block mb-4">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {DEMO_STEPS.map((step) => {
              const isActive = step.id === currentStep;
              const isCompleted = step.id < currentStep;
              const isPending = step.id > currentStep;
              
              return (
                <div
                  key={step.id}
                  className={`
                    flex-shrink-0 min-w-[120px]
                    border-2 p-3
                    transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-indigo-600/50 to-indigo-500/30 border-indigo-400 animate-pulse scale-105' 
                      : isCompleted 
                      ? 'bg-gradient-to-r from-green-600/30 to-green-500/20 border-green-400' 
                      : 'bg-slate-800/50 border-slate-600'
                    }
                  `}
                  title={step.fullLabel}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">
                      {isCompleted ? '✓' : step.id}
                    </span>
                    <span className="text-sm font-medium whitespace-nowrap">
                      {step.shortLabel}
                    </span>
                  </div>
                  {isActive && (
                    <div className="text-xs text-indigo-300 mt-1 truncate">
                      {step.fullLabel}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 移动端步骤列表（可展开） */}
        {showAllSteps && (
          <div className="md:hidden mb-4 bg-slate-800/50 p-3 border-2 border-slate-600">
            <h4 className="text-slate-300 font-bold mb-2">完整步骤</h4>
            <div className="space-y-2">
              {DEMO_STEPS.map((step) => {
                const isActive = step.id === currentStep;
                const isCompleted = step.id < currentStep;
                return (
                  <div
                    key={step.id}
                    className={`flex items-center gap-2 p-2 border-2
                      ${isActive ? 'bg-indigo-600/30 border-indigo-400' 
                      : isCompleted ? 'bg-green-600/20 border-green-400' 
                      : 'border-slate-600'}
                    `}
                  >
                    <span className="w-6 h-6 flex items-center justify-center border-2">
                      {isCompleted ? '✓' : step.id}
                    </span>
                    <span className="text-sm">{step.fullLabel}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 移动端简化显示 */}
        <div className="md:hidden mb-4 flex items-center justify-between bg-slate-800/50 p-3 border-2 border-slate-600">
          <div>
            <div className="text-slate-400 text-xs">步骤 {currentStep} / {DEMO_STEPS.length}</div>
            <div className="text-indigo-300 font-bold">{currentStepData?.fullLabel}</div>
          </div>
        </div>

        {/* 下一步按钮 */}
        {nextStepAction && (
          <div className="flex justify-center">
            <PixelButton
            variant="primary"
            onClick={handleNext}
            className="text-base px-6 py-3"
          >
            ➜ {nextStepTitle}
          </PixelButton>
          </div>
        )}
      </PixelCard>
    </div>
  );
}
