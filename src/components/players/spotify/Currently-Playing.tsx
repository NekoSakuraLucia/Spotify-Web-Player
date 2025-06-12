/* eslint-disable @next/next/no-img-element */
'use client';

// React
import { Fragment, useState, useEffect } from 'react';

// Action
import { CurrentlyPlaying } from '@/actions/SpotifyAction';

// shadcn-ui / Components
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

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
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const seconds = totalSeconds % 60;

        const mm = minutes.toString().padStart(2, '0')
        const ss = seconds.toString().padStart(2, '0')

        return `${mm}:${ss}`
    }

    return (
        <>
            {currentlyPlaying && (
                <div className='fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-black/60 border-t border-white/10 p-4'>
                    <div className='container mx-auto'>
                        <div className='flex items-center justify-between'>
                            {/* Song Info */}
                            <div className='flex items-center space-x-4'>
                                {currentlyPlaying.resultPlaying.item.album
                                    .images?.[0] && (
                                    <img
                                        src={
                                            currentlyPlaying.resultPlaying.item
                                                .album.images[0].url
                                        }
                                        alt='Album Cover'
                                        className='w-14 h-14 rounded-md shadow-lg ring-1 ring-white/10'
                                    />
                                )}
                                <div>
                                    <h4 className='text-white font-medium'>
                                        {currentlyPlaying.resultPlaying.item.name.substring(
                                            0,
                                            20,
                                        )}
                                    </h4>
                                    <p className='text-sm text-zinc-400'>
                                        {currentlyPlaying.resultPlaying.item.artists.map(
                                            (artist, index) => (
                                                <Fragment key={artist.id}>
                                                    {artist.name}
                                                    {index <
                                                        currentlyPlaying
                                                            .resultPlaying.item
                                                            .artists.length -
                                                            1 && ', '}
                                                </Fragment>
                                            ),
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Player Controls */}
                            <div className='flex flex-col items-center space-y-2 flex-1 max-w-2xl px-8'>
                                <div className='flex items-center space-x-4'>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        className='text-zinc-400 hover:text-white'
                                    >
                                        <IoShuffleOutline className='w-5 h-5' />
                                    </Button>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        className='text-zinc-400 hover:text-white'
                                    >
                                        <BiSkipPrevious className='w-8 h-8' />
                                    </Button>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        className='text-white hover:scale-105 transition'
                                    >
                                        {currentlyPlaying.resultPlaying
                                            .is_playing ? (
                                            <IoPauseCircle className='w-10 h-10' />
                                        ) : (
                                            <IoPlayCircle className='w-10 h-10' />
                                        )}
                                    </Button>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        className='text-zinc-400 hover:text-white'
                                    >
                                        <BiSkipNext className='w-8 h-8' />
                                    </Button>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        className='text-zinc-400 hover:text-white'
                                    >
                                        <IoRepeatOutline className='w-5 h-5' />
                                    </Button>
                                </div>
                                <div className='w-full flex items-center space-x-2 text-sm'>
                                    <span className='text-zinc-400 w-10 text-right'>
                                         {msToTime(currentlyPlaying.resultPlaying.progress_ms)}
                                    </span>
                                    <Slider
                                        defaultValue={[
                                            currentlyPlaying.resultPlaying
                                                .progress_ms,
                                        ]}
                                        max={
                                            currentlyPlaying.resultPlaying.item
                                                .duration_ms
                                        }
                                        step={1}
                                        className='w-full'
                                    />
                                    <span className='text-zinc-400 w-10'>
                                        {msToTime(currentlyPlaying.resultPlaying.item.duration_ms)}
                                    </span>
                                </div>
                            </div>

                            {/* Volume Control */}
                            {currentlyPlaying.devices[0]?.supports_volume && (
                                <div className='flex items-center space-x-2'>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        className='text-zinc-400 hover:text-white'
                                    >
                                        <BiVolumeFull className='w-5 h-5' />
                                    </Button>
                                    <Slider
                                        defaultValue={[
                                            currentlyPlaying.devices[0]
                                                .volume_percent,
                                        ]}
                                        max={100}
                                        step={1}
                                        className='w-24'
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export { Currently_Playing };
