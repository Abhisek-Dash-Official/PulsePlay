import { Media } from '@/models/Media';
import { connectToDatabase } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET(_, { params }) {
    try {
        await connectToDatabase();

        const { id } = await params;

        const movie = await Media.findById(id).lean();

        if (!movie) {
            return NextResponse.json(
                { success: false, message: "Movie not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: movie });

    } catch (error) {
        console.error("Fetch Movie Detail Error:", error);

        if (error.name === 'CastError') {
            return NextResponse.json(
                { success: false, message: "Invalid ID format" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}