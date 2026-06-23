import { NextResponse } from 'next/server';
import { verifyUserCredentials } from '@/lib/auth';
import { SignJWT } from 'jose';

export async function POST(request) {
    try {
        const { email, password } = await request.json();

        const result = await verifyUserCredentials(email, password);

        if (!result.success) {
            return NextResponse.json({ success: false, error: result.error }, { status: 401 });
        }

        if (result.userData.role !== 'admin') {
            return NextResponse.json({
                success: false,
                error: "Access Denied: You are not an admin"
            }, { status: 403 });
        }

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const token = await new SignJWT({ userId: result.userData.id, role: 'admin' })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('1h') // Admin token shorter expiry
            .sign(secret);

        const response = NextResponse.json({
            success: true,
            message: "Admin authenticated successfully",
            admin: {
                username: result.userData.username,
                avatar_id: result.userData.avatar_id,
                role: result.userData.role
            }
        });

        response.cookies.set('admin_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600 // 1 hour
        });

        return response;
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}