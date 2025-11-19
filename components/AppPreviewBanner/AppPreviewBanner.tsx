import React from 'react';
import AppLink from '../AppLink/AppLink';
import styles from './AppPreviewBanner.module.scss';
import { getTranslations } from 'next-intl/server';

interface AppPreviewBannerProps {
  locale: string;
}

export default async function AppPreviewBanner(props: Readonly<AppPreviewBannerProps>) {
  const { locale } = props;
  const t = await getTranslations('PREVIEW_BANNER');

  return (
    <div className={styles.previewBanner}>
      <div className="container">
        <div className={styles.content}>
          <div className={styles.message}>
            <span className={styles.icon}>🔍</span>
            <span className={styles.text}>{t('MESSAGE')}</span>
          </div>
          <AppLink
            text={t('EXIT_BUTTON')}
            link={`${locale}/api/exit-preview?locale=${locale}`}
            variant="buttonLink"
            className={styles.exitButton}
          ></AppLink>
        </div>
      </div>
    </div>
  );
}
