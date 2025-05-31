import React from 'react';
import { 
  Undo, Redo, Layout, Palette, 
  ChevronDown, Bold, Italic, Underline, 
  Strikethrough, AlignLeft, AlignCenter, 
  AlignRight, Layers, Shuffle 
} from 'lucide-react';
import { CardSettings } from '../../types/card';

interface ToolbarProps {
  card: CardSettings;
  updateCard: (updates: Partial<CardSettings>, immediate?: boolean) => void;
  canUndo: boolean;
  canRedo: boolean;
  undo: () => void;
  redo: () => void;
  generateRandomCard: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ 
  card, updateCard, canUndo, canRedo, undo, redo, generateRandomCard 
}) => {
  return (
    <div className="flex items-center justify-center px-3 py-1 border-b border-gray-700 bg-gray-900 flex-shrink-0 gap-1">
      <div className="flex items-center gap-0.5">
        <button 
          onClick={undo} 
          disabled={!canUndo} 
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors disabled:opacity-50"
          title="Undo"
        >
          <Undo className="w-4 h-4" />
        </button>
        <button 
          onClick={redo} 
          disabled={!canRedo} 
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors disabled:opacity-50"
          title="Redo"
        >
          <Redo className="w-4 h-4" />
        </button>
      </div>
      <div className="w-px h-4 bg-gray-700 mx-2" />
      <div className="flex items-center gap-0.5">
        <button 
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
          title="Layout Options"
        >
          <Layout className="w-4 h-4" />
        </button>
        <button 
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
          title="Theme"
        >
          <Palette className="w-4 h-4" />
        </button>
      </div>
      <div className="w-px h-4 bg-gray-700 mx-2" />
      <div className="flex items-center gap-0.5">
        <button 
          className="flex items-center min-w-15 px-2 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors text-sm" 
          title="Font"
        >
          {card.titleFont || 'Inter'}
          <ChevronDown className="w-3 h-3 ml-1" />
        </button>
        <button 
          className="flex items-center min-w-10 px-2 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors text-sm" 
          title="Font Size"
        >
          {card.titleSize || 18}
          <ChevronDown className="w-3 h-3 ml-1" />
        </button>
      </div>
      <div className="w-px h-4 bg-gray-700 mx-2" />
      <div className="flex items-center gap-0.5">
        <button 
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button 
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button 
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
          title="Underline"
        >
          <Underline className="w-4 h-4" />
        </button>
        <button 
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>
      </div>
      <div className="w-px h-4 bg-gray-700 mx-2" />
      <div className="flex items-center gap-0.5">
        <button 
          onClick={() => updateCard({titleAlign: 'left'}, true)} 
          className={`flex items-center justify-center w-8 h-8 rounded ${card.titleAlign === 'left' ? 'bg-gray-700' : 'bg-transparent'} text-gray-200 hover:bg-gray-800 transition-colors`}
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </button>
        <button 
          onClick={() => updateCard({titleAlign: 'center'}, true)} 
          className={`flex items-center justify-center w-8 h-8 rounded ${card.titleAlign === 'center' ? 'bg-gray-700' : 'bg-transparent'} text-gray-200 hover:bg-gray-800 transition-colors`}
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </button>
        <button 
          onClick={() => updateCard({titleAlign: 'right'}, true)} 
          className={`flex items-center justify-center w-8 h-8 rounded ${card.titleAlign === 'right' ? 'bg-gray-700' : 'bg-transparent'} text-gray-200 hover:bg-gray-800 transition-colors`}
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </button>
      </div>
      <div className="w-px h-4 bg-gray-700 mx-2" />
      <div className="flex items-center gap-0.5">
        <button 
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
          title="Effects"
        >
          <Layers className="w-4 h-4" />
        </button>
        <button 
          onClick={generateRandomCard} 
          className="flex items-center justify-center w-8 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
          title="Random Card"
        >
          <Shuffle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toolbar;