'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PixelCard } from '@/components/pixel';
import DemoGuideBar from '@/components/demo/DemoGuideBar';
import DemoHighlight from '@/components/demo/DemoHighlight';
import FeynmanQuestionCard from '@/components/feynman/FeynmanQuestionCard';
import FeynmanAnswerBox from '@/components/feynman/FeynmanAnswerBox';
import FeynmanRubric from '@/components/feynman/FeynmanRubric';
import FeynmanFeedbackPanel from '@/components/feynman/FeynmanFeedbackPanel';
import { ROUTES } from '@/constants';
import { isDemoMode, getDemoStep, MVP_MISSION_ID } from '@/utils/demoFlow';

interface FeynmanChallengeContentProps {
  missionId: string;
}

const questionBank = {
  'software-engineer': [
    {
      id: 'se-1',
      text: '为什么修 Bug 前要先复现？',
      type: '为什么',
      difficulty: 'easy' as const
    },
    {
      id: 'se-2',
      text: '什么是最小复现场景？',
      type: '定义',
      difficulty: 'medium' as const
    },
    {
      id: 'se-3',
      text: '为什么单元测试能降低回归风险？',
      type: '为什么',
      difficulty: 'hard' as const
    }
  ],
  'data-analyst': [
    {
      id: 'da-1',
      text: '请用最简单的话解释：什么是用户活跃度？',
      type: '定义',
      difficulty: 'easy' as const
    },
    {
      id: 'da-2',
      text: '为什么不能只看 DAU 判断产品是否健康？',
      type: '为什么',
      difficulty: 'medium' as const
    },
    {
      id: 'da-3',
      text: '什么是分组聚合？它解决什么问题？',
      type: '定义',
      difficulty: 'hard' as const
    }
  ]
};

const generateMockFeedback = (score: number) => {
  const feedbackTemplates = [
    {
      score: 82,
      rating: '理解良好',
      aiFeedback: '你的解释比较清楚，但还可以增加一个生活化例子。',
      strengths: ['能抓住核心含义', '没有堆太多术语'],
      improvements: ['增加一个具体例子', '说明它在当前任务中的作用']
    },
    {
      score: 95,
      rating: '理解深刻',
      aiFeedback: '太棒了！你的解释非常清楚，连我这个不懂技术的人都能理解！',
      strengths: ['解释足够简单', '有很好的类比', '举例恰当', '避免了术语堆砌'],
      improvements: ['保持这个水平！']
    },
    {
      score: 65,
      rating: '基本理解',
      aiFeedback: '你理解了基本概念，但解释还可以更生动一些。',
      strengths: ['抓住了核心概念'],
      improvements: ['尝试用更生活化的语言', '增加一个具体例子', '避免使用专业术语']
    },
    {
      score: 45,
      rating: '需要加强',
      aiFeedback: '概念理解还不够深入，建议再想想如何用更简单的话解释。',
      strengths: ['尝试回答了问题'],
      improvements: ['用大白话解释', '假设听众完全不懂', '增加类比和例子']
    }
  ];
  
  const template = feedbackTemplates.find(t => Math.abs(t.score - score) < 15) || feedbackTemplates[0];
  return {
    ...template,
    score: score,
    maxScore: 100,
    badgeEarned: score >= 70
  };
};

const generateMockRubric = () => {
  return [
    { name: '是否足够简单', icon: '🗣️', score: Math.floor(Math.random() * 10 + 15), maxScore: 25 },
    { name: '是否有类比', icon: '🔄', score: Math.floor(Math.random() * 10 + 15), maxScore: 25 },
    { name: '是否能举例', icon: '💡', score: Math.floor(Math.random() * 10 + 15), maxScore: 25 },
    { name: '是否避免堆术语', icon: '📚', score: Math.floor(Math.random() * 10 + 15), maxScore: 25 }
  ];
};

export default function FeynmanChallengeContent({ missionId }: FeynmanChallengeContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemo = isDemoMode(searchParams);
  const currentStep = getDemoStep(searchParams);
  const isMvpMission = missionId === MVP_MISSION_ID;
  
  const [step, setStep] = useState<'question' | 'feedback'>('question');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<any>(null);
  const [rubric, setRubric] = useState<any>(null);
  const [careerType, setCareerType] = useState<'software-engineer' | 'data-analyst'>('software-engineer');

  useEffect(() => {
    if (missionId.includes('data')) {
      setCareerType('data-analyst');
    }
  }, [missionId]);

  const questions = questionBank[careerType];
  const currentQuestion = isDemo ? questions[0] : questions[currentQuestionIndex];

  const handleSubmit = () => {
    if (answer.length < 30) return;
    
    const newRubric = generateMockRubric();
    const totalScore = newRubric.reduce((sum: number, item: any) => sum + item.score, 0);
    
    setRubric(newRubric);
    setFeedback(generateMockFeedback(totalScore));
    setStep('feedback');
  };

  const handleRetry = () => {
    setAnswer('');
    setStep('question');
    setFeedback(null);
    setRubric(null);
    if (!isDemo) {
      setCurrentQuestionIndex((prev) => (prev + 1) % questions.length);
    }
  };

  const handleStep4Next = () => {
    router.push(`/mission/${MVP_MISSION_ID}?demo=1&step=5`);
  };

  const handleBackToMission = () => {
    const demoParam = isDemo ? '?demo=1' : '';
    router.push(ROUTES.MISSION(missionId) + demoParam);
  };

  const handleBackToSubmit = () => {
    const demoParam = isDemo ? '?demo=1' : '';
    router.push(ROUTES.MISSION_SUBMIT(missionId) + demoParam);
  };

  return (
    <>
      {isDemo && isMvpMission && currentStep === 4 && (
        <>
          <DemoGuideBar 
            currentStep={4} 
            nextStepTitle="接受AI主管任务"
            nextStepAction={handleStep4Next}
          />
          <PixelCard className="mb-6 p-4 bg-gradient-to-r from-purple-900/30 to-purple-800/20 border-purple-600">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🧠</span>
              <p className="text-purple-300">费曼理解挑战！用最简单的话解释清楚概念，证明你真正理解了！</p>
            </div>
          </PixelCard>
        </>
      )}
    
      <DemoHighlight targetStep={4} currentStep={currentStep} label="回答费曼问题">
        {step === 'question' ? (
          <>
            <FeynmanQuestionCard
              question={currentQuestion}
              questionNumber={isDemo ? 1 : currentQuestionIndex + 1}
              totalQuestions={isDemo ? 1 : questions.length}
            />
            
            <FeynmanAnswerBox
              value={answer}
              onChange={setAnswer}
              onSubmit={handleSubmit}
              disabled={false}
            />
          </>
        ) : (
          <>
            <FeynmanRubric rubrics={rubric} />
            <FeynmanFeedbackPanel
              feedback={feedback}
              onBackToMission={handleBackToMission}
              onBackToSubmit={handleBackToSubmit}
              onRetry={handleRetry}
            />
          </>
        )}
      </DemoHighlight>
    </>
  );
}
