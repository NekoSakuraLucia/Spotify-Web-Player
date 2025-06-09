/* eslint-disable @next/next/no-img-element */
'use client';

// shadcn-ui / Components
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Icon
import { LogOut } from 'lucide-react';

// Types
import type { SpotifyUserProfile } from '@/types/spotify';

interface UserProfileProps {
    user: SpotifyUserProfile;
    logout: () => void;
}

const UserProfile = ({ user, logout }: UserProfileProps) => {
    return (
        <Card className='backdrop-blur-md bg-white/5 border border-white/10 shadow-xl mb-8 w-full max-w-md hover:bg-white/10 transition-all duration-300'>
            <CardContent className='flex items-center gap-4 p-4'>
                {user.images?.[0] && (
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
                    <p className='text-sm text-zinc-300'>{user.email}</p>
                    <p className='text-sm text-zinc-400'>
                        {user.country} {'•'}{' '}
                        <span className='text-green-400'>{user.product}</span>
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
    );
};

export { UserProfile };
