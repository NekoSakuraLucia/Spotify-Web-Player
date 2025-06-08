// Next
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

// axios
import axios from 'axios';

// BASE_URI
import { base_uri } from '@/lib/base.api';

// Error
import { getUserError } from '@/error/GetUser.error';

// Type
import type { IResponse, SpotifyUserProfile } from '@/types/spotify';

// Cookie Name
const COOKIES_NAME = process.env.SPOTIFY_CALLBACK_COOKIES as string;

export async function GET(): Promise<
    NextResponse<IResponse> | NextResponse<SpotifyUserProfile>
> {
    const Cookies = await cookies();
    const token = Cookies.get(COOKIES_NAME)?.value;

    if (!token) {
        return NextResponse.json(
            { message: 'ไม่พบ token กรุณาเข้าสู่ระบบก่อน' },
            { status: 401 }
        );
    }

    try {
        const response = await axios.get<SpotifyUserProfile>(
            `${base_uri.spotify.original_uri}/me`,
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
            const ErrorMessage = getUserError(ErrorStatus);
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
                    'เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้ กรุณาลองใหม่อีกครั้ง',
            },
            { status: 500 }
        );
    }
}
