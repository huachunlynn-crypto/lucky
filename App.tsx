
import React, { useState } from 'react';
import { Sparkles, Star, Heart, Clover, AlertCircle } from 'lucide-react';
import { generateDailyFortune } from './geminiService';
import { FortuneResult, AppState } from './types';
import LuckyButton from './components/LuckyButton';
import FortuneCard from './components/FortuneCard';
import Mascot from './components/Mascot';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [fortune, setFortune] = useState<FortuneResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setState(AppState.LOADING);
    setError(null);
    try {
      const result = await generateDailyFortune();
      setFortune(result);
      setState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError("哎呀，小幸刚才走神了... 重新点一下试试？");
      setState(AppState.ERROR);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 md:p-12 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute top-10 left-10 text-pink-200 animate-float opacity-50">
        <Heart size={48} fill="currentColor" />
      </div>
      <div className="absolute bottom-20 right-10 text-yellow-200 animate-float opacity-50 delay-700">
        <Star size={64} fill="currentColor" />
      </div>
      <div className="absolute top-1/2 left-5 text-green-200 animate-float opacity-50 delay-300">
        <Clover size={40} fill="currentColor" />
      </div>

      <header className="text-center mb-12 relative z-10">
        <div className="flex justify-center mb-4">
          <Mascot reaction={state === AppState.LOADING ? 'loading' : 'happy'} className="scale-75" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-pink-500 mb-4 drop-shadow-sm flex items-center justify-center gap-4">
          <Sparkles className="text-yellow-400" size={40} />
          幸运占卜屋
          <Sparkles className="text-yellow-400" size={40} />
        </h1>
        <p className="text-gray-500 text-lg md:text-xl">快来看看你今天的隐藏好运在哪里吧！✨</p>
      </header>

      <main className="w-full max-w-2xl flex flex-col items-center gap-8 relative z-10">
        <LuckyButton 
          onClick={handleGenerate} 
          isLoading={state === AppState.LOADING} 
        />

        {state === AppState.LOADING && (
          <div className="flex flex-col items-center gap-4 mt-8">
            <div className="w-16 h-16 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
            <p className="text-pink-500 font-bold animate-pulse text-xl">小幸正在偷看星星的秘密...</p>
          </div>
        )}

        {state === AppState.ERROR && (
          <div className="bg-white/80 p-6 rounded-3xl border-2 border-red-100 flex items-center gap-4 shadow-xl animate-bounce">
            <AlertCircle className="text-red-500" size={32} />
            <p className="text-red-600 font-bold">{error}</p>
          </div>
        )}

        {state === AppState.RESULT && fortune && (
          <div className="w-full animate-[popIn_0.6s_cubic-bezier(0.175,0.885,0.32,1.275)]">
             <FortuneCard fortune={fortune} />
          </div>
        )}
      </main>

      <footer className="mt-auto pt-12 text-gray-400 text-sm font-medium">
        小幸会一直为你守护好运 💖
      </footer>

      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8) translateY(40px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
