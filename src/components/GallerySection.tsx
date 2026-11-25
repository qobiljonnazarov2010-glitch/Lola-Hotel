import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { GALLERY_PHOTOS, GalleryCategory, GalleryPhoto } from '../data/hotelData';
import { TranslationDictionary } from '../data/translations';

interface GallerySectionProps {
  t: TranslationDictionary;
  lightboxSrc: string | null;
  onOpenLightbox: (src: string) => void;
  onCloseLightbox: () => void;
}

export function GallerySection({
  t,
  lightboxSrc,
  onOpenLightbox,
  onCloseLightbox,
}: GallerySectionProps) {
  const [category, setCategory] = useState<GalleryCategory>('all');

  const tabs: Array<{ id: GalleryCategory; label: string }> = [
    { id: 'all', label: t.galFilterAll },
    { id: 'rooms', label: t.galFilterRooms },
    { id: 'reception', label: t.galFilterReception },
    { id: 'exterior', label: t.galFilterExterior },
  ];

  const filteredPhotos: GalleryPhoto[] =
    category === 'all'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((photo) => photo.category === category);

  const activeIndex = lightboxSrc
    ? GALLERY_PHOTOS.findIndex((p) => p.src === lightboxSrc)
    : -1;

  const handlePrev = () => {
    if (activeIndex < 0) return;
    const prevIdx = (activeIndex - 1 + GALLERY_PHOTOS.length) % GALLERY_PHOTOS.length;
    onOpenLightbox(GALLERY_PHOTOS[prevIdx].src);
  };

  const handleNext = () => {
    if (activeIndex < 0) return;
    const nextIdx = (activeIndex + 1) % GALLERY_PHOTOS.length;
    onOpenLightbox(GALLERY_PHOTOS[nextIdx].src);
  };

  useEffect(() => {
    if (!lightboxSrc) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseLightbox();
      else if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const activePhoto = activeIndex >= 0 ? GALLERY_PHOTOS[activeIndex] : null;

  return (
    <section
      id="gallery"
      className="border-b py-16 lg:py-20"
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderColor: 'var(--border-hairline)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl space-y-3">
            <h2
              className="font-display headline-balance text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: 'var(--text-primary)' }}
            >
              {t.galleryTitle}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t.gallerySubtitle}
            </p>
          </div>

          <div
            role="tablist"
            aria-label={t.galleryTitle}
            className="flex flex-wrap items-center gap-1 rounded-lg border p-1"
            style={{
              backgroundColor: 'var(--bg-canvas)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            {tabs.map((tab) => {
              const active = category === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(tab.id)}
                  className="whitespace-nowrap shrink-0 rounded-md px-3.5 py-2 text-xs font-semibold transition-colors duration-150"
                  style={{
                    backgroundColor: active ? 'var(--gold-primary)' : 'transparent',
                    color: active ? 'var(--gold-contrast-text)' : 'var(--text-secondary)',
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Asymmetric Masonry/Bento Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo, index) => {
            const isLead = index === 0 && category === 'all';
            return (
              <button
                key={photo.id}
                type="button"
                onClick={() => onOpenLightbox(photo.src)}
                aria-label={t[photo.captionKey]}
                className={`group relative overflow-hidden rounded-xl border text-left transition-transform duration-200 hover:-translate-y-0.5 ${
                  isLead ? 'sm:col-span-2 sm:row-span-2 min-h-[280px]' : 'aspect-[4/3]'
                }`}
                style={{
                  borderColor: 'var(--border-hairline)',
                  backgroundColor: 'var(--bg-canvas)',
                }}
              >
                <img
                  src={photo.src}
                  alt={t[photo.captionKey]}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-4 pt-12">
                  <span className="text-xs font-medium text-white line-clamp-2">
                    {t[photo.captionKey]}
                  </span>
                  <Expand className="h-4 w-4 shrink-0 text-amber-200 opacity-90" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t[activePhoto.captionKey]}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={onCloseLightbox}
        >
          <div
            className="relative flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border bg-neutral-950"
            style={{ borderColor: 'var(--border-strong)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-white">
              <span className="font-clock text-xs text-amber-300">
                {activeIndex + 1} / {GALLERY_PHOTOS.length}
              </span>
              <p className="truncate px-4 text-sm font-medium">{t[activePhoto.captionKey]}</p>
              <button
                type="button"
                onClick={onCloseLightbox}
                aria-label={t.closeLightbox}
                className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/20 text-white hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center bg-black">
              <img
                src={activePhoto.src}
                alt={t[activePhoto.captionKey]}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain"
              />

              <button
                type="button"
                onClick={handlePrev}
                aria-label={t.prevPhoto}
                className="absolute left-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/65 text-white border border-white/20 hover:bg-black"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label={t.nextPhoto}
                className="absolute right-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/65 text-white border border-white/20 hover:bg-black"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
