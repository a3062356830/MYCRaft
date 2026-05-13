import React from 'react';
import { PixelCard } from '@/components/pixel';

interface FeedbackMentorCommentProps {
  mentorName: string;
  mentorAvatar: string;
  summaryComment: string;
  highlights: string[];
  suggestions: string[];
}

export default function FeedbackMentorComment({
  mentorName,
  mentorAvatar,
  summaryComment,
  highlights,
  suggestions
}: FeedbackMentorCommentProps) {
  return (
    <>
      <PixelCard title="👨‍🏫 导师评语">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-yellow-600 border-4 border-amber-400 flex items-center justify-center flex-shrink-0">
            <span className="text-3xl">{mentorAvatar}</span>
          </div>
          <div className="flex-1">
            <div className="text-amber-500 font-bold text-lg mb-2">{mentorName}</div>
            <p className="text-slate-300 leading-relaxed">{summaryComment}</p>
          </div>
        </div>
      </PixelCard>

      <PixelCard title="🌟 亮点">
        <ul className="space-y-3">
          {highlights.map((highlight, idx) => (
            <li 
              key={idx} 
              className="flex items-start gap-3 p-3 bg-green-900/30 border-2 border-green-700"
            >
              <span className="text-green-500 text-xl mt-1 flex-shrink-0">✓</span>
              <p className="text-slate-300">{highlight}</p>
            </li>
          ))}
        </ul>
      </PixelCard>

      <PixelCard title="💡 改进建议">
        <ul className="space-y-3">
          {suggestions.map((suggestion, idx) => (
            <li 
              key={idx} 
              className="flex items-start gap-3 p-3 bg-blue-900/30 border-2 border-blue-700"
            >
              <span className="text-blue-500 text-xl mt-1 flex-shrink-0">🔹</span>
              <p className="text-slate-300">{suggestion}</p>
            </li>
          ))}
        </ul>
      </PixelCard>
    </>
  );
}
