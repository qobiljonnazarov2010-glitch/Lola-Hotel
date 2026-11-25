import { Expand } from 'lucide-react';
import { HOTEL_CONFIG } from '../data/hotelData';
import { TranslationDictionary } from '../data/translations';

interface RoomsSectionProps {
  t: TranslationDictionary;
  onOpenLightbox: (src: string) => void;
}

export function RoomsSection({ t, onOpenLightbox }: RoomsSectionProps) {
  const roomPhotos = [
    { id: 'room-king', src: HOTEL_CONFIG.images.roomKingMain, alt: t.galRoomKing },
    { id: 'room-navy', src: HOTEL_CONFIG.images.roomNavyMain, alt: t.galRoomNavy },
    { id: 'room-family', src: HOTEL_CONFIG.images.roomFamilyMain, alt: t.galRoomFamily },
    { id: 'lounge', src: HOTEL_CONFIG.images.loungeLanding, alt: t.galLounge },
    { id: 'room-desk', src: HOTEL_CONFIG.images.roomNavyDesk, alt: t.galRoomDesk },
    { id: 'room-brick', src: HOTEL_CONFIG.images.roomBrickSuite, alt: t.galRoomBrick },
    { id: 'room-tea', src: HOTEL_CONFIG.images.roomTeaStation, alt: t.galRoomTea },
    { id: 'room-robes', src: HOTEL_CONFIG.images.roomWardrobeRobes, alt: t.galRoomRobes },
  ];

  return (
    <section
      id="rooms"
      className="border-b py-16 lg:py-20"
      style={{
        backgroundColor: 'var(--bg-canvas)',
        borderColor: 'var(--border-hairline)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl space-y-2">
          <h2
            className="font-display headline-balance text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: 'var(--text-primary)' }}
          >
            {t.roomsSectionTitle}
          </h2>
        </div>

        {/* Pure Photos Grid (Images 7–14) */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roomPhotos.map((photo) => (
            <button
              key={photo.id}
              type="button"
              data-testid={`room-photo-${photo.id}`}
              onClick={() => onOpenLightbox(photo.src)}
              aria-label={photo.alt}
              className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl border transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-hairline)',
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="pointer-events-none absolute right-3 bottom-3 inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/55 text-white opacity-0 backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100">
                <Expand className="h-4 w-4" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
