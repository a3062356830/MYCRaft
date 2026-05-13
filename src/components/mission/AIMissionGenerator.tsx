import React, { useState } from 'react';
import { PixelDialog, PixelCard, PixelButton, PixelBadge, PixelProgress } from '@/components/pixel';
import GeneratedMissionCard, { GeneratedMission } from './GeneratedMissionCard';

// 任务方向选项
const TASK_DIRECTIONS = {
  'data-analyst': [
    { value: 'data-cleaning', label: '数据清洗' },
    { value: 'sql-analysis', label: 'SQL 分析' },
    { value: 'visualization', label: '可视化报告' },
  ],
  'software-engineer': [
    { value: 'bug-fix', label: 'Bug 修复' },
    { value: 'unit-test', label: '单元测试' },
    { value: 'api-design', label: 'API 设计' },
  ],
  'default': [
    { value: 'data-cleaning', label: '数据清洗' },
    { value: 'sql-analysis', label: 'SQL 分析' },
    { value: 'visualization', label: '可视化报告' },
  ],
};

// 难度选项
const DIFFICULTIES = [
  { value: 'easy', label: '入门' },
  { value: 'medium', label: '进阶' },
  { value: 'hard', label: '挑战' },
];

// 任务风格选项
const STYLES = [
  { value: 'ticket', label: '企业工单' },
  { value: 'project', label: '项目委托' },
  { value: 'interview', label: '面试实战' },
  { value: 'feynman', label: '费曼挑战' },
];

// 生成流程步骤
const GENERATION_STEPS = [
  { step: 1, label: '读取你的职业方向', icon: '📖' },
  { step: 2, label: '分析当前技能缺口', icon: '🔍' },
  { step: 3, label: '检索知识库任务剧本', icon: '📚' },
  { step: 4, label: '生成企业场景任务', icon: '⚙️' },
  { step: 5, label: '输出任务委托', icon: '📋' },
];

// Mock 任务生成器数据
const generateMockMission = (direction: string, difficulty: string, style: string): GeneratedMission => {
  const isData = ['data-cleaning', 'sql-analysis', 'visualization'].includes(direction);
  
  const dataTitles = [
    '分析社区论坛用户活跃度下降原因',
    '清洗并分析用户行为日志数据',
    '制作产品周度数据报告',
  ];
  const engTitles = [
    '修复购物车结算页面的缓存问题',
    '为用户管理模块编写单元测试',
    '设计用户权限管理 API',
  ];
  
  const aiLeads = isData ? ['增长数据 Lead', '分析负责人', '用户研究 Lead'] : ['架构师', '后端负责人', '技术负责人'];
  
  const randomIndex = Math.floor(Math.random() * 3);
  
  const baseXp = difficulty === 'easy' ? 80 : difficulty === 'medium' ? 120 : 180;
  const time = difficulty === 'easy' ? '20-30 分钟' : difficulty === 'medium' ? '40-60 分钟' : '60-90 分钟';
  
  return {
    id: `ai-gen-${Date.now()}-${Math.random()}`,
    title: isData ? dataTitles[randomIndex] : engTitles[randomIndex],
    aiLead: aiLeads[randomIndex],
    businessBackground: isData 
      ? '最近两周日活下降明显，运营团队需要判断是内容供给、用户留存还是功能改版导致。'
      : '线上出现用户反馈，购物车在特定操作下无法正确提交订单。',
    objectives: isData
      ? [
          '分析用户活跃度趋势，定位可能的下降原因',
          '从用户分层角度查看数据',
          '形成简短的分析报告',
        ]
      : [
          '复现并定位问题',
          '编写修复代码',
          '确保不影响其他功能',
        ],
    deliverables: isData
      ? [
          '一份 Markdown 分析报告',
          '一份 Mock 数据说明',
          '1-2 张趋势图说明',
        ]
      : [
          '修复的代码变更',
          '测试用例',
          '修复说明文档',
        ],
    reviewCriteria: isData
      ? [
          '是否能拆解问题',
          '是否能说明数据口径',
          '是否能提出可执行建议',
        ]
      : [
          '问题是否得到复现',
          '修复方案是否合理',
          '是否包含必要的测试',
        ],
    recommendedSkills: isData
      ? ['数据清洗', '用户分层', '数据可视化']
      : ['代码调试', '单元测试', '问题定位'],
    recommendedResources: isData
      ? ['Pandas 分组聚合', 'Matplotlib 趋势图', '活跃用户指标分析']
      : ['调试技巧', 'Jest 单元测试', '代码重构最佳实践'],
    estimatedTime: time,
    rewardXP: baseXp,
    difficulty,
    type: style,
  };
};

interface AIMissionGeneratorProps {
  open: boolean;
  onClose: () => void;
  careerId: string;
}

export default function AIMissionGenerator({ open, onClose, careerId }: AIMissionGeneratorProps) {
  const [direction, setDirection] = useState('data-cleaning');
  const [difficulty, setDifficulty] = useState('easy');
  const [style, setStyle] = useState('ticket');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [generationMessage, setGenerationMessage] = useState('');
  const [generatedMission, setGeneratedMission] = useState<GeneratedMission | null>(null);
  
  // 根据职业获取方向选项
  const directions = TASK_DIRECTIONS[careerId as keyof typeof TASK_DIRECTIONS] || TASK_DIRECTIONS.default;
  
  const handleGenerate = () => {
    setIsGenerating(true);
    setCurrentStep(0);
    setProgress(0);
    setGenerationMessage('AI 主管正在分析技能缺口...');
    setGeneratedMission(null);
    
    let stepIdx = 0;
    const totalSteps = GENERATION_STEPS.length;
    
    const stepInterval = setInterval(() => {
      if (stepIdx < totalSteps) {
        setCurrentStep(stepIdx);
        setProgress(((stepIdx + 1) / totalSteps) * 100);
        
        const messages = [
          'AI 主管正在分析技能缺口...',
          '正在匹配知识库任务剧本...',
          '正在生成评审标准...',
          '正在推荐相关资源...',
          '即将完成任务委托...',
        ];
        setGenerationMessage(messages[stepIdx] || '正在生成...');
        
        stepIdx++;
      } else {
        clearInterval(stepInterval);
        
        const mission = generateMockMission(direction, difficulty, style);
        setGeneratedMission(mission);
        setIsGenerating(false);
      }
    }, 800);
  };
  
  const handleRegenerate = () => {
    handleGenerate();
  };
  
  const handleAccept = () => {
    alert('任务已加入当前训练计划（Mock）');
    onClose();
  };
  
  return (
    <PixelDialog
      open={open}
      onClose={onClose}
      title={isGenerating ? '🤖 AI 主管正在生成任务' : '🤖 AI 任务生成器'}
    >
      {/* 任务生成流程 - 只有在生成前/生成中显示 */}
      {!generatedMission && (
        <div className="space-y-6">
          {/* 流程步骤 Timeline */}
          <PixelCard title="📋 任务生成流程">
            <div className="space-y-3">
              {GENERATION_STEPS.map((step, idx) => {
                const isCompleted = idx < currentStep;
                const isActive = idx === currentStep && isGenerating;
                
                return (
                  <div 
                    key={step.step}
                    className={`flex items-center gap-3 p-2 ${isCompleted ? 'opacity-100' : 'opacity-60'}`}
                  >
                    <div className={`w-8 h-8 flex items-center justify-center border-2
                      ${isCompleted ? 'bg-green-900/50 border-green-500' : 
                        isActive ? 'bg-amber-900/50 border-amber-500' : 
                        'bg-slate-800 border-slate-700'}`}
                    >
                      {isCompleted ? '✅' : step.icon}
                    </div>
                    <div className="flex-1">
                      <div className={`font-medium text-sm
                        ${isCompleted ? 'text-green-400' :
                          isActive ? 'text-amber-400' :
                          'text-slate-400'}`}
                      >
                        {step.step}. {step.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {isGenerating && (
              <div className="mt-4 space-y-2">
                <PixelProgress value={progress} color="#f59e0b" />
                <div className="text-amber-400 text-sm italic flex items-center gap-2">
                  <span className="animate-pulse">⚡</span>
                  {generationMessage}
                </div>
              </div>
            )}
          </PixelCard>

          {/* 生成表单 */}
          {!isGenerating && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <PixelCard title="1️⃣ 任务方向">
                <div className="space-y-2">
                  {directions.map((opt) => (
                    <div 
                      key={opt.value}
                      onClick={() => setDirection(opt.value)}
                      className={`p-2 border-2 cursor-pointer transition-colors
                        ${direction === opt.value ? 'border-amber-500 bg-slate-800' : 'border-slate-700 bg-slate-900/50'}`}
                    >
                      <div className="font-medium text-sm text-slate-300">
                        {opt.label}
                      </div>
                    </div>
                  ))}
                </div>
              </PixelCard>

              <PixelCard title="2️⃣ 难度">
                <div className="space-y-2">
                  {DIFFICULTIES.map((opt) => (
                    <div 
                      key={opt.value}
                      onClick={() => setDifficulty(opt.value)}
                      className={`p-2 border-2 cursor-pointer transition-colors
                        ${difficulty === opt.value ? 'border-amber-500 bg-slate-800' : 'border-slate-700 bg-slate-900/50'}`}
                    >
                      <div className="font-medium text-sm text-slate-300">
                        {opt.label}
                      </div>
                    </div>
                  ))}
                </div>
              </PixelCard>

              <PixelCard title="3️⃣ 任务风格">
                <div className="space-y-2">
                  {STYLES.map((opt) => (
                    <div 
                      key={opt.value}
                      onClick={() => setStyle(opt.value)}
                      className={`p-2 border-2 cursor-pointer transition-colors
                        ${style === opt.value ? 'border-amber-500 bg-slate-800' : 'border-slate-700 bg-slate-900/50'}`}
                    >
                      <div className="font-medium text-sm text-slate-300">
                        {opt.label}
                      </div>
                    </div>
                  ))}
                </div>
              </PixelCard>
            </div>
          )}

          {/* 生成按钮 */}
          {!isGenerating && (
            <div className="flex justify-end gap-3">
              <PixelButton variant="secondary" onClick={onClose}>
                取消
              </PixelButton>
              <PixelButton onClick={handleGenerate} disabled={isGenerating}>
                🚀 生成任务
              </PixelButton>
            </div>
          )}
        </div>
      )}

      {/* 生成结果 */}
      {generatedMission && (
        <GeneratedMissionCard
          mission={generatedMission}
          onAccept={handleAccept}
          onRegenerate={handleRegenerate}
          onClose={onClose}
        />
      )}
    </PixelDialog>
  );
}
