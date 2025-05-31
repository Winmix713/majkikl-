import { create } from 'zustand';
import { CardSettings, DEFAULT_CARD_SETTINGS } from '../types/card';

interface CardState {
  activeCard: CardSettings;
  history: CardSettings[];
  historyIndex: number;
  updateCard: (updates: Partial<CardSettings>, immediate?: boolean) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  generateRandomCard: () => void;
}

export const useCardStore = create<CardState>((set, get) => ({
  activeCard: DEFAULT_CARD_SETTINGS,
  history: [DEFAULT_CARD_SETTINGS],
  historyIndex: 0,
  canUndo: false,
  canRedo: false,

  updateCard: (updates, immediate = false) => {
    const { activeCard, history, historyIndex } = get();
    const newCard = { ...activeCard, ...updates };
    
    set({ activeCard: newCard });

    if (immediate) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newCard);
      set({ 
        history: newHistory,
        historyIndex: newHistory.length - 1,
        canUndo: newHistory.length > 1,
        canRedo: false
      });
    }
  },

  undo: () => {
    const { history, historyIndex } = get();
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      set({ 
        historyIndex: newIndex,
        activeCard: history[newIndex],
        canUndo: newIndex > 0,
        canRedo: true
      });
    }
  },

  redo: () => {
    const { history, historyIndex } = get();
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      set({ 
        historyIndex: newIndex,
        activeCard: history[newIndex],
        canUndo: true,
        canRedo: newIndex < history.length - 1
      });
    }
  },

  generateRandomCard: () => {
    const titles = ["Creative Card", "Modern Design", "Elegant Style", "Dynamic Card", "Innovative UI"];
    const descriptions = [
      "Beautiful and responsive design",
      "Crafted with precision and care", 
      "Designed for maximum impact",
      "Built for the future of web",
    ];

    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    get().updateCard({
      title: randomTitle,
      description: randomDescription,
      bgGradientFrom: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
      bgGradientTo: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
    }, true);
  }
}));