import React, { useState, useCallback, useEffect } from 'react';
import { CardSettings, DEFAULT_CARD_SETTINGS } from './types/card';
import { randomColor } from './utils/helpers';
import Header from './components/layout/Header';
import Toolbar from './components/layout/Toolbar';
import Sidebar from './components/layout/Sidebar';
import Dockbar from './components/editor/Dockbar';
import CardPreview from './components/card/CardPreview';
import StatusBar from './components/layout/StatusBar';

const App: React.FC = () => {
  const [activeCard, setActiveCard] = useState<CardSettings>(DEFAULT_CARD_SETTINGS);
  const [history, setHistory] = useState<CardSettings[]>([DEFAULT_CARD_SETTINGS]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [totalCards, setTotalCards] = useState(3);

  const updateCard = useCallback((updates: Partial<CardSettings>, immediate = false) => {
    const newCard = { ...activeCard, ...updates };
    setActiveCard(newCard);

    if (immediate) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newCard);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
  }, [activeCard, history, historyIndex]);

  const exportCard = useCallback(() => {
    // Create a data object with the current card settings
    const cardData = {
      ...activeCard,
      exportedAt: new Date().toISOString(),
      version: '1.0'
    };

    // Convert the data to JSON and create a blob
    const jsonData = JSON.stringify(cardData, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    
    // Create a download link and trigger it
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `card-${activeCard.title.toLowerCase().replace(/\s+/g, '-')}.json`;
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [activeCard]);

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const undo = useCallback(() => {
    if (canUndo) {
      setHistoryIndex(historyIndex - 1);
      setActiveCard(history[historyIndex - 1]);
    }
  }, [canUndo, historyIndex, history]);

  const redo = useCallback(() => {
    if (canRedo) {
      setHistoryIndex(historyIndex + 1);
      setActiveCard(history[historyIndex + 1]);
    }
  }, [canRedo, historyIndex, history]);

  const generateRandomCard = useCallback(() => {
    const titles = ["Creative Card", "Modern Design", "Elegant Style", "Dynamic Card", "Innovative UI"];
    const descriptions = [
      "Beautiful and responsive design",
      "Crafted with precision and care", 
      "Designed for maximum impact",
      "Built for the future of web",
    ];

    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    updateCard({
      title: randomTitle,
      description: randomDescription,
      bgGradientFrom: randomColor(),
      bgGradientTo: randomColor(),
    }, true);
  }, [updateCard]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'y') {
        redo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'r') {
        e.preventDefault();
        generateRandomCard();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '+') {
        e.preventDefault();
        setZoomLevel(prev => Math.min(3, prev + 0.25));
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '-') {
        e.preventDefault();
        setZoomLevel(prev => Math.max(0.25, prev - 0.25));
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '0') {
        e.preventDefault();
        setZoomLevel(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, generateRandomCard]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Custom CSS */}
      <style>{`
        .slider {
          background: #1f2937;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: 2px solid #ffffff;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: 2px solid #ffffff;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>

      <Header exportCard={exportCard} />

      <Toolbar 
        card={activeCard} 
        updateCard={updateCard} 
        canUndo={canUndo} 
        canRedo={canRedo} 
        undo={undo} 
        redo={redo} 
        generateRandomCard={generateRandomCard} 
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          generateRandomCard={generateRandomCard} 
          updateCard={updateCard}
        />

        <main className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col relative overflow-hidden">
          <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            
            <div className="relative">
              <div 
                className="absolute inset-0 blur-3xl opacity-30 -z-10"
                style={{
                  background: `radial-gradient(circle, ${activeCard.bgGradientFrom}40, ${activeCard.bgGradientTo || activeCard.bgGradientFrom}20, transparent 70%)`,
                  transform: 'scale(1.5)'
                }}
              ></div>
              
              <CardPreview card={activeCard} zoomLevel={zoomLevel} />
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-300 font-medium">Live Preview</span>
              </div>
            </div>
          </div>

          <Dockbar activeCard={activeCard} updateCard={updateCard} />

          <StatusBar 
            currentCardIndex={currentCardIndex} 
            totalCards={totalCards} 
            zoomLevel={zoomLevel} 
            setZoomLevel={setZoomLevel} 
          />
        </main>
      </div>
    </div>
  );
};

export default App;