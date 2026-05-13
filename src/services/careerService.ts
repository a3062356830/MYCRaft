import { CareerIsland } from '@/types';
import { careerIslands } from '@/data';

export const careerService = {
  getAllCareerIslands: async (): Promise<CareerIsland[]> => {
    return careerIslands;
  },

  getCareerIslandById: async (id: string): Promise<CareerIsland | undefined> => {
    return careerIslands.find(island => island.id === id);
  }
};
