import { NextResponse } from 'next/server';
import { getUserIdFromToken, updateUserArray, getUserList } from '@/lib/dbQueries';
import { WATCHLIST_PAGE_LIMIT } from '@/lib/server-config';

export async function POST(request) {
    try {
        const token = request.cookies.get('user_token')?.value;
        if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

        const userId = await getUserIdFromToken(token);
        const { mediaId } = await request.json();

        await updateUserArray(userId, 'watchlist', mediaId);

        return NextResponse.json({ success: true, message: "Added to watchlist" });
    } catch (error) {
        if (error.message === 'ALREADY_EXISTS') {
            return NextResponse.json({ success: false, message: "Movie already in your list" }, { status: 409 });
        }
        if (error.message === 'LIMIT_EXCEEDED') {
            return NextResponse.json({ success: false, message: "List is full! Remove some items." }, { status: 400 });
        }
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const token = request.cookies.get('user_token')?.value;
        if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

        const userId = await getUserIdFromToken(token);

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || WATCHLIST_PAGE_LIMIT;

        const result = await getUserList(userId, 'watchlist', page, limit);

        return NextResponse.json({ success: true, ...result });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}