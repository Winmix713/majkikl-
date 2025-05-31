import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Palette, Layers, Type, Settings, Sliders, Image, Sparkles, RotateCcw, Circle, Square, AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FloatingControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeCard: any;
  updateCard: (updates: any) => void;
  cardStyle: any;
}

const PANEL_TYPES = {
  style: {
    title: "Style Controls",
    subtitle: "Customize your card design",
    gradient: "from-blue-500 to-purple-600",
    icon: Palette
  },
  gradient: {
    title: "Gradient Builder",
    subtitle: "Customize your card design",
    gradient: "from-pink-500 to-orange-500",
    icon: Layers
  },
  shadow: {
    title: "3D Shadow",
    subtitle: "Customize your card design",
    gradient: "from-green-500 to-teal-500",
    icon: Layers
  },
  typography: {
    title: "Typography",
    subtitle: "Customize your card design",
    gradient: "from-teal-500 to-cyan-500",
    icon: Type
  },
  effects: {
    title: "Advanced Effects",
    subtitle: "Customize your card design",
    gradient: "from-pink-600 to-red-500",
    icon: Sparkles
  },
  presets: {
    title: "Smart Presets",
    subtitle: "Customize your card design",
    gradient: "from-purple-500 to-blue-600",
    icon: Settings
  }
};

export default function FloatingControlPanel({
  isOpen,
  onClose,
  activeCard,
  updateCard,
  cardStyle,
}: FloatingControlPanelProps) {
  const [activePanel, setActivePanel] = useState("style");
  const [gradientAngle, setGradientAngle] = useState(135);

  const panelConfig = PANEL_TYPES[activePanel as keyof typeof PANEL_TYPES];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-start p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel positioned to the left to never cover center */}
          <motion.div
            className="relative z-10 w-96 max-h-[90vh] bg-gray-900/95 backdrop-blur-2xl border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl"
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header with gradient */}
            <div className={`bg-gradient-to-r ${panelConfig.gradient} p-6 relative overflow-hidden`}>
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <panelConfig.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{panelConfig.title}</h3>
                    <p className="text-white/80 text-sm">{panelConfig.subtitle}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[calc(90vh-140px)] overflow-y-auto space-y-6">
              {activePanel === 'style' && (
                <div className="space-y-6">
                  {/* Background Type */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <Circle className="w-4 h-4 text-purple-400" />
                      <Label className="text-white font-medium">Background Type</Label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="p-4 bg-purple-600/20 border border-purple-500/50 rounded-xl text-center hover:bg-purple-600/30 transition-colors">
                        <Circle className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                        <div className="text-white text-sm font-medium">Solid</div>
                        <div className="text-gray-400 text-xs">Single color</div>
                      </button>
                      <button 
                        onClick={() => setActivePanel('gradient')}
                        className="p-4 bg-gray-800 border border-gray-600 rounded-xl text-center hover:bg-gray-700 transition-colors"
                      >
                        <Square className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                        <div className="text-white text-sm font-medium">Gradient</div>
                        <div className="text-gray-400 text-xs">Color blend</div>
                      </button>
                    </div>
                  </div>

                  {/* Background Color */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <Circle className="w-4 h-4 text-purple-400" />
                      <Label className="text-white font-medium">Background Color</Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={activeCard.bgGradientFrom}
                        onChange={(e) => updateCard({ bgGradientFrom: e.target.value })}
                        className="w-12 h-12 rounded-lg border-2 border-purple-500 cursor-pointer"
                      />
                      <div className="flex-1">
                        <Label className="text-gray-400 text-sm">Opacity</Label>
                        <div className="flex items-center gap-3 mt-2">
                          <Slider
                            value={[activeCard.cardOpacity || 100]}
                            onValueChange={([value]) => updateCard({ cardOpacity: value })}
                            max={100}
                            className="flex-1"
                          />
                          <span className="text-purple-400 font-medium min-w-[40px]">{activeCard.cardOpacity || 100}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Border Radius */}
                  <div className="space-y-3">
                    <Label className="text-white font-medium">Border Radius</Label>
                    <div className="bg-gray-800/50 p-4 rounded-xl">
                      <Label className="text-gray-400 text-sm">Roundness</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <Slider
                          value={[parseInt(activeCard.cardBorderRadius?.topLeft || "12")]}
                          onValueChange={([value]) =>
                            updateCard({
                              cardBorderRadius: {
                                topLeft: value.toString(),
                                topRight: value.toString(),
                                bottomLeft: value.toString(),
                                bottomRight: value.toString(),
                                unit: "px"
                              }
                            })
                          }
                          max={50}
                          className="flex-1"
                        />
                        <span className="text-white font-medium min-w-[40px]">{activeCard.cardBorderRadius?.topLeft || 12}px</span>
                      </div>
                      <div className="grid grid-cols-4 gap-2 mt-3 text-xs text-gray-400">
                        <span>0px</span>
                        <span>8px</span>
                        <span>16px</span>
                        <span>32px</span>
                      </div>
                    </div>
                  </div>

                  {/* Special Effects */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <Label className="text-white font-medium">Special Effects</Label>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-5 h-5 text-purple-400" />
                          <div>
                            <div className="text-white font-medium">Glassmorphism</div>
                            <div className="text-gray-400 text-sm">Frosted glass effect</div>
                          </div>
                        </div>
                        <Switch 
                          checked={activeCard.enableHoverEffects}
                          onCheckedChange={(checked) => updateCard({ enableHoverEffects: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dimensions */}
                  <div className="space-y-3">
                    <Label className="text-white font-medium">Dimensions</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-gray-400 text-sm">Width</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Slider
                            value={[parseInt(activeCard.cardWidth) || 300]}
                            onValueChange={([value]) => updateCard({ cardWidth: value.toString() })}
                            min={200}
                            max={600}
                            className="flex-1"
                          />
                          <span className="text-purple-400 font-medium min-w-[50px]">{activeCard.cardWidth}px</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm">Height</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Slider
                            value={[parseInt(activeCard.cardHeight) || 200]}
                            onValueChange={([value]) => updateCard({ cardHeight: value.toString() })}
                            min={150}
                            max={400}
                            className="flex-1"
                          />
                          <span className="text-purple-400 font-medium min-w-[50px]">{activeCard.cardHeight}px</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePanel === 'gradient' && (
                <div className="space-y-6">
                  {/* Gradient Preview */}
                  <div className="space-y-3">
                    <Label className="text-white font-medium">Gradient Preview</Label>
                    <div 
                      className="w-full h-20 rounded-xl border border-gray-600"
                      style={{
                        background: `linear-gradient(${gradientAngle}deg, ${activeCard.bgGradientFrom}, ${activeCard.bgGradientTo})`
                      }}
                    ></div>
                  </div>

                  {/* Start and End Colors */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label className="text-white font-medium">Start Color</Label>
                      <input
                        type="color"
                        value={activeCard.bgGradientFrom}
                        onChange={(e) => updateCard({ bgGradientFrom: e.target.value })}
                        className="w-full h-12 rounded-lg border-2 border-purple-500 cursor-pointer"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <Slider
                          value={[parseInt(activeCard.bgOpacityFrom) || 100]}
                          onValueChange={([value]) => updateCard({ bgOpacityFrom: value.toString() })}
                          max={100}
                          className="flex-1"
                        />
                        <span className="text-purple-400 font-medium min-w-[40px]">{activeCard.bgOpacityFrom || 100}%</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-white font-medium">End Color</Label>
                      <input
                        type="color"
                        value={activeCard.bgGradientTo}
                        onChange={(e) => updateCard({ bgGradientTo: e.target.value })}
                        className="w-full h-12 rounded-lg border-2 border-purple-500 cursor-pointer"
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <Slider
                          value={[parseInt(activeCard.bgOpacityTo) || 100]}
                          onValueChange={([value]) => updateCard({ bgOpacityTo: value.toString() })}
                          max={100}
                          className="flex-1"
                        />
                        <span className="text-purple-400 font-medium min-w-[40px]">{activeCard.bgOpacityTo || 100}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Gradient Direction */}
                  <div className="space-y-3">
                    <Label className="text-white font-medium">Gradient Direction</Label>
                    <div className="flex items-center justify-center">
                      <div className="relative w-32 h-32 bg-gray-800 rounded-full border border-gray-600">
                        <div 
                          className="absolute top-1/2 left-1/2 w-16 h-1 bg-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 origin-center cursor-pointer"
                          style={{ transform: `translate(-50%, -50%) rotate(${gradientAngle}deg)` }}
                          onClick={() => {
                            const newAngle = (gradientAngle + 45) % 360;
                            setGradientAngle(newAngle);
                          }}
                        >
                          <div className="absolute right-0 top-1/2 w-3 h-3 bg-purple-400 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                        </div>
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-sm font-medium">
                          {gradientAngle}°
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Preset Gradients */}
                  <div className="space-y-3">
                    <Label className="text-white font-medium">Preset Gradients</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { from: "#667eea", to: "#764ba2" },
                        { from: "#f093fb", to: "#f5576c" },
                        { from: "#4facfe", to: "#00f2fe" },
                        { from: "#43e97b", to: "#38f9d7" },
                        { from: "#fa709a", to: "#fee140" },
                        { from: "#a8edea", to: "#fed6e3" }
                      ].map((preset, index) => (
                        <button
                          key={index}
                          onClick={() => updateCard({ bgGradientFrom: preset.from, bgGradientTo: preset.to })}
                          className="h-12 rounded-lg border border-gray-600 hover:border-purple-500 transition-colors"
                          style={{ background: `linear-gradient(135deg, ${preset.from}, ${preset.to})` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activePanel === 'shadow' && (
                <div className="space-y-6">
                  {/* Primary Shadow */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-white font-medium">Primary Shadow</Label>
                      <Switch defaultChecked />
                    </div>
                    
                    {/* Shadow Position */}
                    <div className="space-y-3">
                      <Label className="text-gray-400 text-sm">Shadow Position</Label>
                      <div className="flex items-center justify-center">
                        <div className="relative w-32 h-32 bg-gray-800 rounded-lg border border-gray-600">
                          <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-purple-500 rounded transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"></div>
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white text-xs">
                            X: 0px, Y: 10px
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Blur and Spread */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-400 text-sm">Blur</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Slider
                            value={[20]}
                            max={100}
                            className="flex-1"
                          />
                          <span className="text-purple-400 font-medium min-w-[40px]">20px</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm">Spread</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Slider
                            value={[0]}
                            max={50}
                            className="flex-1"
                          />
                          <span className="text-purple-400 font-medium min-w-[40px]">0px</span>
                        </div>
                      </div>
                    </div>

                    {/* Shadow Color and Opacity */}
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={activeCard.shadowColor || "#000000"}
                        onChange={(e) => updateCard({ shadowColor: e.target.value })}
                        className="w-12 h-12 rounded-lg border-2 border-purple-500 cursor-pointer"
                      />
                      <div className="flex-1">
                        <Label className="text-gray-400 text-sm">Opacity: 25%</Label>
                        <Slider
                          value={[25]}
                          max={100}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Secondary Shadow */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-white font-medium">Secondary Shadow</Label>
                      <Switch />
                    </div>
                    
                    <div className="opacity-50 space-y-3">
                      <div className="flex items-center justify-center">
                        <div className="relative w-32 h-32 bg-gray-800 rounded-lg border border-gray-600">
                          <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-gray-600 rounded transform -translate-x-1/2 -translate-y-1/2"></div>
                          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-500 text-xs">
                            X: 0px, Y: 4px
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-gray-500 text-sm">Blur</Label>
                          <Slider value={[6]} max={100} className="mt-1" disabled />
                          <span className="text-gray-500 text-xs">6px</span>
                        </div>
                        <div>
                          <Label className="text-gray-500 text-sm">Spread</Label>
                          <Slider value={[-1]} max={50} className="mt-1" disabled />
                          <span className="text-gray-500 text-xs">-1px</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePanel === 'typography' && (
                <div className="space-y-6">
                  {/* Typography Header */}
                  <div className="flex items-center gap-2">
                    <Type className="w-5 h-5 text-teal-400" />
                    <Label className="text-white font-medium">Typography</Label>
                  </div>

                  {/* Title Settings */}
                  <div className="bg-gray-800/50 p-4 rounded-xl space-y-4">
                    <Label className="text-white font-medium">Title Settings</Label>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-gray-400 text-sm">Font Family</Label>
                        <Select value={activeCard.titleFont || "Inter"} onValueChange={(value) => updateCard({ titleFont: value })}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inter">Inter</SelectItem>
                            <SelectItem value="Arial">Arial</SelectItem>
                            <SelectItem value="Helvetica">Helvetica</SelectItem>
                            <SelectItem value="Georgia">Georgia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm">Font Weight</Label>
                        <Select value={activeCard.titleWeight || "Bold"} onValueChange={(value) => updateCard({ titleWeight: value })}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Normal">Normal</SelectItem>
                            <SelectItem value="Bold">Bold</SelectItem>
                            <SelectItem value="600">600</SelectItem>
                            <SelectItem value="700">700</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-gray-400 text-sm">Font Size</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Slider
                            value={[activeCard.titleSize || 18]}
                            onValueChange={([value]) => updateCard({ titleSize: value })}
                            min={12}
                            max={48}
                            className="flex-1"
                          />
                          <span className="text-purple-400 font-medium min-w-[40px]">{activeCard.titleSize || 18}px</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm">Text Alignment</Label>
                        <div className="flex gap-1 mt-1">
                          {[
                            { icon: AlignLeft, value: "left" },
                            { icon: AlignCenter, value: "center" },
                            { icon: AlignRight, value: "right" },
                            { icon: AlignJustify, value: "justify" }
                          ].map(({ icon: Icon, value }) => (
                            <button
                              key={value}
                              onClick={() => updateCard({ titleAlign: value })}
                              className={`p-2 rounded border ${
                                activeCard.titleAlign === value 
                                  ? "bg-purple-600 border-purple-500" 
                                  : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                              } transition-colors`}
                            >
                              <Icon className="w-4 h-4 text-white" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description Settings */}
                  <div className="bg-gray-800/50 p-4 rounded-xl space-y-4">
                    <Label className="text-white font-medium">Description Settings</Label>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-gray-400 text-sm">Font Family</Label>
                        <Select value={activeCard.descriptionFont || "Inter"} onValueChange={(value) => updateCard({ descriptionFont: value })}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inter">Inter</SelectItem>
                            <SelectItem value="Arial">Arial</SelectItem>
                            <SelectItem value="Helvetica">Helvetica</SelectItem>
                            <SelectItem value="Georgia">Georgia</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm">Font Weight</Label>
                        <Select value={activeCard.descriptionWeight || "Bold"} onValueChange={(value) => updateCard({ descriptionWeight: value })}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Normal">Normal</SelectItem>
                            <SelectItem value="Bold">Bold</SelectItem>
                            <SelectItem value="600">600</SelectItem>
                            <SelectItem value="700">700</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-gray-400 text-sm">Font Size</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Slider
                            value={[activeCard.descriptionSize || 14]}
                            onValueChange={([value]) => updateCard({ descriptionSize: value })}
                            min={10}
                            max={32}
                            className="flex-1"
                          />
                          <span className="text-purple-400 font-medium min-w-[40px]">{activeCard.descriptionSize || 14}px</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm">Text Alignment</Label>
                        <div className="flex gap-1 mt-1">
                          {[
                            { icon: AlignLeft, value: "left" },
                            { icon: AlignCenter, value: "center" },
                            { icon: AlignRight, value: "right" },
                            { icon: AlignJustify, value: "justify" }
                          ].map(({ icon: Icon, value }) => (
                            <button
                              key={value}
                              onClick={() => updateCard({ descriptionAlign: value })}
                              className={`p-2 rounded border ${
                                activeCard.descriptionAlign === value 
                                  ? "bg-purple-600 border-purple-500" 
                                  : "bg-gray-700 border-gray-600 hover:bg-gray-600"
                              } transition-colors`}
                            >
                              <Icon className="w-4 h-4 text-white" />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activePanel === 'effects' && (
                <div className="space-y-6">
                  {/* Advanced Effects Header */}
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-pink-400" />
                    <Label className="text-white font-medium">Advanced Effects</Label>
                  </div>

                  {/* Transform */}
                  <div className="bg-gray-800/50 p-4 rounded-xl space-y-4">
                    <Label className="text-white font-medium flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Transform
                    </Label>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-400 text-sm">Rotation</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Slider
                            value={[activeCard.rotation || 0]}
                            onValueChange={([value]) => updateCard({ rotation: value })}
                            min={-180}
                            max={180}
                            className="flex-1"
                          />
                          <span className="text-purple-400 font-medium min-w-[40px]">{activeCard.rotation || 0}°</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-gray-400 text-sm">Scale X</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <Slider
                            value={[((activeCard.scaleX || 1) * 100)]}
                            onValueChange={([value]) => updateCard({ scaleX: value / 100 })}
                            min={50}
                            max={200}
                            className="flex-1"
                          />
                          <span className="text-purple-400 font-medium min-w-[40px]">{activeCard.scaleX || 1}x</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-gray-400 text-sm">Scale Y</Label>
                      <div className="flex items-center gap-2 mt-1">
                        <Slider
                          value={[((activeCard.scaleY || 1) * 100)]}
                          onValueChange={([value]) => updateCard({ scaleY: value / 100 })}
                          min={50}
                          max={200}
                          className="flex-1"
                        />
                        <span className="text-purple-400 font-medium min-w-[40px]">{activeCard.scaleY || 1}x</span>
                      </div>
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="bg-gray-800/50 p-4 rounded-xl space-y-4">
                    <Label className="text-white font-medium flex items-center gap-2">
                      <Circle className="w-4 h-4" />
                      Filters
                    </Label>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-400 text-sm">Blur</Label>
                          <span className="text-purple-400 font-medium text-sm">{activeCard.blur || 0}px</span>
                        </div>
                        <Slider
                          value={[activeCard.blur || 0]}
                          onValueChange={([value]) => updateCard({ blur: value })}
                          max={20}
                          step={0.1}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-400 text-sm">Brightness</Label>
                          <span className="text-purple-400 font-medium text-sm">{activeCard.brightness || 100}%</span>
                        </div>
                        <Slider
                          value={[activeCard.brightness || 100]}
                          onValueChange={([value]) => updateCard({ brightness: value })}
                          min={0}
                          max={200}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-400 text-sm">Contrast</Label>
                          <span className="text-purple-400 font-medium text-sm">{activeCard.contrast || 100}%</span>
                        </div>
                        <Slider
                          value={[activeCard.contrast || 100]}
                          onValueChange={([value]) => updateCard({ contrast: value })}
                          min={0}
                          max={200}
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <Label className="text-gray-400 text-sm">Saturation</Label>
                          <span className="text-purple-400 font-medium text-sm">{activeCard.saturation || 100}%</span>
                        </div>
                        <Slider
                          value={[activeCard.saturation || 100]}
                          onValueChange={([value]) => updateCard({ saturation: value })}
                          min={0}
                          max={200}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Reset Button */}
                  <Button 
                    onClick={() => updateCard({ 
                      rotation: 0, 
                      scaleX: 1, 
                      scaleY: 1, 
                      blur: 0, 
                      brightness: 100, 
                      contrast: 100, 
                      saturation: 100 
                    })}
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium py-3 rounded-xl"
                  >
                    Reset All Effects
                  </Button>
                </div>
              )}

              {activePanel === 'presets' && (
                <div className="space-y-6">
                  {/* Smart Presets */}
                  <Label className="text-white font-medium">Smart Presets</Label>
                  
                  <div className="space-y-4">
                    {[
                      {
                        name: "Glassmorphism",
                        description: "Modern",
                        gradient: "from-white/10 to-white/5",
                        config: {
                          bgGradientFrom: "#ffffff20",
                          bgGradientTo: "#ffffff10",
                          cardBorderRadius: { topLeft: "20", topRight: "20", bottomLeft: "20", bottomRight: "20" },
                          enableHoverEffects: true
                        }
                      },
                      {
                        name: "Neon Glow",
                        description: "Vibrant",
                        gradient: "from-purple-600 to-blue-600",
                        config: {
                          bgGradientFrom: "#8b5cf6",
                          bgGradientTo: "#3b82f6",
                          shadowColor: "#8b5cf6",
                          enableAnimations: true
                        }
                      },
                      {
                        name: "Gradient Dream",
                        description: "Gradient",
                        gradient: "from-pink-500 to-violet-600",
                        config: {
                          bgGradientFrom: "#ec4899",
                          bgGradientTo: "#8b5cf6",
                          cardBorderRadius: { topLeft: "16", topRight: "16", bottomLeft: "16", bottomRight: "16" }
                        }
                      },
                      {
                        name: "Minimal Clean",
                        description: "Minimal",
                        gradient: "from-white to-gray-50",
                        config: {
                          bgGradientFrom: "#ffffff",
                          bgGradientTo: "#f9fafb",
                          cardBorderRadius: { topLeft: "8", topRight: "8", bottomLeft: "8", bottomRight: "8" },
                          shadowColor: "#00000020"
                        }
                      }
                    ].map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => updateCard(preset.config)}
                        className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-left hover:border-purple-500 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-5 h-5 text-purple-400" />
                          <div className="flex-1">
                            <div className="text-white font-medium">{preset.name}</div>
                            <div className="text-gray-400 text-sm">{preset.description}</div>
                          </div>
                        </div>
                        <div 
                          className={`w-full h-8 rounded-lg mt-3 bg-gradient-to-r ${preset.gradient}`}
                        ></div>
                      </button>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <Label className="text-white font-medium">Quick Actions</Label>
                    <Button 
                      onClick={() => {
                        // Randomize logic here
                        const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#ffeaa7", "#dda0dd", "#98d8c8"];
                        const randomFrom = colors[Math.floor(Math.random() * colors.length)];
                        const randomTo = colors[Math.floor(Math.random() * colors.length)];
                        updateCard({
                          bgGradientFrom: randomFrom,
                          bgGradientTo: randomTo,
                          rotation: Math.random() * 20 - 10,
                          cardBorderRadius: {
                            topLeft: (Math.random() * 30 + 10).toString(),
                            topRight: (Math.random() * 30 + 10).toString(),
                            bottomLeft: (Math.random() * 30 + 10).toString(),
                            bottomRight: (Math.random() * 30 + 10).toString()
                          }
                        });
                      }}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" />
                      Randomize
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Panel Navigation Tabs */}
            <div className="absolute top-0 left-0 -translate-x-full flex flex-col gap-2 p-2">
              {Object.entries(PANEL_TYPES).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setActivePanel(key)}
                  className={`p-3 rounded-xl border transition-all ${
                    activePanel === key
                      ? `bg-gradient-to-r ${config.gradient} border-white/20 shadow-lg`
                      : "bg-gray-800/50 border-gray-600 hover:bg-gray-700/50"
                  }`}
                >
                  <config.icon className="w-5 h-5 text-white" />
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}