import React from 'react';
import { Type, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import Button from '../ui/Button';
import LabeledSlider from '../ui/LabeledSlider';
import SectionHeader from '../ui/SectionHeader';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '../ui/Select';
import { CardSettings } from '../../types/card';

interface TypographyPanelProps {
  card: CardSettings;
  updateCard: (updates: Partial<CardSettings>, immediate?: boolean) => void;
}

const TypographyPanel: React.FC<TypographyPanelProps> = ({ card, updateCard }) => {
  const fonts = ["Inter", "Arial", "Helvetica", "Georgia", "Verdana", "Times New Roman"];
  const weights = [
    {value: "300", label: "Light"},
    {value: "400", label: "Normal"},
    {value: "500", label: "Medium"},
    {value: "600", label: "Semibold"},
    {value: "700", label: "Bold"},
    {value: "800", label: "ExtraBold"}
  ];
  
  const alignOptions = [
    {icon: AlignLeft, value: "left", label: "Align left"},
    {icon: AlignCenter, value: "center", label: "Align center"},
    {icon: AlignRight, value: "right", label: "Align right"},
    {icon: AlignJustify, value: "justify", label: "Justify text"}
  ];

  return (
    <div className="space-y-5">
      <SectionHeader icon={Type} title="Title" iconColorClass="text-teal-400" />
      <div className="bg-gray-800/50 p-3.5 rounded-xl space-y-3">
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="text-gray-400 text-xs block mb-0.5">Font Family</label>
            <Select value={card.titleFont} onValueChange={(value) => updateCard({ titleFont: value }, true)}>
              <SelectTrigger className="bg-gray-700/80 border-gray-600/70 text-white h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fonts.map(font => (
                  <SelectItem key={font} value={font}>{font}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-gray-400 text-xs block mb-0.5">Font Weight</label>
            <Select value={card.titleWeight} onValueChange={(value) => updateCard({ titleWeight: value }, true)}>
              <SelectTrigger className="bg-gray-700/80 border-gray-600/70 text-white h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {weights.map(weight => (
                  <SelectItem key={weight.value} value={weight.value}>{weight.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <LabeledSlider 
          label="Font Size" 
          value={card.titleSize} 
          onValueChange={(val) => updateCard({ titleSize: Math.max(1, val) })} 
          min={10} 
          max={60} 
          unit="px" 
        />
        <div>
          <label className="text-gray-400 text-xs block mb-1">Alignment</label>
          <div className="flex gap-1">
            {alignOptions.map(({icon: Icon, value, label}) => (
              <Button 
                key={value} 
                onClick={() => updateCard({titleAlign: value as CardSettings["titleAlign"]}, true)} 
                variant={card.titleAlign === value ? "secondary" : "outline"} 
                size="icon" 
                className={`h-8 w-8 ${card.titleAlign === value ? "bg-purple-600/80 border-purple-500/70" : "bg-gray-700/70 border-gray-600/60 hover:bg-gray-600/80"}`}
                title={label}
              >
                <Icon className="w-3.5 h-3.5 text-white"/>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <SectionHeader icon={Type} title="Description" iconColorClass="text-teal-400" />
      <div className="bg-gray-800/50 p-3.5 rounded-xl space-y-3">
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label className="text-gray-400 text-xs block mb-0.5">Font Family</label>
            <Select value={card.descriptionFont} onValueChange={(value) => updateCard({ descriptionFont: value }, true)}>
              <SelectTrigger className="bg-gray-700/80 border-gray-600/70 text-white h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fonts.map(font => (
                  <SelectItem key={font} value={font}>{font}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-gray-400 text-xs block mb-0.5">Font Weight</label>
            <Select value={card.descriptionWeight} onValueChange={(value) => updateCard({ descriptionWeight: value }, true)}>
              <SelectTrigger className="bg-gray-700/80 border-gray-600/70 text-white h-9 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {weights.map(weight => (
                  <SelectItem key={weight.value} value={weight.value}>{weight.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <LabeledSlider 
          label="Font Size" 
          value={card.descriptionSize} 
          onValueChange={(val) => updateCard({ descriptionSize: Math.max(1, val) })} 
          min={8} 
          max={40} 
          unit="px" 
        />
        <div>
          <label className="text-gray-400 text-xs block mb-1">Alignment</label>
          <div className="flex gap-1">
            {alignOptions.map(({icon: Icon, value, label}) => (
              <Button 
                key={value} 
                onClick={() => updateCard({descriptionAlign: value as CardSettings["descriptionAlign"]}, true)} 
                variant={card.descriptionAlign === value ? "secondary" : "outline"} 
                size="icon" 
                className={`h-8 w-8 ${card.descriptionAlign === value ? "bg-purple-600/80 border-purple-500/70" : "bg-gray-700/70 border-gray-600/60 hover:bg-gray-600/80"}`}
                title={label}
              >
                <Icon className="w-3.5 h-3.5 text-white"/>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TypographyPanel;