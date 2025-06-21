/* eslint-disable @next/next/no-img-element */
'use client';
// React
import React, { useEffect, useState } from 'react';

// Context
import { useGetUser } from '@/context/userContext';

// Action
import { TopArtists } from '@/actions/SpotifyAction';

// Lib
import { handleApiErrorFetch } from '@/lib/handleApiErrorFetch';

// shadcn/ui components
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';

import { UserProfile } from '@/components/players/spotify/UserProfile';
import { Currently_Playing } from '@/components/players/spotify/Currently-Playing';
import { AuthenticationModal } from '@/components/players/spotify/ForceLogin/AuthenticationModal';
import { ArtistsModal } from '@/components/players/spotify/artists/ArtistsModal';
import { Recently_Played } from '@/components/players/spotify/Recently-Played';

// Mock
import { INITIAL_ARTIST_STATE } from '@/mock/INITIAL_ARTIST.mock';

// Type
import type { SpotifyUserArtists } from '@/types/spotify_artists';

const Home = () => {
    const [artistsData, setArtistsData] = useState<SpotifyUserArtists | null>(
        null,
    );
    const { user, logout } = useGetUser();

    // ArtistsModal
    const [isArtistsOpen, setIsArtistsOpen] = useState<boolean>(false);
    const [isArtistsData, setIsArtistsData] =
        useState<SpotifyUserArtists>(INITIAL_ARTIST_STATE);

    const fetchArtists = async (): Promise<boolean> => {
        const result = await TopArtists();

        if (result.success && result.result) {
            setArtistsData(result.result);
            return true;
        }

        setArtistsData(null);
        return false;
    };

    const handleArtistsModal = (artist: SpotifyUserArtists['items'][0]) => {
        setIsArtistsOpen(true);
        setIsArtistsData({
            items: [artist],
            total: 1,
            limit: 1,
            offset: 0,
            href: artist.href,
            next: '',
            previous: null,
        });
    };

    useEffect(() => {
        if (!user) return;
        handleApiErrorFetch(fetchArtists, 'ไม่พบข้อมูลศิลปิน');
    }, [user]);

    if (!user) return <AuthenticationModal />;

    return (
        <>
            <ArtistsModal
                isOpen={isArtistsOpen}
                onClose={() => setIsArtistsOpen(false)}
                artists={isArtistsData}
            />

            <div className='relative min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900'>
                <ScrollArea className='h-[calc(100vh-80px)]'>
                    {/* 80px for player height */}
                    <div className='px-4 py-6 md:px-6 lg:px-8'>
                        {/* Top Section */}
                        <div className='grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8'>
                            <div className='lg:col-span-3'>
                                {user && (
                                    <UserProfile user={user} logout={logout} />
                                )}
                            </div>
                        </div>

                        {/* Artists Section */}
                        <section className='mb-8'>
                            <h2 className='text-2xl font-bold text-zinc-100 mb-6'>
                                Made for you
                            </h2>
                            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4'>
                                {!artistsData ? (
                                    <>
                                        {Array.from({ length: 4 })
                                            .fill(0)
                                            .map((_, index) => (
                                                <div
                                                    key={index + 1}
                                                    className='animate-pulse'
                                                >
                                                    <div className='aspect-square rounded-lg overflow-hidden mb-3'>
                                                        <div className='w-full h-full bg-neutral-900'></div>
                                                    </div>
                                                    <div className='h-2 w-full bg-neutral-900 mb-2'></div>
                                                    <div className='h-2 w-42 bg-neutral-900'></div>
                                                </div>
                                            ))}
                                    </>
                                ) : (
                                    <>
                                        {artistsData.items?.map((artist) => (
                                            <HoverCard key={artist.id}>
                                                <HoverCardTrigger asChild>
                                                    <button className='group text-left'>
                                                        <div className='relative aspect-square rounded-lg overflow-hidden bg-zinc-900/50 mb-3'>
                                                            <img
                                                                src={
                                                                    artist
                                                                        .images[0]
                                                                        .url
                                                                }
                                                                alt={
                                                                    artist.name
                                                                }
                                                                className='object-cover w-full h-full group-hover:scale-105 transition-all duration-300'
                                                            />
                                                            <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors' />
                                                        </div>
                                                        <h3 className='font-medium text-zinc-100 group-hover:text-green-400 transition-colors'>
                                                            {artist.name}
                                                        </h3>
                                                        <p className='text-sm text-zinc-400'>
                                                            {artist.followers.total.toLocaleString()}{' '}
                                                            followers
                                                        </p>
                                                    </button>
                                                </HoverCardTrigger>
                                                <HoverCardContent className='w-80 p-0 bg-zinc-900/95 border border-zinc-800 rounded-xl overflow-hidden'>
                                                    {/* ภาพปกพร้อมการซ้อนทับแบบไล่เฉดสี */}
                                                    <div className='relative h-32 w-full'>
                                                        {artist.images?.[0] && (
                                                            <img
                                                                src={
                                                                    artist
                                                                        .images[0]
                                                                        .url
                                                                }
                                                                alt={
                                                                    artist.name
                                                                }
                                                                className='w-full h-full object-cover'
                                                            />
                                                        )}
                                                        <div className='absolute inset-0 bg-gradient-to-b from-black/40 to-black/80' />
                                                        <div className='absolute bottom-4 left-4'>
                                                            <h3 className='text-2xl font-bold text-white mb-1'>
                                                                {artist.name}
                                                            </h3>
                                                            <p className='text-sm text-zinc-300'>
                                                                Artist
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Artist Stats */}
                                                    <div className='p-4 space-y-4'>
                                                        <div className='flex items-center justify-between'>
                                                            <div>
                                                                <p className='text-sm text-zinc-400'>
                                                                    Monthly
                                                                    Listeners
                                                                </p>
                                                                <p className='text-white font-medium'>
                                                                    {artist.followers.total.toLocaleString()}
                                                                </p>
                                                            </div>
                                                            <button
                                                                onClick={() =>
                                                                    handleArtistsModal(
                                                                        artist,
                                                                    )
                                                                }
                                                                className='px-6 py-2 rounded-full bg-green-500 hover:bg-green-400
                    text-black font-medium text-sm transition-colors cursor-pointer'
                                                            >
                                                                ดูโปรไฟล์
                                                            </button>
                                                        </div>

                                                        {/* Popularity Bar */}
                                                        <div>
                                                            <div className='flex items-center justify-between text-sm mb-2'>
                                                                <span className='text-zinc-400'>
                                                                    Popularity
                                                                </span>
                                                                <span className='text-white font-medium'>
                                                                    {
                                                                        artist.popularity
                                                                    }
                                                                    %
                                                                </span>
                                                            </div>
                                                            <div className='h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden'>
                                                                <div
                                                                    className='h-full bg-green-500 rounded-full'
                                                                    style={{
                                                                        width: `${artist.popularity}%`,
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>

                                                        {/* Genres */}
                                                        {artist.genres.length >
                                                            0 && (
                                                            <div>
                                                                <p className='text-sm text-zinc-400 mb-2'>
                                                                    Genres
                                                                </p>
                                                                <div className='flex flex-wrap gap-2'>
                                                                    {artist.genres
                                                                        .slice(
                                                                            0,
                                                                            3,
                                                                        )
                                                                        .map(
                                                                            (
                                                                                genre,
                                                                            ) => (
                                                                                <span
                                                                                    key={
                                                                                        genre
                                                                                    }
                                                                                    className='px-3 py-1 rounded-full text-xs font-medium
                                    bg-white/10 text-zinc-300 hover:bg-white/20
                                    transition-colors cursor-pointer'
                                                                                >
                                                                                    {
                                                                                        genre
                                                                                    }
                                                                                </span>
                                                                            ),
                                                                        )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </HoverCardContent>
                                            </HoverCard>
                                        ))}
                                    </>
                                )}
                            </div>
                        </section>

                        {/* Recently Played Section */}
                        <Recently_Played />
                    </div>
                </ScrollArea>

                <Currently_Playing />
            </div>
        </>
    );
};

export { Home };
