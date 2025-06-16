/* eslint-disable @next/next/no-img-element */
'use client';

// React
import { Fragment } from 'react';

// Icon
import {
    IoClose,
    IoPlayCircle,
    IoPauseCircle,
    IoShuffleOutline,
    IoRepeatOutline,
} from 'react-icons/io5';
import { BiSkipPrevious, BiSkipNext } from 'react-icons/bi';

// Types
import type { SpotifyCurrentlyFullResponse } from '@/types/spotify_currently_playing';

interface PlayerModalProps {
    currentlyPlaying: SpotifyCurrentlyFullResponse;
    isOpen: boolean;
    onClose: () => void;
    msToTime: (ms: number) => string;
    progress: number;
}

const PlayerModal = ({
    currentlyPlaying,
    isOpen,
    onClose,
    msToTime,
    progress,
}: PlayerModalProps) => {
    if (!isOpen) return null;

    return (
        <div className='md:hidden fixed inset-0 z-50 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200'>
            <div className='min-h-screen flex flex-col p-4'>
                {/* Header */}
                <div className='flex justify-between items-center mb-8'>
                    <button
                        onClick={onClose}
                        className='p-2 -ml-2 text-white hover:text-green-400 transition-colors'
                    >
                        <IoClose className='w-6 h-6' />
                    </button>
                    <span className='text-zinc-400 text-sm font-medium'>
                        Now Playing
                    </span>
                    <div className='w-10' />
                </div>

                {/* Album Art */}
                {currentlyPlaying.resultPlaying.item.album.images?.[0] && (
                    <div className='aspect-square w-full max-w-md mx-auto mb-8 relative'>
                        <img
                            src={
                                currentlyPlaying.resultPlaying.item.album
                                    .images[0].url
                            }
                            alt='Album Cover'
                            className='w-full h-full object-cover rounded-lg shadow-2xl'
                        />
                        <div className='absolute inset-0 rounded-lg shadow-[inset_0_-40px_20px_-20px_rgba(0,0,0,0.4)]' />
                    </div>
                )}

                {/* Track Info */}
                <div className='text-center mb-8'>
                    <h2 className='text-2xl font-bold text-white mb-2'>
                        {currentlyPlaying.resultPlaying.item.name}
                    </h2>
                    <p className='text-zinc-400'>
                        {currentlyPlaying.resultPlaying.item.artists.map(
                            (artist, index) => (
                                <Fragment key={artist.id}>
                                    {artist.name}
                                    {index <
                                        currentlyPlaying.resultPlaying.item
                                            .artists.length -
                                            1 && ', '}
                                </Fragment>
                            ),
                        )}
                    </p>
                </div>

                {/* Progress Bar */}
                <div className='w-full max-w-md mx-auto mb-8'>
                    <div className='flex items-center gap-2'>
                        <span className='text-xs text-zinc-400 w-10 text-right'>
                            {msToTime(
                                currentlyPlaying.resultPlaying.progress_ms,
                            )}
                        </span>
                        <div className='relative flex-1 h-1 group'>
                            <div className='absolute inset-0 rounded-full bg-white/10'>
                                <div
                                    className='h-full rounded-full bg-green-500 transition-all duration-200'
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div
                                className='absolute top-1/2 h-3 w-3 rounded-full bg-white shadow-lg -translate-y-1/2'
                                style={{
                                    left: `${progress}%`,
                                    transform: `translateX(-50%)`,
                                }}
                            />
                        </div>
                        <span className='text-xs text-zinc-400 w-10'>
                            {msToTime(
                                currentlyPlaying.resultPlaying.item.duration_ms,
                            )}
                        </span>
                    </div>
                </div>

                {/* Controls */}
                <div className='flex justify-center items-center gap-8 mb-8'>
                    <button className='p-2 text-zinc-400 hover:text-white transition-colors'>
                        <IoShuffleOutline className='w-6 h-6' />
                    </button>
                    <button className='p-2 text-zinc-400 hover:text-white transition-colors'>
                        <BiSkipPrevious className='w-10 h-10' />
                    </button>
                    <button className='p-3 text-black bg-white rounded-full hover:scale-105 active:scale-95 transition-all'>
                        {currentlyPlaying.resultPlaying.is_playing ? (
                            <IoPauseCircle className='w-12 h-12' />
                        ) : (
                            <IoPlayCircle className='w-12 h-12' />
                        )}
                    </button>
                    <button className='p-2 text-zinc-400 hover:text-white transition-colors'>
                        <BiSkipNext className='w-10 h-10' />
                    </button>
                    <button className='p-2 text-zinc-400 hover:text-white transition-colors'>
                        <IoRepeatOutline className='w-6 h-6' />
                    </button>
                </div>

                {/* Album Info */}
                <div className='text-center'>
                    <button className='text-zinc-400 hover:text-white text-sm font-medium transition-colors'>
                        {currentlyPlaying.resultPlaying.item.album.name}
                    </button>
                </div>
            </div>
        </div>
    );
};

export { PlayerModal };
