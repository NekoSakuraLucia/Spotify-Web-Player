// Next
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// axios
import axios from 'axios';

// BASE_URI
import { base_uri } from '@/lib/base.api';

// Error
import { getRecentlyPlayedError } from '@/error/GetRecentlyPlayed.error';

// Query String
import { QueryString } from '@/lib/players/QueryString.api.artists';

// Types
import type { IResponse } from '@/types/spotify';
import type { SpotifyUserRecentlyPlayed } from '@/types/spotify_recently_played';
import type { QueryParamValue } from '@/lib/players/QueryString.api.artists';

// ประเภทสำหรับใช้ในอ็อบเจกต์ queryParam สำหรับ การส่งพารามิเตอร์ไปยัง Spotify API
type SearchParamsKeys = 'limit' | 'after' | 'before';

// Cookie Name
const COOKIES_NAME = process.env.SPOTIFY_CALLBACK_COOKIES as string;

export async function GET(
    request: NextRequest,
): Promise<NextResponse<IResponse> | NextResponse<SpotifyUserRecentlyPlayed>> {
    const CookiesStore = await cookies();
    const token = CookiesStore.get(COOKIES_NAME)?.value;

    const searchParams = request.nextUrl.searchParams;
    const params = Object.fromEntries(searchParams.entries());
    const { limit, after, before } = params;

    if (!token) {
        return NextResponse.json(
            { message: 'ไม่พบ token กรุณาเข้าสู่ระบบก่อน' },
            { status: 401 },
        );
    }

    const queryParam: Record<SearchParamsKeys, QueryParamValue> = {
        limit: limit ? limit : null,
        after: after ? after : null,
        before: before ? before : null,
    };

    try {
        const response = await axios.get<SpotifyUserRecentlyPlayed>(
            `${base_uri.spotify.original_uri}/me/player/recently-played` +
                QueryString(queryParam),
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return NextResponse.json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const ErrorStatus = error.response.status;
            const ErrorMessage = getRecentlyPlayedError(ErrorStatus);
            return NextResponse.json(
                { message: ErrorMessage },
                { status: ErrorStatus },
            );
        } else if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: 'Internal Server Error',
                    error: error ? error.message : 'Unknow Error',
                },
                { status: 500 },
            );
        }

        return NextResponse.json(
            {
                message:
                    'เกืดข้อผิดพลาดในการดึงเพลงที่เพิ่งเล่น กรุณาลองใหม่อีกครั้ง',
            },
            { status: 500 },
        );
    }
}
