import { ReactNode } from 'react';

export interface CardBorderRadius {
  topLeft: number;
  topRight: number;
  bottomLeft: number;
  bottomRight: number;
  unit: "px" | "%" | "em" | "rem";
}

export interface ShadowSettings {
  x: number;
  y: number;
  blur: number;
  spread: number;
}

export interface CardSettings {
  id: string;
  title: string;
  description: string;
  bgGradientFrom: string;
  bgGradientTo?: string;
  cardOpacity: number;
  cardBorderRadius: CardBorderRadius;
  enableHoverEffects: boolean;
  cardWidth: number;
  cardHeight: number;
  bgOpacityFrom: number;
  bgOpacityTo: number;
  gradientAngle: number;
  shadowSettings?: ShadowSettings;
  shadowColor: string;
  shadowOpacity: number;
  titleFont: string;
  titleWeight: string;
  titleSize: number;
  titleAlign: "left" | "center" | "right" | "justify";
  descriptionFont: string;
  descriptionWeight: string;
  descriptionSize: number;
  descriptionAlign: "left" | "center" | "right" | "justify";
  rotation: number;
  scaleX: number;
  scaleY: number;
  blur: number;
  brightness: number;
  contrast: number;
  saturation: number;
  enableAnimations: boolean;
  cardPadding: number;
}

export const DEFAULT_CARD_SETTINGS: CardSettings = {
  id: "1",
  title: "Modern Card",
  description: "Live preview with real-time updates",
  bgGradientFrom: "#523091",
  bgGradientTo: "#1a0b33",
  cardOpacity: 100,
  cardBorderRadius: { topLeft: 16, topRight: 16, bottomLeft: 16, bottomRight: 16, unit: "px" },
  enableHoverEffects: true,
  cardWidth: 320,
  cardHeight: 200,
  bgOpacityFrom: 70,
  bgOpacityTo: 14,
  gradientAngle: 135,
  shadowSettings: { x: 0, y: 30, blur: 50, spread: 0 },
  shadowColor: "#7c3aed",
  shadowOpacity: 0.3,
  titleFont: "Inter",
  titleWeight: "600",
  titleSize: 18,
  titleAlign: "left",
  descriptionFont: "Inter",
  descriptionWeight: "400",
  descriptionSize: 14,
  descriptionAlign: "left",
  rotation: 0,
  scaleX: 1,
  scaleY: 1,
  blur: 0,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  enableAnimations: true,
  cardPadding: 24,
};

export interface ToolDefinition {
  id: string;
  icon: React.ComponentType<any>;
  label: string;
}