import { NextResponse } from 'next/server';
import { updateUserPassword, getUserDataFromToken } from '@/lib/dbQueries';

export async function PATCH(request) {
    try {
        const { currentPassword, newPassword, role } = await request.json();
        const userToken = req.cookies.get('user_token')?.value;
        const adminToken = req.cookies.get('admin_token')?.value;

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

        if (!currentPassword || !newPassword) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        const result = await updateUserPassword(userData.userId, currentPassword, newPassword);

        return NextResponse.json(result, { status: 200 });

    } catch (error) {
        console.error("Password Update Error:", error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}