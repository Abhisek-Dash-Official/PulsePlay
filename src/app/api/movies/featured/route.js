import { NextResponse } from 'next/server';
import { fetchData } from '@/lib/dbQueries';
import { HERO_CONFIG, SECTION_CONFIG } from '@/lib/server-config';

/*
    Handles featured media content retrieval.
    Supports both individual section pagination and bulk initial load bundle.
 */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);

        const sectionId = searchParams.get('section');
        const includeHero = searchParams.get('hero') === 'true';
        const requestedSections = searchParams.get('all_sections') ? Object.keys(SECTION_CONFIG) : [];
        const page = parseInt(searchParams.get('page')) || 1;

        // CASE 1: Paginated request for a specific section
        if (sectionId) {
            const config = SECTION_CONFIG[sectionId];
            if (!config) {
                return NextResponse.json({ success: false, error: "Invalid section identifier" }, { status: 404 });
            }

            const skip = (page - 1) * config.limit;
            const { data, count, hasNext } = await fetchData('media', {}, {
                sort: config.sort,
                limit: config.limit,
                skip: skip
            });

            return NextResponse.json({ success: true, data, count, hasNext });
        }

        // CASE 2: Butlk initial load bundle (Parallel Processing)
        const tasks = {};

        // Fetch hero banner if requested
        if (includeHero) {
            tasks.hero = fetchData('media', HERO_CONFIG.filter, {
                limit: HERO_CONFIG.limit,
                sort: HERO_CONFIG.sort
            });
        }

        // Fetch requested sections defined in configuration
        requestedSections.forEach((id) => {
            if (SECTION_CONFIG[id]) {
                tasks[id] = fetchData('media', {}, {
                    sort: SECTION_CONFIG[id].sort,
                    limit: SECTION_CONFIG[id].limit,
                    skip: 0
                });
            }
        });

        const keys = Object.keys(tasks);
        const values = await Promise.all(Object.values(tasks));

        const result = {};
        keys.forEach((key, index) => {
            result[key] = values[index].data;
        });

        return NextResponse.json({ success: true, data: result });

    } catch (error) {
        console.error("Featured API Error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}