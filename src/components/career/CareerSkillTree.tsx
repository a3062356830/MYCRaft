import React, { useState } from 'react';
import { PixelCard, PixelProgress, PixelBadge, PixelDialog, PixelButton } from '@/components/pixel';
import { SkillPathMap, getSkillStatus } from '@/components/skill';
import { SkillNode } from '@/types';

interface CareerSkillTreeProps {
  skills: SkillNode[];
}

export default function CareerSkillTree({ skills }: CareerSkillTreeProps) {
  const [selectedSkill, setSelectedSkill] = useState<SkillNode | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // 计算统计数据
  const totalSkills = skills.length;
  const masteredSkills = skills.filter(s => s.level >= s.maxLevel).length;
  const progress = totalSkills > 0 ? Math.round((masteredSkills / totalSkills) * 100) : 0;

  const handleSkillClick = (skill: SkillNode) => {
    setSelectedSkill(skill);
    setDialogOpen(true);
  };

  return (
    <>
      <PixelCard title="🎯 技能路线">
        {/* 顶部标题区域 */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-amber-500">
                职业技能路线
              </h3>
              <p className="text-slate-400 text-sm">
                已点亮 {masteredSkills} / {totalSkills} 技能
              </p>
            </div>
            <PixelBadge variant="fun">
              {progress}% 掌握
            </PixelBadge>
          </div>
          
          <PixelProgress 
            value={progress}
            color="#f59e0b"
            label="总体掌握"
          />
        </div>

        {/* 技能节点地图 */}
        <SkillPathMap 
          skills={skills}
          onSkillClick={handleSkillClick}
        />
      </PixelCard>

      {/* 技能详情弹窗 */}
      {selectedSkill && (
        <SkillDetailDialog
          skill={selectedSkill}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      )}
    </>
  );
}

// 技能详情弹窗组件
function SkillDetailDialog({
  skill,
  open,
  onClose
}: {
  skill: SkillNode;
  open: boolean;
  onClose: () => void;
}) {
  const status = getSkillStatus(skill);
  const progress = Math.round((skill.exp / skill.expToNext) * 100);

  function getStatusText(status: string) {
    switch (status) {
      case 'locked': return '🔒 未解锁';
      case 'available': return '📖 可学习';
      case 'learning': return '⭐ 学习中';
      case 'mastered': return '✨ 已精通';
      default: return '🔒 未解锁';
    }
  }

  function getStatusColor(status: string) {
    switch (status) {
      case 'locked': return '#64748b';
      case 'available': return '#3b82f6';
      case 'learning': return '#f59e0b';
      case 'mastered': return '#10b981';
      default: return '#64748b';
    }
  }

  return (
    <PixelDialog
      open={open}
      onClose={onClose}
      title="技能详情"
    >
      <div className="space-y-6">
        {/* 技能名称和状态 */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2" style={{ color: getStatusColor(status) }}>
            {skill.name}
          </h2>
          <PixelBadge 
            variant={
              status === 'mastered' ? 'honor' :
              status === 'learning' ? 'fun' : 'neutral'
            }
          >
            {getStatusText(status)}
          </PixelBadge>
        </div>

        {/* 技能描述 */}
        <div className="bg-slate-800/50 p-4 border-2 border-slate-700">
          <p className="text-slate-300">{skill.description}</p>
        </div>

        {/* 等级和经验 */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">当前等级</span>
            <span className="text-xl font-bold text-amber-500">
              Lv.{skill.level} / {skill.maxLevel}
            </span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">经验进度</span>
              <span className="text-slate-300">
                {skill.exp} / {skill.expToNext} XP
              </span>
            </div>
            <PixelProgress
              value={progress}
              color={
                status === 'mastered' ? '#10b981' :
                status === 'learning' ? '#f59e0b' :
                status === 'available' ? '#3b82f6' : '#475569'
              }
            />
          </div>
        </div>

        {/* 相关任务提示 */}
        <div className="bg-amber-900/20 border-2 border-amber-700/50 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-amber-500">💡</span>
            <span className="text-amber-300 font-bold">提示</span>
          </div>
          <p className="text-amber-200/80 text-sm">
            完成相关任务可提升该技能经验
          </p>
        </div>

        {/* 关闭按钮 */}
        <PixelButton
          onClick={onClose}
          variant="secondary"
          className="w-full"
        >
          关闭
        </PixelButton>
      </div>
    </PixelDialog>
  );
}
