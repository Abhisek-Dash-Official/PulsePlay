import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

export async function proxy(request) {
    const url = request.nextUrl.pathname;

    if (url == '/admin/login' || url == '/api/admin/login') return NextResponse.next();

    if (url.startsWith('/admin') || url.startsWith('/api/admin')) {

        const token = request.cookies.get('admin_token')?.value;
        if (!token) return NextResponse.redirect(new URL('/admin/login', request.url));

        try {
            const secret = new TextEncoder().encode(process.env.JWT_SECRET);
            const { payload } = await jwtVerify(token, secret);

            if (payload.role !== 'admin') {
                return NextResponse.redirect(new URL('/admin/login', request.url));
            }
        } catch (error) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/admin/:path*'],
};