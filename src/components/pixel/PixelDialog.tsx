'use client';

import React, { useEffect } from 'react';

interface PixelDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function PixelDialog({
  open,
  onClose,
  title,
  children,
}: PixelDialogProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <div
        className="relative bg-slate-800 border-4 border-slate-600 w-full max-w-lg mx-4"
        style={{
          boxShadow:
            'inset -4px -4px 0px 0px #0f172a, inset 4px 4px 0px 0px #475569, 0 10px 40px rgba(0,0,0,0.5)',
        }}
      >
        <div className="flex items-center justify-between p-4 border-b-4 border-slate-600 bg-slate-700">
          <h2 className="text-indigo-400 font-bold text-xl">{title}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-red-600 text-white font-bold flex items-center justify-center cursor-pointer"
            style={{
              boxShadow:
                'inset -2px -2px 0px 0px #991b1b, inset 2px 2px 0px 0px #fca5a5',
            }}
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
