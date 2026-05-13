import React, { useState } from 'react';
import { PixelCard, PixelButton } from '@/components/pixel';

interface SubmissionQualityPanelProps {
  report: string;
}

export default function SubmissionQualityPanel({ report }: SubmissionQualityPanelProps) {
  const [showPreview, setShowPreview] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const handlePreview = () => {
    setIsPreviewing(true);
    setTimeout(() => {
      setShowPreview(true);
      setIsPreviewing(false);
    }, 1000);
  };

  return (
    <div className="space-y-4">
      {/* AI 预审按钮和结果 */}
      <PixelCard title="🤖 AI 预审">
        <div className="space-y-4">
          <PixelButton
            variant="secondary"
            onClick={handlePreview}
            disabled={isPreviewing || !report.trim()}
            className="w-full"
          >
            {isPreviewing ? '⏳ AI 正在分析...' : '🤖 AI 预审一下'}
          </PixelButton>

          {showPreview && !isPreviewing && (
            <div className="mt-4 space-y-3 bg-slate-800 p-4 border-2 border-amber-700">
              <h4 className="text-amber-500 font-bold mb-3">📋 预审结果</h4>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <p className="text-slate-300">当前报告结构基本完整</p>
                </div>
                
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">⚠</span>
                  <p className="text-slate-300">建议补充边界情况的说明</p>
                </div>
                
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1">⚠</span>
                  <p className="text-slate-300">建议结论部分更具体</p>
                </div>
                
                <div className="pt-3 border-t border-slate-700 mt-3">
                  <p className="text-slate-300">
                    <span className="text-amber-500 font-bold">当前预计评分：</span>
                    78 - 85 分
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </PixelCard>
    </div>
  );
}
