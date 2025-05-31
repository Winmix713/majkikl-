import React from 'react';
import { Settings, Sparkles } from 'lucide-react';
import Button from '../ui/Button';
import SectionHeader from '../ui/SectionHeader';
import { CardSettings } from '../../types/card';
import { randomColor } from '../../utils/helpers';

interface PresetsPanelProps {
  card: CardSettings;
  updateCard: (updates: Partial<CardSettings>, immediate?: boolean) => void;
}

const PresetsPanel: React.FC<PresetsPanelProps> = ({ card, updateCard }) => {
  const presets = [
    { 
      name: "Glassmorphism", 
      description: "Modern frosted glass", 
      gradient: "from-white/10 to-white/5", 
      config: { 
        bgGradientFrom:"rgba(255,255,255,0.15)", 
        bgGradientTo:"rgba(255,255,255,0.05)", 
        cardBorderRadius:{topLeft:20,topRight:20,bottomLeft:20,bottomRight:20,unit:"px"}, 
        enableHoverEffects:true, 
        cardOpacity:85, 
        shadowColor:"#000000", 
        shadowOpacity:0.1, 
        shadowSettings:{x:0,y:8,blur:32,spread:0} 
      }
    },
    { 
      name: "Neon Glow", 
      description: "Vibrant and energetic", 
      gradient: "from-purple-600 to-blue-600", 
      config: { 
        bgGradientFrom:"#8b5cf6", 
        bgGradientTo:"#3b82f6", 
        cardOpacity:100, 
        shadowColor:"#8b5cf6", 
        shadowOpacity:0.4, 
        shadowSettings:{x:0,y:0,blur:25,spread:2}, 
        enableAnimations:true, 
        titleFont:"Georgia", 
        titleWeight:"700", 
        cardBorderRadius:{topLeft:16,topRight:16,bottomLeft:16,bottomRight:16,unit:"px"} 
      }
    },
    { 
      name: "Gradient Dream", 
      description: "Smooth color transitions", 
      gradient: "from-pink-500 to-violet-600", 
      config: { 
        bgGradientFrom:"#ec4899", 
        bgGradientTo:"#8b5cf6", 
        cardOpacity:100, 
        cardBorderRadius:{topLeft:16,topRight:16,bottomLeft:16,bottomRight:16,unit:"px"}, 
        gradientAngle:45, 
        shadowColor:"#000000", 
        shadowOpacity:0.15, 
        shadowSettings:{x:0,y:6,blur:12,spread:0} 
      }
    },
    { 
      name: "Minimal Clean", 
      description: "Simple and elegant", 
      gradient: "from-gray-100 to-gray-200", 
      config: { 
        bgGradientFrom:"#f3f4f6", 
        bgGradientTo:"#e5e7eb", 
        cardOpacity:100, 
        cardBorderRadius:{topLeft:8,topRight:8,bottomLeft:8,bottomRight:8,unit:"px"}, 
        shadowColor:"#000000", 
        shadowOpacity:0.08, 
        shadowSettings:{x:0,y:4,blur:6,spread:-1} 
      }
    },
  ];

  const randomizeCard = () => {
    const colors = ["#ff6b6b","#4ecdc4","#45b7d1","#96ceb4","#ffeaa7","#dda0dd","#98d8c8","#f8a5c2","#6a89cc","#f5cd79","#f78fb3","#ff7f50","#ffdab9","#b2f7ef"];
    const randomFrom = colors[Math.floor(Math.random()*colors.length)]; 
    let randomTo = colors[Math.floor(Math.random()*colors.length)]; 
    while(randomTo === randomFrom) {
      randomTo = colors[Math.floor(Math.random()*colors.length)];
    }
    const randomRadius = Math.floor(Math.random()*45)+5;
    
    updateCard({
      bgGradientFrom: randomFrom,
      bgGradientTo: randomTo,
      gradientAngle: Math.floor(Math.random()*360),
      rotation: Math.floor(Math.random()*20-10),
      cardBorderRadius: {
        topLeft: randomRadius,
        topRight: randomRadius,
        bottomLeft: randomRadius,
        bottomRight: randomRadius,
        unit: "px"
      },
      cardOpacity: Math.floor(Math.random()*20)+80
    }, true);
  };

  return (
    <div className="space-y-5">
      <SectionHeader icon={Settings} title="Smart Presets" iconColorClass="text-purple-300" />
      <div className="space-y-3">
        {presets.map((preset) => (
          <button 
            key={preset.name} 
            onClick={() => updateCard(preset.config as Partial<CardSettings>, true)} 
            className="w-full p-3.5 bg-gray-800/60 border border-gray-600/50 rounded-xl text-left hover:border-purple-500/70 transition-colors group focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-gray-800"
            title={`Apply preset: ${preset.name}`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <div className="flex-1">
                <div className="text-white font-medium text-sm">{preset.name}</div>
                <div className="text-gray-400 text-xs">{preset.description}</div>
              </div>
            </div>
            <div className={`w-full h-6 rounded-md mt-2.5 bg-gradient-to-r ${preset.gradient}`}></div>
          </button>
        ))}
      </div>
      <SectionHeader icon={Sparkles} title="Quick Actions" iconColorClass="text-purple-300" />
      <Button 
        onClick={randomizeCard} 
        className="w-full bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-700/90 hover:to-pink-700/90 text-white font-medium py-2.5 rounded-lg text-sm flex items-center justify-center gap-2"
      >
        <Sparkles className="w-3.5 h-3.5" />
        Randomize Style
      </Button>
    </div>
  );
};

export default PresetsPanel;