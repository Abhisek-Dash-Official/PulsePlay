// Pagination & Display limits
export const MOVIES_PER_PAGE = 20;
export const ROW_CONTENT_LIMIT = 15; // (New Releases, Top Rated, Recommended, Genre) sections on homepage

// NOTE: keys are related to constants.js's BROWSE_SECTIONS ids. If changed, update there as well.
export const SECTION_CONFIG = {
    "new-releases": { limit: 15, sort: { created_at: -1 } },
    "top-rated": { limit: 15, sort: { rating: -1 } }
};

export const HERO_CONFIG = {
    limit: 5,
    sort: { priority: -1 },
    filter: { is_featured: true }
};