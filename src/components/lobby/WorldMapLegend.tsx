'use client';

import React from 'react';
import { PixelCard, PixelBadge } from '@/components/pixel';

interface WorldMapLegendProps {
  className?: string;
}

export default function WorldMapLegend({ className = '' }: WorldMapLegendProps) {
  const legendItems = [
    {
      status: 'available',
      label: '可进入',
      color: 'text-green-400',
      bgColor: 'bg-green-900/50',
      borderColor: 'border-green-500'
    },
    {
      status: 'in-progress',
      label: '训练中',
      color: 'text-amber-400',
      bgColor: 'bg-amber-900/50',
      borderColor: 'border-amber-500'
    },
    {
      status: 'completed',
      label: '已完成',
      color: 'text-blue-400',
      bgColor: 'bg-blue-900/50',
      borderColor: 'border-blue-500'
    },
    {
      status: 'locked',
      label: '即将开放',
      color: 'text-slate-400',
      bgColor: 'bg-slate-800/50',
      borderColor: 'border-slate-600'
    }
  ];

  return (
    <PixelCard title="🗺️ 地图图例" className={className}>
      <div className="grid grid-cols-2 gap-3">
        {legendItems.map((item) => (
          <div key={item.status} className="flex items-center gap-2">
            <div
              className={`w-4 h-4 ${item.bgColor} border-2 ${item.borderColor}`}
              style={{
                boxShadow: 'inset -1px -1px 0px 0px rgba(0,0,0,0.3), inset 1px 1px 0px 0px rgba(255,255,255,0.1)'
              }}
            ></div>
            <span className={`text-sm ${item.color}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </PixelCard>
  );
}
