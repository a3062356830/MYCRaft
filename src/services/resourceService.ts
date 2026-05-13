import { Resource } from '@/types';
import { resources } from '@/data';

export const resourceService = {
  getResourcesByCareerId: async (careerId: string): Promise<Resource[]> => {
    return resources[careerId] || [];
  }
};
