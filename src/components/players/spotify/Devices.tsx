'use client';
// React
import React, { useEffect, useState } from 'react';

// Action
import { DevicesPlayer } from '@/actions/SpotifyAction';

// Icon
import {
    Monitor,
    Smartphone,
    Speaker,
    Volume2,
    Volume1,
    VolumeX,
} from 'lucide-react';

// Type
import type { SpotifyDevices } from '@/types/spotify_devices';

const getDeviceIcon = (type: string): React.JSX.Element => {
    switch (type.toLowerCase()) {
        case 'computer':
            return <Monitor className='h-5 w-5' />;
        case 'smartphone':
            return <Smartphone className='h-5 w-5' />;
        case 'speaker':
            return <Speaker className='h-5 w-5' />;
        default:
            return <Monitor className='h-5 w-5' />;
    }
};

const getDeviceVolume = (vol: number): React.JSX.Element => {
    if (vol >= 50) return <Volume2 className='h-4 w-4 text-zinc-400' />;
    if (vol >= 1) return <Volume1 className='h-4 w-4 text-zinc-400' />;
    return <VolumeX className='h-4 w-4 text-zinc-400' />;
};

const Devices = () => {
    const [devices, setDevicesData] = useState<SpotifyDevices | null>(null);

    const fetchDevices = async (): Promise<boolean> => {
        const result = await DevicesPlayer();

        if (result.success && result.result) {
            setDevicesData(result.result);
            return true;
        }

        setDevicesData(null);
        const errorMessage = result.success
            ? 'ไม่พบข้อมูลอุปกรณ์'
            : `เกิดข้อผิดพลาดในการดึงข้อมูลอุปกรณ์: ${result.message}`;
        console.log(errorMessage);
        return false;
    };

    useEffect(() => {
        fetchDevices();
    }, []);

    return (
        <>
            {devices && devices.devices.length > 0 && (
                <div className='w-80'>
                    <div className='space-y-3'>
                        {devices.devices.map((device) => (
                            <div
                                key={device.id}
                                className={`
                      flex items-center justify-between p-3
                      rounded-lg transition-all duration-300
                      ${
                          device.is_active
                              ? 'bg-green-500/10 border border-green-500/20'
                              : 'bg-white/5 border border-white/5 hover:bg-white/10'
                      }
                    `}
                            >
                                <div className='flex items-center gap-3'>
                                    <span
                                        className={
                                            device.is_active
                                                ? 'text-green-400'
                                                : 'text-zinc-400'
                                        }
                                    >
                                        {getDeviceIcon(device.type)}
                                    </span>
                                    <div>
                                        <p
                                            className={`font-medium ${
                                                device.is_active
                                                    ? 'text-green-400'
                                                    : 'text-white'
                                            }`}
                                        >
                                            {device.name}
                                        </p>
                                        <p className='text-xs text-zinc-400'>
                                            {device.type
                                                .charAt(0)
                                                .toUpperCase() +
                                                device.type.slice(1)}
                                        </p>
                                    </div>
                                </div>
                                {device.supports_volume && (
                                    <div className='flex items-center gap-2'>
                                        {getDeviceVolume(device.volume_percent)}
                                        <span className='text-xs text-zinc-400'>
                                            {device.volume_percent}%
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export { Devices };
