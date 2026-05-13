'use client';

import React, { useEffect } from 'react';
import { PixelButton } from '@/components/pixel';
import RAGQueryInsight from './RAGQueryInsight';
import KnowledgeSourceBadge from './KnowledgeSourceBadge';
import RAGSearchResultCard from './RAGSearchResultCard';

interface RAGSearchDrawerProps {
  open: boolean;
  onClose: () => void;
  taskType?: 'data-analyst' | 'software-engineer';
  isDemoMode?: boolean;
}

export default function RAGSearchDrawer({ 
  open, 
  onClose, 
  taskType = 'software-engineer',
  isDemoMode = false
}: RAGSearchDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  const knowledgeSources = [
    {
      name: 'CareerCraft 内置任务剧本库',
      hitCount: 5,
      confidence: '高' as const,
      type: '剧本库' as const
    },
    {
      name: 'Markdown 技术笔记库',
      hitCount: 8,
      confidence: '高' as const,
      type: '笔记库' as const
    },
    {
      name: '高质量代码 / 分析案例库',
      hitCount: 3,
      confidence: '中' as const,
      type: '案例库' as const
    }
  ];

  const dataAnalystResources = [
    {
      id: 'da-rag-1',
      title: 'Pandas 分组聚合入门',
      type: '教程' as const,
      relevance: 95,
      hitSnippet: 'groupby 可以帮助你按照用户类型、日期或行为类别统计指标。',
      whyRecommend: '当前任务需要比较不同时间段和用户分层的活跃度变化。',
      solveProblems: ['数据分组', '聚合统计', '多维度分析'],
      tags: ['Pandas', '数据处理', '聚合'],
      summary: {
        coreConcept: 'groupby 是 Pandas 中用于数据分组和聚合的核心功能，可以按一个或多个列进行分组，然后对每组应用聚合函数。',
        useCase: '适用于需要按不同维度统计数据的场景，如按时间、按用户类型、按地区等分组统计。',
        howToApply: '在当前任务中，你可以使用 groupby 按日期和用户分层分组，统计每日的活跃用户数和留存率。'
      }
    },
    {
      id: 'da-rag-2',
      title: 'Matplotlib 趋势图绘制',
      type: '教程' as const,
      relevance: 92,
      hitSnippet: '折线图适合展示指标随时间变化的趋势。',
      whyRecommend: '你的报告需要展示活跃度下降是否集中在某个时间段。',
      solveProblems: ['趋势可视化', '时间序列展示', '变化趋势分析'],
      tags: ['Matplotlib', '可视化', '趋势图'],
      summary: {
        coreConcept: '折线图通过连接数据点来展示数据随时间或连续变量的变化趋势，是最常用的可视化类型之一。',
        useCase: '适合展示用户活跃度、转化率、销售额等指标随时间的变化情况。',
        howToApply: '在当前任务中，你可以绘制每日活跃用户的折线图，观察活跃度下降的具体时间点和趋势。'
      }
    },
    {
      id: 'da-rag-3',
      title: '活跃用户指标分析模板',
      type: '模板' as const,
      relevance: 88,
      hitSnippet: 'DAU、WAU、留存率可以组合用于判断用户活跃变化。',
      whyRecommend: '当前任务需要先明确活跃度下降的衡量方式。',
      solveProblems: ['指标定义', '分析框架', '报告模板'],
      tags: ['指标体系', 'DAU', '留存率'],
      summary: {
        coreConcept: 'DAU（日活跃用户）、WAU（周活跃用户）、留存率是衡量用户活跃度的核心指标，需要结合使用。',
        useCase: '适用于产品活跃度分析、用户行为研究、增长分析等场景。',
        howToApply: '在当前任务中，你可以参考这个模板，先确定要统计的指标，再进行数据分析和可视化。'
      }
    },
    {
      id: 'da-rag-4',
      title: '用户留存与活跃度分析案例',
      type: '案例' as const,
      relevance: 90,
      hitSnippet: '通过对比活跃用户画像变化，可以发现问题的根本原因。',
      whyRecommend: '这个案例与你当前的任务高度相似，可以参考分析思路。',
      solveProblems: ['案例学习', '对比分析', '问题定位'],
      tags: ['案例学习', '留存分析', '用户画像'],
      summary: {
        coreConcept: '用户活跃度下降分析需要从多个维度入手：时间趋势、用户分层、功能使用、活动影响等。',
        useCase: '适用于任何产品的活跃度下降分析、用户流失分析、增长诊断等场景。',
        howToApply: '在当前任务中，你可以按照这个案例的分析框架，先看趋势，再分层对比，最后给出建议。'
      }
    }
  ];

  const softwareEngineerResources = [
    {
      id: 'se-rag-1',
      title: 'Bug 复现最小路径模板',
      type: '模板' as const,
      relevance: 94,
      hitSnippet: '最小复现路径是快速定位和修复 Bug 的关键第一步。',
      whyRecommend: '当前任务需要系统性地复现和定位问题。',
      solveProblems: ['Bug 复现', '问题定位', '调试流程'],
      tags: ['调试', 'Bug', '复现'],
      summary: {
        coreConcept: '最小复现路径是指用最少的步骤和最简化的环境来复现 Bug，有助于快速定位问题根源。',
        useCase: '适用于任何 Bug 调试场景，特别是复杂系统中的问题定位。',
        howToApply: '在当前任务中，你可以按照这个模板，先尝试在本地复现问题，然后逐步缩小范围。'
      }
    },
    {
      id: 'se-rag-2',
      title: '日志排查方法论',
      type: '指南' as const,
      relevance: 91,
      hitSnippet: '通过关键词搜索和时间范围过滤，可以快速从海量日志中定位问题。',
      whyRecommend: '你的任务需要从日志中找到异常线索。',
      solveProblems: ['日志分析', '问题排查', '异常定位'],
      tags: ['日志', '排查', '监控'],
      summary: {
        coreConcept: '日志排查需要从时间、关键词、错误级别等多个维度进行过滤和分析，找到问题的关键线索。',
        useCase: '适用于线上问题排查、系统异常分析、性能问题定位等场景。',
        howToApply: '在当前任务中，你可以先查看错误日志，然后搜索相关的关键词，定位问题发生的具体位置。'
      }
    },
    {
      id: 'se-rag-3',
      title: '单元测试用例设计示例',
      type: '示例' as const,
      relevance: 87,
      hitSnippet: '好的单元测试应该覆盖正常路径、边界条件和异常场景。',
      whyRecommend: '修复后需要补充单元测试防止回归。',
      solveProblems: ['测试用例设计', '边界条件', '回归测试'],
      tags: ['单元测试', '测试', '质量'],
      summary: {
        coreConcept: '单元测试需要覆盖各种场景，包括正常输入、边界值、异常输入等，确保代码的健壮性。',
        useCase: '适用于任何需要保证代码质量的场景，特别是重构和 Bug 修复后。',
        howToApply: '在当前任务中，修复 Bug 后，你可以参考这个示例，补充对应的单元测试用例。'
      }
    }
  ];

  const resources = taskType === 'data-analyst' ? dataAnalystResources : softwareEngineerResources;

  const learningOrder = taskType === 'data-analyst' 
    ? [
        '先看指标口径 / 问题背景',
        '再看工具方法',
        '最后看报告模板或案例'
      ]
    : [
        '先看复现路径',
        '再看日志定位',
        '最后看测试用例'
      ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/70"
        onClick={onClose}
      />
      <div
        className="absolute right-0 top-0 h-full w-full max-w-2xl bg-slate-900 border-l-4 border-slate-600 overflow-y-auto"
        style={{
          boxShadow:
            'inset -4px -4px 0px 0px #0f172a, inset 4px 4px 0px 0px #1e293b, -10px 0 40px rgba(0,0,0,0.5)',
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(245, 158, 11, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
            linear-gradient(45deg, transparent 49%, rgba(30, 41, 59, 0.5) 49%, rgba(30, 41, 59, 0.5) 51%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, rgba(30, 41, 59, 0.5) 49%, rgba(30, 41, 59, 0.5) 51%, transparent 51%)
          `,
          backgroundSize: '100% 100%, 100% 100%, 20px 20px, 20px 20px',
          backgroundPosition: '0 0, 0 0, 0 0, 10px 10px'
        }}
      >
        <div className="sticky top-0 bg-slate-800 border-b-4 border-slate-600 p-4 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-indigo-400 font-bold text-xl">📚 知识库检索结果</h2>
              <p className="text-slate-400 text-sm mt-1">
                AI 根据当前任务目标，从内置知识库中检索到以下高相关资源。
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-red-600 text-white font-bold flex items-center justify-center cursor-pointer flex-shrink-0"
              style={{
                boxShadow:
                  'inset -2px -2px 0px 0px #7f1d1d, inset 2px 2px 0px 0px #fca5a5',
              }}
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* 查询理解区 */}
          <section>
            <RAGQueryInsight taskType={taskType} />
          </section>

          {/* 检索来源区 */}
          <section>
            <div className="mb-3">
              <h3 className="text-amber-500 font-bold text-lg flex items-center gap-2">
                <span>🎓</span>
                检索来源
              </h3>
            </div>
            <div className="space-y-3">
              {knowledgeSources.map((source, idx) => (
                <KnowledgeSourceBadge key={idx} source={source} />
              ))}
            </div>
          </section>

          {/* 资源结果列表 */}
          <section>
            <div className="mb-3">
              <h3 className="text-amber-500 font-bold text-lg flex items-center gap-2">
                <span>📋</span>
                资源结果列表
              </h3>
            </div>
            <div className="space-y-4">
              {resources.map((resource) => (
                <RAGSearchResultCard key={resource.id} resource={resource} />
              ))}
            </div>
          </section>

          {/* 推荐学习顺序 */}
          <section className="pb-8">
            <div className="p-4 bg-slate-800 border-2 border-amber-600">
              <h3 className="text-amber-500 font-bold text-lg mb-3 flex items-center gap-2">
                <span>📐</span>
                建议学习顺序
              </h3>
              <ol className="space-y-2">
                {learningOrder.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-200">
                    <span className="text-amber-500 font-bold">{idx + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
