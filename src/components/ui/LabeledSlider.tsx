import React from 'react';
import Slider from './Slider';

interface LabeledSliderProps {
  label: string;
  value: number;
  onValueChange: (value: number) => void;
  min?: number;
  max: number;
  step?: number;
  unit?: string;
  className?: string;
}

const LabeledSlider = React.memo(({
  label,
  value,
  onValueChange,
  min = 0,
  max,
  step = 1,
  unit = "",
  className = "",
}: LabeledSliderProps) => {
  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-1">
        <label className="text-gray-400 text-sm">{label}</label>
        <span className="text-purple-400 font-medium text-sm min-w-[40px] text-right">
          {value}{unit}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([val]) => onValueChange(val)}
        min={min}
        max={max}
        step={step}
        className="my-1"
      />
    </div>
  );
});

LabeledSlider.displayName = "LabeledSlider";

export default LabeledSlider;