import React from 'react';
import { PixelCard, PixelButton } from '@/components/pixel';

interface FeedbackNextActionProps {
  hasAvailableTasks: boolean;
  allTasksCompleted: boolean;
  onBackToHub: () => void;
  onNextMission: () => void;
  onBackToLobby: () => void;
}

export default function FeedbackNextAction({
  hasAvailableTasks,
  allTasksCompleted,
  onBackToHub,
  onNextMission,
  onBackToLobby
}: FeedbackNextActionProps) {
  return (
    <PixelCard title="📋 下一步操作">
      <div className="space-y-3">
        {hasAvailableTasks && !allTasksCompleted && (
          <PixelButton onClick={onNextMission} className="w-full">
            🔄 继续下一个任务
          </PixelButton>
        )}
        
        {allTasksCompleted && (
          <div className="text-center py-4 bg-amber-900/30 border-2 border-amber-500 mb-4">
            <div className="text-2xl mb-2">🎊</div>
            <div className="text-amber-500 font-bold">阶段训练完成！</div>
          </div>
        )}

        <PixelButton variant="secondary" onClick={onBackToHub} className="w-full">
          📋 返回职业中枢
        </PixelButton>
        
        <PixelButton variant="secondary" onClick={onBackToLobby} className="w-full">
          🏠 返回职业大厅
        </PixelButton>
      </div>
    </PixelCard>
  );
}
