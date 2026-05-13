import React from 'react';
import { PixelButton } from '@/components/pixel';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants';

interface CareerQuickActionsProps {
  onScrollToTasks?: () => void;
  onScrollToSkills?: () => void;
  onAskMentor?: () => void;
}

const QUICK_ACTIONS = [
  {
    id: 'start-task',
    title: '开始推荐任务',
    icon: '📋',
    description: '直接进入任务看板',
    action: 'scrollToTasks'
  },
  {
    id: 'skill-route',
    title: '查看技能路线',
    icon: '🌳',
    description: '规划技能成长路径',
    action: 'scrollToSkills'
  },
  {
    id: 'ask-mentor',
    title: '询问 AI 导师',
    icon: '🤖',
    description: '向导师寻求建议',
    action: 'askMentor'
  },
  {
    id: 'portfolio',
    title: '打开成长档案',
    icon: '📂',
    description: '查看你的成就',
    action: 'goToPortfolio'
  }
];

export default function CareerQuickActions({
  onScrollToTasks,
  onScrollToSkills,
  onAskMentor
}: CareerQuickActionsProps) {
  const router = useRouter();

  const handleAction = (actionId: string) => {
    switch (actionId) {
      case 'scrollToTasks':
        if (onScrollToTasks) onScrollToTasks();
        break;
      case 'scrollToSkills':
        if (onScrollToSkills) onScrollToSkills();
        break;
      case 'askMentor':
        if (onAskMentor) onAskMentor();
        break;
      case 'goToPortfolio':
        router.push(ROUTES.PORTFOLIO);
        break;
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {QUICK_ACTIONS.map((action) => (
        <button
          key={action.id}
          onClick={() => handleAction(action.action)}
          className="group p-4 bg-slate-800 border-4 border-slate-700 text-left hover:border-amber-600 hover:bg-slate-700/80 transition-all duration-200"
        >
          <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
            {action.icon}
          </div>
          <h4 className="text-amber-400 font-bold mb-1">
            {action.title}
          </h4>
          <p className="text-slate-400 text-xs leading-tight">
            {action.description}
          </p>
        </button>
      ))}
    </div>
  );
}
