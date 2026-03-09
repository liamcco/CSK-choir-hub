'use client';

import React from 'react';

import { ThemeProvider } from 'next-themes';

/**
 * A wrapper component that provides authentication, theming, and UI context to its children.
 * If more providers are needed, they can be added here.
 *
 * @returns {JSX.Element} The combined providers wrapping the children components.
 */
export default function Providers({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}
