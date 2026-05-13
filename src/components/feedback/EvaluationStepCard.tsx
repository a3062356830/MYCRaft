import React from 'react';

interface EvaluationStepProps {
  step: number;
  icon: string;
  title: string;
  description: string;
  isCompleted: boolean;
}

export default function EvaluationStepCard(props: EvaluationStepProps) {
  const { step, icon, title, description, isCompleted } = props;

  const boxClass = isCompleted 
    ? 'w-10 h-10 flex items-center justify-center border-2 flex-shrink-0 bg-green-900 border-green-500'
    : 'w-10 h-10 flex items-center justify-center border-2 flex-shrink-0 bg-slate-700 border-slate-600';

  return (
    <div className="flex items-start gap-3 p-3 bg-slate-800 border-2 border-slate-700">
      <div className={boxClass}>
        {isCompleted ? '✅' : icon}
      </div>
      
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-amber-400 font-bold text-sm">
            {step}.
          </span>
          <h4 className="font-bold text-slate-200 text-sm">{title}</h4>
          {isCompleted && (
            <span className="text-green-400 text-xs">已完成</span>
          )}
        </div>
        <p className="text-slate-400 text-xs">
          {description}
        </p>
      </div>
    </div>
  );
}
