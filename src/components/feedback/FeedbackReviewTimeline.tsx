import React from 'react';
import { PixelCard } from '@/components/pixel';

interface TimelineItem {
  id: string;
  title: string;
  icon: string;
  completed: boolean;
}

interface FeedbackReviewTimelineProps {
  items?: TimelineItem[];
}

const defaultItems: TimelineItem[] = [
  { id: '1', title: '已提交', icon: '📤', completed: true },
  { id: '2', title: 'AI 预审', icon: '🤖', completed: true },
  { id: '3', title: '导师评审', icon: '👨‍🏫', completed: true },
  { id: '4', title: '技能经验结算', icon: '💎', completed: true },
  { id: '5', title: '任务完成', icon: '🎉', completed: true },
];

export default function FeedbackReviewTimeline({
  items = defaultItems
}: FeedbackReviewTimelineProps) {
  return (
    <PixelCard title="⏱️ 评审进度">
      <div className="space-y-0">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <div key={item.id} className="flex">
              <div className="flex flex-col items-center mr-4">
                <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center ${
                  item.completed 
                    ? 'bg-green-900 border-green-500' 
                    : 'bg-slate-800 border-slate-700'
                }`}>
                  <span className="text-lg">{item.icon}</span>
                </div>
                {!isLast && (
                  <div className={`w-1 flex-1 ${
                    item.completed ? 'bg-green-500' : 'bg-slate-700'
                  }`} />
                )}
              </div>
              <div className="flex-1 py-2">
                <div className={`font-bold ${
                  item.completed ? 'text-green-500' : 'text-slate-500'
                }`}>
                  {item.title}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PixelCard>
  );
}
