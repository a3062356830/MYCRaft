import React from 'react';
import { PixelButton, PixelBadge } from '@/components/pixel';
import { EmptyState } from '@/components/common';
import { MissionStatus } from '@/types';
import { ROUTES } from '@/constants';
import { useRouter } from 'next/navigation';

interface MissionHistoryItem {
  id: string;
  title: string;
  careerId: string;
  status: MissionStatus;
  rewardExp: number;
  hasFeedback: boolean;
}

interface PortfolioMissionHistoryProps {
  missions: MissionHistoryItem[];
}

export default function PortfolioMissionHistory({
  missions
}: PortfolioMissionHistoryProps) {
  const router = useRouter();

  if (missions.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-bold text-amber-500 mb-3 flex items-center gap-2">
          <span>📋</span>
          <span>任务历史</span>
        </h2>
        <EmptyState 
          description="还没有任务记录，去职业大厅开始吧！"
        />
      </div>
    );
  }

  const getStatusColor = (status: MissionStatus) => {
    switch (status) {
      case MissionStatus.COMPLETED:
        return 'text-green-500 bg-green-900/30 border-green-700';
      case MissionStatus.SUBMITTED:
        return 'text-blue-500 bg-blue-900/30 border-blue-700';
      case MissionStatus.ACCEPTED:
        return 'text-amber-500 bg-amber-900/30 border-amber-700';
      default:
        return 'text-slate-500 bg-slate-800 border-slate-700';
    }
  };

  const getStatusText = (status: MissionStatus) => {
    switch (status) {
      case MissionStatus.COMPLETED:
        return '已完成';
      case MissionStatus.SUBMITTED:
        return '已提交';
      case MissionStatus.ACCEPTED:
        return '进行中';
      default:
        return '未知';
    }
  };

  const getCareerName = (careerId: string) => {
    switch (careerId) {
      case 'software-engineer':
        return '软件工程';
      case 'data-analyst':
        return '数据分析';
      default:
        return '多职业';
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-amber-500 mb-3 flex items-center gap-2">
        <span>📋</span>
        <span>任务历史</span>
      </h2>
      <div className="space-y-2">
        {missions.map((mission) => (
          <div 
            key={mission.id}
            className="p-3 bg-slate-800 border-3 border-slate-700 hover:border-amber-600 transition-colors"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="flex-1">
                <h4 className="text-slate-200 font-bold text-sm mb-1">{mission.title}</h4>
                <div className="flex flex-wrap gap-1 items-center">
                  <PixelBadge variant="neutral" className="text-xs py-0 px-1.5">
                    {getCareerName(mission.careerId)}
                  </PixelBadge>
                  <span className={`px-1.5 py-0.5 text-xs font-bold border-2 ${getStatusColor(mission.status)}`}>
                    {getStatusText(mission.status)}
                  </span>
                  <span className="text-green-500 text-xs">
                    +{mission.rewardExp} XP
                  </span>
                </div>
              </div>
              
              {mission.status === MissionStatus.COMPLETED && mission.hasFeedback && (
                <PixelButton 
                  variant="secondary"
                  onClick={() => router.push(ROUTES.MISSION_FEEDBACK(mission.id))}
                  className="w-full md:w-auto text-xs py-1"
                >
                  查看报告
                </PixelButton>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
