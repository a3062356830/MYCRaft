import { SkillNode } from '@/types';
import { skillTrees } from '@/data';

export const skillService = {
  getSkillsByCareerId: async (careerId: string): Promise<SkillNode[]> => {
    return skillTrees[careerId] || [];
  }
};
