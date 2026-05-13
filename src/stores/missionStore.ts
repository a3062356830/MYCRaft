'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MissionStatus } from '@/types';
import { STORAGE_KEYS } from '@/constants';

interface MissionDraft {
  report: string;
  code: string;
}

interface MissionStore {
  // 状态
  missionStatuses: Record<string, MissionStatus>;
  missionDrafts: Record<string, MissionDraft>;
  
  // 动作
  acceptMission: (missionId: string) => void;
  saveDraft: (missionId: string, draft: MissionDraft) => void;
  submitMission: (missionId: string) => void;
  completeMission: (missionId: string) => void;
  resetMissionStatuses: () => void;
  
  // 查询
  getMissionStatus: (missionId: string, defaultStatus: MissionStatus) => MissionStatus;
  getDraft: (missionId: string) => MissionDraft | null;
}

export const useMissionStore = create<MissionStore>()(
  persist(
    (set, get) => ({
      // 初始状态
      missionStatuses: {},
      missionDrafts: {},

      // 接受任务
      acceptMission: (missionId) =>
        set((state) => ({
          missionStatuses: {
            ...state.missionStatuses,
            [missionId]: MissionStatus.ACCEPTED,
          },
        })),

      // 保存草稿
      saveDraft: (missionId, draft) =>
        set((state) => ({
          missionDrafts: {
            ...state.missionDrafts,
            [missionId]: draft,
          },
        })),

      // 提交任务
      submitMission: (missionId) =>
        set((state) => ({
          missionStatuses: {
            ...state.missionStatuses,
            [missionId]: MissionStatus.SUBMITTED,
          },
        })),

      // 完成任务
      completeMission: (missionId) =>
        set((state) => ({
          missionStatuses: {
            ...state.missionStatuses,
            [missionId]: MissionStatus.COMPLETED,
          },
        })),

      // 重置所有任务状态
      resetMissionStatuses: () =>
        set(() => ({
          missionStatuses: {},
          missionDrafts: {},
        })),

      // 获取任务状态
      getMissionStatus: (missionId, defaultStatus) => {
        const state = get();
        return state.missionStatuses[missionId] || defaultStatus;
      },

      // 获取草稿
      getDraft: (missionId) => {
        const state = get();
        return state.missionDrafts[missionId] || null;
      },
    }),
    {
      name: STORAGE_KEYS.MISSION_STATUSES,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
