import { Flame, Star, Sparkles, Home, Film, Clapperboard, Tv, ListVideo, Heart, LayoutGrid, LayoutDashboard, Video, Users, Settings, Compass, Eye, Skull, Wand2, BookOpen, Sword, History, Search, Rocket, Fingerprint } from "lucide-react";

export const SITE_NAME = "PulsePlay";
export const SITE_DESCRIPTION = "Discover blockbuster movies, new releases, and personalized recommendations. Watch online or download directly with PulsePlay.";
export const SITE_LOGO_URL = "/logo.png";
export const SITE_KEYWORDS = [
    SITE_NAME,
    "watch movies online",
    "free movie downloads",
    "online streaming portal",
    "stream and download",
    "HD media hub",
    "external download links",
    "watch web series",
    "latest movie streams",
    "dual action media player",
    "entertainment portal",
    "direct download movies"
];

// UI related
export const GENRES = [ // If name is changed, update the genreImgUrl() function in this file accordingly
    { id: "adventure", name: "Adventure", icon: Compass },
    { id: "comedy", name: "Comedy", icon: Star },
    { id: "mythology", name: "Mythology", icon: Sparkles },
    { id: "animation", name: "Animation", icon: LayoutGrid },
    { id: "drama", name: "Drama", icon: Film },
    { id: "thriller", name: "Thriller", icon: Eye },
    { id: "horror", name: "Horror", icon: Skull },
    { id: "fantasy", name: "Fantasy", icon: Wand2 },
    { id: "biography", name: "Biography", icon: BookOpen },
    { id: "war", name: "War", icon: Sword },
    { id: "history", name: "History", icon: History },
    { id: "mystery", name: "Mystery", icon: Search },
    { id: "action", name: "Action", icon: Flame },
    { id: "sci-fi", name: "Sci-Fi", icon: Rocket },
    { id: "crime", name: "Crime", icon: Fingerprint },
    { id: "musical", name: "Musical", icon: Sparkles },
    { id: "romance", name: "Romance", icon: Heart }
];

export const BROWSE_SECTIONS = [ // id is related to server-config.js's SECTION_CONFIG keys. If changed, update there as well.
    { id: "new-releases", title: "New Releases", icon: Flame },
    { id: "top-rated", title: "Top Rated", icon: Star },
];

// Helper Functions
export const getAvatarImgUrl = (id = null) => id ? `/images/avatars/avatar-${id}.png` : "/images/avatars/default.png";
export const genreImgUrl = (genreName) => `/images/genres/${genreName.toLowerCase()}.png`

// Navbar Links

export const NAV_LINKS = [
    { name: "Home", href: "/", icon: Home },
    { name: "Bollywood", href: "/bollywood", icon: Clapperboard },
    { name: "Hollywood", href: "/hollywood", icon: Clapperboard },
    { name: "Movies", href: "/movies", icon: Film },
    { name: "Series", href: "/series", icon: Tv },
    { name: "Watchlist", href: "/watchlist", icon: ListVideo },
    { name: "Favourites", href: "/favourites", icon: Heart },
    { name: "Genres", href: "/genres", icon: LayoutGrid },
];

export const ADMIN_NAV_LINKS = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Movies Management", href: "/admin/movies", icon: Video },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings }
];