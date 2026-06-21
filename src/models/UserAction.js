import mongoose from 'mongoose';

const UserActionSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    media_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Media', required: true },
    action_type: { type: String, enum: ['watch', 'download'], required: true },
    timestamp: { type: Date, default: Date.now },
});

export const UserAction = mongoose.models.UserAction || mongoose.model('UserAction', UserActionSchema);