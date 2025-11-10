import { Link } from '@/i18n/navigation';
import * as Icons from '@phosphor-icons/react';
import AppIcon from '../AppIcon/AppIcon';
import styles from './AppLink.module.scss';

export default function AppLink({
  text,
  link,
  variant = 'buttonLink',
  iconBefore,
  iconAfter,
  className = '',
}: Readonly<{
  text: string;
  link?: string;
  variant?: 'buttonLink' | 'primaryLink' | 'secondaryLink' | 'tertiaryLink';
  iconBefore?: keyof typeof Icons;
  iconAfter?: keyof typeof Icons;
  className?: string;
}>) {
  // Determine the CSS class based on variant
  const variantClass = styles[variant];

  return (
    <Link href={link || ''} className={`${variantClass} ${className}`}>
      {iconBefore && <AppIcon size={24} name={iconBefore} className={styles.icon} />}
      {text}
      {iconAfter && (
        <AppIcon size={24} name={iconAfter} className={`${styles.icon} ${styles.iconAfter}`} />
      )}
    </Link>
  );
}
