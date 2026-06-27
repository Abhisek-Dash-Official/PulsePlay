import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { User } from '@/models/User';
import { Media } from '@/models/Media';
import { UserAction } from '@/models/UserAction';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await connectToDatabase();

        const [
            totalMovies,
            totalUsers,
            totalWatches,
            totalDownloads,
            recentMedia,
            recentActions
        ] = await Promise.all([
            Media.countDocuments(),
            User.countDocuments({ role: 'user' }),
            UserAction.countDocuments({ action_type: 'watch' }),
            UserAction.countDocuments({ action_type: 'download' }),
            Media.find().sort({ created_at: -1 }).limit(5).select('title media_type origin created_at').lean(),
            UserAction.find({ role: "user" }).sort({ timestamp: -1 }).limit(5)
                .populate('user_id', 'username')
                .populate('media_id', 'title')
                .lean()
        ]);

        return NextResponse.json({
            success: true,
            data: {
                totalMovies,
                totalUsers,
                totalWatches,
                totalDownloads,
                recentMedia,
                recentActions
            }
        });

    } catch (error) {
        console.error("Failed to fetch admin stats:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}