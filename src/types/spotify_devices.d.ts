// ประเภทสำหรับแสดงข้อมูลอุปกรณ์ Spotify
export interface SpotifyDevices {
    devices: Devices[];
}

// ประเภทสำหรับแสดงข้อมูลอุปกรณ์ Spotify
export interface Devices {
    id: string;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    supports_volume: boolean;
    type: string;
    volume_percent: number;
}
