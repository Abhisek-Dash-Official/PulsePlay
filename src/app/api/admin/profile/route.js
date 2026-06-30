import { NextResponse } from 'next/server';
import { getUserProfile, getUserIdFromToken } from '@/lib/dbQueries';

export async function GET(request) {
    try {
        const token = request.cookies.get('admin_token')?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const adminId = await getUserIdFromToken(token);
        const admin = await getUserProfile(adminId);

        if (!admin || admin.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        return NextResponse.json({ success: true, user: admin });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ success: false, error: "Invalid Admin Session" }, { status: 401 });
    }
}