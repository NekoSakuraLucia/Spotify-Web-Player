// ประเภทสำหรับข้อมูลโปรไฟล์ผู้ใช้ Spotify
export interface SpotifyUserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: SpotifyExplicitContent;
    external_urls: SpotifyExternalUrls;
    followers: SpotifyFollowers;
    href: string;
    id: string;
    images: SpotifyImage[];
    product: string;
    type: string;
    uri: string;
}

// ประเภทสำหรับการกรองเนื้อหาโดยชัดแจ้ง
export interface SpotifyExplicitContent {
    filter_enabled: boolean;
    filter_locked: boolean;
}

// ประเภทสำหรับ URL ภายนอก
export interface SpotifyExternalUrls {
    spotify: string;
}

// ประเภทสำหรับผู้ติดตาม
export interface SpotifyFollowers {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    href: any;
    total: number;
}

// ประเภทสำหรับรูปภาพโปรไฟล์
export interface SpotifyImage {
    height: number;
    url: string;
    width: number;
}
