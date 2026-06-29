import { NextResponse } from 'next/server';
import { getUserProfile, updateUserProfile, getUserDataFromToken } from '@/lib/dbQueries';

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

        const { username, email, avatar_id, role } = await request.json();
        const userToken = request.cookies.get('user_token')?.value;
        const adminToken = request.cookies.get('admin_token')?.value;

        let token = null;

        if (role === 'admin') {
            if (!adminToken) return NextResponse.json({ error: "Admin Unauthorized" }, { status: 401 });
            token = adminToken;
        } else {
            if (!userToken) return NextResponse.json({ error: "User Unauthorized" }, { status: 401 });
            token = userToken;
        }

        const userData = await getUserDataFromToken(token);

        if (userData.role !== role) {
            return NextResponse.json({ error: "Role mismatch/Unauthorized" }, { status: 403 });
        }

        const updatedUser = await updateUserProfile(userData.userId, { username, email, avatar_id });
        return NextResponse.json({ success: true, data: updatedUser });
    } catch (error) {
        console.error("Profile change error: ", error);
        return NextResponse.json({ success: false, error: "Unauthorized or Invalid Request" }, { status: 401 });
    }
}