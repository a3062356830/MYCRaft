'use client';

import React from 'react';
import { PixelCard, PixelButton } from '@/components/pixel';
import { useRouter } from 'next/navigation';

interface DemoNextActionProps {
  step: number;
  title: string;
  description: string;
  buttonText: string;
  buttonAction: string;
  highlightElement?: string;
}

export default function DemoNextAction({
  step,
  title,
  description,
  buttonText,
  buttonAction,
  highlightElement
}: DemoNextActionProps) {
  const router = useRouter();

  const handleClick = () => {
    if (buttonAction.startsWith('http')) {
      window.location.href = buttonAction;
    } else {
      router.push(buttonAction);
    }
  };

  return (
    <PixelCard className="mb-6 p-5 bg-gradient-to-r from-amber-900/50 via-amber-800/30 to-amber-900/50 border-amber-500 shadow-lg shadow-amber-500/20">
      <div className="flex items-start gap-4">
        <div className="text-3xl animate-bounce flex-shrink-0">
          📌
        </div>
        <div className="flex-1">
          <h4 className="text-amber-300 font-bold text-lg mb-2">
            下一步：{title}
          </h4>
          <p className="text-slate-300 text-sm mb-4">
            {description}
          </p>
          
          {highlightElement && (
            <div className="mb-3 p-2 bg-amber-900/30 rounded border border-amber-600/50">
              <p className="text-amber-400 text-xs">
                💡 提示：查找页面中高亮标识的元素开始操作
              </p>
            </div>
          )}
          
          <PixelButton
            variant="primary"
            onClick={handleClick}
            className="text-lg px-6 py-3 animate-pulse shadow-lg shadow-indigo-500/30"
          >
            ➜ {buttonText}
          </PixelButton>
        </div>
      </div>
    </PixelCard>
  );
}
