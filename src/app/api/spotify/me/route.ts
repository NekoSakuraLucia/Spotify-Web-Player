import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { base_uri } from '@/lib/base.api';
import { getUserError } from '@/error/GetUser.error';

// ประเภทสำหรับการตอบสนองทั่วไป
interface IResponse {
    message: string;
    error?: string;
}

// ประเภทสำหรับข้อมูลโปรไฟล์ผู้ใช้ Spotify
export interface SpotifyUserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: ExplicitContent;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

// ประเภทสำหรับการกรองเนื้อหาโดยชัดแจ้ง
interface ExplicitContent {
    filter_enabled: boolean;
    filter_locked: boolean;
}

// ประเภทสำหรับ URL ภายนอก
interface ExternalUrls {
    spotify: string;
}

// ประเภทสำหรับผู้ติดตาม
interface Followers {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    href: any;
    total: number;
}

// ประเภทสำหรับรูปภาพโปรไฟล์
interface Image {
    height: number;
    url: string;
    width: number;
}

export async function GET(): Promise<
    NextResponse<IResponse> | NextResponse<SpotifyUserProfile>
> {
    const Cookies = await cookies();
    const COOKIES_NAME = process.env.SPOTIFY_CALLBACK_COOKIES as string;
    const token = Cookies.get(COOKIES_NAME)?.value;

    if (!token) {
        return NextResponse.json(
            { message: 'ไม่พบ token กรุณาเข้าสู่ระบบก่อน' },
            { status: 400 }
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
