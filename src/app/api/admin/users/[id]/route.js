import { NextResponse } from 'next/server';
import { updateUserRole, deleteUser, getUserIdFromToken, areIdsEqual } from '@/lib/dbQueries';

// Update Role
export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const { newRole } = await request.json();

        const token = request.cookies.get('admin_token')?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const callerId = await getUserIdFromToken(token);

        // Update role
        const updatedUser = await updateUserRole(id, newRole);
        if (!updatedUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const isSelfDemotion = (areIdsEqual(callerId, id) && newRole !== 'admin');

        const response = NextResponse.json({ success: true, message: "Update Successfull", isSelfDemotion });

        if (isSelfDemotion) { // SELF DEMOTION
            response.cookies.set('admin_token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 0,
                path: '/'
            });
        }

        return response
    } catch (error) {
        console.error("PATCH Error:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 400 });
    }
}

// DELETE
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        const token = request.cookies.get('admin_token')?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const callerId = await getUserIdFromToken(token);

        // Delete user
        const deletedUser = await deleteUser(id);
        if (!deletedUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

        const isSelfDeletion = (areIdsEqual(callerId, id));

        const response = NextResponse.json({ success: true, message: "User deleted", isSelfDeletion });

        if (isSelfDeletion) { // Self DELETION
            response.cookies.set('admin_token', '', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 0,
                path: '/'
            });
        }

        return response
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}