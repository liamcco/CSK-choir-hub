import { getTranslations } from 'next-intl/server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { authClient } from '@/lib/auth-client';
import { subtitle, title } from '@/styles/primitives';

export default async function IndexPage() {
  const t = await getTranslations();
  const session = await authClient.getSession({ fetchOptions: { headers: await headers() } });

  if (!session.data?.session) {
    redirect('/login');
  }

  const email = session.data?.user.email || 'Guest';

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
          <h1>Hello, {email}!</h1>
        </div>
      </section>
    </>
  );
}
