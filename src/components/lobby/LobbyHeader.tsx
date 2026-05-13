import React from 'react';

export default function LobbyHeader() {
  return (
    <header className="text-center py-8">
      <h1 className="pixel-title text-5xl md:text-6xl mb-4 text-amber-500 drop-shadow-lg">
        CAREERCRAFT
      </h1>
      <p className="text-xl text-slate-300 mb-2">
        构建职业未来，解锁无限可能！
      </p>
      <div className="flex justify-center gap-4">
        <span className="text-2xl animate-pulse">⚔️</span>
        <span className="text-2xl animate-pulse" style={{ animationDelay: '0.2s' }}>🌟</span>
        <span className="text-2xl animate-pulse" style={{ animationDelay: '0.4s' }}>🎮</span>
      </div>
    </header>
  );
}
