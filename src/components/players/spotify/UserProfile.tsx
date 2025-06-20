/* eslint-disable @next/next/no-img-element */
'use client';

// React
import { useState, useRef, useEffect } from 'react';

// Icon
import { LogOut, ChevronDown } from 'lucide-react';
import { FaSpotify } from 'react-icons/fa';

// Types
import type { SpotifyUserProfile } from '@/types/spotify_user_profile';

interface UserProfileProps {
    user: SpotifyUserProfile;
    logout: () => void;
}

const UserProfile = ({ user, logout }: UserProfileProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='relative z-50' ref={dropdownRef}>
            {/* Profile Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center gap-2 p-1 pr-3 rounded-full
                    bg-black/20 hover:bg-black/40 transition-all duration-200'
            >
                {/* Avatar */}
                {user.images?.[0] ? (
                    <img
                        src={user.images[0].url}
                        alt={user.display_name}
                        className='w-8 h-8 rounded-full object-cover'
                        draggable={false}
                    />
                ) : (
                    <div className='w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center'>
                        <FaSpotify className='w-4 h-4 text-green-500/70' />
                    </div>
                )}

                <span className='text-sm font-medium text-white'>
                    {user.display_name}
                </span>

                <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-200
                        ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className='absolute right-0 mt-2 w-56 rounded-xl overflow-hidden
                    backdrop-blur-xl bg-zinc-900/95 border border-white/10 shadow-xl'
                >
                    {/* User Info Section */}
                    <div className='p-4 border-b border-white/10'>
                        <div className='flex items-center gap-3 mb-3'>
                            {user.images?.[0] ? (
                                <img
                                    src={user.images[0].url}
                                    alt={user.display_name}
                                    className='w-10 h-10 rounded-full object-cover ring-2 ring-green-500/20'
                                />
                            ) : (
                                <div className='w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center'>
                                    <FaSpotify className='w-5 h-5 text-green-500/70' />
                                </div>
                            )}
                            <div className='flex-1 min-w-0'>
                                <h3 className='text-sm font-medium text-white truncate'>
                                    {user.display_name}
                                </h3>
                                <p className='text-xs text-zinc-400 truncate'>
                                    {user.email}
                                </p>
                            </div>
                        </div>
                        <div className='flex items-center gap-2 text-xs'>
                            <span className='px-2 py-1 rounded-full bg-white/5 text-zinc-400'>
                                {user.country}
                            </span>
                            <span className='px-2 py-1 rounded-full bg-green-500/10 text-green-400 font-medium'>
                                {user.product === 'premium'
                                    ? 'Premium'
                                    : 'Free'}
                            </span>
                        </div>
                    </div>

                    {/* Menu Items */}
                    <div className='p-1'>
                        <button
                            onClick={logout}
                            className='w-full flex items-center gap-3 px-3 py-2 text-sm text-zinc-300
                                hover:bg-white/5 rounded-lg transition-colors'
                        >
                            <LogOut className='w-4 h-4' />
                            Log out
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export { UserProfile };
