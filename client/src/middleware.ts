import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware';

const privatePaths = ['/me'];
const authPaths = ['/login', '/register']
const languagePath = ['vi', 'en']
const productEditRegex = /^\/products\/\d+\/edit$/;
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const defaultLocale = request.headers.get('NEXT_LOCAL') || 'vi';
  const handleI18nRouting = createMiddleware({
    locales: ['vi', 'en'],
    defaultLocale: 'vi'
  });
  const response = handleI18nRouting(request);

  const { pathname } = request.nextUrl
  const sessionToken = request.cookies.get('sessionToken');
  if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
    return NextResponse.redirect(new URL(`/login`, request.url))
  }
  if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
    return NextResponse.redirect(new URL(`/me`, request.url))
  }
  if (pathname.match(productEditRegex) && !sessionToken) {
    return NextResponse.redirect(new URL(`/login`, request.url))
  }
  // const localePrefix = pathname.split('/')[1];
  // if (!languagePath.includes(localePrefix)) {
    // const normalPathname = pathname.split('/').slice(2).join('/')
    // return NextResponse.redirect(new URL(`/${defaultLocale}/${normalPathname}`, request.url))
  // }
  response.headers.set('NEXT_LOCAL', defaultLocale);
  const nextResponse = NextResponse.next();

  // Sao chép các headers từ response sang nextResponse
  response.headers.forEach((value, key) => {
    nextResponse.headers.set(key, value);
  });
  return nextResponse;
}
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/(vi|en)/:path*', '/me', '/login', '/register', '/products/:path*'],
}