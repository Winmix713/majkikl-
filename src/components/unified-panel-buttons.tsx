
import React, { useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Palette, 
  Settings, 
  Layers, 
  Type,
  Sparkles,
  Box,
} from "lucide-react";

interface PanelButton {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  onClick: () => void;
}

interface UnifiedPanelButtonsProps {
  onOpenPanel: (panel: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  onRandomize: () => void;
  onExport: () => void;
  onShare: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

interface UnifiedPanelButtonsState {
  loading: Record<string, boolean>;
  errors: Record<string, string>;
}

const UnifiedPanelButtons: React.FC<UnifiedPanelButtonsProps> = React.memo(({
  onOpenPanel,
  onUndo,
  onRedo,
  onRandomize,
  onExport,
  onShare,
  canUndo,
  canRedo,
}) => {
  const [state, setState] = React.useState<UnifiedPanelButtonsState>({
    loading: {},
    errors: {}
  });

  const handleAsyncAction = useCallback(async (actionId: string, action: () => Promise<void> | void) => {
    setState(prev => ({ ...prev, loading: { ...prev.loading, [actionId]: true } }));
    try {
      await action();
      setState(prev => ({ ...prev, errors: { ...prev.errors, [actionId]: '' } }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        errors: { ...prev.errors, [actionId]: error.message || 'Unknown error' }
      }));
    } finally {
      setState(prev => ({ ...prev, loading: { ...prev.loading, [actionId]: false } }));
    }
  }, []);
  const handlePanelOpen = useCallback((panel: string) => () => {
    onOpenPanel(panel);
  }, [onOpenPanel]);

  const panelButtons: PanelButton[] = React.useMemo(() => [
    {
      id: 'style',
      icon: Palette,
      title: 'Style Controls',
      onClick: handlePanelOpen('style')
    },
    {
      id: 'gradient',
      icon: Layers,
      title: 'Gradient Builder',
      onClick: handlePanelOpen('gradient')
    },
    {
      id: 'shadow',
      icon: Box,
      title: '3D Shadow',
      onClick: handlePanelOpen('shadow')
    },
    {
      id: 'typography',
      icon: Type,
      title: 'Typography',
      onClick: handlePanelOpen('typography')
    },
    {
      id: 'effects',
      icon: Sparkles,
      title: 'Advanced Effects',
      onClick: handlePanelOpen('effects')
    },
    {
      id: 'presets',
      icon: Settings,
      title: 'Smart Presets',
      onClick: handlePanelOpen('presets')
    },
  ], [handlePanelOpen]);

  const buttonVariants = React.useMemo(() => ({
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  }), []);

  const containerVariants = React.useMemo(() => ({
    initial: { opacity: 0, x: -50 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }), []);

  return (
    <motion.div 
      className="fixed left-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-1 z-30"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {panelButtons.map((button) => {
        const IconComponent = button.icon;
        return (
          <motion.button
            key={button.id}
            onClick={button.onClick}
            className="w-11 h-11 bg-gray-800/90 hover:bg-gray-700 border border-gray-600 rounded-lg flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            title={button.title}
            aria-label={button.title}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <IconComponent className="w-5 h-5 text-gray-300" />
          </motion.button>
        );
      })}
    </motion.div>
  );
});

UnifiedPanelButtons.displayName = 'UnifiedPanelButtons';

export default UnifiedPanelButtons;
