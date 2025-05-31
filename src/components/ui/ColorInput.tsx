import React from 'react';

interface ColorInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const ColorInput = React.memo(({ label, value, onChange, className = "" }: ColorInputProps) => {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="text-white font-medium text-sm block">{label}</label>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 rounded-lg border-2 border-purple-500/50 cursor-pointer bg-transparent p-0.5"
      />
    </div>
  );
});

ColorInput.displayName = "ColorInput";

export default ColorInput;