'use client';

// Auth
import SpotifyAuth from '@/lib/spotify-auth';

// Icon
import { FaSpotify } from 'react-icons/fa';

const Login = () => {
    const handleLogin = () => {
        SpotifyAuth();
    };

    return (
        <div className='min-h-screen bg-gradient-to-b from-zinc-900 to-black flex items-center justify-center p-5'>
            <div className='flex flex-col items-center w-full -mt-24'>
                {/* Header with Spotify Logo */}
                <div className='mb-8'>
                    <div className='flex items-center gap-2'>
                        <FaSpotify className='text-[#1DB954] w-12 h-12' />
                        <span className='text-white text-3xl font-bold'>
                            Spotify
                        </span>
                    </div>
                </div>

                {/* Divider */}
                <div className='w-full max-w-[450px] mb-8 border-b border-zinc-800' />

                {/* Login Content */}
                <div className='w-full max-w-[450px] text-center'>
                    <h2 className='text-white text-3xl font-bold mb-8'>
                        เข้าสู่ระบบ Spotify
                    </h2>

                    <button
                        onClick={handleLogin}
                        className='cursor-pointer w-full bg-[#1DB954] text-black font-bold py-3 px-8 rounded-full 
                             hover:scale-105 transition-transform duration-200'
                    >
                        เข้าสู่ระบบด้วย Spotify
                    </button>

                    <div className='mt-8'>
                        <p className='text-zinc-400'>
                            ยังไม่มีบัญชีใช่ไหม?{' '}
                            <a
                                href='https://www.spotify.com/signup'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-white hover:underline'
                            >
                                ลงทะเบียนเพื่อใช้ Spotify
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Login };
