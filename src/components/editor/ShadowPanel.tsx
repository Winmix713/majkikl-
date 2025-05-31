import React from 'react';
import { Box } from 'lucide-react';
import ColorInput from '../ui/ColorInput';
import LabeledSlider from '../ui/LabeledSlider';
import SectionHeader from '../ui/SectionHeader';
import { CardSettings } from '../../types/card';

interface ShadowPanelProps {
  card: CardSettings;
  updateCard: (updates: Partial<CardSettings>, immediate?: boolean) => void;
}

const ShadowPanel: React.FC<ShadowPanelProps> = ({ card, updateCard }) => {
  return (
    <div className="space-y-5">
      <SectionHeader icon={Box} title="Shadow Properties" iconColorClass="text-green-400" />
      <div className="grid grid-cols-2 gap-3">
        <LabeledSlider 
          label="Offset X" 
          value={card.shadowSettings?.x ?? 0} 
          onValueChange={(val) => updateCard({ shadowSettings: { ...(card.shadowSettings ?? { x: 0, y: 30, blur: 50, spread: 0 }), x: val }})} 
          min={-50} 
          max={50} 
          unit="px" 
        />
        <LabeledSlider 
          label="Offset Y" 
          value={card.shadowSettings?.y ?? 0} 
          onValueChange={(val) => updateCard({ shadowSettings: { ...(card.shadowSettings ?? { x: 0, y: 30, blur: 50, spread: 0 }), y: val }})} 
          min={-50} 
          max={50} 
          unit="px" 
        />
        <LabeledSlider 
          label="Blur" 
          value={card.shadowSettings?.blur ?? 0} 
          onValueChange={(val) => updateCard({ shadowSettings: { ...(card.shadowSettings ?? { x: 0, y: 30, blur: 50, spread: 0 }), blur: Math.max(0,val) }})} 
          max={100} 
          unit="px" 
        />
        <LabeledSlider 
          label="Spread" 
          value={card.shadowSettings?.spread ?? 0} 
          onValueChange={(val) => updateCard({ shadowSettings: { ...(card.shadowSettings ?? { x: 0, y: 30, blur: 50, spread: 0 }), spread: val }})} 
          min={-50} 
          max={50} 
          unit="px" 
        />
      </div>
      <div className="flex items-end gap-3">
        <ColorInput 
          label="Color" 
          value={card.shadowColor} 
          onChange={(val) => updateCard({ shadowColor: val }, true)} 
          className="w-16" 
        />
        <LabeledSlider 
          label="Opacity" 
          value={Math.round(card.shadowOpacity * 100)} 
          onValueChange={(val) => updateCard({ shadowOpacity: val / 100 })} 
          max={100} 
          unit="%" 
          className="flex-1" 
        />
      </div>
    </div>
  );
};

export default ShadowPanel;