/* eslint-disable @next/next/no-img-element */
'use client';

// Framer
import { motion } from 'framer-motion';

// Types
import type { SpotifyUserArtists } from '@/types/spotify_artists';

interface ArtistsModalProps {
    isOpen: boolean;
    onClose: () => void;
    artists: SpotifyUserArtists;
}

const ArtistsModal = ({ isOpen, onClose, artists }: ArtistsModalProps) => {
    if (!isOpen) return null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                onClick={onClose}
                className='fixed inset-0 z-55 bg-black/80 backdrop-blur-xl cursor-pointer'
            ></motion.div>

            <div className='fixed inset-0 z-60 flex items-center justify-center p-4 pointer-events-none'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className='bg-neutral-800/20 backdrop-blur-md w-full max-w-2xl p-0 rounded-xl overflow-hidden -mt-24 pointer-events-auto'
                >
                    <div className='relative w-full h-52'>
                        {artists.items[0].images?.[0] && (
                            <img
                                src={artists.items[0].images[0].url}
                                alt='Artists Cover'
                                className='object-cover object-center w-full h-full'
                                draggable={false}
                            />
                        )}
                        <div className='absolute inset-0 bg-gradient-to-b from-black/40 to-black/80' />
                        <div className='absolute bottom-4 left-4'>
                            <h3 className='text-2xl font-bold text-white mb-1'>
                                {artists.items[0].name}
                            </h3>
                            <p className='text-sm text-zinc-300'>Artist</p>
                        </div>
                    </div>

                    <div className='p-4 w-full flex flex-col items-start justify-center md:flex-row md:items-center md:justify-between'>
                        <div className='flex items-center gap-12 mb-5 md:mb-0'>
                            <div className='flex flex-col space-y-2.5'>
                                <h3 className='text-lg font-bold'>Followers</h3>
                                <h2 className='text-base text-neutral-400'>
                                    {artists.items[0].followers.total.toLocaleString()}
                                </h2>
                            </div>
                            <div className='flex flex-col space-y-2.5'>
                                <h3 className='text-lg font-bold'>
                                    Monthly Listeners
                                </h3>
                                <h2 className='text-base text-neutral-400'>
                                    {artists.items[0].followers.total.toLocaleString()}
                                </h2>
                            </div>
                        </div>

                        <button
                            className='px-6 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800
                text-white font-medium text-sm transition-colors cursor-pointer'
                        >
                            ติดตาม
                        </button>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export { ArtistsModal };
