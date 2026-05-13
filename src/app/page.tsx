'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  PixelButton,
  PixelCard,
  PixelDialog,
  PixelProgress,
  PixelBadge,
  PixelTextarea,
} from '@/components/pixel';

export default function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [text, setText] = useState('');
  const router = useRouter();

  return (
    <main className="min-h-screen p-8 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <PixelButton onClick={() => router.push('/lobby')}>
            🎮 进入职业大厅
          </PixelButton>
        </div>
        <h1 className="pixel-title text-4xl text-center mb-12">CareerCraft 像素风组件库</h1>

        <div className="grid gap-8">
          <PixelCard title="PixelButton 按钮">
            <div className="flex flex-wrap gap-4">
              <PixelButton>Primary 按钮</PixelButton>
              <PixelButton variant="secondary">Secondary 按钮</PixelButton>
              <PixelButton variant="danger">Danger 按钮</PixelButton>
              <PixelButton variant="ghost">Ghost 按钮</PixelButton>
              <PixelButton disabled>Disabled 按钮</PixelButton>
            </div>
          </PixelCard>

          <PixelCard title="PixelBadge 徽章">
            <div className="flex flex-wrap gap-4">
              <PixelBadge variant="honor">Honor 荣誉</PixelBadge>
              <PixelBadge variant="warning">Warning 警告</PixelBadge>
              <PixelBadge variant="fun">Fun 趣味</PixelBadge>
              <PixelBadge variant="neutral">Neutral 中性</PixelBadge>
            </div>
          </PixelCard>

          <PixelCard title="PixelProgress 进度条">
            <div className="space-y-6">
              <PixelProgress value={25} label="经验值" />
              <PixelProgress value={50} label="任务进度" color="#10b981" />
              <PixelProgress value={75} label="技能等级" color="#3b82f6" />
            </div>
          </PixelCard>

          <PixelCard title="PixelTextarea 文本框">
            <PixelTextarea
              value={text}
              onChange={setText}
              placeholder="在这里输入你的任务报告..."
              rows={4}
            />
            {text && <p className="mt-4 text-slate-400">你输入了：{text}</p>}
          </PixelCard>

          <PixelCard title="PixelDialog 弹窗">
            <PixelButton onClick={() => setDialogOpen(true)}>
              打开弹窗
            </PixelButton>
          </PixelCard>

          <PixelCard title="PixelCard (可悬停)" hoverable>
            <p>这是一个可悬停的卡片，鼠标悬停会有上浮效果！</p>
          </PixelCard>
        </div>
      </div>

      <PixelDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="欢迎来到 CareerCraft！"
      >
        <p className="mb-4">这是一个像素风的弹窗组件！</p>
        <p className="text-slate-400 mb-6">按 ESC 或点击右上角关闭按钮可以关闭。</p>
        <div className="flex justify-end gap-4">
          <PixelButton variant="secondary" onClick={() => setDialogOpen(false)}>
            取消
          </PixelButton>
          <PixelButton onClick={() => setDialogOpen(false)}>
            确定
          </PixelButton>
        </div>
      </PixelDialog>
    </main>
  );
}
