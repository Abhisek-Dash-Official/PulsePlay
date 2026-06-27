// NOTE: Admin check is done in the proxy.js (middleware), so only admin users can access this route.

import { NextResponse } from 'next/server';
import { fetchData, createMovie, getUserDataFromToken, logUserAction } from '@/lib/dbQueries';
import { MOVIES_PER_PAGE } from '@/lib/server-config';

// POST Request (Add)
export async function POST(request) {
    const body = await request.json();
    delete body._id;
    try {
        const token = request.cookies.get('admin_token')?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { userId, role } = await getUserDataFromToken(token);

        const movie = await createMovie(body);

        await logUserAction({
            user_id: userId,
            media_id: movie._id,
            action_type: 'create',
            role: role
        });

        return NextResponse.json({ success: true, data: movie }, { status: 201 });
    }
    catch (error) {
        console.error("Error in /api/admin/movies POST:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}

// GET Request (Read)
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Filters
        const query = searchParams.get('query');
        const genre = searchParams.get('genre');
        const origin = searchParams.get('origin');
        const media_type = searchParams.get('media_type');
        const is_featured = searchParams.get('is_featured');

        // Sort & Pagination
        const sortField = searchParams.get('sortBy'); // 'rating', 'created_at', 'title', 'release_date', priority
        const sortOrder = parseInt(searchParams.get('order')) || -1; // -1 (desc), 1 (asc)
        const limit = parseInt(searchParams.get('limit')) || MOVIES_PER_PAGE;
        const page = parseInt(searchParams.get('page')) || 0;
        const skip = page * limit;

        // Dynamic Filter
        let filter = {};
        if (query) filter.$text = { $search: query };
        if (genre) filter.genres = genre;
        if (origin) filter.origin = origin;
        if (media_type) filter.media_type = media_type;
        if (is_featured) filter.is_featured = is_featured === 'true';

        // Dynamic Sort
        let sort = {};
        if (sortField) {
            sort[sortField] = sortOrder;
        } else {
            sort = { created_at: -1 }; // Default: Newest Releases first
        }

        const { data, count, hasNext } = await fetchData('medias', filter, { sort, limit, skip });

        return NextResponse.json({ success: true, data, count, hasNext });

    } catch (error) {
        console.error("Error in /api/admin/movies:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}