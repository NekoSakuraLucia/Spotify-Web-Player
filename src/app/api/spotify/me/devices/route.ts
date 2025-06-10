// Next
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Axios
import axios from 'axios';

// BASE_URI
import { base_uri } from '@/lib/base.api';

// Type
import type { SpotifyDevices } from '@/types/spotify_devices';

// Error
import { getDevicesError } from '@/error/GetDevices.error';

// Cookie Name
const COOKIES_NAME = process.env.SPOTIFY_CALLBACK_COOKIES as string;

export async function GET() {
    const CookiesStore = await cookies();
    const token = CookiesStore.get(COOKIES_NAME)?.value;

    if (!token) {
        return NextResponse.json(
            { message: 'ไม่พบ token กรุณาเข้าสู่ระบบก่อน' },
            { status: 401 }
        );
    }

    try {
        const response = await axios.get<SpotifyDevices>(
            `${base_uri.spotify.original_uri}/me/player/devices`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return NextResponse.json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const ErrorStatus = error.response.status;
            const ErrorMessage = getDevicesError(ErrorStatus);
            return NextResponse.json(
                { message: ErrorMessage },
                { status: ErrorStatus }
            );
        } else if (error instanceof Error) {
            return NextResponse.json(
                {
                    message: 'Internal Server Error',
                    error: error ? error.message : 'Unknow Error',
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                message:
                    'เกิดข้อผิดพลาดในการดึงข้อมูลอุปกรณ์ กรุณาลองใหม่อีกครั้ง',
            },
            { status: 500 }
        );
    }
}
