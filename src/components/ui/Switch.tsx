import React from 'react';

interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'checked' | 'onChange'> {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, onCheckedChange, className = "", ...props }, ref) => {
    return (
      <label className={`relative inline-flex items-center cursor-pointer ${className}`}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className="sr-only"
          ref={ref}
          {...props}
        />
        <div className={`w-11 h-6 rounded-full transition-colors ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}>
          <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${checked ? 'translate-x-5' : 'translate-x-0'} mt-0.5 ml-0.5`}></div>
        </div>
      </label>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;