import { NextResponse } from 'next/server';
import { updateUserRole, deleteUser } from '@/lib/dbQueries';

// Update Role
export async function PATCH(request, { params }) {
    try {
        const { id } = await params;
        const { newRole } = await request.json();

        // Update role
        const updatedUser = await updateUserRole(id, newRole);
        if (!updatedUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

        return NextResponse.json({ success: true, data: updatedUser });
    } catch (error) {
        console.error("PATCH Error:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 400 });
    }
}

// DELETE
export async function DELETE(_, { params }) {
    try {
        const { id } = await params;

        // Delete user
        const deletedUser = await deleteUser(id);
        if (!deletedUser) return NextResponse.json({ error: "User not found" }, { status: 404 });

        return NextResponse.json({ success: true, message: "User deleted" });
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}