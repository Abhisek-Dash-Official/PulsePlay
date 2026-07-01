import { Flame, Star, Sparkles, Home, Film, Clapperboard, Tv, ListVideo, Heart, LayoutGrid, LayoutDashboard, Video, Users, Settings, Compass, Eye, Skull, Wand2, BookOpen, Sword, History, Search, Rocket, Fingerprint, Globe, PlayCircle, Download, Mail, MessageCircle, Shield } from "lucide-react";
import { XIcon } from '@/lib/customIcons';

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
    { name: "Hollywood", href: "/hollywood", icon: Globe },
    { name: "Movies", href: "/movies", icon: Film },
    { name: "Series", href: "/series", icon: Tv },
    { name: "Watchlist", href: "/watchlist", icon: ListVideo },
    { name: "Favourites", href: "/favourites", icon: Heart },
    { name: "Genres", href: "/genres", icon: LayoutGrid },
];

export const MOBILE_NAV_LINKS = [
    { name: "Home", href: "/", icon: Home },
    { name: "Movie", href: "/movies", icon: Clapperboard },
    { name: "Series", href: "/series", icon: Tv },
    { name: "WatchList", href: "/watchlist", icon: ListVideo },
    { name: "Genres", href: "/genres", icon: LayoutGrid },
]

// Footer Links
export const exploreLinks = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "Series", href: "/series" },
    { name: "Bollywood", href: "/bollywood" },
    { name: "Hollywood", href: "/hollywood" },
    { name: "Genres", href: "/genres" },
];

export const accountLinks = [
    { name: "Sign In", href: "/login" },
    { name: "Sign Up", href: "/signup" },
    { name: "My Profile", href: "/myprofile" },
    { name: "Watchlist", href: "/watchlist" },
    { name: "Favourites", href: "/favourites" },
];

export const companyLinks = [
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
];

// Admin Panel Links
export const ADMIN_NAV_LINKS = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Movies Management", href: "/admin/movies", icon: Video },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Settings", href: "/admin/settings", icon: Settings }
];

// For Signup Page Only
export const SIGNUP_FEATURES = [
    { icon: Search, title: "Aggregated Links", description: "We scrape the best sources so you get the movie instantly." },
    { icon: PlayCircle, title: "Direct Streaming", description: "No fake buttons. Just click play on our external trusted links." },
    { icon: Download, title: "One-Click Downloads", description: "Multiple resolution options available right at your fingertips." }
];

// Contact Page
export const CONTACT_CARDS = [
    {
        icon: Mail,
        label: "Email Support",
        value: "support@pulseplay.app",
        href: "mailto:support@pulseplay.app",
        linkText: "Drop us a line",
    },
    {
        icon: MessageCircle,
        label: "Discord Community",
        value: "pulseplay-hub",
        href: "#",
        linkText: "Join the server",
    },
    {
        icon: XIcon,
        label: " X ",
        value: "@PulsePlayApp",
        href: "#",
        linkText: "Follow us",
    },
];

export const FAQ = [
    {
        question: `Is ${SITE_NAME} free to use?`,
        answer: `Yes, ${SITE_NAME} is completely free. We aggregate and index streams from across the web to make discovery seamless.`,
    },
    {
        question: "Do you host movies or series on your servers?",
        answer: "No. We do not host, upload, or manage any video content. We simply index publicly available links and direct you to third-party streaming platforms.",
    },
    {
        question: "How do I report a broken link?",
        answer: "You can report broken links directly on the movie or series page by clicking the 'Report Issue' flag next to the stream button.",
    },
    {
        question: "Can I request a movie that isn't listed?",
        answer: "Absolutely! Join our Discord community and drop your requests in the #requests channel. Our automated scrapers will hunt it down.",
    },
    {
        question: "Is there a mobile app available?",
        answer: "Currently, our website is highly optimized for mobile browsers as a PWA. A dedicated native app is in development.",
    },
];

// About page
export const STATS = [
    { value: "10M+", label: "Titles Indexed" },
    { value: "150+", label: "Countries Supported" },
    { value: "4K", label: "Quality Streams" },
    { value: "Zero", label: "Intrusive Ads" },
];

export const HOW_IT_WORKS = [
    {
        step: "01",
        title: "Discover",
        description: "Browse our expansive library powered by intelligent recommendation algorithms.",
    },
    {
        step: "02",
        title: "Stream",
        description: "Click play. We securely hand you off to the best available external sources.",
    },
    {
        step: "03",
        title: "Download",
        description: "Grab titles for offline viewing with multiple resolution links provided.",
    },
];

export const VALUES = [
    {
        icon: Shield,
        title: "Privacy First",
        description: "We don't track your viewing habits. What you watch is your business alone.",
    },
    {
        icon: Heart,
        title: "Always Free",
        description: "Premium discovery shouldn't come with a subscription fee. Accessible to all.",
    },
    {
        icon: Users,
        title: "Community Driven",
        description: "Our library is constantly updated based on user requests and trends.",
    },
    {
        icon: Star,
        title: "Quality Obsessed",
        description: "We prioritize 4K and 1080p links to ensure a cinematic experience.",
    },
];

// Terms Page
export const SECTIONS = [
    {
        id: "acceptance",
        title: "Acceptance of Terms",
        content: `By accessing or using ${SITE_NAME}, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service. These terms apply to all visitors, users, and others who access the platform.`,
    },
    {
        id: "description",
        title: "Description of Service",
        content: `${SITE_NAME} is an indexing and discovery platform. We do not host, store, or upload any video, media, or files on our servers. The platform strictly acts as a search engine and indexer, providing links to content hosted by independent third parties across the internet.`,
    },
    {
        id: "accounts",
        title: "User Accounts",
        content: "When you create an account with us, you must provide accurate and complete information. You are solely responsible for safeguarding the password that you use to access the service and for any activities or actions under your password. We reserve the right to terminate accounts that violate our policies.",
    },
    {
        id: "prohibited",
        title: "Prohibited Activities",
        content: "Users agree not to engage in any activity that disrupts or interferes with the platform's infrastructure, including but not limited to automated scraping without permission, deploying malicious code, or attempting to bypass our security measures.",
    },
    {
        id: "intellectual-property",
        title: "Intellectual Property",
        content: "The branding, design, and proprietary code of the platform are the exclusive property of our operating entity. However, any movie posters, titles, or related metadata displayed remain the intellectual property of their respective owners and are used strictly under fair use for informational purposes.",
    },
    {
        id: "third-party",
        title: "Third-Party Links",
        content: `Our Service contains links to third-party web sites or services that are not owned or controlled by ${SITE_NAME}. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. You acknowledge that clicking external links is done at your own risk.`,
    },
    {
        id: "disclaimer",
        title: "Disclaimer of Warranties",
        content: "The service is provided on an 'AS IS' and 'AS AVAILABLE' basis. We make no warranties, expressed or implied, regarding the continuous availability, safety, or reliability of third-party streams.",
    },
    {
        id: "limitation",
        title: "Limitation of Liability",
        content: "In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of the service.",
    },
    {
        id: "changes",
        title: "Changes to Terms",
        content: "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.",
    },
    {
        id: "contact",
        title: "Contact Information",
        content: "If you have any questions about these Terms, please contact us via the Contact page or email us at legal@pulseplay.app.",
    },
];

// Privacy Page
export const HIGHLIGHTS = [
    "We never sell your personal data to third parties.",
    "No third-party ad trackers or invasive cookies.",
    "You can delete your account and data at any time.",
    "We only collect what is strictly necessary to run the platform.",
];

export const PRIVACY_SECTIONS = [
    {
        id: "information-we-collect",
        title: "Information We Collect",
        content: "We collect information you provide directly to us, such as when you create an account, build a watchlist, or communicate with us. This may include your email address, username, and encrypted password. We also automatically collect certain technical data like your IP address, browser type, and device information to ensure platform security.",
    },
    {
        id: "how-we-use",
        title: "How We Use Your Information",
        content: `We use the information we collect to operate and maintain ${SITE_NAME}, personalize your experience (such as saving your watch history), send you technical notices, and detect or prevent fraudulent activity.`,
    },
    {
        id: "cookies",
        title: "Cookies & Tracking",
        content: "We use essential cookies to keep you logged in and save your preferences. We do not use third-party advertising cookies or cross-site tracking scripts. You can instruct your browser to refuse all cookies, but this may limit your ability to use certain features of the platform.",
    },
    {
        id: "data-sharing",
        title: "Data Sharing",
        content: "We do not sell, trade, or rent your personal identification information. We may share generic aggregated demographic information not linked to any personal identification information with our partners for system analytics. We may also disclose your information if required to do so by law.",
    },
    {
        id: "retention",
        title: "Data Retention",
        content: "We retain your personal data only for as long as necessary to provide you with our services and for legitimate business purposes. When you delete your account, your data is permanently removed from our active databases within 30 days.",
    },
    {
        id: "your-rights",
        title: "Your Rights",
        content: "You have the right to access, update, or delete the personal information we have on you. You can perform most of these actions directly from your account settings. If you need assistance exporting your data, please contact our privacy team.",
    },
    {
        id: "children",
        title: "Children's Privacy",
        content: "Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children. If we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers.",
    },
    {
        id: "security",
        title: "Security",
        content: "The security of your data is important to us. We use commercially acceptable means to protect your Personal Information, including standard SSL encryption and hashed passwords. However, remember that no method of transmission over the Internet is 100% secure.",
    },
    {
        id: "changes",
        title: "Changes to This Policy",
        content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last updated' date. You are advised to review this Privacy Policy periodically.",
    },
    {
        id: "contact",
        title: "Contact Us",
        content: "If you have any questions or concerns regarding this Privacy Policy or our data practices, please contact us at privacy@pulseplay.app.",
    },
];