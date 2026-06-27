import mongoose from 'mongoose';

const UserActionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    media_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true },
    action_type: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user', 'guest'], default: 'user' },
    timestamp: { type: Date, default: Date.now },
});

UserActionSchema.index({ user_id: 1, action_type: 1, timestamp: -1 });
UserActionSchema.index({ media_id: 1 });

export const UserAction = mongoose.models.UserAction || mongoose.model('UserAction', UserActionSchema);