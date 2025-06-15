// Next
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

// Query String (Lib)
import { QueryString } from '@/lib/players/QueryString.api.artists';

// Axios
import axios from 'axios';

// BASE_URI
import { base_uri } from '@/lib/base.api';

// Error
import { getArtistsErorr } from '@/error/GetArtists.error';

// Types
import type { IResponse } from '@/types/spotify';
import type { SpotifyUserArtists } from '@/types/spotify_artists';

// Cookie Name
const COOKIES_NAME = process.env.SPOTIFY_CALLBACK_COOKIES as string;

export async function GET(
    req: NextRequest,
): Promise<NextResponse<IResponse> | NextResponse<SpotifyUserArtists>> {
    const CookiesStore = await cookies();
    const token = CookiesStore.get(COOKIES_NAME)?.value;

    const searchParams = req.nextUrl.searchParams;
    const params = Object.fromEntries(searchParams.entries());
    const { limit, offset } = params;

    if (!token) {
        return NextResponse.json(
            { message: 'ไม่พบ token กรุณาเข้าสู่ระบบก่อน' },
            { status: 401 },
        );
    }

    const queryParam = {
        limit: limit ? limit : null,
        offset: offset ? offset : null,
    };

    try {
        const response = await axios.get<SpotifyUserArtists>(
            `${base_uri.spotify.original_uri}/me/top/artists` +
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
            const ErrorMessage = getArtistsErorr(ErrorStatus);
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
                    'เกิดข้อผิดพลาดในการดึงข้อมูลศิลปิน กรุณาลองใหม่อีกครั้ง',
            },
            { status: 500 },
        );
    }
}
