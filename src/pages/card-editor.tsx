import React, { useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Save, 
  Share, 
  Play, 
  Download, 
  MoreVertical,
  Undo,
  Redo,
  Layout,
  Palette,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  ZoomOut,
  ZoomIn,
  Maximize,
  Shuffle, 
  Eye,
  Settings,
  Layers,
  Type,
  Image as ImageIcon,
  Shapes
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Dockbar from "@/components/dockbar";

// Kompakt toolbar komponens
interface CompactToolbarProps {
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  activeCard: any;
  updateCard: (updates: any) => void;
  onOpenPanel: (panel: string) => void;
  onRandomize: () => void;
}

const ToolbarButton: React.FC<{
  onClick: () => void;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
  className?: string;
}> = React.memo(({ onClick, disabled = false, title, children, className = "w-8 h-8" }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center ${className} rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors disabled:opacity-50`}
    title={title}
  >
    {children}
  </button>
));

const Separator: React.FC = () => (
  <div className="w-px h-4 bg-gray-700 mx-2" />
);

const CompactToolbar: React.FC<CompactToolbarProps> = React.memo(({
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  activeCard,
  updateCard,
  onOpenPanel,
  onRandomize
}) => {
  const handleFontChange = useCallback((font: string) => {
    updateCard({ titleFont: font });
  }, [updateCard]);

  const handleSizeChange = useCallback((size: number) => {
    updateCard({ titleSize: size });
  }, [updateCard]);

  const handleAlignmentChange = useCallback((align: 'left' | 'center' | 'right') => {
    updateCard({ titleAlign: align });
  }, [updateCard]);

  return (
    <div className="flex items-center justify-center px-3 py-1 border-b border-gray-700 bg-gray-900 flex-shrink-0 gap-1">
      {/* History */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton onClick={onUndo} disabled={!canUndo} title="Undo">
          <Undo className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={onRedo} disabled={!canRedo} title="Redo">
          <Redo className="w-4 h-4" />
        </ToolbarButton>
      </div>
      <Separator />

      {/* Layout and Insert */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton onClick={() => onOpenPanel('style')} title="Layout Options">
          <Layout className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => onOpenPanel('style')} title="Theme">
          <Palette className="w-4 h-4" />
        </ToolbarButton>
      </div>
      <Separator />

      {/* Font Controls */}
      <div className="flex items-center gap-0.5">
        <button 
          className="flex items-center min-w-15 px-2 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors text-sm" 
          title="Font"
        >
          {activeCard.titleFont || 'Inter'}
          <ChevronDown className="w-3 h-3 ml-1" />
        </button>
        <button 
          className="flex items-center min-w-10 px-2 h-8 rounded bg-transparent text-gray-200 hover:bg-gray-800 transition-colors text-sm" 
          title="Font Size"
        >
          {activeCard.titleSize || 18}
          <ChevronDown className="w-3 h-3 ml-1" />
        </button>
      </div>
      <Separator />

      {/* Text Formatting */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton onClick={() => {}} title="Bold">
          <Bold className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => {}} title="Italic">
          <Italic className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => {}} title="Underline">
          <Underline className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={() => {}} title="Strikethrough">
          <Strikethrough className="w-4 h-4" />
        </ToolbarButton>
      </div>
      <Separator />

      {/* Alignment */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton 
          onClick={() => handleAlignmentChange('left')} 
          title="Align Left"
        >
          <AlignLeft className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => handleAlignmentChange('center')} 
          title="Align Center"
        >
          <AlignCenter className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton 
          onClick={() => handleAlignmentChange('right')} 
          title="Align Right"
        >
          <AlignRight className="w-4 h-4" />
        </ToolbarButton>
      </div>
      <Separator />

      {/* Special Actions */}
      <div className="flex items-center gap-0.5">
        <ToolbarButton onClick={() => onOpenPanel('effects')} title="Effects">
          <Layers className="w-4 h-4" />
        </ToolbarButton>
        <ToolbarButton onClick={onRandomize} title="Random Card">
          <Shuffle className="w-4 h-4" />
        </ToolbarButton>
      </div>
    </div>
  );
});

CompactToolbar.displayName = 'CompactToolbar';

// Status bar komponens
interface StatusBarProps {
  currentCardIndex: number;
  totalCards: number;
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
  onPrevCard: () => void;
  onNextCard: () => void;
  onFullscreen: () => void;
}

const StatusBar: React.FC<StatusBarProps> = React.memo(({
  currentCardIndex,
  totalCards,
  zoomLevel,
  onZoomChange,
  onPrevCard,
  onNextCard,
  onFullscreen
}) => {
  const handleZoomOut = useCallback(() => {
    const newZoom = Math.max(0.25, zoomLevel - 0.25);
    onZoomChange(newZoom);
  }, [zoomLevel, onZoomChange]);

  const handleZoomIn = useCallback(() => {
    const newZoom = Math.min(3.0, zoomLevel + 0.25);
    onZoomChange(newZoom);
  }, [zoomLevel, onZoomChange]);

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-700 px-4 py-1 flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <ToolbarButton 
          onClick={onPrevCard}
          disabled={currentCardIndex <= 0}
          title="Previous card"
          className="w-8 h-8"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </ToolbarButton>
        <span className="text-xs text-gray-400 w-16 text-center">
          Card {currentCardIndex + 1} / {totalCards}
        </span>
        <ToolbarButton 
          onClick={onNextCard}
          disabled={currentCardIndex >= totalCards - 1}
          title="Next card"
          className="w-8 h-8"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </ToolbarButton>
      </div>
      <div className="flex items-center gap-2">
        <ToolbarButton onClick={handleZoomOut} title="Zoom out" className="w-8 h-8">
          <ZoomOut className="w-3.5 h-3.5" />
        </ToolbarButton>
        <select 
          value={zoomLevel}
          onChange={(e) => onZoomChange(parseFloat(e.target.value))}
          className="bg-gray-800 border border-gray-700 text-gray-200 px-1 py-0.5 rounded text-xs w-20 text-center"
        >
          <option value="0.5">50%</option>
          <option value="0.75">75%</option>
          <option value="1.0">100%</option>
          <option value="1.5">150%</option>
          <option value="2.0">200%</option>
        </select>
        <ToolbarButton onClick={handleZoomIn} title="Zoom in" className="w-8 h-8">
          <ZoomIn className="w-3.5 h-3.5" />
        </ToolbarButton>
        <div className="w-px h-4 bg-gray-700 mx-1"></div>
        <ToolbarButton onClick={onFullscreen} title="Fullscreen" className="w-8 h-8">
          <Maximize className="w-3.5 h-3.5" />
        </ToolbarButton>
      </div>
    </div>
  );
});

StatusBar.displayName = 'StatusBar';

interface CardData {
  id: string;
  title: string;
  description: string;
  bgGradientFrom: string;
  bgGradientTo: string;
  bgOpacityFrom: string;
  bgOpacityTo: string;
  shadowColor: string;
  shadowOpacity: string;
  enableHoverEffects: boolean;
  enableAnimations: boolean;
  cardWidth: string;
  cardHeight: string;
  cardPadding: string;
  cardBorderRadius: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
    unit: string;
  };
  cardOpacity: number;
  shadowSettings: {
    inset: boolean;
    x: string;
    y: string;
    blur: string;
    spread: string;
  };
  titleFont?: string;
  titleSize?: number;
  titleWeight?: string;
  titleAlign?: string;
  descriptionFont?: string;
  descriptionSize?: number;
  descriptionWeight?: string;
  descriptionAlign?: string;
  rotation?: number;
  scaleX?: number;
  scaleY?: number;
  blur?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
}

const createDefaultCard = (): CardData => ({
  id: Date.now().toString(),
  title: "Modern Card",
  description: "Live preview with real-time updates",
  bgGradientFrom: "#523091",
  bgGradientTo: "#1a0b33",
  bgOpacityFrom: "0.70",
  bgOpacityTo: "0.14",
  shadowColor: "#7c3aed",
  shadowOpacity: "0.3",
  enableHoverEffects: true,
  enableAnimations: true,
  cardWidth: "320",
  cardHeight: "200",
  cardPadding: "24",
  cardBorderRadius: {
    topLeft: "16",
    topRight: "16",
    bottomLeft: "16",
    bottomRight: "16",
    unit: "px",
  },
  cardOpacity: 100,
  shadowSettings: {
    inset: false,
    x: "0",
    y: "30",
    blur: "50",
    spread: "0",
  },
  titleFont: "Inter",
  titleSize: 18,
  titleWeight: "600",
  titleAlign: "left",
  descriptionFont: "Inter",
  descriptionSize: 14,
  descriptionWeight: "400",
  descriptionAlign: "left",
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  blur: 0,
  brightness: 100,
  contrast: 100,
  saturation: 100,
});

export default function CardEditor() {
  const [activeCard, setActiveCard] = useState<CardData>(createDefaultCard());
  const [history, setHistory] = useState<CardData[]>([createDefaultCard()]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"basic" | "style" | "effects" | "code">("basic");
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [activePanelTab, setActivePanelTab] = useState("style");
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(3);
  const { toast } = useToast();

  const updateCard = useCallback(
    (updates: Partial<CardData>) => {
      const newCard = { ...activeCard, ...updates };
      setActiveCard(newCard);

      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newCard);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [activeCard, history, historyIndex]
  );

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const undo = useCallback(() => {
    if (canUndo) {
      setHistoryIndex(historyIndex - 1);
      setActiveCard(history[historyIndex - 1]);
    }
  }, [canUndo, historyIndex, history]);

  const redo = useCallback(() => {
    if (canRedo) {
      setHistoryIndex(historyIndex + 1);
      setActiveCard(history[historyIndex + 1]);
    }
  }, [canRedo, historyIndex, history]);

  const generateRandomCard = useCallback(() => {
    const titles = ["Creative Card", "Modern Design", "Elegant Style", "Dynamic Card", "Innovative UI"];
    const descriptions = [
      "Beautiful and responsive design",
      "Crafted with precision and care",
      "Designed for maximum impact",
      "Built for the future of web",
    ];

    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];

    updateCard({
      title: randomTitle,
      description: randomDescription,
      bgGradientFrom: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
      bgGradientTo: `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`,
    });
  }, [updateCard]);

  const exportCard = useCallback(() => {
    const exportData = {
      card: activeCard,
      timestamp: new Date().toISOString(),
      version: "2.0.0",
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `card-editor-pro-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Card Exported",
      description: "Your card design has been exported successfully",
    });
  }, [activeCard, toast]);

  const handleOpenPanel = useCallback((panel: string) => {
    setActivePanelTab(panel);
    setIsPanelOpen(true);
  }, []);

  const handleShare = useCallback(() => {
    toast({
      title: "Share Feature",
      description: "Share functionality coming soon",
    });
  }, [toast]);

  const cardStyle = useMemo(() => {
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 82, g: 48, b: 145 };
    };

    const bgFromRgb = hexToRgb(activeCard.bgGradientFrom || "#523091");
    const bgToRgb = hexToRgb(activeCard.bgGradientTo || "#1a0b33");
    const shadowRgb = hexToRgb(activeCard.shadowColor || "#7c3aed");

    const shadow = `${activeCard.shadowSettings?.inset ? "inset " : ""}${activeCard.shadowSettings?.x || "0"}px ${
      activeCard.shadowSettings?.y || "30"
    }px ${activeCard.shadowSettings?.blur || "50"}px ${activeCard.shadowSettings?.spread || "0"}px rgba(${
      shadowRgb.r
    }, ${shadowRgb.g}, ${shadowRgb.b}, ${activeCard.shadowOpacity || "0.3"})`;

    const transform = `rotate(${activeCard.rotation || 0}deg) scaleX(${activeCard.scaleX || 1}) scaleY(${activeCard.scaleY || 1})`;

    const background = `radial-gradient(86.88% 75.47% at 50.00% 24.53%, rgba(${bgFromRgb.r}, ${
      bgFromRgb.g
    }, ${bgFromRgb.b}, ${activeCard.bgOpacityFrom || "0.7"}), rgba(${bgToRgb.r}, ${bgToRgb.g}, ${
      bgToRgb.b
    }, ${activeCard.bgOpacityTo || "0.14"}))`;

    return {
      width: parseInt(activeCard.cardWidth || "320"),
      height: parseInt(activeCard.cardHeight || "200"),
      background,
      borderRadius: parseInt(activeCard.cardBorderRadius?.topLeft || "16"),
      boxShadow: shadow,
      padding: parseInt(activeCard.cardPadding || "24"),
      opacity: (activeCard.cardOpacity || 100) / 100,
      color: "white",
      transform,
      filter: `blur(${activeCard.blur || 0}px) brightness(${activeCard.brightness || 100}%) contrast(${activeCard.contrast || 100}%) saturate(${activeCard.saturation || 100}%)`,
    };
  }, [activeCard]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [totalCards, setTotalCards] = useState(3);

  const handleUndo = useCallback(() => {
    if (canUndo) {
      setHistoryIndex(historyIndex - 1);
      setActiveCard(history[historyIndex - 1]);
    }
  }, [canUndo, historyIndex, history]);

  const handleRedo = useCallback(() => {
    if (canRedo) {
      setHistoryIndex(historyIndex + 1);
      setActiveCard(history[historyIndex + 1]);
    }
  }, [canRedo, historyIndex, history]);

  const handleRandomize = useCallback(() => {
    generateRandomCard();
  }, [generateRandomCard]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-200 font-sans">
      {/* Header */}
      <header className="flex items-center justify-between px-3 py-1.5 border-b border-gray-700 bg-gray-900 text-sm flex-shrink-0">
        <div className="flex items-center gap-3">
          <button 
            className="flex items-center justify-center w-8 h-8 rounded-md bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
            title="Back"
            aria-label="Back to presentation list"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-sm font-medium cursor-pointer">Card Editor Pro</h1>
            <span className="text-xs text-gray-400">All changes saved</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={exportCard}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            Save
          </button>
          <button 
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
          >
            <Share className="w-3.5 h-3.5" />
            Share
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            <Play className="w-3.5 h-3.5 fill-current" />
            Present
          </button>
          <div className="w-px h-5 bg-gray-700 mx-1"></div>
          <button 
            onClick={exportCard}
            className="flex items-center justify-center w-8 h-8 rounded-md bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
            title="Download"
          >
            <Download className="w-3.5 h-3.5" />
          </button>
          <button 
            className="flex items-center justify-center w-8 h-8 rounded-md bg-transparent text-gray-200 hover:bg-gray-800 transition-colors"
            title="More options"
          >
            <MoreVertical className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Compact Toolbar */}
      <CompactToolbar 
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        activeCard={activeCard}
        updateCard={updateCard}
        onOpenPanel={handleOpenPanel}
        onRandomize={handleRandomize}
      />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-60 bg-gray-900 border-r border-gray-700 flex flex-col pt-3 flex-shrink-0">
          <div className="px-3 pb-3">
            <h2 className="sr-only">Cards panel</h2>
            <div className="relative mb-3">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input 
                type="search" 
                className="w-full pl-8 pr-2 py-1.5 bg-gray-800 text-gray-200 border border-transparent rounded-md text-sm placeholder-gray-400 focus:outline-none focus:border-blue-600"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={generateRandomCard}
              className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              New Card
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            {/* Card Templates */}
            <div className="space-y-2">
              <div 
                className="p-2 bg-gray-800 rounded border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => updateCard({
                  title: "Business Card",
                  description: "Professional design",
                  bgGradientFrom: "#667eea",
                  bgGradientTo: "#764ba2"
                })}
              >
                <div className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded mb-2"></div>
                <p className="text-xs text-gray-300">Business Card</p>
              </div>
              <div 
                className="p-2 bg-gray-800 rounded border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => updateCard({
                  title: "Social Media",
                  description: "Vibrant and engaging",
                  bgGradientFrom: "#ff6b6b",
                  bgGradientTo: "#feca57"
                })}
              >
                <div className="w-full h-12 bg-gradient-to-r from-red-500 to-yellow-500 rounded mb-2"></div>
                <p className="text-xs text-gray-300">Social Media</p>
              </div>
              <div 
                className="p-2 bg-gray-800 rounded border border-gray-700 cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => updateCard({
                  title: "Minimal Design",
                  description: "Clean and simple",
                  bgGradientFrom: "#ffffff",
                  bgGradientTo: "#f8f9fa"
                })}
              >
                <div className="w-full h-12 bg-gradient-to-r from-white to-gray-100 rounded mb-2"></div>
                <p className="text-xs text-gray-300">Minimal</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col relative overflow-hidden">
          {/* Preview Section */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            
            {/* Card Preview Container */}
            <div className="relative">
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 blur-3xl opacity-30 -z-10"
                style={{
                  background: `radial-gradient(circle, ${activeCard.bgGradientFrom}40, ${activeCard.bgGradientTo || activeCard.bgGradientFrom}20, transparent 70%)`,
                  transform: 'scale(1.5)'
                }}
              ></div>
              
              {/* Card Preview */}
              <div 
                className="transition-all duration-700 ease-out cursor-pointer hover:scale-105 shadow-2xl relative group"
                style={{
                  ...cardStyle,
                  transform: `${cardStyle.transform} scale(${zoomLevel})`,
                  boxShadow: `${cardStyle.boxShadow}, 0 0 100px rgba(139, 92, 246, 0.1)`
                }}
              >
                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                
                <div className="relative z-10">
                  <h2 
                    className="font-semibold mb-3 drop-shadow-sm" 
                    style={{ 
                      fontSize: `${activeCard.titleSize || 18}px`,
                      fontWeight: activeCard.titleWeight || "600",
                      textAlign: (activeCard.titleAlign || "left") as any
                    }}
                  >
                    {activeCard.title}
                  </h2>
                  <p 
                    className="opacity-90 leading-relaxed drop-shadow-sm"
                    style={{ 
                      fontSize: `${activeCard.descriptionSize || 14}px`,
                      fontWeight: activeCard.descriptionWeight || "400",
                      textAlign: (activeCard.descriptionAlign || "left") as any
                    }}
                  >
                    {activeCard.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Preview Info */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-300 font-medium">Live Preview</span>
              </div>
            </div>
          </div>

          {/* Dockbar Section */}
          <div className="relative">
            {/* Dockbar */}
            <Dockbar
              activeCard={activeCard}
              updateCard={updateCard}
            />
          </div>

          {/* Status Bar */}
          <StatusBar 
            currentCardIndex={currentCardIndex}
            totalCards={totalCards}
            zoomLevel={zoomLevel}
            onZoomChange={setZoomLevel}
            onPrevCard={() => {}}
            onNextCard={() => {}}
            onFullscreen={() => {}}
          />
        </main>
      </div>
    </div>
  );
}