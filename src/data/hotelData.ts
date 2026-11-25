export type ThemeId = 'ivory-gold' | 'royal-gold' | 'obsidian';

export type RoomCategory = 'all' | 'king' | 'double' | 'family' | 'lounge';

export type GalleryCategory = 'all' | 'rooms' | 'reception' | 'exterior';

export const HOTEL_CONFIG = {
  brandName: 'Lola Hotel',
  shortName: 'LOLA HOTEL',
  city: 'Kokand',
  timezone: 'Asia/Tashkent',
  address: 'Qoʻqon shahri, Abu Tayyib Xuqandiy koʻchasi, 103A-uy',
  addressIntl: '103A Abu Tayyib Xuqandiy Street, Kokand, Uzbekistan',
  phones: [
    { display: '+998 95 827 07 70', href: 'tel:+998958270770' },
    { display: '+998 55 801 07 70', href: 'tel:+998558010770' },
  ],
  bookingUrl:
    'https://www.booking.com/hotel/uz/lola-kokand.ru.html?label=gen173rf-10CAso7gFCC2xvbGEta29rYW5kSDNYA2juAYgBAZgBM7gBF8gBDNgBA-gBAfgBAYgCAaICJGludm9sdmVkLXN0YW5kYXJkcy04NjcwODQuZnJhbWVyLmFwcKgCAbgC_K6W2AbAAgHSAiRmMTVmOTViYy0yODE4LTQwZTktODZlZi04NWU3YTg4ZWJlYmHYAgHgAgE&sid=e8f3fed0934784291a8a0579a024dbdd&dist=0&keep_landing=1&sb_price_type=total&type=total&chal_t=1795528572447&force_referer=https%3A%2F%2Finvolved-standards-867084.framer.app%2F',
  mapsUrl:
    'https://www.google.com/maps/place/Lola+Kokand+Hotel/@40.5497349,70.9205283,17z/data=!3m1!4b1!4m9!3m8!1s0x38baefe8a6b65a95:0x879faa3503e29a41!5m2!4m1!1i2!8m2!3d40.5497349!4d70.922717!16s%2Fg%2F11s3xf6myk?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAcGRvZgJzcnRjBmFwcF9pZA85MzY2MTk3NDMzOTI0NTkAAacz__G4Hlde7N6OuBBiyaipdzRvj-Ez860XnifxwW6eC3IIT-RtqXPe60jMdA_aem_z-LuNw0mR_-h5UI2v83ATg',
  telegramUrl: 'https://t.me/lolahotel',
  telegramBotUrl: 'https://t.me/lola_hotel_bot',
  instagramUrl:
    'https://www.instagram.com/lolahotel_kokand?utm_source=ig_web_button_share_sheet&psln=ZDNlZDc0MzIxNw%3D%3D',
  coordinates: {
    lat: 40.5497349,
    lng: 70.922717,
  },
  images: {
    logo: '/assets/aistudio/logo_transparent.png',
    reception: '/assets/aistudio/image_67b8f52b.png',
    exteriorDay: '/assets/aistudio/image_a0e6046b.png',
    exteriorEntrance: '/assets/aistudio/image_0d033d30.png',
    exteriorNight: '/assets/aistudio/image_0aac7856.png',
    exteriorGlass: '/assets/aistudio/image_c7e2d2a6.png',
    roomKingMain: '/assets/aistudio/image_32d08783.png',
    roomNavyMain: '/assets/aistudio/image_d29a905f.png',
    roomNavyDesk: '/assets/aistudio/image_d5bc2eae.png',
    roomBrickSuite: '/assets/aistudio/image_bfddbc95.png',
    roomFamilyMain: '/assets/aistudio/image_5c74fa6d.png',
    roomTeaStation: '/assets/aistudio/image_ba50028d.png',
    roomWardrobeRobes: '/assets/aistudio/image_8bda2683.png',
    loungeLanding: '/assets/aistudio/image_092bae5d.png',
  },
} as const;

export interface RoomSpec {
  id: string;
  category: Exclude<RoomCategory, 'all'>;
  numberBadge: string;
  sizeSqm: number;
  maxGuests: number;
  bedConfigKey: 'kingBed' | 'doubleBed' | 'twinPlusDouble' | 'loungeAccess';
  titleKey: 'roomKingTitle' | 'roomNavyTitle' | 'roomFamilyTitle' | 'roomLoungeTitle';
  descKey: 'roomKingDesc' | 'roomNavyDesc' | 'roomFamilyDesc' | 'roomLoungeDesc';
  photos: string[];
  highlightKeys: Array<'wifi' | 'climate' | 'breakfast' | 'smartTv' | 'robes' | 'teaSet'>;
}

export const ROOMS: RoomSpec[] = [
  {
    id: 'deluxe-king',
    category: 'king',
    numberBadge: '01',
    sizeSqm: 28,
    maxGuests: 2,
    bedConfigKey: 'kingBed',
    titleKey: 'roomKingTitle',
    descKey: 'roomKingDesc',
    photos: [
      HOTEL_CONFIG.images.roomKingMain,
      HOTEL_CONFIG.images.roomTeaStation,
      HOTEL_CONFIG.images.roomBrickSuite,
    ],
    highlightKeys: ['wifi', 'climate', 'breakfast', 'teaSet'],
  },
  {
    id: 'royal-navy',
    category: 'double',
    numberBadge: '02',
    sizeSqm: 26,
    maxGuests: 2,
    bedConfigKey: 'doubleBed',
    titleKey: 'roomNavyTitle',
    descKey: 'roomNavyDesc',
    photos: [
      HOTEL_CONFIG.images.roomNavyMain,
      HOTEL_CONFIG.images.roomNavyDesk,
      HOTEL_CONFIG.images.roomWardrobeRobes,
    ],
    highlightKeys: ['wifi', 'smartTv', 'robes', 'teaSet'],
  },
  {
    id: 'family-suite',
    category: 'family',
    numberBadge: '03',
    sizeSqm: 36,
    maxGuests: 3,
    bedConfigKey: 'twinPlusDouble',
    titleKey: 'roomFamilyTitle',
    descKey: 'roomFamilyDesc',
    photos: [
      HOTEL_CONFIG.images.roomFamilyMain,
      HOTEL_CONFIG.images.roomBrickSuite,
      HOTEL_CONFIG.images.roomTeaStation,
    ],
    highlightKeys: ['wifi', 'climate', 'breakfast', 'smartTv'],
  },
  {
    id: 'executive-lounge',
    category: 'lounge',
    numberBadge: '04',
    sizeSqm: 32,
    maxGuests: 2,
    bedConfigKey: 'loungeAccess',
    titleKey: 'roomLoungeTitle',
    descKey: 'roomLoungeDesc',
    photos: [
      HOTEL_CONFIG.images.loungeLanding,
      HOTEL_CONFIG.images.roomWardrobeRobes,
      HOTEL_CONFIG.images.roomNavyDesk,
    ],
    highlightKeys: ['wifi', 'climate', 'robes', 'breakfast'],
  },
];

export interface GalleryPhoto {
  id: string;
  src: string;
  category: Exclude<GalleryCategory, 'all'>;
  captionKey:
    | 'galReception'
    | 'galExtDay'
    | 'galExtEntrance'
    | 'galExtNight'
    | 'galExtGlass'
    | 'galRoomKing'
    | 'galRoomNavy'
    | 'galRoomDesk'
    | 'galRoomBrick'
    | 'galRoomFamily'
    | 'galRoomTea'
    | 'galRoomRobes'
    | 'galLounge';
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  { id: 'reception', src: HOTEL_CONFIG.images.reception, category: 'reception', captionKey: 'galReception' },
  { id: 'ext-day', src: HOTEL_CONFIG.images.exteriorDay, category: 'exterior', captionKey: 'galExtDay' },
  { id: 'ext-night', src: HOTEL_CONFIG.images.exteriorNight, category: 'exterior', captionKey: 'galExtNight' },
  { id: 'ext-entrance', src: HOTEL_CONFIG.images.exteriorEntrance, category: 'exterior', captionKey: 'galExtEntrance' },
  { id: 'ext-glass', src: HOTEL_CONFIG.images.exteriorGlass, category: 'exterior', captionKey: 'galExtGlass' },
  { id: 'room-king', src: HOTEL_CONFIG.images.roomKingMain, category: 'rooms', captionKey: 'galRoomKing' },
  { id: 'room-navy', src: HOTEL_CONFIG.images.roomNavyMain, category: 'rooms', captionKey: 'galRoomNavy' },
  { id: 'room-desk', src: HOTEL_CONFIG.images.roomNavyDesk, category: 'rooms', captionKey: 'galRoomDesk' },
  { id: 'room-brick', src: HOTEL_CONFIG.images.roomBrickSuite, category: 'rooms', captionKey: 'galRoomBrick' },
  { id: 'room-family', src: HOTEL_CONFIG.images.roomFamilyMain, category: 'rooms', captionKey: 'galRoomFamily' },
  { id: 'room-tea', src: HOTEL_CONFIG.images.roomTeaStation, category: 'rooms', captionKey: 'galRoomTea' },
  { id: 'room-robes', src: HOTEL_CONFIG.images.roomWardrobeRobes, category: 'rooms', captionKey: 'galRoomRobes' },
  { id: 'lounge', src: HOTEL_CONFIG.images.loungeLanding, category: 'reception', captionKey: 'galLounge' },
];

export interface WorldClockCity {
  id: string;
  label: string;
  timeZone: string;
}

export const RECEPTION_WORLD_CLOCKS: WorldClockCity[] = [
  { id: 'london', label: 'London', timeZone: 'Europe/London' },
  { id: 'newyork', label: 'New York', timeZone: 'America/New_York' },
  { id: 'dubai', label: 'Dubai', timeZone: 'Asia/Dubai' },
  { id: 'tokyo', label: 'Tokyo', timeZone: 'Asia/Tokyo' },
];

export interface KokandLandmark {
  id: string;
  nameKey: 'lmPalace' | 'lmJuma' | 'lmStation' | 'lmPark' | 'lmMadrasah';
  distanceKm: string;
  driveMinutes: number;
  categoryKey: 'lmCatHeritage' | 'lmCatTransit' | 'lmCatLeisure';
}

export const KOKAND_LANDMARKS: KokandLandmark[] = [
  { id: 'palace', nameKey: 'lmPalace', distanceKm: '2.1 km', driveMinutes: 6, categoryKey: 'lmCatHeritage' },
  { id: 'juma', nameKey: 'lmJuma', distanceKm: '2.4 km', driveMinutes: 7, categoryKey: 'lmCatHeritage' },
  { id: 'madrasah', nameKey: 'lmMadrasah', distanceKm: '2.6 km', driveMinutes: 8, categoryKey: 'lmCatHeritage' },
  { id: 'park', nameKey: 'lmPark', distanceKm: '1.8 km', driveMinutes: 5, categoryKey: 'lmCatLeisure' },
  { id: 'station', nameKey: 'lmStation', distanceKm: '3.4 km', driveMinutes: 9, categoryKey: 'lmCatTransit' },
];
