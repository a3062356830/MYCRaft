import React, { useEffect, useState } from 'react';
import { PixelCard, PixelBadge } from '@/components/pixel';

interface SubmissionRecord {
  missionId: string;
  submittedAt: string;
  reportLength: number;
  qualityScore: number;
  status: 'submitted';
}

interface SubmissionHistoryPanelProps {
  missionId: string;
}

export default function SubmissionHistoryPanel({ missionId }: SubmissionHistoryPanelProps) {
  const STORAGE_KEY = `careercraft-submission-history-${missionId}`;
  const [history, setHistory] = useState<SubmissionRecord[]>([]);

  // 从localStorage加载历史记录
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    }
  }, [STORAGE_KEY]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString('zh-CN', {
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <PixelCard title="📜 提交历史">
      {history.length === 0 ? (
        <div className="text-center py-6 text-slate-500">
          <p>暂无提交记录</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.slice(0, 3).map((record, index) => (
            <div
              key={index}
              className="p-3 bg-slate-800 border-2 border-slate-700"
              style={{
                boxShadow: 'inset -2px -2px 0px 0px #0f172a, inset 2px 2px 0px 0px #334155'
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="text-xs text-slate-500 mb-1">{formatDate(record.submittedAt)}</div>
                  <PixelBadge variant="honor" className="text-xs">
                    ✅ 已提交
                  </PixelBadge>
                </div>
                <div className="text-right">
                  <div className="text-amber-500 font-bold text-sm">
                    {record.qualityScore} / 5
                  </div>
                  <div className="text-xs text-slate-400">
                    质量分
                  </div>
                </div>
              </div>
              <div className="text-xs text-slate-400">
                报告长度：{record.reportLength} 字符
              </div>
            </div>
          ))}
        </div>
      )}
    </PixelCard>
  );
}
