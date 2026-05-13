import { Feedback } from '@/types';

export const feedbacks: Record<string, Feedback> = {};

export const createMockFeedback = (missionId: string): Feedback => {
  return {
    id: `feedback-${missionId}`,
    missionId,
    score: 85,
    maxScore: 100,
    comment: '做得很棒！你对任务目标的理解很到位，任务完成质量很高！',
    strengths: ['目标理解清晰', '代码质量良好', '文档组织有序'],
    improvements: ['可以考虑更多的边界条件', '测试覆盖率可以进一步提高'],
    skillExpGained: [
      { skillId: 'se-debug', expGained: 100 },
      { skillId: 'se-test', expGained: 80 }
    ],
    badgesEarned: ['bug-hunter'],
    createdAt: new Date().toISOString()
  };
};
