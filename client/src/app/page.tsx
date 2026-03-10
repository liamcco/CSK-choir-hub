import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { subtitle, title } from '@/styles/primitives';

export default function IndexPage() {
  const t = useTranslations();

  return (
    <>
      <section className="flex items-center justify-center pb-4">
        <div className="inline-block max-w-xl justify-center text-center">
          <span className={title()}>{t('home.title_part1')}&nbsp;</span>
          <br />
          <span className={title({ color: 'violet' })}>{t('home.title_part2')}&nbsp;</span>
          <br />
          <span className={title()}>{t('home.title_part3')}</span>
          <div className={subtitle({ class: 'mt-4' })}>{t('home.subtitle')}</div>
        </div>
      </section>
      <section className="flex h-full w-full items-center justify-center">
        {/* Link to all events and next event */}
        <div className="flex max-w-xl flex-col justify-center gap-4 text-center">
          <Link href="/events" className="text-lg font-medium text-violet-500 hover:underline">
            <Button>{'Visa Alla Event'}</Button>
          </Link>
          <Link href="/events/1" className="text-lg font-medium text-violet-500 hover:underline">
            <Button>{'Visa Nästa Event'}</Button>
          </Link>
        </div>
      </section>
    </>
  );
}
