// ปรเภทสำหรับพารามิเตอร์แบบสอบถามการอนุญาต
export type AuthorzationQuery = 'code' | 'redirect_uri' | 'grant_type';

// ประเภทสำหรับพารามิเตอร์การโทรกลับ
export type CallbackParam = Record<AuthorzationQuery, string>;

// ประเภทสำหรับการตอบสนองข้อมูลหลังจากยิงไปที่ Spotify API
export interface IResponseData {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
}

// ประเภทสำหรับการตอบสนองทั่วไป
export interface IResponse {
    message: string;
    error?: string;
}

// ประเภทสำหรับข้อมูลโปรไฟล์ผู้ใช้ Spotify
export interface SpotifyUserProfile {
    country: string;
    display_name: string;
    email: string;
    explicit_content: ExplicitContent;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    product: string;
    type: string;
    uri: string;
}

// ประเภทสำหรับการกรองเนื้อหาโดยชัดแจ้ง
export interface ExplicitContent {
    filter_enabled: boolean;
    filter_locked: boolean;
}

// ประเภทสำหรับ URL ภายนอก
export interface ExternalUrls {
    spotify: string;
}

// ประเภทสำหรับผู้ติดตาม
export interface Followers {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    href: any;
    total: number;
}

// ประเภทสำหรับรูปภาพโปรไฟล์
export interface Image {
    height: number;
    url: string;
    width: number;
}
