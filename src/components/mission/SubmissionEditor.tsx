import React, { useEffect, useRef, useState } from 'react';
import { PixelCard, PixelTextarea } from '@/components/pixel';

interface SubmissionEditorProps {
  report: string;
  code: string;
  onReportChange: (value: string) => void;
  onCodeChange: (value: string) => void;
  hasUnsavedChanges: boolean;
}

export default function SubmissionEditor({
  report,
  code,
  onReportChange,
  onCodeChange,
  hasUnsavedChanges
}: SubmissionEditorProps) {
  const reportLength = report.trim().length;
  const meetsLengthRequirement = reportLength >= 30;

  return (
    <div className="space-y-4">
      {/* 报告编辑器 */}
      <PixelCard title="📝 任务报告 (Markdown)">
        <PixelTextarea
          value={report}
          onChange={onReportChange}
          placeholder="在这里输入你的任务报告... 支持 Markdown 格式。例如：

## 项目简介

这是我的项目简介。

## 功能实现

- 功能1
- 功能2

## 技术栈

- React
- TypeScript"
          rows={12}
        />
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className={`font-bold ${meetsLengthRequirement ? 'text-green-400' : 'text-red-400'}`}>
            {reportLength} 字符
            {!meetsLengthRequirement && <span className="ml-1">/ 30+ 要求</span>}
          </span>
          <span className={`text-xs ${hasUnsavedChanges ? 'text-amber-400 font-bold' : 'text-slate-500'}`}>
            {hasUnsavedChanges ? '⚠️ 有未保存修改' : ''}
          </span>
        </div>
      </PixelCard>

      {/* 代码/说明编辑器 */}
      <PixelCard title="💻 代码 / 说明">
        <PixelTextarea
          value={code}
          onChange={onCodeChange}
          placeholder="在这里输入你的代码、配置文件内容、或者其他需要提交的文本内容..."
          rows={8}
        />
      </PixelCard>
    </div>
  );
}
