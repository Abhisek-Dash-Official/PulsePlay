import { NextResponse } from 'next/server';
import { fetchData, createUser } from '@/lib/dbQueries';

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const roleFilter = searchParams.get('role'); // 'admin' or 'user'
        const search = searchParams.get('search');   // username/email
        const sortField = searchParams.get('sort') || 'username';
        const sortOrder = parseInt(searchParams.get('order')) || 1;

        const query = {};
        if (roleFilter) query.role = roleFilter;
        if (search) {
            query.$or = [
                { username: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        const options = {
            sort: { [sortField]: sortOrder },
            limit: limit,
            skip: (page - 1) * limit
        };

        const result = await fetchData('users', query, options);
        return NextResponse.json(result);

    } catch (error) {
        console.error("GET Users Error:", error);
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        const { username, email, password, role, avatar_id } = body;

        if (!username || !email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const newUser = await createUser({ username, email, password, role, avatar_id });

        return NextResponse.json({ success: true, data: newUser }, { status: 201 });
    } catch (error) {
        console.error("Create User Error: ", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}