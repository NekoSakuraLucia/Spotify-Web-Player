// Next
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Axios
import axios from 'axios';

// BASE_URI
import { base_uri } from '@/lib/base.api';

// Error
import { getCurrentlyPlayingError } from '@/error/GetCurrentlyPlaying.error';

// Types
import type { IResponse } from '@/types/spotify';
import type { SpotifyCurrentlyUserPlaying } from '@/types/spotify_currently_playing';
import type { SpotifyDevices } from '@/types/spotify_devices';

// Cookie Name
const COOKIES_NAME = process.env.SPOTIFY_CALLBACK_COOKIES as string;

export async function GET(): Promise<
    | NextResponse<IResponse>
    | NextResponse<SpotifyCurrentlyUserPlaying | SpotifyDevices>
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
        const responseDevices = await axios.get<SpotifyDevices>(
            `${base_uri.spotify.original_uri}/me/player/devices`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        const responsePlaying = await axios.get<SpotifyCurrentlyUserPlaying>(
            `${base_uri.spotify.original_uri}/me/player/currently-playing`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        const result = {
            ...responseDevices.data,
            resultPlaying: responsePlaying.data,
        };
        if (
            result.resultPlaying.item &&
            result.resultPlaying.currently_playing_type === 'track'
        ) {
            return NextResponse.json(result);
        }

        return NextResponse.json(
            { message: 'ไม่พบเพลงที่กำลังเล่นอยู่' },
            { status: 404 },
        );
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const ErrorStatus = error.response.status;
            const ErrorMessage = getCurrentlyPlayingError(ErrorStatus);
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
                    'เกิดข้อผิดพลาดในการดึงข้อมูลเพลงที่กำลังเล่นปัจจุบัน กรุณาลองใหม่อีกครั้ง',
            },
            { status: 500 },
        );
    }
}
