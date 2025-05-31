
import React, { createContext, useContext, useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { 
  Undo, 
  Redo, 
  Type, 
  Image, 
  Shapes, 
  Bold, 
  Italic, 
  Underline, 
  Palette, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Table,
  BarChart,
  Video,
  Link,
  MessageSquare,
  Layers,
  Grid,
  Settings
} from "lucide-react";

// Types
interface EditorState {
  isBold: boolean;
  isItalic: boolean;
  isUnderlined: boolean;
  fontSize: string;
  fontFamily: string;
  textAlign: 'left' | 'center' | 'right';
  canUndo: boolean;
  canRedo: boolean;
  textColor: string;
}

interface EditorContextType {
  state: EditorState;
  executeCommand: (command: string, value?: string) => void;
  updateState: () => void;
  editorRef: React.RefObject<HTMLDivElement>;
}

// Context
const EditorContext = createContext<EditorContextType | null>(null);

// Custom Hooks
const useEditorContext = () => {
  const context = useContext(EditorContext);
  if (!context) {
    throw new Error('useEditorContext must be used within EditorProvider');
  }
  return context;
};

// Components
interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
  className?: string;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = React.memo(({ 
  onClick, 
  isActive = false, 
  disabled = false, 
  title, 
  children, 
  className = "h-8 w-8 p-0" 
}) => {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }, [onClick]);

  return (
    <button
      onClick={onClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      title={title}
      className={`
        ${className}
        rounded-md transition-all duration-150 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
        ${isActive 
          ? 'bg-blue-100 text-blue-600 shadow-sm' 
          : 'hover:bg-gray-100 text-gray-600'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      aria-pressed={isActive}
      aria-label={title}
      role="button"
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </button>
  );
});

ToolbarButton.displayName = 'ToolbarButton';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  'aria-label'?: string;
}

const Select: React.FC<SelectProps> = React.memo(({ 
  value, 
  onChange, 
  options, 
  className = "w-28",
  'aria-label': ariaLabel 
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`
      ${className} h-8 text-sm border-0 bg-transparent 
      hover:bg-gray-100 focus:ring-0 focus:outline-none
      rounded-md px-2 cursor-pointer
    `}
    aria-label={ariaLabel}
  >
    {options.map(option => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
));

Select.displayName = 'Select';

const Separator: React.FC = () => (
  <div className="w-px h-6 bg-gray-300 mx-2" role="separator" />
);

// Toolbar Groups
const HistoryGroup: React.FC = React.memo(() => {
  const { state, executeCommand } = useEditorContext();

  const handleUndo = useCallback(() => executeCommand('undo'), [executeCommand]);
  const handleRedo = useCallback(() => executeCommand('redo'), [executeCommand]);

  return (
    <div className="flex items-center gap-1">
      <ToolbarButton
        onClick={handleUndo}
        disabled={!state.canUndo}
        title="Undo (Ctrl+Z)"
      >
        <Undo className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={handleRedo}
        disabled={!state.canRedo}
        title="Redo (Ctrl+Y)"
      >
        <Redo className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
});

HistoryGroup.displayName = 'HistoryGroup';

const InsertGroup: React.FC = React.memo(() => {
  const { executeCommand } = useEditorContext();

  const handleInsertText = useCallback(() => executeCommand('insertText'), [executeCommand]);
  const handleInsertImage = useCallback(() => executeCommand('insertImage'), [executeCommand]);
  const handleInsertShape = useCallback(() => executeCommand('insertShape'), [executeCommand]);

  return (
    <div className="flex items-center gap-1">
      <ToolbarButton
        onClick={handleInsertText}
        title="Insert Text Box"
        className="h-8 px-3"
      >
        <Type className="h-4 w-4 mr-1.5" />
        <span className="text-sm">Text</span>
      </ToolbarButton>
      <ToolbarButton
        onClick={handleInsertImage}
        title="Insert Image"
        className="h-8 px-3"
      >
        <Image className="h-4 w-4 mr-1.5" />
        <span className="text-sm">Image</span>
      </ToolbarButton>
      <ToolbarButton
        onClick={handleInsertShape}
        title="Insert Shape"
        className="h-8 px-3"
      >
        <Shapes className="h-4 w-4 mr-1.5" />
        <span className="text-sm">Shape</span>
      </ToolbarButton>
    </div>
  );
});

InsertGroup.displayName = 'InsertGroup';

const TypographyGroup: React.FC = React.memo(() => {
  const { state, executeCommand } = useEditorContext();

  const fontOptions = useMemo(() => [
    { value: 'Inter', label: 'Inter' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Times New Roman', label: 'Times' }
  ], []);

  const sizeOptions = useMemo(() => [
    { value: '12', label: '12' },
    { value: '14', label: '14' },
    { value: '16', label: '16' },
    { value: '18', label: '18' },
    { value: '24', label: '24' },
    { value: '32', label: '32' }
  ], []);

  const handleFontChange = useCallback((value: string) => {
    executeCommand('fontName', value);
  }, [executeCommand]);

  const handleSizeChange = useCallback((value: string) => {
    executeCommand('fontSize', value);
  }, [executeCommand]);

  return (
    <div className="flex items-center gap-1">
      <Select
        value={state.fontFamily}
        onChange={handleFontChange}
        options={fontOptions}
        aria-label="Font family"
      />
      <Select
        value={state.fontSize}
        onChange={handleSizeChange}
        options={sizeOptions}
        className="w-16"
        aria-label="Font size"
      />
    </div>
  );
});

TypographyGroup.displayName = 'TypographyGroup';

const FormattingGroup: React.FC = React.memo(() => {
  const { state, executeCommand } = useEditorContext();

  const handleBold = useCallback(() => executeCommand('bold'), [executeCommand]);
  const handleItalic = useCallback(() => executeCommand('italic'), [executeCommand]);
  const handleUnderline = useCallback(() => executeCommand('underline'), [executeCommand]);
  const handleColorChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    executeCommand('foreColor', e.target.value);
  }, [executeCommand]);

  return (
    <div className="flex items-center gap-1">
      <ToolbarButton
        onClick={handleBold}
        isActive={state.isBold}
        title="Bold (Ctrl+B)"
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={handleItalic}
        isActive={state.isItalic}
        title="Italic (Ctrl+I)"
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={handleUnderline}
        isActive={state.isUnderlined}
        title="Underline (Ctrl+U)"
      >
        <Underline className="h-4 w-4" />
      </ToolbarButton>
      <div className="relative">
        <input
          type="color"
          value={state.textColor}
          onChange={handleColorChange}
          className="absolute inset-0 w-8 h-8 opacity-0 cursor-pointer"
          title="Text Color"
          aria-label="Text color"
        />
        <ToolbarButton
          onClick={() => {}}
          title="Text Color"
        >
          <Palette className="h-4 w-4" />
        </ToolbarButton>
      </div>
    </div>
  );
});

FormattingGroup.displayName = 'FormattingGroup';

const AlignmentGroup: React.FC = React.memo(() => {
  const { state, executeCommand } = useEditorContext();

  const handleAlignLeft = useCallback(() => executeCommand('justifyLeft'), [executeCommand]);
  const handleAlignCenter = useCallback(() => executeCommand('justifyCenter'), [executeCommand]);
  const handleAlignRight = useCallback(() => executeCommand('justifyRight'), [executeCommand]);

  return (
    <div className="flex items-center gap-1">
      <ToolbarButton
        onClick={handleAlignLeft}
        isActive={state.textAlign === 'left'}
        title="Align Left"
      >
        <AlignLeft className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={handleAlignCenter}
        isActive={state.textAlign === 'center'}
        title="Align Center"
      >
        <AlignCenter className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={handleAlignRight}
        isActive={state.textAlign === 'right'}
        title="Align Right"
      >
        <AlignRight className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
});

AlignmentGroup.displayName = 'AlignmentGroup';

const MediaGroup: React.FC = React.memo(() => {
  const { executeCommand } = useEditorContext();

  const handleInsertTable = useCallback(() => executeCommand('insertTable'), [executeCommand]);
  const handleInsertChart = useCallback(() => executeCommand('insertChart'), [executeCommand]);
  const handleInsertVideo = useCallback(() => executeCommand('insertVideo'), [executeCommand]);
  const handleCreateLink = useCallback(() => executeCommand('createLink'), [executeCommand]);
  const handleInsertComment = useCallback(() => executeCommand('insertComment'), [executeCommand]);

  return (
    <div className="flex items-center gap-1">
      <ToolbarButton onClick={handleInsertTable} title="Insert Table">
        <Table className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={handleInsertChart} title="Insert Chart">
        <BarChart className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={handleInsertVideo} title="Insert Video">
        <Video className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={handleCreateLink} title="Insert Link">
        <Link className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={handleInsertComment} title="Insert Comment">
        <MessageSquare className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
});

MediaGroup.displayName = 'MediaGroup';

const UtilityGroup: React.FC = React.memo(() => {
  const { executeCommand } = useEditorContext();

  const handleToggleLayers = useCallback(() => executeCommand('toggleLayers'), [executeCommand]);
  const handleToggleGrid = useCallback(() => executeCommand('toggleGrid'), [executeCommand]);
  const handleOpenSettings = useCallback(() => executeCommand('openSettings'), [executeCommand]);

  return (
    <div className="flex items-center gap-1">
      <ToolbarButton onClick={handleToggleLayers} title="Layers Panel">
        <Layers className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={handleToggleGrid} title="Show Grid">
        <Grid className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={handleOpenSettings} title="Settings">
        <Settings className="h-4 w-4" />
      </ToolbarButton>
    </div>
  );
});

UtilityGroup.displayName = 'UtilityGroup';

// Main Toolbar Component
const EnhancedEditorToolbar: React.FC = React.memo(() => {
  return (
    <div className="h-12 bg-white border-b border-gray-200 flex items-center px-4 gap-1">
      <HistoryGroup />
      <Separator />
      <InsertGroup />
      <Separator />
      <TypographyGroup />
      <Separator />
      <FormattingGroup />
      <Separator />
      <AlignmentGroup />
      <Separator />
      <MediaGroup />
      <div className="flex-1" />
      <UtilityGroup />
    </div>
  );
});

EnhancedEditorToolbar.displayName = 'EnhancedEditorToolbar';

// Editor Provider Component
type EditorAction = 
  | { type: 'UPDATE_FORMATTING'; payload: Partial<EditorState> }
  | { type: 'SET_FONT'; payload: { fontFamily?: string; fontSize?: string } }
  | { type: 'SET_ALIGNMENT'; payload: 'left' | 'center' | 'right' }
  | { type: 'SET_COLOR'; payload: string };

const editorReducer = (state: EditorState, action: EditorAction): EditorState => {
  switch (action.type) {
    case 'UPDATE_FORMATTING':
      return { ...state, ...action.payload };
    case 'SET_FONT':
      return { ...state, ...action.payload };
    case 'SET_ALIGNMENT':
      return { ...state, textAlign: action.payload };
    case 'SET_COLOR':
      return { ...state, textColor: action.payload };
    default:
      return state;
  }
};

const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [state, dispatch] = useReducer(editorReducer, {
    isBold: false,
    isItalic: false,
    isUnderlined: false,
    fontSize: '16',
    fontFamily: 'Inter',
    textAlign: 'left',
    canUndo: false,
    canRedo: false,
    textColor: '#000000'
  });

  const updateState = useCallback(() => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    setState(prev => ({
      ...prev,
      isBold: document.queryCommandState('bold'),
      isItalic: document.queryCommandState('italic'),
      isUnderlined: document.queryCommandState('underline'),
      canUndo: document.queryCommandEnabled('undo'),
      canRedo: document.queryCommandEnabled('redo'),
      textAlign: document.queryCommandValue('justifyLeft') ? 'left' :
                document.queryCommandValue('justifyCenter') ? 'center' :
                document.queryCommandValue('justifyRight') ? 'right' : 'left'
    }));
  }, []);

  const executeCommand = useCallback((command: string, value?: string) => {
    if (!editorRef.current) return;

    editorRef.current.focus();

    switch (command) {
      case 'bold':
      case 'italic':
      case 'underline':
      case 'undo':
      case 'redo':
      case 'justifyLeft':
      case 'justifyCenter':
      case 'justifyRight':
        document.execCommand(command, false);
        break;
      case 'fontName':
        document.execCommand('fontName', false, value);
        setState(prev => ({ ...prev, fontFamily: value || prev.fontFamily }));
        break;
      case 'fontSize':
        const htmlSize = Math.min(7, Math.max(1, Math.floor(parseInt(value || '16') / 4)));
        document.execCommand('fontSize', false, htmlSize.toString());
        setState(prev => ({ ...prev, fontSize: value || prev.fontSize }));
        break;
      case 'foreColor':
        document.execCommand('foreColor', false, value);
        setState(prev => ({ ...prev, textColor: value || prev.textColor }));
        break;
      case 'createLink':
        const url = prompt('Enter URL:');
        if (url) document.execCommand('createLink', false, url);
        break;
      case 'insertImage':
        const imgUrl = prompt('Enter image URL:');
        if (imgUrl) document.execCommand('insertImage', false, imgUrl);
        break;
      case 'insertTable':
        const tableHtml = '<table border="1"><tr><td>Cell 1</td><td>Cell 2</td></tr><tr><td>Cell 3</td><td>Cell 4</td></tr></table>';
        document.execCommand('insertHTML', false, tableHtml);
        break;
      default:
        console.log(`Command ${command} not implemented yet`);
    }

    setTimeout(updateState, 10);
  }, [updateState]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault();
            executeCommand('bold');
            break;
          case 'i':
            e.preventDefault();
            executeCommand('italic');
            break;
          case 'u':
            e.preventDefault();
            executeCommand('underline');
            break;
          case 'z':
            if (e.shiftKey) {
              e.preventDefault();
              executeCommand('redo');
            } else {
              e.preventDefault();
              executeCommand('undo');
            }
            break;
          case 'y':
            e.preventDefault();
            executeCommand('redo');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [executeCommand]);

  const contextValue = useMemo<EditorContextType>(() => ({
    state,
    executeCommand,
    updateState,
    editorRef
  }), [state, executeCommand, updateState]);

  return (
    <EditorContext.Provider value={contextValue}>
      {children}
    </EditorContext.Provider>
  );
};

// Complete Editor Component
const CompleteEditor: React.FC = () => {
  const context = useContext(EditorContext);
  
  const handleEditorInput = useCallback(() => {
    if (context) {
      context.updateState();
    }
  }, [context]);

  if (!context) {
    return (
      <EditorProvider>
        <CompleteEditor />
      </EditorProvider>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white border border-gray-200 rounded-lg shadow-sm">
      <EnhancedEditorToolbar />
      <div className="p-4">
        <div
          ref={context.editorRef}
          contentEditable
          className="min-h-96 p-4 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onInput={handleEditorInput}
          onSelectionChange={handleEditorInput}
          onMouseUp={handleEditorInput}
          onKeyUp={handleEditorInput}
          style={{ fontFamily: context.state.fontFamily || 'Inter' }}
          suppressContentEditableWarning={true}
          role="textbox"
          aria-label="Editor content"
        >
          <p>Start typing here... You can use the toolbar above or keyboard shortcuts:</p>
          <ul>
            <li><strong>Ctrl+B</strong> - Bold</li>
            <li><em>Ctrl+I</em> - Italic</li>
            <li><u>Ctrl+U</u> - Underline</li>
            <li><strong>Ctrl+Z</strong> - Undo</li>
            <li><strong>Ctrl+Y</strong> - Redo</li>
          </ul>
        </div>
      </div>
      <div className="px-4 pb-4 text-sm text-gray-500">
        Status: {context.state.isBold ? 'Bold ' : ''}{context.state.isItalic ? 'Italic ' : ''}{context.state.isUnderlined ? 'Underlined ' : ''}
        | Font: {context.state.fontFamily} {context.state.fontSize}px
        | Align: {context.state.textAlign}
      </div>
    </div>
  );
};

export default CompleteEditor;
