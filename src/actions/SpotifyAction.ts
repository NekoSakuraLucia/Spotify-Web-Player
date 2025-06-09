'use client';
// axios
import axios, { AxiosError } from 'axios';

// Types
import type { SpotifyUserArtists } from '@/types/spotify_artists';
interface IActionResponse<Types> {
    success: boolean;
    message?: string;
    result?: Types;
}

export async function TopArtists(): Promise<
    IActionResponse<SpotifyUserArtists>
> {
    try {
        const response = await axios.get<SpotifyUserArtists>(
            '/api/spotify/me/top/artists?limit=3'
        );

        const ArtistsData = response.data;
        return { success: true, result: ArtistsData };
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            const ErrorMessage = (error.response.data as AxiosError).message;
            return { success: false, message: ErrorMessage };
        } else if (error instanceof Error) {
            return {
                success: false,
                message: `Internal Server Error: ${error.message}`,
            };
        }

        return {
            success: false,
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลศิลปิน กรุณาลองใหม่อีกครั้ง',
        };
    }
}
