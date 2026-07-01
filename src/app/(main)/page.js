import { cookies } from 'next/headers';
import HeroBanner from '@/components/home/HeroBanner';
import MediaSlider from '@/components/home/MediaSlider';
import GenreSlider from '@/components/home/GenreSlider';
import { redirect } from 'next/navigation';

export default async function HomePage() {
    // Fetch 1: Hero + all browse sections
    let heroItems = [];
    let newReleases = [];
    let topRated = [];

    try {
        const featuredRes = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/featured?hero=true&all_sections=true`,
            { cache: 'no-store' }
        );
        if (featuredRes.ok) {
            const featuredData = await featuredRes.json();
            heroItems = featuredData.data?.hero ?? [];
            newReleases = featuredData.data?.['new-releases'] ?? [];
            topRated = featuredData.data?.['top-rated'] ?? [];
        }
    } catch (error) {
        console.error("Failed to fetch featured sections:", error);
    }

    // Fetch 2: User recommendations (Needs auth token)
    const cookieStore = await cookies();
    const token = cookieStore.get('user_token')?.value;
    let recommendations = [];

    if (token) {
        try {
            const recRes = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/recommendations`,
                {
                    headers: { Cookie: `user_token=${token}` },
                    cache: 'no-store'
                }
            );
            if (recRes.ok) {
                const recData = await recRes.json();
                recommendations = recData.data ?? [];
            }
        } catch (error) {
            redirect('/login');
        }
    }

    return (
        <div style={{ background: '#07070F', minHeight: '100vh' }}>
            {/* 1. Hero Banner */}
            <HeroBanner featuredItems={heroItems} />

            {/* Page content below hero */}
            <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }} className="sm:px-8 lg:px-12">

                {/* 2. Recommendations */}
                {recommendations.length > 0 && (
                    <section style={{ paddingTop: '64px' }}>
                        <MediaSlider
                            title="Recommended For You"
                            icon="Sparkles"
                            items={recommendations}
                            exploreHref={null}
                        />
                    </section>
                )}

                {/* 3. New Releases */}
                <section style={{ paddingTop: '64px' }}>
                    <MediaSlider
                        title="New Releases"
                        icon="Flame"
                        items={newReleases}
                        exploreHref="/movies?sortField=release_date&sortOrder=-1"
                    />
                </section>

                {/* 4. Top Rated */}
                <section style={{ paddingTop: '64px' }}>
                    <MediaSlider
                        title="Top Rated"
                        icon="Star"
                        items={topRated}
                        exploreHref="/movies?sortField=rating&sortOrder=-1"
                    />
                </section>

                {/* 5. Browse by Genre */}
                <section style={{ paddingTop: '64px', paddingBottom: '80px' }}>
                    <GenreSlider />
                </section>

            </div>
        </div>
    );
}