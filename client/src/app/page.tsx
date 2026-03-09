import { useTranslations } from 'next-intl';

import { subtitle, title } from '@/styles/primitives';

export default function IndexPage() {
  const t = useTranslations();

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl justify-center text-center">
        <span className={title()}>{t('home.title_part1')}&nbsp;</span>
        <span className={title({ color: 'violet' })}>{t('home.title_part2')}&nbsp;</span>
        <br />
        <span className={title()}>{t('home.title_part3')}</span>
        <div className={subtitle({ class: 'mt-4' })}>{t('home.subtitle')}</div>
      </div>
    </section>
  );
}
