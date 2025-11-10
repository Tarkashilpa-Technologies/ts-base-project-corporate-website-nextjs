'use client';

import * as Icons from '@phosphor-icons/react';

type IconProps = {
  name: keyof typeof Icons; // Only valid Phosphor icon names
  size?: number;
  color?: string;
  weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
  className?: string;
};

export default function AppIcon({
  name,
  size = 24,
  color = 'currentColor',
  weight = 'regular',
  className,
}: Readonly<IconProps>) {
  const PhosphorIcon = Icons[name] as React.ElementType;
  if (!PhosphorIcon) {
    console.warn(`Phosphor icon "${name}" not found`);
    return null;
  }
  return <PhosphorIcon size={size} color={color} weight={weight} className={className} />;
}
