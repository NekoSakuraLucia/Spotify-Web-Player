// Next
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { cookies } from 'next/headers';
// CSS
import './globals.css';

// toastify
import { ToastContainer, Slide } from 'react-toastify';

// Context
import { UserProvider } from '@/context/userContextProvider';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Spotify Web Player',
    description: 'A website player for controlling music on Spotify using all original APIs.',
};

// Cookie Name
const COOKIES_NAME = process.env.SPOTIFY_CALLBACK_COOKIES as string;

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookiesStore = await cookies();
    const token = cookiesStore.get(COOKIES_NAME)?.value;

    return (
        <html lang='en' className='dark'>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <UserProvider tokenValue={token}>{children}</UserProvider>
                <ToastContainer
                    position='bottom-right'
                    transition={Slide}
                    theme='dark'
                />
            </body>
        </html>
    );
}
