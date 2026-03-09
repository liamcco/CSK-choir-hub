import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

import path from 'path';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  turbopack: {
    root: path.join(__dirname), // sets root to the client app dir
  },
};

export default withNextIntl(nextConfig);
