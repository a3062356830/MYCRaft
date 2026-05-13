import { careerIslands } from './careers';

export interface Mentor {
  name: string;
  avatar: string;
  greeting: string;
}

export const defaultMentor: Mentor = {
  name: 'AI 导师',
  avatar: '🤖',
  greeting: '需要帮助吗？我可以为你推荐学习资源！'
};

export const getCareerMentor = (careerId: string): Mentor => {
  const island = careerIslands.find(i => i.id === careerId);
  return {
    name: island?.mentorName || 'AI 导师',
    avatar: island?.mentorAvatar || '🤖',
    greeting: island?.id === 'software-engineer'
      ? '你好！让我帮你成为更好的程序员！'
      : '欢迎来到数据世界！让我们一起探索数据之美！'
  };
};
