import { Resource } from '@/types';

export const resources: Record<string, Resource[]> = {
  'software-engineer': [
    {
      id: 'se-res-1',
      title: '单元测试基础',
      type: '教程',
      summary: '学习如何编写高质量的单元测试，提高代码质量和稳定性',
      relevance: 95,
      tags: ['测试', '质量', '最佳实践']
    },
    {
      id: 'se-res-2',
      title: 'Bug 复现与定位方法',
      type: '指南',
      summary: '系统性的 Bug 定位方法论，从发现到修复的完整流程',
      relevance: 91,
      tags: ['调试', '问题定位', '技巧']
    },
    {
      id: 'se-res-3',
      title: 'REST API 设计指南',
      type: '规范',
      summary: 'RESTful 接口设计的最佳实践和常见规范',
      relevance: 88,
      tags: ['API', '架构', '设计模式']
    },
    {
      id: 'se-res-4',
      title: '日志排查方法论',
      type: '文档',
      summary: '如何高效地从海量日志中找到问题根因的实战经验',
      relevance: 86,
      tags: ['日志', '监控', '排查']
    }
  ],
  'data-analyst': [
    {
      id: 'da-res-1',
      title: '数据清洗入门指南',
      type: '教程',
      summary: '从零开始学习数据清洗技巧，解决数据质量问题',
      relevance: 96,
      tags: ['数据清洗', '数据质量', '预处理']
    },
    {
      id: 'da-res-2',
      title: 'SQL 聚合查询速查表',
      type: '速查表',
      summary: '常用 SQL 聚合函数和查询技巧的快速参考手册',
      relevance: 92,
      tags: ['SQL', '聚合', '查询优化']
    },
    {
      id: 'da-res-3',
      title: '转化率分析案例',
      type: '案例',
      summary: '真实业务场景下的转化率分析实践案例分享',
      relevance: 88,
      tags: ['转化率', '数据分析', '案例学习']
    },
    {
      id: 'da-res-4',
      title: '商业分析报告模板',
      type: '模板',
      summary: '专业的商业分析报告模板，让你的报告更加出色',
      relevance: 85,
      tags: ['报告', '可视化', '模板']
    }
  ]
};

export function getRecommendResources(careerId: string): Resource[] {
  return resources[careerId] || [];
}
