'use client';
// React
import { createContext, useCallback, useEffect, useState } from 'react';

// Axios
import axios, { AxiosError } from 'axios';

// Action
import { SpotifyLogout } from '@/actions/CookiesAction';

// Type
import type { SpotifyUserProfile } from '@/app/api/spotify/me/route';

export type UserContextProvider = {
    user: SpotifyUserProfile | null;
    logout: () => void;
};

interface UserProviderProps {
    children: React.ReactNode;
    tokenValue: string | undefined;
}

// Context
const UserContext = createContext<UserContextProvider | null>(null);

// Provider
const UserProvider = ({
    children,
    tokenValue,
}: Readonly<UserProviderProps>) => {
    const [user, setUserData] = useState<SpotifyUserProfile | null>(null);

    useEffect(() => {
        const fetchUserData = async (): Promise<void> => {
            if (!tokenValue) return;

            try {
                const response = await axios.get<SpotifyUserProfile>(
                    '/api/spotify/me'
                );

                const data = response.data;
                setUserData(data);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    const errorMessage = (error.response.data as AxiosError)
                        .message;
                    console.error(errorMessage);
                } else if (error instanceof Error) {
                    console.error(
                        'เกิดข้อผิดพลาดในระหว่างเซิฟเวอร์:',
                        error.message
                    );
                } else {
                    console.error('เกิดข้อผิดพลาดที่ไม่รู้จัก');
                }
            }
        };

        fetchUserData();
    }, [tokenValue]);

    // สำหรับออกจากระบบ (แค่ลบคุกกี้ access_token ออก)
    const logout = useCallback(async (): Promise<void> => {
        try {
            const result = await SpotifyLogout();
            if (result.success) {
                setUserData(null);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                console.error('เกิดข้อผิดพลาดในการออกจากระบบ:', result.message);
            }
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการออกจากระบบ:', error);
            setUserData(null);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };
