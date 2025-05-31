
export interface EditorState {
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

export interface EditorContextType {
  state: EditorState;
  executeCommand: (command: string, value?: string) => void;
  updateState: () => void;
  editorRef: React.RefObject<HTMLDivElement>;
}

export interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  'aria-label'?: string;
}

export type EditorCommand = 
  | 'bold' | 'italic' | 'underline'
  | 'undo' | 'redo'
  | 'justifyLeft' | 'justifyCenter' | 'justifyRight'
  | 'fontName' | 'fontSize' | 'foreColor'
  | 'createLink' | 'insertImage' | 'insertTable';
