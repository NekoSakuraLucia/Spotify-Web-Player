'use server';
import { redirect } from 'next/navigation';
import qs from 'querystring';

export default async function SpotifyAuth(): Promise<never> {
    const queryParam = {
        client_id: process.env.SPOTIFY_CLIENT_ID as string,
        scope: 'user-read-private user-read-email',
        response_type: 'code',
        redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
    };
    return redirect(
        'https://accounts.spotify.com/authorize?' + qs.stringify(queryParam)
    );
}
