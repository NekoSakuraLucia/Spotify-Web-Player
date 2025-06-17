// Next
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// axios
import axios from 'axios';

// BASE_URI
import { base_uri } from '@/lib/base.api';

// Error
import { getRecentlyPlayedError } from '@/error/GetRecentlyPlayed.error';

// Types
import type { IResponse } from '@/types/spotify';
import type { SpotifyUserRecentlyPlayed } from '@/types/spotify_recently_played';

// Cookie Name
const COOKIES_NAME = process.env.SPOTIFY_CALLBACK_COOKIES as string;

export async function GET(): Promise<
    NextResponse<IResponse> | NextResponse<SpotifyUserRecentlyPlayed>
> {
    const CookiesStore = await cookies();
    const token = CookiesStore.get(COOKIES_NAME)?.value;

    if (!token) {
        return NextResponse.json(
            { message: 'ไม่พบ token กรุณาเข้าสู่ระบบก่อน' },
            { status: 401 },
        );
    }

    try {
        const response = await axios.get<SpotifyUserRecentlyPlayed>(
            `${base_uri.spotify.original_uri}/me/player/recently-played?limit=5`,
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
