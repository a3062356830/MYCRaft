'use client';

import React from 'react';
import { PixelBadge } from '@/components/pixel';

export type IslandStatus = 'available' | 'locked' | 'in-progress' | 'completed';

interface CareerIslandNodeProps {
  id: string;
  name: string;
  islandName: string;
  icon: string;
  status: IslandStatus;
  description: string;
  position: { x: number; y: number };
  isSelected: boolean;
  onSelect: () => void;
}

export default function CareerIslandNode({
  id,
  name,
  islandName,
  icon,
  status,
  description,
  position,
  isSelected,
  onSelect
}: CareerIslandNodeProps) {
  const getStatusColors = () => {
    switch (status) {
      case 'available':
        return {
          bg: 'bg-gradient-to-br from-green-900/50 to-green-800/50',
          border: 'border-green-500',
          shadow: 'shadow-[0_0_20px_rgba(34,197,94,0.3)]',
          glow: 'text-green-400'
        };
      case 'in-progress':
        return {
          bg: 'bg-gradient-to-br from-amber-900/50 to-amber-800/50',
          border: 'border-amber-500',
          shadow: 'shadow-[0_0_20px_rgba(245,158,11,0.3)]',
          glow: 'text-amber-400'
        };
      case 'completed':
        return {
          bg: 'bg-gradient-to-br from-blue-900/50 to-blue-800/50',
          border: 'border-blue-500',
          shadow: 'shadow-[0_0_20px_rgba(59,130,246,0.3)]',
          glow: 'text-blue-400'
        };
      case 'locked':
      default:
        return {
          bg: 'bg-gradient-to-br from-slate-800/50 to-slate-900/50',
          border: 'border-slate-600',
          shadow: '',
          glow: 'text-slate-500'
        };
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case 'available':
        return '可进入';
      case 'in-progress':
        return '训练中';
      case 'completed':
        return '已完成';
      case 'locked':
      default:
        return '即将开放';
    }
  };

  const colors = getStatusColors();

  return (
    <div
      className={`absolute cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${isSelected ? 'scale-110 z-10' : ''}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={onSelect}
    >
      {/* 岛屿主体 */}
      <div
        className={`
          p-4 min-w-[160px] border-4 ${colors.bg} ${colors.border}
          hover:border-opacity-80 ${colors.shadow}
          transition-all duration-300
        `}
        style={{
          boxShadow: isSelected 
            ? `${colors.shadow}, inset -3px -3px 0px 0px rgba(0,0,0,0.3), inset 3px 3px 0px 0px rgba(255,255,255,0.1)`
            : `inset -3px -3px 0px 0px rgba(0,0,0,0.3), inset 3px 3px 0px 0px rgba(255,255,255,0.1)`
        }}
      >
        {/* 图标 */}
        <div className={`text-4xl mb-2 text-center ${status === 'locked' ? 'grayscale opacity-50' : ''}`}>
          {icon}
        </div>

        {/* 岛屿名 */}
        <div className={`text-center mb-1 font-bold ${colors.glow} text-sm`}>
          {islandName}
        </div>

        {/* 职业名 */}
        <div className="text-center text-slate-300 text-xs mb-2">
          {name}
        </div>

        {/* 状态标签 */}
        <div className="flex justify-center">
          <PixelBadge
            variant={
              status === 'available' ? 'success' :
              status === 'in-progress' ? 'warning' :
              status === 'completed' ? 'fun' : 'neutral'
            }
            className="text-xs"
          >
            {getStatusLabel()}
          </PixelBadge>
        </div>

        {/* 简介 */}
        {status !== 'locked' && (
          <div className="mt-2 text-slate-400 text-xs text-center leading-tight">
            {description}
          </div>
        )}
      </div>

      {/* 选中指示器 */}
      {isSelected && (
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-amber-400"></div>
        </div>
      )}
    </div>
  );
}
