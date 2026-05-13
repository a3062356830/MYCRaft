import React from 'react';

interface MissionMentorHintProps {
  careerId?: string;
}

const MENTOR_CONFIG = {
  'software-engineer': {
    mentorName: '架构大师',
    mentorAvatar: '👨‍💻',
    hint: '先复现，再定位，最后修复。',
  },
  'data-analyst': {
    mentorName: '数据探险家',
    mentorAvatar: '👨‍🔬',
    hint: '先理解字段含义，再做清洗和分析。',
  },
};

export default function MissionMentorHint({ careerId }: MissionMentorHintProps) {
  const config = MENTOR_CONFIG[careerId as keyof typeof MENTOR_CONFIG] || 
    MENTOR_CONFIG['software-engineer'];

  return (
    <div className="border-4 border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 p-6">
      {/* 导师信息 */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-amber-600 to-orange-700 border-4 border-amber-500 flex items-center justify-center flex-shrink-0">
          <span className="text-3xl">{config.mentorAvatar}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-amber-400">{config.mentorName}</h3>
          <p className="text-slate-500 text-sm">职业导师</p>
        </div>
      </div>

      {/* 导师提示 */}
      <div className="bg-slate-900/60 border-2 border-amber-700 p-4">
        <div className="flex items-start gap-3">
          <span className="text-amber-500 text-2xl mt-1">💬</span>
          <div>
            <p className="text-slate-300 italic leading-relaxed">
              {'\"'}{config.hint}{'\"'}
            </p>
          </div>
        </div>
      </div>

      {/* 底部装饰 */}
      <div className="mt-4 pt-3 border-t border-slate-700">
        <p className="text-slate-500 text-xs text-center">
          导师会在任务过程中给予指导
        </p>
      </div>
    </div>
  );
}
