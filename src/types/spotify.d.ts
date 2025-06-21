// ปรเภทสำหรับพารามิเตอร์แบบสอบถามการอนุญาต
export type AuthorzationQuery = 'code' | 'redirect_uri' | 'grant_type';

// ประเภทสำหรับพารามิเตอร์การโทรกลับ
export type CallbackParam = Record<AuthorzationQuery, string>;

// ประเภทสำหรับการตอบสนองข้อมูลหลังจากยิงไปที่ Spotify API
export interface SpotifyToken {
    access_token: string;
    token_type: string;
    scope: string;
    expires_in: number;
    refresh_token: string;
}

// ประเภทสำหรับการ refresh_token
export interface SpotifyRefreshToken {
    access_token: string;
    token_type: string;
    expires_in: number;
    scope: string;
}

// ประเภทสำหรับการตอบสนองทั่วไป
export interface IResponse {
    message: string;
    error?: string;
}
