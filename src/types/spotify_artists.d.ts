// // ประเภทสำหรับข้อมูลโปรไฟล์ผู้ใช้ Spotify Top Artists
export interface SpotifyUserArtists {
    items: ArtistsItem[];
    total: number;
    limit: number;
    offset: number;
    href: string;
    next: string;
    previous: string | null;
}

// ประเภทสำหรับรายการศิลปินใน Spotify
export interface ArtistsItem {
    external_urls: ArtitstsExternalUrls;
    followers: ArtistsFollowers;
    genres: string[];
    href: string;
    id: string;
    images: ArtistsImage[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

// ประเภทสำหรับ URL ภายนอกของศิลปิน
export interface ArtitstsExternalUrls {
    spotify: string;
}

// ประเภทสำหรับผู้ติดตามของศิลปิน
export interface ArtistsFollowers {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    href: any;
    total: number;
}

// ประเภทสำหรับรูปภาพของศิลปิน
export interface ArtistsImage {
    height: number;
    url: string;
    width: number;
}
