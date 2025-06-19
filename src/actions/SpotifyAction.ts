'use client';
// axios
import axios, { AxiosError } from 'axios';

// Types
import type { SpotifyUserArtists } from '@/types/spotify_artists';
import type { SpotifyDevices } from '@/types/spotify_devices';
import type { SpotifyCurrentlyFullResponse } from '@/types/spotify_currently_playing';
import type { SpotifyUserRecentlyPlayed } from '@/types/spotify_recently_played';

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
            '/api/spotify/me/top/artists?limit=4',
        );

        const ArtistsData = response.data;
        if (ArtistsData.items.length > 0) {
            return { success: true, result: ArtistsData };
        }

        return { success: false, message: 'ไม่พบศิลปินยอดนิยมของคุณ' };
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
    IActionResponse<SpotifyCurrentlyFullResponse>
> {
    try {
        const response = await axios.get<SpotifyCurrentlyFullResponse>(
            '/api/spotify/me/currently-playing',
        );

        const PlayingData = response.data;
        if (
            PlayingData.resultPlaying.item &&
            PlayingData.resultPlaying.currently_playing_type === 'track'
        ) {
            return { success: true, result: PlayingData };
        }

        return {
            success: false,
            message: 'ไม่พบเพลงที่กำลังเล่นอยู่ในขณะนี้',
        };
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

export async function DevicesPlayer(): Promise<
    IActionResponse<SpotifyDevices>
> {
    try {
        const response = await axios.get<SpotifyDevices>(
            '/api/spotify/me/devices',
        );

        const devicesData = response.data;
        if (devicesData.devices.length > 0) {
            return { success: true, result: devicesData };
        }

        return {
            success: false,
            message:
                'ไม่พบอุปกรณ์ Spotify กรุณาเปิด Spotify บนอุปกรณ์ของคุณก่อน',
        };
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
            message: 'เกิดข้อผิดพลาดในการดึงข้อมูลอุปกรณ์ กรุณาลองใหม่อีกครั้ง',
        };
    }
}

export async function RecentlyPlayed(): Promise<
    IActionResponse<SpotifyUserRecentlyPlayed>
> {
    try {
        const response = await axios.get<SpotifyUserRecentlyPlayed>(
            '/api/spotify/me/recently-played?limit=5',
        );

        const recentlyPlayedData = response.data;
        if (recentlyPlayedData.items.length > 0) {
            return { success: true, result: recentlyPlayedData };
        }

        return { success: false, message: 'ไม่พบเพลงที่เพิ่งเล่น' };
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
                'เกิดข้อผิดพลาดในการดึงข้อมูลเพลงที่เพิ่งเล่น กรุณาลองใหม่อีกครั้ง',
        };
    }
}
