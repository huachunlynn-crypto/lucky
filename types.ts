
export interface CategoryFortune {
  category: string;
  detail: string;
  icon: string;
}

export interface FortuneResult {
  luckLevel: string;
  summary: string;
  luckyColor: string;
  luckyNumber: string;
  categories: CategoryFortune[];
  advice: string;
  emoji: string;
  mascotReaction: 'happy' | 'excited' | 'wink' | 'love';
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  RESULT = 'RESULT',
  ERROR = 'ERROR'
}
