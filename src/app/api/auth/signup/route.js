import { NextResponse } from 'next/server';
import { User } from '@/models/User';
import { isUserExists } from '@/lib/dbQueries';
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const { username, email, password, avatar_id } = await request.json();

        // Check if user already exists
        if (await isUserExists(email)) {
            return NextResponse.json({ success: false, error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            username,
            email,
            password_hash: hashedPassword,
            role: 'user',
            avatar_id: avatar_id || '',
            watchlist: [],
            favorites: []
        });

        return NextResponse.json({ success: true, message: "User created successfully" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}