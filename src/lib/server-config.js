// Pagination & Display limits
export const MOVIES_PER_PAGE = 20;
export const ROW_CONTENT_LIMIT = 15; // (New Releases, Top Rated, Recommended, Genre) sections on homepage
export const WATCHLIST_PAGE_LIMIT = 10; // Number of items per page in watchlist and favorites
export const FAVORITES_PAGE_LIMIT = 10; // Number of items per page in watchlist and favorites

// Watchlist & Favourites limits
export const MAX_WATCHLIST_SIZE = 25;
export const MAX_FAVOURITES_SIZE = 25;

export const SECTION_CONFIG = {
    "new-releases": { limit: 15, sort: { created_at: -1 } },
    "top-rated": { limit: 15, sort: { rating: -1 } }
};

export const HERO_CONFIG = {
    limit: 5,
    sort: { priority: -1 },
    filter: { is_featured: true }
};