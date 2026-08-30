import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ['id', 'en'],

  // Used when no locale matches
  defaultLocale: 'id',
  localePrefix: 'as-needed'
});

export default function middleware(request: NextRequest) {
  // We can add auth checks here if needed in the future
  return intlMiddleware(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(id|en)/:path*', '/((?!api|_next|.*\\..*).*)']
};
