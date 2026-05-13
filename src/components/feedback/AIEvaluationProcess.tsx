import React, { useState, useEffect } from 'react';
import { PixelCard } from '@/components/pixel';
import EvaluationStepCard from './EvaluationStepCard';
import EvaluationDimensionCard from './EvaluationDimensionCard';
import EvaluationVerdictPanel from './EvaluationVerdictPanel';

interface AIEvaluationProcessProps {
  isSoftwareEngineer: boolean;
}

const evaluationSteps = [
  {
    step: 1,
    icon: '📖',
    title: '读取任务要求',
    description: '解析任务背景和关键需求'
  },
  {
    step: 2,
    icon: '📦',
    title: '检查交付物完整性',
    description: '核对所有要求的交付项'
  },
  {
    step: 3,
    icon: '🧩',
    title: '分析问题拆解质量',
    description: '评估分析思路的逻辑性'
  },
  {
    step: 4,
    icon: '📊',
    title: '对照评分标准',
    description: '按维度进行详细评分'
  },
  {
    step: 5,
    icon: '🎯',
    title: '生成成长建议',
    description: '提供针对性提升方向'
  }
];

export default function AIEvaluationProcess({ 
  isSoftwareEngineer 
}: AIEvaluationProcessProps) {
  const [isEvaluating, setIsEvaluating] = useState(true);

  useEffect(() => {
    // 模拟评审过程
    const timer = setTimeout(() => {
      setIsEvaluating(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // 根据职业定制维度数据
  const getDimensions = () => {
    if (isSoftwareEngineer) {
      return [
        {
          title: '问题复现',
          score: 22,
          maxScore: 25,
          observation: '你能提供清晰的复现路径，这点非常好。'
        },
        {
          title: '代码正确性',
          score: 20,
          maxScore: 25,
          observation: '整体逻辑正确，但部分边界情况没有覆盖到。'
        },
        {
          title: '交付完整性',
          score: 21,
          maxScore: 25,
          observation: '修复代码和说明文档都有提交。'
        },
        {
          title: '测试覆盖',
          score: 19,
          maxScore: 25,
          observation: '有基础测试，但可以增加更多场景用例。'
        }
      ];
    } else {
      return [
        {
          title: '问题拆解',
          score: 22,
          maxScore: 25,
          observation: '你能把活跃度下降拆成时间、用户分层和行为路径几个方向。'
        },
        {
          title: '数据准确性',
          score: 20,
          maxScore: 25,
          observation: '整体分析逻辑成立，但数据口径说明还可以更清楚。'
        },
        {
          title: '交付完整性',
          score: 21,
          maxScore: 25,
          observation: '报告结构完整，包含背景、分析过程和结论。'
        },
        {
          title: '建议可行性',
          score: 19,
          maxScore: 25,
          observation: '建议方向合理，但可以增加优先级和验证方式。'
        }
      ];
    }
  };

  const dimensions = getDimensions();
  const totalScore = dimensions.reduce((sum, d) => sum + d.score, 0);
  const maxScore = dimensions.reduce((sum, d) => sum + d.maxScore, 0);
  const grade = totalScore >= 90 ? 'S' : totalScore >= 80 ? 'A' : totalScore >= 70 ? 'B+' : totalScore >= 60 ? 'B' : 'C';
  const summary = isSoftwareEngineer
    ? '你已经具备初级开发任务完成能力，下一步建议加强边界测试和代码文档。'
    : '你已经具备完成初级企业分析任务的能力，下一步建议加强数据口径和建议落地性。';

  return (
    <div className="space-y-6">
      {/* 标题区 */}
      <PixelCard title="🤖 AI 同事正在评审你的提交">
        <p className="text-slate-400 text-sm">
          系统将从问题拆解、交付完整性、技术准确性和建议可行性进行综合评审。
        </p>
      </PixelCard>

      {/* 评审流程 */}
      <PixelCard title="📋 评审流程">
        <div className="space-y-2">
          {evaluationSteps.map((step) => (
            <EvaluationStepCard
              key={step.step}
              step={step.step}
              icon={step.icon}
              title={step.title}
              description={step.description}
              isCompleted={!isEvaluating}
            />
          ))}
        </div>
      </PixelCard>

      {/* 评审结论 */}
      <EvaluationVerdictPanel
        isSoftwareEngineer={isSoftwareEngineer}
        isPassed={totalScore >= 60}
        grade={grade}
        totalScore={totalScore}
        maxScore={maxScore}
        summary={summary}
      />

      {/* 维度评分 */}
      <PixelCard title="📈 维度评分">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dimensions.map((dim, idx) => (
            <EvaluationDimensionCard
              key={idx}
              title={dim.title}
              score={dim.score}
              maxScore={dim.maxScore}
              observation={dim.observation}
            />
          ))}
        </div>
      </PixelCard>
    </div>
  );
}
