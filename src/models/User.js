import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password_hash: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar_id: { type: String, default: '1' },
    watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Media' }],
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

export const User = mongoose.models.User || mongoose.model('User', UserSchema, 'users');