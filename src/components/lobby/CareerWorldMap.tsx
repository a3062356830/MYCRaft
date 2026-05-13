'use client';

import React, { useState } from 'react';
import CareerIslandNode, { IslandStatus } from './CareerIslandNode';

interface CareerIsland {
  id: string;
  name: string;
  islandName: string;
  icon: string;
  status: IslandStatus;
  description: string;
  position: { x: number; y: number };
  mentor: string;
  currentTheme: string;
  representativeTask: string;
  skills: string[];
  targetAudience: string;
}

interface CareerWorldMapProps {
  onIslandSelect: (island: CareerIsland | null) => void;
}

const islands: CareerIsland[] = [
  {
    id: 'data-analyst',
    name: '初级数据分析师',
    islandName: '数据山脉',
    icon: '📊',
    status: 'available',
    description: '从混乱数据中找到业务线索',
    position: { x: 25, y: 35 },
    mentor: '增长数据 Lead',
    currentTheme: '用户行为分析',
    representativeTask: '分析社区论坛用户活跃度下降原因',
    skills: ['数据清洗', '分组聚合', '可视化报告'],
    targetAudience: '想学习数据分析和业务洞察的学习者'
  },
  {
    id: 'software-engineer',
    name: '初级软件工程师',
    islandName: '软件工程岛',
    icon: '💻',
    status: 'available',
    description: '从复现问题到交付代码',
    position: { x: 65, y: 55 },
    mentor: '资深工程师',
    currentTheme: 'Bug 复现与修复',
    representativeTask: '复现并修复一个线上问题',
    skills: ['调试', '单元测试', 'API 设计'],
    targetAudience: '想学习真实工程流程的学习者'
  },
  {
    id: 'product-design',
    name: '产品设计师',
    islandName: '产品设计港',
    icon: '🎨',
    status: 'locked',
    description: '从用户需求到产品方案',
    position: { x: 45, y: 75 },
    mentor: '产品设计专家',
    currentTheme: '用户体验设计',
    representativeTask: '设计一个任务管理界面',
    skills: ['用户研究', '原型设计', '交互设计'],
    targetAudience: '想学习产品设计思维的学习者'
  },
  {
    id: 'ai-research',
    name: 'AI 研究员',
    islandName: 'AI 研究塔',
    icon: '🧠',
    status: 'locked',
    description: '从数据到智能应用',
    position: { x: 75, y: 25 },
    mentor: 'AI 研究科学家',
    currentTheme: '机器学习基础',
    representativeTask: '实现一个简单的分类模型',
    skills: ['Python', '机器学习', '深度学习'],
    targetAudience: '想学习 AI 技术的学习者'
  }
];

export default function CareerWorldMap({ onIslandSelect }: CareerWorldMapProps) {
  const [selectedIslandId, setSelectedIslandId] = useState<string | null>(null);

  const handleIslandSelect = (island: CareerIsland) => {
    const newSelectedId = selectedIslandId === island.id ? null : island.id;
    setSelectedIslandId(newSelectedId);
    onIslandSelect(newSelectedId ? island : null);
  };

  // 连接线配置
  const connections = [
    { from: 'data-analyst', to: 'software-engineer' },
    { from: 'software-engineer', to: 'product-design' },
    { from: 'data-analyst', to: 'ai-research' },
    { from: 'software-engineer', to: 'ai-research' }
  ];

  const getIslandById = (id: string) => islands.find(i => i.id === id);

  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-4 border-slate-700 overflow-hidden">
      {/* TODO: 添加职业大陆背景图 /assets/world/world-map-bg.png */}
      
      {/* 像素风格装饰 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-4 h-4 bg-slate-600"></div>
        <div className="absolute top-20 right-20 w-4 h-4 bg-slate-600"></div>
        <div className="absolute bottom-20 left-1/4 w-4 h-4 bg-slate-600"></div>
        <div className="absolute bottom-10 right-1/3 w-4 h-4 bg-slate-600"></div>
      </div>

      {/* SVG 连接线 */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {connections.map((conn, index) => {
          const fromIsland = getIslandById(conn.from);
          const toIsland = getIslandById(conn.to);
          
          if (!fromIsland || !toIsland) return null;
          
          const isActive = fromIsland.status !== 'locked' || toIsland.status !== 'locked';
          
          return (
            <line
              key={index}
              x1={`${fromIsland.position.x}%`}
              y1={`${fromIsland.position.y}%`}
              x2={`${toIsland.position.x}%`}
              y2={`${toIsland.position.y}%`}
              stroke={isActive ? '#4b5563' : '#374151'}
              strokeWidth="3"
              strokeDasharray={isActive ? "8,8" : "12,12"}
              strokeDashoffset="0"
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* 职业岛屿 */}
      {islands.map((island) => (
        <CareerIslandNode
          key={island.id}
          {...island}
          isSelected={selectedIslandId === island.id}
          onSelect={() => handleIslandSelect(island)}
        />
      ))}

      {/* 地图装饰 - 像素风格的星星 */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { x: 15, y: 20 },
          { x: 85, y: 40 },
          { x: 55, y: 15 },
          { x: 30, y: 80 },
          { x: 80, y: 75 }
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-amber-400 opacity-50"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          ></div>
        ))}
      </div>
    </div>
  );
}
