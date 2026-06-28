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

export async function PATCH(request) {
    try {
        const userToken = req.cookies.get('user_token')?.value;
        const adminToken = req.cookies.get('admin_token')?.value;

        const token = userToken || adminToken;

        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const userId = await getUserIdFromToken(token);

        const { username, email, avatar_id } = await request.json();
        const updatedUser = await updateUserProfile(userId, { username, email, avatar_id });
        return NextResponse.json({ success: true, data: updatedUser });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Unauthorized or Invalid Request" }, { status: 401 });
    }
}