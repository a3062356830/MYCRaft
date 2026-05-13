import { ROUTES } from '@/constants';

export const MVP_MISSION_ID = 'community-activity-drop';

export const DEMO_STEPS = [
  { id: 1, shortLabel: '登陆', fullLabel: '🗺️ 登陆数据山脉', description: '欢迎来到数据山脉，准备开始你的职业体验！' },
  { id: 2, shortLabel: '任务', fullLabel: '📋 查看主管任务', description: '查看AI主管分配的新任务' },
  { id: 3, shortLabel: '资源', fullLabel: '🔍 寻找学习资源', description: '查找相关学习材料，为任务做准备' },
  { id: 4, shortLabel: '费曼', fullLabel: '🧠 完成费曼挑战', description: '用费曼学习法验证你的理解' },
  { id: 5, shortLabel: '接受', fullLabel: '🚀 接受AI主管任务', description: '接受任务，进入交付阶段' },
  { id: 6, shortLabel: '提交', fullLabel: '📝 提交分析报告', description: '提交你的分析成果' },
  { id: 7, shortLabel: '评审', fullLabel: '🎯 查看AI评审', description: '查看AI导师的详细评审' },
  { id: 8, shortLabel: '成长', fullLabel: '🏆 获得成长反馈', description: '查看你的技能成长和奖励' }
];

export function isDemoMode(searchParams: URLSearchParams): boolean {
  return searchParams.get('demo') === '1';
}

export function getDemoStep(searchParams: URLSearchParams): number {
  const step = searchParams.get('step');
  return step ? parseInt(step, 10) : 1;
}

export function getNextDemoUrl(currentStep: number, missionId: string = MVP_MISSION_ID): string {
  const nextStep = currentStep + 1;
  
  switch (currentStep) {
    case 1:
      return `/career/data-analyst?demo=1&step=2`;
    case 2:
      return `/mission/${missionId}?demo=1&step=2`;
    case 3:
      return `/feynman/${missionId}?demo=1&step=4`;
    case 4:
      return `/mission/${missionId}?demo=1&step=5`;
    case 5:
      return `/mission/${missionId}/submit?demo=1&step=6`;
    case 6:
      return `/mission/${missionId}/feedback?demo=1&step=7`;
    case 7:
      return `/mission/${missionId}/feedback?demo=1&step=8`;
    case 8:
      return `/portfolio?demo=1`;
    default:
      return `/career/data-analyst?demo=1&step=1`;
  }
}

export const MVP_MOCK_REPORT = `# 社区论坛用户活跃度下降分析报告

## 1. 问题背景
社区论坛最近两周日活出现明显下降趋势，从上周的平均1200人下降到本周的850人，降幅约30%。运营团队需要快速判断是内容供给、用户留存还是功能改版导致。

## 2. 分析口径
- 统计周期：最近14天
- 日活定义：当日有发帖、评论、点赞等任意互动行为的独立用户
- 新用户定义：注册时间不满7天的用户
- 老用户定义：注册时间≥7天的用户

## 3. Mock数据说明
本次分析使用模拟数据：
- DAU趋势：3月1日-3月14日的日活跃用户数
- 新老用户分布：每日新用户与老用户的占比
- 留存数据：次日留存率和7日留存率

## 4. 分析发现
- 活跃度下降主要发生在3月15日和3月20日两个时间点
- 新用户活跃基本保持在200-250人，下降主要来自老用户
- 老用户从约1000人下降到600人，是主要问题所在
- 发帖量下降40%，这可能与老用户流失高度相关

## 5. 初步结论
社区活跃度下降主要是老用户流失导致，建议重点关注老用户召回策略。

## 6. 改进建议
1. 调查3月15日前后是否有产品功能变更
2. 对流失的老用户进行用户访谈
3. 优化发帖体验，简化发帖流程
4. 推出老用户专属活动或激励
5. 增加社区新内容推荐机制`;

export const MVP_RAG_RESOURCES = [
  { id: 1, title: 'Pandas 分组聚合入门', category: '教程', description: '学习使用groupby进行数据聚合分析' },
  { id: 2, title: 'Matplotlib 趋势图绘制', category: '教程', description: '用Python绘制美观的时间趋势图表' },
  { id: 3, title: '活跃用户指标分析模板', category: '模板', description: '常用DAU、留存、转化指标分析框架' },
  { id: 4, title: '用户留存与活跃度分析案例', category: '案例', description: '真实项目中用户分析的完整案例' }
];
