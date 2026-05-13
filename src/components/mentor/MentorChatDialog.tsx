'use client';

import React, { useState } from 'react';
import { PixelDialog, PixelCard, PixelTextarea, PixelButton, PixelBadge } from '@/components/pixel';

interface MentorChatDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function MentorChatDialog({ 
  open, 
  onClose 
}: MentorChatDialogProps) {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'mentor'; content: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!question.trim()) return;

    // 添加用户消息
    const newUserMessage = { role: 'user' as const, content: question };
    setMessages(prev => [...prev, newUserMessage]);
    setQuestion('');
    setIsTyping(true);

    // Mock 回复
    setTimeout(() => {
      setIsTyping(false);
      const mockReply = '建议你先回到任务目标，确认交付物是否覆盖评分标准。';
      setMessages(prev => [...prev, { role: 'mentor', content: mockReply }]);
    }, 800);
  };

  return (
    <PixelDialog
      open={open}
      onClose={onClose}
      title="🤖 AI导师"
    >
      <div className="space-y-4">
        {/* 导师头像和提示 */}
        <div className="flex items-start gap-3 p-3 bg-slate-800 border-2 border-slate-700">
          <div className="w-12 h-12 bg-slate-700 border-2 border-amber-500 flex items-center justify-center text-2xl flex-shrink-0">
            🤖
          </div>
          <div className="flex-1">
            <p className="text-slate-300 text-sm">
              你可以先描述你遇到的问题，我会帮你拆解思路。
            </p>
          </div>
        </div>

        {/* 消息列表 */}
        {messages.length > 0 && (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div 
                key={idx}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`px-4 py-2 border-2 ${
                    msg.role === 'user' 
                      ? 'bg-blue-900/50 border-blue-700' 
                      : 'bg-slate-800 border-slate-700'
                  }`}
                  style={{
                    boxShadow: 'inset -2px -2px 0px 0px #0f172a, inset 2px 2px 0px 0px #475569'
                  }}
                >
                  <p className="text-slate-200 text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-3">
                <div className="px-4 py-2 border-2 bg-slate-800 border-slate-700">
                  <span className="text-slate-400 text-sm animate-pulse">
                    导师正在思考...
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 输入区域 */}
        <div className="space-y-3">
          <PixelTextarea
            value={question}
            onChange={setQuestion}
            placeholder="请输入你的问题..."
            rows={3}
          />
          <div className="flex justify-end">
            <PixelButton onClick={handleSend} disabled={isTyping || !question.trim()}>
              发送
            </PixelButton>
          </div>
        </div>
      </div>
    </PixelDialog>
  );
}
