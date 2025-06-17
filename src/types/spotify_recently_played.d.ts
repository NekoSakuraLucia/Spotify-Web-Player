export interface SpotifyUserRecentlyPlayed {
    items: RecentlyPlayedItem[];
    next: string;
    cursors: RecentlyPlayedCursors;
    limit: number;
    href: string;
}

export interface RecentlyPlayedItem {
    track: RecentlyPlayedTrack;
    played_at: string;
    context: unknown;
}

export interface RecentlyPlayedTrack {
    album: RecentlyPlayedAlbum;
    artists: RecentlyPlayedArtist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: RecentlyPlayedExternalIds;
    external_urls: RecentlyPlayedExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: null;
    track_number: number;
    type: string;
    uri: string;
}

export interface RecentlyPlayedAlbum {
    album_type: string;
    artists: RecentlyPlayedArtist[];
    available_markets: string[];
    external_urls: RecentlyPlayedExternalUrls;
    href: string;
    id: string;
    images: RecentlyPlayedImage[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export interface RecentlyPlayedArtist {
    external_urls: RecentlyPlayedExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface RecentlyPlayedExternalUrls {
    spotify: string;
}

export interface RecentlyPlayedImage {
    height: number;
    url: string;
    width: number;
}

export interface RecentlyPlayedExternalIds {
    isrc: string;
}

export interface RecentlyPlayedCursors {
    after: string;
    before: string;
}
