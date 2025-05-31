import React from 'react';
import { RotateCcw, Circle } from 'lucide-react';
import Button from '../ui/Button';
import LabeledSlider from '../ui/LabeledSlider';
import SectionHeader from '../ui/SectionHeader';
import { CardSettings } from '../../types/card';

interface EffectsPanelProps {
  card: CardSettings;
  updateCard: (updates: Partial<CardSettings>, immediate?: boolean) => void;
}

const EffectsPanel: React.FC<EffectsPanelProps> = ({ card, updateCard }) => {
  return (
    <div className="space-y-5">
      <SectionHeader icon={RotateCcw} title="Transform" iconColorClass="text-pink-400" />
      <div className="bg-gray-800/50 p-3.5 rounded-xl space-y-3">
        <LabeledSlider 
          label="Rotation" 
          value={card.rotation} 
          onValueChange={(val) => updateCard({ rotation: val })} 
          min={-180} 
          max={180} 
          unit="°" 
        />
        <LabeledSlider 
          label="Scale X" 
          value={card.scaleX * 100} 
          onValueChange={(val) => updateCard({ scaleX: val / 100 })} 
          min={25} 
          max={250} 
          unit="%" 
        />
        <LabeledSlider 
          label="Scale Y" 
          value={card.scaleY * 100} 
          onValueChange={(val) => updateCard({ scaleY: val / 100 })} 
          min={25} 
          max={250} 
          unit="%" 
        />
      </div>
      <SectionHeader icon={Circle} title="Filters" iconColorClass="text-pink-400" />
      <div className="bg-gray-800/50 p-3.5 rounded-xl space-y-3">
        <LabeledSlider 
          label="Blur" 
          value={card.blur} 
          onValueChange={(val) => updateCard({ blur: Math.max(0, val) })} 
          max={30} 
          step={0.1} 
          unit="px" 
        />
        <LabeledSlider 
          label="Brightness" 
          value={card.brightness} 
          onValueChange={(val) => updateCard({ brightness: val })} 
          min={0} 
          max={200} 
          unit="%" 
        />
        <LabeledSlider 
          label="Contrast" 
          value={card.contrast} 
          onValueChange={(val) => updateCard({ contrast: val })} 
          min={0} 
          max={200} 
          unit="%" 
        />
        <LabeledSlider 
          label="Saturation" 
          value={card.saturation} 
          onValueChange={(val) => updateCard({ saturation: val })} 
          min={0} 
          max={200} 
          unit="%" 
        />
      </div>
      <Button 
        onClick={() => updateCard({rotation:0,scaleX:1,scaleY:1,blur:0,brightness:100,contrast:100,saturation:100},true)} 
        variant="destructive" 
        className="w-full bg-gradient-to-r from-red-600/80 to-orange-500/80 hover:from-red-700/90 hover:to-orange-600/90 text-white font-medium py-2.5 rounded-lg text-sm"
      >
        Reset All Effects
      </Button>
    </div>
  );
};

export default EffectsPanel;