// NOTE: Code is same as /api/movies because this is an admin route, but it can be modified in the future to give sensitive data to admin users only. For now, it is the same as the public route for movies.
// Admin check is done in the proxy.js (middleware), so only admin users can access this route.

import { NextResponse } from 'next/server';
import { fetchData } from '@/lib/dbQueries';
import { MOVIES_PER_PAGE } from '@/lib/server-config';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        // Filters
        const query = searchParams.get('query');
        const genre = searchParams.get('genre');
        const origin = searchParams.get('origin');
        const media_type = searchParams.get('media_type');

        // Sort & Pagination
        const sortField = searchParams.get('sortBy'); // 'rating', 'created_at', 'title', 'release_date'
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

        // Dynamic Sort
        let sort = {};
        if (sortField) {
            sort[sortField] = sortOrder;
        } else {
            sort = { created_at: -1 }; // Default: Newest Releases first
        }

        const { data, count, hasNext } = await fetchData('media', filter, { sort, limit, skip });

        return NextResponse.json({ success: true, data, count, hasNext });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}