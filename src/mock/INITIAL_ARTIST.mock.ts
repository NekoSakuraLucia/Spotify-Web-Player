// INITIAL_ARTIST สำหรับส่วน INITIAL_ARTIST_STATE
const INITIAL_ARTIST = {
    external_urls: {
        spotify: '',
    },
    followers: {
        href: null,
        total: 0,
    },
    genres: [] as string[],
    href: '',
    id: '',
    images: [
        {
            height: 0,
            url: '',
            width: 0,
        },
    ],
    name: '',
    popularity: 0,
    type: 'artist',
    uri: '',
};

// INITIAL_ARTIST_STATE สำหรับใช้ใน useState ของ isArtistsData (ArtistsModal)
const INITIAL_ARTIST_STATE = {
    items: [INITIAL_ARTIST],
    total: 0,
    limit: 0,
    offset: 0,
    href: '',
    next: '',
    previous: null,
};

export { INITIAL_ARTIST_STATE };
