/* eslint-disable @next/next/no-img-element */
'use client';
// React
import { Fragment, useEffect, useState } from 'react';

// Icon
import { PlayIcon } from 'lucide-react';

// Action
import { RecentlyPlayed } from '@/actions/SpotifyAction';

// Lib
import { handleApiErrorFetch } from '@/lib/handleApiErrorFetch';

// Types
import type { SpotifyUserRecentlyPlayed } from '@/types/spotify_recently_played';

const Recently_Played = () => {
    const [recentlyPlayed, setRecentlyPlayed] =
        useState<SpotifyUserRecentlyPlayed | null>(null);

    const fetchRecentlyPlayed = async (): Promise<boolean> => {
        const response = await RecentlyPlayed();

        if (response.success && response.result) {
            setRecentlyPlayed(response.result);
            return true;
        }

        setRecentlyPlayed(null);
        return false;
    };

    useEffect(() => {
        handleApiErrorFetch(fetchRecentlyPlayed, 'ไม่พบข้อมูลเพลงที่เพิ่งเล่น');
    }, []);

    if (!recentlyPlayed)
        return (
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4'>
                {Array.from({ length: 5 })
                    .fill(0)
                    .map((_, index) => (
                        <div
                            key={index + 1}
                            className='bg-zinc-900/50 rounded-lg p-3 animate-pulse'
                        >
                            <div className='aspect-square rounded-lg overflow-hidden mb-3'>
                                <div className='w-full h-full bg-neutral-900'></div>
                            </div>
                            <div className='h-2 w-full bg-neutral-900 mb-2'></div>
                            <div className='h-2 w-42 bg-neutral-900'></div>
                        </div>
                    ))}
            </div>
        );

    return (
        <section className='mb-8'>
            <h2 className='text-2xl font-bold text-zinc-100 mb-6'>
                Recently played
            </h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4'>
                {recentlyPlayed.items.map((item) => (
                    <div
                        key={item.track.id}
                        className='group relative bg-zinc-900/50 rounded-lg p-3 hover:bg-zinc-800/50 transition-all duration-300'
                    >
                        <div className='relative aspect-square rounded-lg overflow-hidden mb-3'>
                            {item.track.album.images?.[0] && (
                                <img
                                    src={item.track.album.images[0].url}
                                    alt={item.track.name}
                                    className='object-cover w-full h-full group-hover:scale-105 transition-all duration-300'
                                />
                            )}
                            <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors' />
                            <button className='absolute right-2 bottom-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'>
                                <div className='p-2 rounded-full bg-green-500 hover:bg-green-400 shadow-xl'>
                                    <PlayIcon className='h-5 w-5 text-black' />
                                </div>
                            </button>
                        </div>
                        <h3 className='font-medium text-zinc-100 group-hover:text-green-400'>
                            {item.track.name}
                        </h3>
                        <p className='text-sm text-zinc-400'>
                            {item.track.artists.map((artist, index) => (
                                <Fragment key={artist.id}>
                                    {artist.name}
                                    {index < item.track.artists.length - 1 &&
                                        ', '}
                                </Fragment>
                            ))}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export { Recently_Played };
