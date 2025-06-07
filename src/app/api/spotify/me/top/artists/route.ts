import axios from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// BASE_URI
import { base_uri } from '@/lib/base.api';
import { getArtistsErorr } from '@/error/GetArtists.error';

// Types
export interface SpotifyUserArtists {
    items: ArtistsItem[];
    total: number;
    limit: number;
    offset: number;
    href: string;
    next: string;
    previous: string | null;
}

export interface ArtistsItem {
    external_urls: ArtitstsExternalUrls;
    followers: ArtistsFollowers;
    genres: string[];
    href: string;
    id: string;
    images: ArtistsImage[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface ArtitstsExternalUrls {
    spotify: string;
}

export interface ArtistsFollowers {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    href: any;
    total: number;
}

export interface ArtistsImage {
    height: number;
    url: string;
    width: number;
}

export async function GET() {
    const CookiesStore = await cookies();
    const COOKIES_NAME = process.env.SPOTIFY_CALLBACK_COOKIES as string;
    const token = CookiesStore.get(COOKIES_NAME)?.value;

    if (!token) {
        return NextResponse.json(
            { message: 'ไม่พบ token กรุณาเข้าสู่ระบบก่อน' },
            { status: 401 }
        );
    }

    try {
        const response = await axios.get<SpotifyUserArtists>(
            `${base_uri.spotify.original_uri}/me/top/artists`,
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
            const ErrorMessage = getArtistsErorr(ErrorStatus);
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
                    'เกิดข้อผิดพลาดในการดึงข้อมูลศิลปิน กรุณาลองใหม่อีกครั้ง',
            },
            { status: 500 }
        );
    }
}
