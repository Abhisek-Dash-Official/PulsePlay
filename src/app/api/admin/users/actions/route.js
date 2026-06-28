import { NextResponse } from 'next/server';
import { getUserAuditLogs } from '@/lib/dbQueries';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const logs = await getUserAuditLogs(userId);

        return NextResponse.json({ success: true, data: logs }, { status: 200 });

    } catch (error) {
        console.error("GET User Actions Error:", error);
        return NextResponse.json({ error: "Failed to fetch user actions" }, { status: 500 });
    }
}