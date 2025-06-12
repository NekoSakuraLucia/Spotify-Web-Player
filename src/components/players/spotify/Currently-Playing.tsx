/* eslint-disable @next/next/no-img-element */
'use client';

// React
import { Fragment, useState, useEffect } from 'react';

// Action
import { CurrentlyPlaying } from '@/actions/SpotifyAction';

// Icon
import {
    IoPlayCircle,
    IoPauseCircle,
    IoShuffleOutline,
    IoRepeatOutline,
} from 'react-icons/io5';
import { BiSkipPrevious, BiSkipNext, BiVolumeFull } from 'react-icons/bi';

// Type
import type { SpotifyCurrentlyFullResponse } from '@/types/spotify_currently_playing';

const Currently_Playing = () => {
    const [currentlyPlaying, setCurrentlyPlaying] =
        useState<SpotifyCurrentlyFullResponse | null>(null);

    useEffect(() => {
        const fetchCurrentlyPlaying = async () => {
            const result = await CurrentlyPlaying();
            if (result.success && result.result) {
                setCurrentlyPlaying(result.result);
            } else {
                setCurrentlyPlaying(null);
                const errorMessage = result.success
                    ? 'ไม่พบข้อมูลเพลงที่กำลังเล่น'
                    : `เกิดข้อผิดพลาดในการดึงข้อมูลเพลงที่กำลังเล่น: ${result.message}`;
                console.log(errorMessage);
            }
        };

        fetchCurrentlyPlaying();
    }, []);

    function msToTime(value: number): string {
        const totalSeconds = Math.floor(value / 1000);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const mm = minutes.toString().padStart(2, '0');
        const ss = seconds.toString().padStart(2, '0');

        return `${mm}:${ss}`;
    }

    if (!currentlyPlaying) return null;
    const progress =
        (currentlyPlaying.resultPlaying.progress_ms /
            currentlyPlaying.resultPlaying.item.duration_ms) *
        100;

    return (
        <div className='fixed bottom-0 left-0 right-0 h-20 backdrop-blur-xl bg-black/60 border-t border-white/10'>
            <div className='h-full container mx-auto px-4'>
                <div className='h-full flex items-center justify-between gap-4'>
                    {/* Song Info */}
                    <div className='flex items-center gap-4 min-w-0 w-[30%]'>
                        <div className='relative h-14 w-14 rounded-md overflow-hidden flex-shrink-0'>
                            <img
                                src={
                                    currentlyPlaying.resultPlaying.item.album
                                        .images[0].url
                                }
                                alt='Album Cover'
                                className='object-cover w-full h-full'
                            />
                        </div>
                        <div className='min-w-0'>
                            <h4 className='text-white font-medium truncate'>
                                {currentlyPlaying.resultPlaying.item.name}
                            </h4>
                            <p className='text-sm text-zinc-400 truncate'>
                                {currentlyPlaying.resultPlaying.item.artists.map(
                                    (artist, index) => (
                                        <Fragment key={artist.id}>
                                            {artist.name}
                                            {index <
                                                currentlyPlaying.resultPlaying
                                                    .item.artists.length -
                                                    1 && ', '}
                                        </Fragment>
                                    ),
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Player Controls */}
                    <div className='flex flex-col items-center gap-2 max-w-[45%] w-full'>
                        <div className='flex items-center gap-4'>
                            <button className='p-2 text-zinc-400 hover:text-white transition-colors'>
                                <IoShuffleOutline className='w-5 h-5' />
                            </button>
                            <button className='p-2 text-zinc-400 hover:text-white transition-colors'>
                                <BiSkipPrevious className='w-8 h-8' />
                            </button>
                            <button className='p-2 text-white hover:scale-105 transition-transform'>
                                {currentlyPlaying.resultPlaying.is_playing ? (
                                    <IoPauseCircle className='w-10 h-10' />
                                ) : (
                                    <IoPlayCircle className='w-10 h-10' />
                                )}
                            </button>
                            <button className='p-2 text-zinc-400 hover:text-white transition-colors'>
                                <BiSkipNext className='w-8 h-8' />
                            </button>
                            <button className='p-2 text-zinc-400 hover:text-white transition-colors'>
                                <IoRepeatOutline className='w-5 h-5' />
                            </button>
                        </div>

                        {/* Custom Progress Bar */}
                        <div className='w-full flex items-center gap-2 px-4'>
                            <span className='text-xs text-zinc-400 w-10 text-right'>
                                {msToTime(
                                    currentlyPlaying.resultPlaying.progress_ms,
                                )}
                            </span>
                            <div className='relative w-full h-1 group'>
                                <div className='absolute inset-0 rounded-full bg-white/10 cursor-pointer'>
                                    <div
                                        className='h-full rounded-full bg-white group-hover:bg-green-500 transition-colors'
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                                <div
                                    className='absolute h-3 w-3 rounded-full bg-white -translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity'
                                    style={{
                                        left: `${progress}%`,
                                        transform: `translateX(-50%) translateY(-25%)`,
                                    }}
                                />
                            </div>
                            <span className='text-xs text-zinc-400 w-10'>
                                {msToTime(
                                    currentlyPlaying.resultPlaying.item
                                        .duration_ms,
                                )}
                            </span>
                        </div>
                    </div>

                    {/* Volume Control */}
                    {currentlyPlaying.devices[0]?.supports_volume && (
                        <div className='flex items-center gap-3 w-[25%] justify-end'>
                            <button className='p-2 text-zinc-400 hover:text-white transition-colors'>
                                <BiVolumeFull className='w-5 h-5' />
                            </button>
                            <div className='relative w-24 h-1 group'>
                                <div className='absolute inset-0 rounded-full bg-white/10 cursor-pointer'>
                                    <div
                                        className='h-full rounded-full bg-white group-hover:bg-green-500 transition-colors'
                                        style={{
                                            width: `${currentlyPlaying.devices[0].volume_percent}%`,
                                        }}
                                    />
                                </div>
                                <div
                                    className='absolute h-3 w-3 rounded-full bg-white -translate-y-1 opacity-0 group-hover:opacity-100 transition-opacity'
                                    style={{
                                        left: `${currentlyPlaying.devices[0].volume_percent}%`,
                                        transform: `translateX(-50%) translateY(-25%)`,
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export { Currently_Playing };
