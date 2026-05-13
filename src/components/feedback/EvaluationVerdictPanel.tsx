import React from 'react';
import { PixelCard, PixelBadge, PixelProgress } from '@/components/pixel';

interface EvaluationVerdictProps {
  isSoftwareEngineer: boolean;
  isPassed: boolean;
  grade: string;
  totalScore: number;
  maxScore: number;
  summary: string;
}

export default function EvaluationVerdictPanel({
  isSoftwareEngineer,
  isPassed,
  grade,
  totalScore,
  maxScore,
  summary
}: EvaluationVerdictProps) {
  const evaluatorConfig = {
    'data-analyst': {
      name: '资深数据分析师',
      avatar: '📊',
      // TODO: 需要用户补充素材 - /assets/agent/evaluator-da.png
      focus: ['指标口径', '分析链路', '业务建议']
    },
    'software-engineer': {
      name: '资深软件工程师',
      avatar: '🧑‍💻',
      // TODO: 需要用户补充素材 - /assets/agent/evaluator-se.png
      focus: ['复现路径', '代码正确性', '测试覆盖']
    }
  };

  const config = evaluatorConfig[isSoftwareEngineer ? 'software-engineer' : 'data-analyst'];

  return (
    <PixelCard title="📋 评审结论">
      <div className="space-y-4">
        {/* 评审人信息 */}
        <div className="flex items-center gap-3 p-3 bg-slate-800/70 border-2 border-slate-700">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-700 border-2 border-purple-500 flex items-center justify-center">
            <span className="text-2xl">{config.avatar}</span>
          </div>
          <div>
            <h4 className="font-bold text-purple-400">{config.name}</h4>
            <div className="text-slate-400 text-xs">
              关注：{config.focus.join(' · ')}
            </div>
          </div>
        </div>

        {/* 结论 */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-slate-800/80 border-2 border-slate-700">
            <div className="text-xs text-slate-400 mb-1">评审结论</div>
            <PixelBadge variant={isPassed ? 'success' : 'warning'}>
              {isPassed ? '通过' : '需重试'}
            </PixelBadge>
          </div>
          <div className="text-center p-3 bg-slate-800/80 border-2 border-slate-700">
            <div className="text-xs text-slate-400 mb-1">综合评级</div>
            <div className="text-3xl font-bold text-amber-500">
              {grade}
            </div>
          </div>
          <div className="text-center p-3 bg-slate-800/80 border-2 border-slate-700">
            <div className="text-xs text-slate-400 mb-1">总分</div>
            <div className="text-xl font-bold text-green-400">
              {totalScore} / {maxScore}
            </div>
          </div>
        </div>

        {/* 进度条 */}
        <PixelProgress 
          value={(totalScore / maxScore) * 100} 
          color={totalScore >= 80 ? '#10b981' : totalScore >= 60 ? '#f59e0b' : '#ef4444'} 
        />

        {/* AI 总结 */}
        <div className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-2 border-amber-700 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-500">💭</span>
            <div className="text-amber-400 font-bold text-sm">
              AI 同事总结
            </div>
          </div>
          <p className="text-slate-200 text-sm leading-relaxed">
            {summary}
          </p>
        </div>
      </div>
    </PixelCard>
  );
}
