import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  locales: ['id', 'en'],
  defaultLocale: 'id',
  localePrefix: 'as-needed',
  // Bahasa awal selalu Indonesia; bahasa perangkat tidak mengubah locale otomatis.
  localeDetection: false,
});

export default function middleware(request: NextRequest) {
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/', '/(id|en)/:path*', '/((?!api|_next|.*\\..*).*)']
};
