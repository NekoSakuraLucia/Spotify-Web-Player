// ประเภทสำหรับข้อมูลการเล่นเพลงปัจจุบันของผู้ใช้ Spotify Currently Playing
export interface SpotifyCurrentlyUserPlaying {
    timestamp: number;
    context: CurrentlyContext;
    progress_ms: number;
    item: CurrentlyItem;
    currently_playing_type: 'track' | 'episode' | 'unknown';
    actions: CurrentlyActions;
    is_playing: boolean;
}

// ประเภทสำหรับข้อมูลบริบทของเพลงที่เล่นอยู่
export interface CurrentlyContext {
    external_urls: CurrentlyExternalUrls;
    href: string;
    type: string;
    uri: string;
}

// ประเภทสำหรับแสดงข้อมูลเพลงที่เล่นอยู่
export interface CurrentlyItem {
    album: CurrentlyAlbum;
    artists: CurrentlyItemArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: CurrentlyExternalIds;
    external_urls: CurrentlyExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: string;
    uri: string;
}

// ประเภทสำหรับข้อมูลอัลบั้มที่เล่นอยู่
export interface CurrentlyAlbum {
    album_type: string;
    artists: CurrentlyAlbumArtist[];
    available_markets: string[];
    external_urls: CurrentlyExternalUrls;
    href: string;
    id: string;
    images: CurrentlyImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

// ประเภทสำหรับศิลปินของอัลบั้มที่เล่นอยู่
export interface CurrentlyAlbumArtist {
    external_urls: CurrentlyExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

// ประเภทสำหรับศิลปินของเพลงที่เล่นอยู่
export interface CurrentlyItemArtist {
    external_urls: CurrentlyExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

// ประเภทสำหรับ URL ของรูปภาพเพลง
export interface CurrentlyImage {
    height: number;
    url: string;
    width: number;
}

// ประเภทสำหรับ URL ภายนอกของเพลง
export interface CurrentlyExternalUrls {
    spotify: string;
}

// ประเภทสำหรับรหัสภายนอก
export interface CurrentlyExternalIds {
    isrc: string;
}

// ประเภทสำหรับ Actions ของเพลงที่กำลังเล่นอยู่
export interface CurrentlyActions {
    disallows: CurrentlyDisallows;
}

// ประเภทสำหรับสิ่งที่ไม่อนุญาตให้ทำกับเพลงที่กำลังเล่นอยู่
export interface CurrentlyDisallows {
    resuming: boolean;
}
