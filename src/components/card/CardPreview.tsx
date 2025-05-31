import React, { useMemo } from 'react';
import { CardSettings } from '../../types/card';
import { hexToRgb, generateShadowValue } from '../../utils/helpers';

interface CardPreviewProps {
  card: CardSettings;
  zoomLevel: number;
}

const CardPreview: React.FC<CardPreviewProps> = ({ card, zoomLevel }) => {
  const cardStyle = useMemo(() => {
    const bgFromRgb = hexToRgb(card.bgGradientFrom);
    const bgToRgb = card.bgGradientTo ? hexToRgb(card.bgGradientTo) : undefined;
    
    const shadow = generateShadowValue(
      card.shadowSettings?.x || 0,
      card.shadowSettings?.y || 30,
      card.shadowSettings?.blur || 50,
      card.shadowSettings?.spread || 0,
      card.shadowColor,
      card.shadowOpacity
    );

    const transform = `rotate(${card.rotation || 0}deg) scaleX(${card.scaleX || 1}) scaleY(${card.scaleY || 1})`;

    const background = card.bgGradientTo 
      ? `linear-gradient(${card.gradientAngle || 135}deg, rgba(${bgFromRgb.r}, ${bgFromRgb.g}, ${bgFromRgb.b}, ${(card.bgOpacityFrom || 70) / 100}), rgba(${bgToRgb.r}, ${bgToRgb.g}, ${bgToRgb.b}, ${(card.bgOpacityTo || 14) / 100}))`
      : `rgba(${bgFromRgb.r}, ${bgFromRgb.g}, ${bgFromRgb.b}, ${(card.cardOpacity || 100) / 100})`;

    return {
      width: card.cardWidth,
      height: card.cardHeight,
      transform: `${transform} scale(${zoomLevel})`,
      filter: `blur(${card.blur || 0}px) brightness(${card.brightness || 100}%) contrast(${card.contrast || 100}%) saturate(${card.saturation || 100}%)`,
    };
  }, [card, zoomLevel]);

  return (
    <div 
      className="transition-all duration-700 ease-out cursor-pointer group"
      style={cardStyle}
    >
      {/* Main card container with glassmorphic effect */}
      <div className="relative w-full h-full rounded-[inherit] backdrop-blur-xl bg-white/[0.02] border border-white/25">
        {/* Gradient overlays */}
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-br from-white/0 via-white/5 to-white/20 opacity-25"></div>
        <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-tr from-white/0 to-white/10 opacity-30"></div>
        
        {/* Inner glow */}
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0_0_16px_rgba(255,255,255,0.1)]"></div>
        
        {/* Enhanced shadow effects */}
        <div className="absolute -inset-4 rounded-[inherit] bg-black/20 blur-xl -z-10 opacity-60"></div>
        <div className="absolute -inset-1 rounded-[inherit] bg-black/30 blur-sm -z-10"></div>
        
        {/* Content area */}
        <div 
          className="relative h-full"
          style={{ padding: card.cardPadding }}
        >
          <h2 
            className="font-semibold mb-3 drop-shadow-sm" 
            style={{ 
              fontSize: `${card.titleSize}px`,
              fontWeight: card.titleWeight,
              textAlign: card.titleAlign
            }}
          >
            {card.title}
          </h2>
          <p 
            className="opacity-90 leading-relaxed drop-shadow-sm"
            style={{ 
              fontSize: `${card.descriptionSize}px`,
              fontWeight: card.descriptionWeight,
              textAlign: card.descriptionAlign
            }}
          >
            {card.description}
          </p>
        </div>

        {/* Hover effect */}
        {card.enableHoverEffects && (
          <>
            <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute -inset-4 rounded-[inherit] bg-white/5 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10"></div>
          </>
        )}

        {/* Floating elements for depth */}
        <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg"></div>
        <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/15 shadow-xl"></div>
      </div>
    </div>
  );
};

export default CardPreview;