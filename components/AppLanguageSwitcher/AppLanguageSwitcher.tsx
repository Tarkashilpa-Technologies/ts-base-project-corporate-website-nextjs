'use client';

import { Link, usePathname } from '../../i18n/navigation';
import { useTranslations } from 'next-intl';
import styles from '../AppHeader/AppHeader.module.scss';

export default function LanguageSwitcher() {
  const t = useTranslations('HEADER');
  const pathname = usePathname();

  return (
    <>
      <li className="nav-item">
        <Link href={pathname} locale="ms" className={`${styles.headerFont} nav-link`}>
          {t('MALAY')}
        </Link>
      </li>
      <li className="nav-item">
        <Link href={pathname} locale="en" className={`${styles.headerFont} nav-link`}>
          {t('ENGLISH')}
        </Link>
      </li>
    </>
  );
}
