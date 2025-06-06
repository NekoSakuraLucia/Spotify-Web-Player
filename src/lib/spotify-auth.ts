'use server';
import { redirect } from 'next/navigation';
import qs from 'querystring';

// BASE_URI
import { base_uri } from '@/lib/base.api';

// Client ID
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
// Redirect URI
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI as string;

export default async function SpotifyAuth(): Promise<never> {
    const queryParam = {
        client_id: CLIENT_ID,
        scope: 'user-read-private user-read-email user-top-read',
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
    };
    return redirect(
        `${base_uri.spotify.accounts_uri}/authorize?` + qs.stringify(queryParam)
    );
}
