import createIntlMiddleware from 'next-intl/middleware';
import { availableLocaleCodes, availableLocalesMap, defaultLocale } from '@/next.locales.mjs';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
   const [, locale, ...segments] = request.nextUrl.pathname.split('/');

   const localeLookup = availableLocalesMap[locale]

   if (locale != null && localeLookup && !localeLookup.enabled) {
      console.log(request.url)
      return NextResponse.redirect(new URL(request.url.replace(locale, defaultLocale.code)));
   }

   const handleI18nRouting = createIntlMiddleware({
      // A list of all locales that are supported
      locales: availableLocaleCodes,

      // Used when no locale matches
      defaultLocale: defaultLocale.code,

      // Always use a Locale as a prefix for routing
      localePrefix: 'always',
   });
   const response = handleI18nRouting(request);
   return response;
}

export const config = {
   matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
   ],
};