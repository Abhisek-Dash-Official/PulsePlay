import { NextResponse } from 'next/server';
import { getUserProfile, getUserIdFromToken } from '@/lib/dbQueries';

export async function GET(request) {
    try {
        const token = request.cookies.get('user_token')?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const userId = await getUserIdFromToken(token);
        const user = await getUserProfile(userId);

        return NextResponse.json({ success: true, user });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Unauthorized or Invalid Request" }, { status: 401 });
    }
}