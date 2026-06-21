import { NextResponse } from 'next/server';

export function proxy(request) {
    // const url = request.nextUrl.pathname;

    // if (url.startsWith('/admin') || url.startsWith('/api/admin')) {
    // const token = request.cookies.get('auth_token');

    // if (!token) {
    //     console.log("Unauthorized Access! Sending to login page...");
    //     return NextResponse.redirect(new URL('/login', request.url));
    // }
    // }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*'],
};