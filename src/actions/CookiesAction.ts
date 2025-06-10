'use server';
import { cookies } from 'next/headers';

type LogoutResponse = {
    success: boolean;
    message?: string;
};

const COOKIES_NAME = process.env.SPOTIFY_CALLBACK_COOKIES as string;

export async function AccessToken(): Promise<string | undefined> {
    const cookiesStore = await cookies();
    return cookiesStore.get(COOKIES_NAME)?.value;
}

export async function SpotifyLogout(): Promise<LogoutResponse> {
    const cookiesStore = await cookies();

    try {
        cookiesStore.delete(COOKIES_NAME);
        return { success: true };
    } catch (error) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : 'ข้อผิดพลาดที่ไม่รู้จักระหว่างการออกจากระบบ';
        return { success: false, message: errorMessage };
    }
}
