// Next
import { NextRequest, NextResponse } from 'next/server';

// axios && querystring
import axios from 'axios';
import qs from 'querystring';

// BASE URI
import { base_uri } from '@/lib/base.api';

// Type
import type { IResponse, SpotifyToken, CallbackParam } from '@/types/spotify';

// Client ID
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
// Client Secret
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string;
// Redirect URI
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI as string;
// Cookies Name
const COOKIES_NAME = process.env.SPOTIFY_CALLBACK_COOKIES as string;
const SPOTIFY_REFRESH_TOKEN_COOKIES = process.env
    .SPOTIFY_REFRESH_TOKEN_COOKIES as string;

export async function GET(
    request: NextRequest,
): Promise<NextResponse<IResponse> | NextResponse<unknown>> {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code') as string;

    if (!code) {
        return NextResponse.json(
            { message: 'ไม่พบ code ที่ส่งมา' },
            { status: 400 },
        );
    }

    const queryParam: CallbackParam = {
        code: code,
        redirect_uri: REDIRECT_URI,
        grant_type: 'authorization_code',
    };

    try {
        const response = await axios.post<SpotifyToken>(
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

        const { access_token, refresh_token, expires_in } = response.data;
        const redirectURL = new URL('/', request.nextUrl.origin);
        const redirectResponse = NextResponse.redirect(redirectURL);

        redirectResponse.cookies.set(COOKIES_NAME, access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: expires_in,
            sameSite: 'lax',
        });

        redirectResponse.cookies.set(
            SPOTIFY_REFRESH_TOKEN_COOKIES,
            refresh_token,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
                maxAge: 30 * 24 * 60 * 60 * 1000,
                sameSite: 'lax',
            },
        );

        return redirectResponse;
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
