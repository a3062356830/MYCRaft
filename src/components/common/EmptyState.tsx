import React from 'react';
import { useRouter } from 'next/navigation';
import PixelCard from '@/components/pixel/PixelCard';
import PixelButton from '@/components/pixel/PixelButton';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: string;
  action?: {
    label: string;
    onClick?: () => void;
    href?: string;
  };
}

export default function EmptyState({
  title = '暂无内容',
  description = '完成任务后，这里会显示你的成长记录。',
  icon = '📭',
  action,
}: EmptyStateProps) {
  const router = useRouter();

  const handleAction = () => {
    if (action?.href) {
      router.push(action.href);
    } else if (action?.onClick) {
      action.onClick();
    }
  };

  return (
    <PixelCard className="text-center py-12">
      <div className="text-6xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-indigo-400 mb-3">{title}</h3>
      <p className="text-slate-400 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <PixelButton
          variant="primary"
          onClick={handleAction}
        >
          {action.label}
        </PixelButton>
      )}
    </PixelCard>
  );
}
