import { NextResponse } from 'next/server';
import { updateUserPassword, getUserIdFromToken } from '@/lib/dbQueries';

export async function PATCH(request) {
    try {
        const userToken = req.cookies.get('user_token')?.value;
        const adminToken = req.cookies.get('admin_token')?.value;

        const token = userToken || adminToken;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const userId = await getUserIdFromToken(token);

        const { currentPassword, newPassword } = await request.json();

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const result = await updateUserPassword(userId, currentPassword, newPassword);

        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error("Password Update Error:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}