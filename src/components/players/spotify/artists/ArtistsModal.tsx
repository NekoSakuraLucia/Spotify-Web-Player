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

                    <div className='mb-2 p-4 w-full flex flex-col items-start justify-center sm:flex-row sm:items-center sm:justify-between'>
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
                            className='max-[639px]:hidden px-6 py-2 rounded-full bg-zinc-900 hover:bg-zinc-800
                text-white font-medium text-sm transition-colors cursor-pointer'
                        >
                            ติดตาม
                        </button>
                    </div>

                    {artists.items[0].genres.length > 0 && (
                        <div className='px-4 pb-4'>
                            <h3 className='text-lg font-bold mb-3'>Genres</h3>
                            <motion.div
                                className='flex flex-wrap gap-2'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.45 }}
                            >
                                {artists.items[0].genres.map((genre, index) => (
                                    <motion.span
                                        key={genre}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: 0.3 + index * 0.1,
                                            type: 'spring',
                                            stiffness: 300,
                                        }}
                                        className='px-3 py-1.5 rounded-full text-sm font-medium
                                bg-neutral-800/50 hover:bg-neutral-700/50
                                text-neutral-300 hover:text-white
                                border border-neutral-700/50
                                transition-all duration-200
                                cursor-default'
                                    >
                                        {genre.charAt(0).toUpperCase() +
                                            genre.slice(1)}
                                    </motion.span>
                                ))}
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            </div>
        </>
    );
};

export { ArtistsModal };
