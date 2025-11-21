import AppLink from '../AppLink/AppLink';
import { getLinkVariant } from '@/lib/getAboutUsPage';
import styles from './AppCardDark.module.scss';

interface AppCardDarkProps {
  title: string;
  subtitle: string;
  description: string;
  linkUrl?: string;
  linkText: string;
  linkType?: string;
  className?: string;
}

export default function AppCardDark(props: Readonly<AppCardDarkProps>) {
  const {
    title,
    subtitle,
    description,
    linkUrl,
    linkText,
    linkType = 'Tertiary Link',
    className = '',
  } = props;

  const linkVariant = getLinkVariant(linkType);

  return (
    <div className={`${styles.cardDark} ${className}`}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.subtitle}>{subtitle}</p>
      <p className={styles.description}>{description}</p>
      <AppLink text={linkText} link={linkUrl} variant={linkVariant} iconAfter="ArrowRight" />
    </div>
  );
}
