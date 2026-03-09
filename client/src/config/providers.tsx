import React from 'react';

import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';

/**
 * A wrapper component that provides authentication, theming, and UI context to its children.
 * If more providers are needed, they can be added here.
 *
 * @returns {JSX.Element} The combined providers wrapping the children components.
 */
export function Providers({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <NextIntlClientProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
