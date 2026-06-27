import { deleteMovie, updateMovie, getUserDataFromToken, logUserAction } from '@/lib/dbQueries';
import { NextResponse } from 'next/server';

// DELETE Request
export async function DELETE(request, { params }) {
    try {
        const { id } = await params;

        const token = request.cookies.get('admin_token')?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { userId, role } = await getUserDataFromToken(token);

        const deletedMovie = await deleteMovie(id);
        if (!deletedMovie) return NextResponse.json({ error: "Movie not found" }, { status: 404 });

        await logUserAction({
            user_id: userId,
            media_id: id,
            action_type: 'delete',
            role: role
        });
        return NextResponse.json({ success: true, message: "Deleted" });
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({ error: "Delete failed" }, { status: 500 });
    }
}

// PUT Request (Update)
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();

        const token = request.cookies.get('admin_token')?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { userId, role } = await getUserDataFromToken(token);

        const updatedMovie = await updateMovie(id, body);

        if (!updatedMovie) {
            return NextResponse.json({ error: "Movie not found" }, { status: 404 });
        }

        await logUserAction({
            user_id: userId,
            media_id: id,
            action_type: 'update',
            role: role
        });

        return NextResponse.json({ success: true, data: updatedMovie });
    } catch (error) {
        console.log("Update Error: " + error)
        return NextResponse.json({ error: "Update failed" }, { status: 400 });
    }
}
