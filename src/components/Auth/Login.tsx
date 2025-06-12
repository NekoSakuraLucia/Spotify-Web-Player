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
        <div className='relative min-h-screen overflow-hidden bg-[#121212]'>
            {/* Background Decoration */}
            <div className='absolute -top-40 -right-40 w-96 h-96 bg-green-500/30 rounded-full blur-3xl' />
            <div className='absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl' />

            {/* Login Container */}
            <div className='relative z-10 min-h-screen flex items-center justify-center p-5'>
                <div className='w-full max-w-md backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 p-8'>
                    {/* Logo Section */}
                    <div className='flex flex-col items-center mb-10'>
                        <div className='relative'>
                            <FaSpotify className='relative z-10 text-green-500 w-16 h-16' />
                        </div>
                        <h1 className='mt-4 text-4xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent'>
                            Spotify
                        </h1>
                    </div>

                    {/* Welcome Text */}
                    <div className='text-center mb-8'>
                        <h2 className='text-2xl font-bold text-white mb-2'>
                            ยินดีต้อนรับ
                        </h2>
                        <p className='text-zinc-400'>
                            เข้าสู่ระบบเพื่อเข้าถึงเพลงและพอดแคสต์ทั้งหมด
                        </p>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        className='group relative w-full bg-green-500 text-black font-bold py-3 px-8 rounded-full
                            hover:bg-green-400 transform transition-all duration-200 hover:scale-[1.02]
                            active:scale-[0.98] active:bg-green-600'
                    >
                        <span className='flex items-center justify-center gap-2'>
                            <FaSpotify className='w-5 h-5' />
                            เข้าสู่ระบบด้วย Spotify
                        </span>
                    </button>

                    {/* Sign Up Link */}
                    <div className='mt-8 text-center'>
                        <p className='text-zinc-400'>
                            ยังไม่มีบัญชีใช่ไหม?{' '}
                            <a
                                href='https://www.spotify.com/signup'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-green-500 hover:text-green-400 hover:underline 
                                    transition-colors font-medium'
                            >
                                ลงทะเบียนเพื่อใช้ Spotify
                            </a>
                        </p>
                    </div>

                    {/* Footer */}
                    <div className='mt-8 pt-6 border-t border-white/10'>
                        <p className='text-xs text-center text-zinc-500'>
                            การเข้าสู่ระบบจะเป็นการยอมรับ{' '}
                            <a
                                href='https://www.spotify.com/legal/end-user-agreement/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-zinc-400 hover:text-white transition-colors'
                            >
                                ข้อกำหนดการใช้งาน
                            </a>{' '}
                            และ{' '}
                            <a
                                href='https://www.spotify.com/legal/privacy-policy/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-zinc-400 hover:text-white transition-colors'
                            >
                                นโยบายความเป็นส่วนตัว
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Login };
