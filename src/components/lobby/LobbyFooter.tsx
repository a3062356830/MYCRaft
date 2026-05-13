import React from 'react';
import { PixelBadge } from '@/components/pixel';

export default function LobbyFooter() {
  return (
    <footer className="py-6 mt-8 border-t-4 border-slate-700">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎮</span>
            <div>
              <p className="text-amber-500 font-bold text-lg">Lv.1 职业冒险者</p>
              <p className="text-slate-400 text-sm">欢迎来到 CareerCraft 世界！</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-xl">💰</span>
              <span className="text-slate-300 font-bold">0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-blue-500 text-xl">⭐</span>
              <span className="text-slate-300 font-bold">0</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500 text-xl">🏆</span>
              <span className="text-slate-300 font-bold">0</span>
            </div>
          </div>

          <div className="flex gap-2">
            <PixelBadge variant="neutral">新手</PixelBadge>
            <PixelBadge variant="fun">探索者</PixelBadge>
          </div>
        </div>
      </div>
    </footer>
  );
}
