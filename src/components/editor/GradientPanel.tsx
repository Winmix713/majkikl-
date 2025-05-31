import React, { ChangeEvent } from 'react';
import { Layers } from 'lucide-react';
import ColorInput from '../ui/ColorInput';
import LabeledSlider from '../ui/LabeledSlider';
import SectionHeader from '../ui/SectionHeader';
import Input from '../ui/Input';
import { CardSettings } from '../../types/card';

interface GradientPanelProps {
  card: CardSettings;
  updateCard: (updates: Partial<CardSettings>, immediate?: boolean) => void;
}

const GradientPanel: React.FC<GradientPanelProps> = ({ card, updateCard }) => {
  const handleGradientAngleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newAngle = parseInt(e.target.value, 10);
    if (isNaN(newAngle)) newAngle = card.gradientAngle;
    newAngle = Math.max(0, Math.min(359, newAngle));
    updateCard({ gradientAngle: newAngle }, true);
  };

  const rotateGradientAngle = () => {
    const newAngle = (card.gradientAngle + 45) % 360;
    updateCard({ gradientAngle: newAngle }, true);
  };

  const presetGradients = [
    {from:"#667eea",to:"#764ba2",name:"Royal Blue to Purple"},
    {from:"#f093fb",to:"#f5576c",name:"Pink to Red"},
    {from:"#4facfe",to:"#00f2fe",name:"Sky Blue to Cyan"},
    {from:"#43e97b",to:"#38f9d7",name:"Green to Mint"},
    {from:"#fa709a",to:"#fee140",name:"Rose to Gold"},
    {from:"#a8edea",to:"#fed6e3",name:"Aqua to Light Pink"},
  ];

  return (
    <div className="space-y-5">
      <SectionHeader icon={Layers} title="Gradient Setup" iconColorClass="text-orange-400" />
      <div 
        className="w-full h-20 rounded-xl border border-gray-600/50" 
        style={{ 
          background: `linear-gradient(${card.gradientAngle}deg, ${card.bgGradientFrom}${Math.round(card.bgOpacityFrom * 2.55).toString(16).padStart(2, "0")}, ${card.bgGradientTo || "#1a0b33"}${Math.round(card.bgOpacityTo * 2.55).toString(16).padStart(2, "0")})` 
        }}
      ></div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <ColorInput 
            label="Start Color" 
            value={card.bgGradientFrom} 
            onChange={(val) => updateCard({ bgGradientFrom: val }, true)} 
          />
          <LabeledSlider 
            label="Start Opacity" 
            value={card.bgOpacityFrom} 
            onValueChange={(val) => updateCard({ bgOpacityFrom: val })} 
            max={100} 
            unit="%" 
            className="mt-2" 
          />
        </div>
        <div>
          <ColorInput 
            label="End Color" 
            value={card.bgGradientTo || "#1a0b33"} 
            onChange={(val) => updateCard({ bgGradientTo: val }, true)} 
          />
          <LabeledSlider 
            label="End Opacity" 
            value={card.bgOpacityTo} 
            onValueChange={(val) => updateCard({ bgOpacityTo: val })} 
            max={100} 
            unit="%" 
            className="mt-2" 
          />
        </div>
      </div>
      <div>
        <label className="text-white font-medium text-sm block mb-2">Gradient Direction</label>
        <div className="flex items-center gap-3">
          <div className="relative w-20 h-20 bg-gray-800/70 rounded-full border border-gray-600/50 flex-shrink-0">
            <button 
              className="absolute top-1/2 left-1/2 w-10 h-0.5 bg-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 origin-center cursor-pointer group focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-800" 
              style={{ transform: `translate(-50%, -50%) rotate(${card.gradientAngle}deg)` }} 
              onClick={rotateGradientAngle}
              title={`Angle: ${card.gradientAngle}° (Click to rotate 45°)`}
            >
              <div className="absolute right-0 top-1/2 w-2.5 h-2.5 bg-purple-400 rounded-full transform translate-x-1/2 -translate-y-1/2 group-hover:scale-125 transition-transform"></div>
            </button>
          </div>
          <div className="flex-1">
            <LabeledSlider 
              label="Angle" 
              value={card.gradientAngle} 
              onValueChange={(val) => updateCard({ gradientAngle: val })} 
              max={359} 
              unit="°" 
            />
            <Input 
              type="number" 
              value={card.gradientAngle} 
              onChange={handleGradientAngleChange} 
              min="0" 
              max="359" 
              className="bg-gray-700 border-gray-600 text-white mt-2 w-full h-9 text-sm" 
            />
          </div>
        </div>
      </div>
      <div>
        <span className="text-white font-medium text-sm block mb-2">Preset Gradients</span>
        <div className="grid grid-cols-3 gap-2.5">
          {presetGradients.map((preset) => (
            <button 
              key={preset.name} 
              onClick={() => updateCard({ bgGradientFrom:preset.from, bgGradientTo:preset.to }, true)} 
              className="h-10 rounded-md border border-gray-600/50 hover:border-purple-500/70 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-1 focus:ring-offset-gray-800" 
              style={{background: `linear-gradient(135deg, ${preset.from}, ${preset.to})`}} 
              title={preset.name} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradientPanel;