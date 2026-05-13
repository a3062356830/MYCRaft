import React from 'react';
import { PixelBadge } from '@/components/pixel';
import { Mission } from '@/types';

interface MissionClientRequestProps {
  mission: Mission;
}

// 职业对应的客户和提示
const CAREER_CLIENT_CONFIG = {
  'software-engineer': {
    client: '后端服务团队',
    clientIcon: '👨‍💻',
    riskTitle: '⚠️ 风险提示',
    riskText: '不要直接改代码，先确认复现路径。',
  },
  'data-analyst': {
    client: '增长运营团队',
    clientIcon: '📈',
    riskTitle: '⚠️ 风险提示',
    riskText: '不要只看表面趋势，要检查异常值和口径。',
  },
};

export default function MissionClientRequest({ mission }: MissionClientRequestProps) {
  const config = CAREER_CLIENT_CONFIG[mission.careerId as keyof typeof CAREER_CLIENT_CONFIG] || 
    CAREER_CLIENT_CONFIG['software-engineer'];

  return (
    <div className="border-4 border-slate-700 bg-slate-800/80 p-6">
      {/* 标题 */}
      <div className="flex items-center justify-center mb-6">
        <span className="text-2xl mr-2">🏢</span>
        <h2 className="text-xl font-bold text-amber-500">企业客户需求</h2>
        <span className="text-2xl ml-2">🏢</span>
      </div>

      {/* 客户信息 */}
      <div className="mb-6 bg-slate-900/70 border-2 border-slate-700 p-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{config.clientIcon}</span>
          <div>
            <div className="text-amber-400 font-bold">{config.client}</div>
            <div className="text-slate-500 text-sm">任务委托方</div>
          </div>
        </div>
      </div>

      {/* 需求描述 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <PixelBadge variant="warning">📋</PixelBadge>
          <h3 className="font-bold text-slate-300">需求描述</h3>
        </div>
        <div className="bg-slate-900/50 border-2 border-slate-700 p-4">
          <p className="text-slate-300">{mission.description}</p>
        </div>
      </div>

      {/* 验收标准 */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <PixelBadge variant="success">✅</PixelBadge>
          <h3 className="font-bold text-slate-300">验收标准</h3>
        </div>
        <div className="bg-slate-900/50 border-2 border-slate-700 p-4">
          <ul className="space-y-2">
            {mission.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-slate-400">{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 风险提示 */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <PixelBadge variant="neutral">⚠️</PixelBadge>
          <h3 className="font-bold text-slate-300">{config.riskTitle}</h3>
        </div>
        <div className="bg-amber-900/20 border-2 border-amber-700 p-4">
          <p className="text-amber-400 italic">{'\"'}{config.riskText}{'\"'}</p>
        </div>
      </div>
    </div>
  );
}
