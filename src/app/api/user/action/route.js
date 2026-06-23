import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import { UserAction } from '@/models/UserAction';

export async function POST(request) {
    try {
        await connectToDatabase();

        const token = request.cookies.get('user_token')?.value;
        if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

        const userId = await getUserIdFromToken(token);
        const { media_id, action_type } = await request.json();

        if (!media_id || !['watch', 'download'].includes(action_type)) {
            return NextResponse.json(
                { success: false, message: "Invalid action or media ID" },
                { status: 400 }
            );
        }

        const newAction = await UserAction.create({
            user_id: userId,
            media_id: media_id,
            action_type: action_type
        });

        return NextResponse.json({
            success: true,
            message: `${action_type} recorded successfully`,
            data: newAction
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Server error, please try again later" },
            { status: 500 }
        );
    }
}