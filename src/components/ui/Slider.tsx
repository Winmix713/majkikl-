import React from 'react';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value: number[];
  onValueChange: (value: number[]) => void;
  min?: number;
  max: number;
  step?: number;
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  ({ value, onValueChange, min = 0, max, step = 1, className = "", ...props }, ref) => {
    return (
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={(e) => onValueChange([parseFloat(e.target.value)])}
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider ${className}`}
        ref={ref}
        {...props}
      />
    );
  }
);

Slider.displayName = "Slider";

export default Slider;