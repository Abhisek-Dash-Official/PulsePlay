import { deleteMovie, updateMovie, createMovie } from '@/lib/dbQueries';
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
        return NextResponse.json({ error: "Update failed" }, { status: 400 });
    }
}

// POST Request (Add)
export async function POST(request) {
    const body = await request.json();
    const movie = await createMovie(body);
    return NextResponse.json({ success: true, data: movie }, { status: 201 });
}
