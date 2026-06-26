import { deleteMovie, updateMovie } from '@/lib/dbQueries';
import { NextResponse } from 'next/server';

// DELETE Request
export async function DELETE(request, { params }) {
    const { id } = await params;
    await deleteMovie(id);
    return NextResponse.json({ success: true, message: "Deleted" });
}

// PUT Request (Edit)
export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const body = await request.json();

        const updatedMovie = await updateMovie(id, body);

        if (!updatedMovie) {
            return NextResponse.json({ error: "Movie not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: updatedMovie });
    } catch (error) {
        console.log("Error: " + error)
        return NextResponse.json({ error: "Update failed" }, { status: 400 });
    }
}
