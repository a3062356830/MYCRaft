import { getCareerMentor, Mentor } from '@/data';

export const mentorService = {
  getCareerMentor: async (careerId: string): Promise<Mentor> => {
    return getCareerMentor(careerId);
  }
};
