/* eslint-disable @next/next/no-img-element */
'use client';
// React
import React, { useEffect, useState } from 'react';

// Context
import { useGetUser } from '@/context/userContext';

// Action
import { TopArtists } from '@/actions/SpotifyAction';

// Type
import type { SpotifyUserArtists } from '@/types/spotify_artists';

// shadcn/ui components
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';

// Icon
import { LogOut, PlayIcon } from 'lucide-react';

interface PlaylistItem {
    id: string;
    name: string;
    artist: string;
    imageUrl: string;
}

const MOCK_PLAYLISTS: PlaylistItem[] = [
    {
        id: '1',
        name: 'Discover Weekly',
        artist: 'Spotify',
        imageUrl: 'https://placehold.co/300/',
    },
    {
        id: '2',
        name: 'Daily Mix 1',
        artist: 'Spotify',
        imageUrl: 'https://placehold.co/300/',
    },
    // Add more mock data as needed
];

const Home = () => {
    const [artistsData, setArtistsData] = useState<SpotifyUserArtists | null>(
        null
    );
    const { user, logout } = useGetUser();

    useEffect(() => {
        const fetchArtists = async () => {
            const result = await TopArtists();
            if (result.success) {
                if (result.result) {
                    setArtistsData(result.result);
                } else {
                    setArtistsData(null);
                    console.log('No artists data found');
                }
            } else {
                setArtistsData(null);
                console.log('Failed to fetch artists:', result.message);
            }
        };

        fetchArtists();
    }, []);

    return (
        <ScrollArea className='h-screen'>
            <div className='min-h-screen bg-gradient-to-br from-emerald-900/30 via-zinc-900 to-black text-white p-4 lg:p-8'>
                <div className='container mx-auto'>
                    {user && (
                        <Card className='backdrop-blur-md bg-white/5 border border-white/10 shadow-xl mb-8 w-full max-w-md hover:bg-white/10 transition-all duration-300'>
                            <CardContent className='flex items-center gap-4 p-4'>
                                {user.images && user.images[0] && (
                                    <img
                                        src={user.images[0].url}
                                        alt={user.display_name}
                                        className='w-16 h-16 rounded-full ring-2 ring-green-500/50'
                                        draggable={false}
                                    />
                                )}
                                <div className='flex-grow'>
                                    <h2 className='text-xl font-bold text-white'>
                                        {user.display_name}
                                    </h2>
                                    <p className='text-sm text-zinc-300'>
                                        {user.email}
                                    </p>
                                    <p className='text-sm text-zinc-400'>
                                        {user.country} {'•'}{' '}
                                        <span className='text-green-400'>
                                            {user.product}
                                        </span>
                                    </p>
                                </div>
                                <Button
                                    variant='ghost'
                                    size='icon'
                                    onClick={() => logout()}
                                    className='hover:bg-white/10 text-white hover:text-green-400 transition-colors'
                                >
                                    <LogOut className='h-5 w-5' />
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </div>

                <div className='container mx-auto'>
                    <section className='mb-8'>
                        <h1 className='text-4xl font-bold mb-6 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent'>
                            Good evening
                        </h1>
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                            {MOCK_PLAYLISTS.slice(0, 6).map((playlist) => (
                                <button
                                    key={playlist.id}
                                    className='flex items-center backdrop-blur-sm bg-white/5 hover:bg-white/10 rounded-lg overflow-hidden transition-all group'
                                >
                                    <img
                                        src={playlist.imageUrl}
                                        alt={playlist.name}
                                        className='h-16 w-16 group-hover:scale-105 transition-transform duration-300'
                                    />
                                    <span className='font-semibold px-4 group-hover:text-green-400 transition-colors'>
                                        {playlist.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* Made for You Section */}
                    {artistsData && (
                        <section className='mb-8 backdrop-blur-sm bg-white/5 p-6 rounded-xl'>
                            <h2 className='text-2xl font-bold mb-6 text-green-400'>
                                Made for you
                            </h2>
                            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6'>
                                {artistsData.items?.map((artist) => (
                                    <HoverCard key={artist.id}>
                                        <HoverCardTrigger>
                                            <Card className='backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group'>
                                                <CardContent>
                                                    <div className='overflow-hidden rounded-lg'>
                                                        <img
                                                            src={
                                                                artist.images[0]
                                                                    .url
                                                            }
                                                            alt={artist.name}
                                                            className='w-full aspect-square mb-4'
                                                            draggable={false}
                                                        />
                                                    </div>
                                                    <h3 className='font-semibold truncate text-lg group-hover:text-green-400 transition-colors'>
                                                        {artist.name}
                                                    </h3>
                                                    <p className='text-sm text-zinc-400 truncate'>
                                                        ผู้ติดตาม:{' '}
                                                        {artist.followers.total.toLocaleString()}
                                                    </p>
                                                </CardContent>
                                            </Card>
                                        </HoverCardTrigger>
                                        <HoverCardContent className='backdrop-blur-md bg-zinc-900/90 border border-white/10 p-4 w-80 shadow-xl'>
                                            <div className='flex space-x-4'>
                                                <img
                                                    src={artist.images[0].url}
                                                    alt={artist.name}
                                                    className='h-24 w-24 rounded-lg object-cover ring-2 ring-green-500/20'
                                                />
                                                <div className='space-y-2'>
                                                    <h3 className='font-bold text-lg text-white'>
                                                        {artist.name}
                                                    </h3>
                                                    <div className='flex items-center space-x-2 text-sm text-zinc-400'>
                                                        <span>Artist</span>
                                                        <span>•</span>
                                                        <span>
                                                            {artist.followers.total.toLocaleString()}{' '}
                                                            ผู้ติดตาม
                                                        </span>
                                                    </div>
                                                    <div className='flex items-center space-x-2'>
                                                        {artist.genres
                                                            .slice(0, 2)
                                                            .map((genre) => (
                                                                <span
                                                                    key={genre}
                                                                    className='px-2 py-1 rounded-full bg-white/5 text-xs text-zinc-300'
                                                                >
                                                                    {genre}
                                                                </span>
                                                            ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mt-4 flex items-center justify-between'>
                                                <div className='text-sm'>
                                                    <p className='text-zinc-400'>
                                                        Popularity
                                                    </p>
                                                    <div className='w-32 h-1.5 bg-white/10 rounded-full mt-1'>
                                                        <div
                                                            className='h-full bg-green-500 rounded-full'
                                                            style={{
                                                                width: `${artist.popularity}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <Button
                                                    size='sm'
                                                    className='rounded-full bg-green-500 hover:bg-green-400 text-black font-medium px-4'
                                                >
                                                    ติดตาม
                                                </Button>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Recently Played Section */}
                    <section className='space-y-4 backdrop-blur-sm bg-white/5 p-6 rounded-xl'>
                        <h2 className='text-2xl font-bold text-green-400'>
                            Recently played
                        </h2>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6'>
                            {MOCK_PLAYLISTS.map((playlist) => (
                                <Card
                                    key={playlist.id}
                                    className='backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer group'
                                >
                                    <CardContent className='space-y-4'>
                                        <div className='relative aspect-square overflow-hidden rounded-lg'>
                                            <img
                                                src={playlist.imageUrl}
                                                alt={playlist.name}
                                                className='rounded-lg object-cover shadow-lg group-hover:scale-105 transition-transform duration-300'
                                                draggable={false}
                                            />
                                            <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity' />
                                            <div className='absolute right-2 bottom-2 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0'>
                                                <Button
                                                    size='icon'
                                                    className='rounded-full bg-green-500 hover:bg-green-400 shadow-xl hover:scale-105 transition-transform'
                                                >
                                                    <PlayIcon className='h-5 w-5 text-black' />
                                                </Button>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className='font-bold truncate group-hover:text-green-400 transition-colors'>
                                                {playlist.name}
                                            </h3>
                                            <p className='text-sm text-zinc-400 truncate'>
                                                {playlist.artist}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </ScrollArea>
    );
};

export { Home };
