import { Mission } from '@/types';
import { missions } from '@/data';

export const missionService = {
  getMissions: async (): Promise<Mission[]> => {
    return Object.values(missions).flat();
  },

  getMissionsByCareerId: async (careerId: string): Promise<Mission[]> => {
    return missions[careerId] || [];
  },

  getMissionById: async (missionId: string): Promise<Mission | undefined> => {
    for (const careerMissions of Object.values(missions)) {
      const mission = careerMissions.find(m => m.id === missionId);
      if (mission) return mission;
    }
    return undefined;
  }
};
