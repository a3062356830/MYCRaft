import { Feedback } from '@/types';
import { createMockFeedback } from '@/data';

export const feedbackService = {
  getFeedbackByMissionId: async (missionId: string): Promise<Feedback | undefined> => {
    return createMockFeedback(missionId);
  }
};
