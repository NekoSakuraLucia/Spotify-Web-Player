// Next
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Axios
import axios from 'axios';

// Query string
import qs from 'querystring';

// BASE_URI
import { base_uri } from '@/lib/base.api';

// Types
import { IResponse } from '@/types/spotify';
import { SpotifyRefreshToken } from '@/types/spotify';

// Client ID
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
// Client Secret
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string;
// Cookies Name
const SPOTIFY_REFRESH_TOKEN_COOKIES = process.env
    .SPOTIFY_REFRESH_TOKEN_COOKIES as string;

export async function GET(): Promise<
    NextResponse<IResponse> | NextResponse<SpotifyRefreshToken>
> {
    const CookiesStore = await cookies();
    const refresh_token = CookiesStore.get(
        SPOTIFY_REFRESH_TOKEN_COOKIES,
    )?.value;

    if (!refresh_token) {
        return NextResponse.json(
            { message: 'ไม่พบ refresh_token กรุณาเข้าสู่ระบบก่อน' },
            { status: 401 },
        );
    }

    const queryParam: Record<'grant_type' | 'refresh_token', string> = {
        grant_type: 'refresh_token',
        refresh_token: refresh_token,
    };

    try {
        const response = await axios.post<SpotifyRefreshToken>(
            `${base_uri.spotify.accounts_uri}/api/token`,
            qs.stringify(queryParam),
            {
                headers: {
                    Authorization:
                        'Basic ' +
                        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
                            'base64',
                        ),
                },
            },
        );

        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json(
            {
                message: 'Internal Server Error',
                error: error instanceof Error ? error.message : 'Unknow Error',
            },
            { status: 500 },
        );
    }
}
