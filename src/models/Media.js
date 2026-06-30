import mongoose from "mongoose";

const downloadLinkSchema = new mongoose.Schema({
    resolution_label: String,
    file_size: String,
    external_url: String,
});

const MediaSchema = new mongoose.Schema({
    title: { type: String, required: true },
    plot: { type: String, required: true },
    origin: { type: String, enum: ['bollywood', 'hollywood'], required: true },
    media_type: { type: String, enum: ['movie', 'series'], required: true },
    is_featured: { type: Boolean, default: false },
    priority: { type: Number, default: 0 },
    poster_url: String,
    backdrop_url: String,
    rating: { type: Number, default: 0 },
    release_date: Date,
    watch_link: String,
    download_links: [downloadLinkSchema],
    genres: [String],
    cast: [String],
    director: String,
    tags: [String],
}, { timestamps: { createdAt: 'created_at', updatedAt: false } });

// Global Sorting (Home Page New Releases & Top Rated)
MediaSchema.index({ created_at: -1 });
MediaSchema.index({ rating: -1 });

// Genre Browsing
MediaSchema.index({ genres: 1, created_at: -1 });

// Filtered Browsing
MediaSchema.index({ origin: 1, created_at: -1 });
MediaSchema.index({ media_type: 1, created_at: -1 });

export const Media = mongoose.models.Media || mongoose.model('Media', MediaSchema, 'medias');