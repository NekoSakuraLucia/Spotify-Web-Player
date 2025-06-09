'use client';
// axios
import axios, { AxiosError } from 'axios';

// Types
import type { SpotifyUserArtists } from '@/types/spotify_artists';
import type { SpotifyCurrentlyUserPlaying } from '@/types/spotify_currently_playing';

// ประเภทของผลลัพธ์ที่ส่งกลับจากฟังก์ชัน
interface IActionResponse<Types> {
    success: boolean;
    message?: string;
    result?: Types;
}

// ฟังก์ชันสำหรับดึงข้อมูลศิลปินยอดนิยมของผู้ใช้ Spotify
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

// ฟังก์ชันสำหรับดึงข้อมูลเพลงที่กำลังเล่นของผู้ใช้ Spotify
export async function CurrentlyPlaying(): Promise<
    IActionResponse<SpotifyCurrentlyUserPlaying>
> {
    try {
        const response = await axios.get<SpotifyCurrentlyUserPlaying>(
            '/api/spotify/me/currently-playing'
        );

        const PlayingData = response.data;
        if (
            PlayingData.item &&
            PlayingData.currently_playing_type === 'track'
        ) {
            return { success: true, result: PlayingData };
        }

        return { success: false, message: 'ไม่พบเพลงที่กำลังเล่นในขณะนี้' };
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
            message:
                'เกิดข้อผิดพลาดในการดึงข้อมูลเพลงที่กำลังเล่น กรุณาลองใหม่อีกครั้ง',
        };
    }
}
