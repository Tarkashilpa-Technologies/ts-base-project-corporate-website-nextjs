import { getTranslations } from 'next-intl/server';
import AppLink from '@/components/AppLink/AppLink';
import AppSection from '@/components/AppSection/AppSection';

export default async function PageNotFound() {
  const t = await getTranslations('NOT_FOUND');

  return (
    <AppSection title={t('TITLE')} subtitle={t('DESCRIPTION')}>
      <AppLink link="/" variant="primaryLink" iconAfter="ArrowRight" text={t('BACK_HOME')} />
    </AppSection>
  );
}
