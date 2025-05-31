import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  iconColorClass?: string;
}

const SectionHeader = React.memo(({ icon: Icon, title, iconColorClass = "text-purple-400" }: SectionHeaderProps) => (
  <div className="flex items-center gap-2 mb-3 pt-2 border-t border-white/10 first:border-t-0 first:pt-0">
    <Icon className={`w-4 h-4 ${iconColorClass}`} />
    <h4 className="text-white font-medium">{title}</h4>
  </div>
));

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;