'use client';

import type { MouseEvent } from 'react';
import { useLocale } from '@/lib/i18n';
import type { SectionContent } from '@/lib/content';
import type { SiteSettingsMap } from '@/lib/settings';
import { FooterSection } from '@/components/home/FooterSection';

type Props = {
  settings: SiteSettingsMap;
  stopkaSection: SectionContent | undefined;
};

export function SubPageFooter({ settings, stopkaSection }: Props) {
  const { locale, t } = useLocale();

  const c = (section: SectionContent | undefined, field: string): string => {
    if (!section) return '';
    const content = locale === 'pl' ? section.contentPl : section.contentEn;
    return content[field] ?? '';
  };

  const navigateHome = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    window.location.href = '/';
  };

  return (
    <FooterSection
      settings={settings}
      stopkaSection={stopkaSection}
      locale={locale}
      c={c}
      t={t}
      onLogoClick={navigateHome}
      onNavigatePlaces={() => { window.location.href = '/#rezerwuj'; }}
      onNavigateReservation={() => { window.location.href = '/#rezerwuj'; }}
      bgStyle={{}}
      hrefPrefix="/"
      enableReveal={false}
    />
  );
}
