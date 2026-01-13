
import React from 'react';

interface LuckyButtonProps {
  onClick: () => void;
  isLoading: boolean;
}

const LuckyButton: React.FC<LuckyButtonProps> = ({ onClick, isLoading }) => {
  return (
    <button
      onClick={onClick}
      disabled={isLoading}
      className={`
        relative group transition-all duration-300 transform active:scale-95
        px-10 py-6 md:px-16 md:py-8
        text-2xl md:text-4xl font-bold text-white
        bg-gradient-to-r from-pink-400 via-rose-400 to-yellow-400
        rounded-full shadow-[0_10px_0_0_#db2777] hover:shadow-[0_5px_0_0_#db2777]
        hover:translate-y-[5px] active:translate-y-[10px] active:shadow-none
        flex items-center gap-4
        ${isLoading ? 'opacity-70 cursor-not-allowed translate-y-[5px] shadow-[0_5px_0_0_#db2777]' : ''}
      `}
    >
      <span className="relative">
        {isLoading ? '运势生成中...' : '生成今日运势'}
        <span className="absolute -top-6 -right-8 text-yellow-200 group-hover:scale-125 transition-transform duration-500">✨</span>
        <span className="absolute -bottom-6 -left-8 text-white/50 group-hover:rotate-12 transition-transform duration-500">🍀</span>
      </span>
    </button>
  );
};

export default LuckyButton;
