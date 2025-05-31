import React, { useState, ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
  children: ReactNode;
  value: string;
  onValueChange: (value: string) => void;
}

export const Select = ({ children, value, onValueChange }: SelectProps) => {
  return (
    <div className="relative">
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === SelectTrigger) {
          return React.cloneElement(child, { value, onValueChange });
        }
        return child;
      })}
    </div>
  );
};

interface SelectTriggerProps {
  children: ReactNode;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const SelectTrigger = ({ children, className = "", value, onValueChange }: SelectTriggerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <button
        type="button"
        className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value}</span>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-popover text-popover-foreground shadow-md rounded-md border">
          {React.Children.map(children, child => {
            if (React.isValidElement(child) && child.type === SelectContent) {
              return React.cloneElement(child, { onValueChange, setIsOpen });
            }
            return null;
          })}
        </div>
      )}
    </div>
  );
};

interface SelectContentProps {
  children: ReactNode;
  onValueChange?: (value: string) => void;
  setIsOpen?: (open: boolean) => void;
}

export const SelectContent = ({ children, onValueChange, setIsOpen }: SelectContentProps) => {
  return (
    <div className="p-1">
      {React.Children.map(children, child => {
        if (React.isValidElement(child) && child.type === SelectItem) {
          return React.cloneElement(child, { onValueChange, setIsOpen });
        }
        return child;
      })}
    </div>
  );
};

interface SelectItemProps {
  children: ReactNode;
  value: string;
  onValueChange?: (value: string) => void;
  setIsOpen?: (open: boolean) => void;
}

export const SelectItem = ({ children, value, onValueChange, setIsOpen }: SelectItemProps) => {
  return (
    <div
      className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground cursor-pointer"
      onClick={() => {
        onValueChange?.(value);
        setIsOpen?.(false);
      }}
    >
      {children}
    </div>
  );
};

export const SelectValue = () => null;