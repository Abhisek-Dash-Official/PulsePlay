import { NextResponse } from 'next/server';
import { verifyUserCredentials } from '@/lib/dbQueries';
import jwt from 'jsonwebtoken';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        const result = await verifyUserCredentials(email, password);
        if (!result.success) {
            return NextResponse.json({ success: false, error: result.error }, { status: 401 });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { userId: result.userData.id, role: result.userData.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        const response = NextResponse.json({ success: true, user: result.userData });

        // Set HttpOnly Cookie
        response.cookies.set('user_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60
        });

        return response;
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}