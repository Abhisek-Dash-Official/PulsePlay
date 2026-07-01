import { NextResponse } from 'next/server';

export async function GET(request) {
    const token = request.cookies.get('user_token')?.value;

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Dummy recommendation data
    const mockRecommendations = [
        {
            _id: "rec-1",
            title: "Dummy Movie 1",
            plot: "This is a dummy plot for the first recommended movie. It is a thrilling sci-fi adventure set in a dystopian future.",
            origin: "hollywood",
            media_type: "series",
            poster_url: "https://commons.wikimedia.org/wiki/File:No-Image-Placeholder.svg",
            backdrop_url: "https://commons.wikimedia.org/wiki/File:No-Image-Placeholder.svg",
            rating: 8.7,
            release_date: "2026-11-12T00:00:00Z",
            watch_link: "#",
            genres: ["sci-fi", "thriller", "action"],
            director: "Elena Rostova",
            tags: ["cyberpunk", "detective"]
        },
        {
            _id: "rec-2",
            title: "Dummy Movie 2",
            plot: "This is a dummy plot for the second recommended movie. It is a spine-chilling horror film set in a remote location.",
            origin: "hollywood",
            media_type: "movie",
            poster_url: "https://commons.wikimedia.org/wiki/File:No-Image-Placeholder.svg",
            backdrop_url: "https://commons.wikimedia.org/wiki/File:No-Image-Placeholder.svg",
            rating: 7.2,
            release_date: "2025-10-31T00:00:00Z",
            watch_link: "#",
            genres: ["horror", "mystery"],
            director: "James Wan",
            tags: ["haunted", "cabin"]
        }
    ];

    return NextResponse.json({
        success: true,
        data: mockRecommendations
    });
}