'use server';
import { redirect } from 'next/navigation';
import qs from 'querystring';

// BASE_URI
import { base_uri } from '@/lib/base.api';

// constant
import { AuthScope } from '@/lib/constant';

// Client ID
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
// Redirect URI
const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI as string;

export default async function SpotifyAuth(): Promise<never> {
    const queryParam = {
        client_id: CLIENT_ID,
        scope: AuthScope.join(' '),
        response_type: 'code',
        redirect_uri: REDIRECT_URI,
    };

    const authorization = `${base_uri.spotify.accounts_uri}/authorize?` + qs.stringify(queryParam)
    return redirect(authorization);
}
