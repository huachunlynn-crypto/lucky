
import React from 'react';
import { FortuneResult } from '../types.ts';
import { Palette, Hash, Sparkle, Quote, TrendingUp } from 'lucide-react';
import Mascot from './Mascot.tsx';

interface FortuneCardProps {
  fortune: FortuneResult;
}

const FortuneCard: React.FC<FortuneCardProps> = ({ fortune }) => {
  return (
    <div className="relative pt-16">
      {/* Mascot popping out from the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
        <Mascot reaction={fortune.mascotReaction} />
      </div>

      <div className="bg-white/90 backdrop-blur-xl rounded-[3rem] p-8 md:p-12 shadow-2xl border-4 border-pink-100 relative overflow-hidden">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6">
            <span className="inline-block px-10 py-3 bg-gradient-to-r from-pink-400 to-yellow-400 text-white rounded-full text-4xl font-bold shadow-xl transform hover:scale-110 transition-transform">
              {fortune.luckLevel}
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold text-pink-600 mb-8 leading-tight">
            “{fortune.summary}” {fortune.emoji}
          </h3>

          {/* New Multi-Category Section */}
          <div className="w-full space-y-4 mb-8">
            <div className="flex items-center gap-2 text-pink-400 font-bold mb-2">
              <TrendingUp size={20} />
              <span>维度详解</span>
            </div>
            {fortune.categories.map((cat, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border-2 border-pink-50 flex items-start gap-4 text-left shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h4 className="font-bold text-gray-700">{cat.category}</h4>
                  <p className="text-gray-500 text-sm">{cat.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 w-full mb-8">
            <div className="bg-pink-50 p-4 rounded-2xl flex flex-col items-center border border-pink-100">
              <Palette className="text-pink-400 mb-1" size={20} />
              <span className="text-gray-400 text-xs uppercase tracking-wider">幸运色</span>
              <span className="font-bold text-pink-600">{fortune.luckyColor}</span>
            </div>
            <div className="bg-yellow-50 p-4 rounded-2xl flex flex-col items-center border border-yellow-100">
              <Hash className="text-yellow-500 mb-1" size={20} />
              <span className="text-gray-400 text-xs uppercase tracking-wider">幸运数字</span>
              <span className="font-bold text-yellow-600">{fortune.luckyNumber}</span>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-pink-50 p-6 rounded-3xl border-2 border-dashed border-pink-200 relative w-full">
            <Quote className="absolute -top-3 -left-3 text-pink-300" size={24} fill="currentColor" />
            <p className="text-gray-600 italic text-lg leading-relaxed">
              {fortune.advice}
            </p>
          </div>
          
          <div className="mt-8 flex gap-3">
            {[...Array(5)].map((_, i) => (
              <Sparkle key={i} className="text-yellow-400 animate-pulse" size={16} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FortuneCard;
