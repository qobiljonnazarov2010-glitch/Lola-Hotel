import { ExternalLink, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { HOTEL_CONFIG, RECEPTION_WORLD_CLOCKS } from '../data/hotelData';
import { LanguageCode, TranslationDictionary } from '../data/translations';
import { formatCityClock } from '../utils/hotelLogic';

interface HeroSectionProps {
  t: TranslationDictionary;
  language: LanguageCode;
  now: Date;
}

export function HeroSection({
  t,
  language,
  now,
}: HeroSectionProps) {
  const [heroShowcaseIndex, setHeroShowcaseIndex] = useState<number>(0);

  const kokandClock = formatCityClock(now, HOTEL_CONFIG.timezone, language);

  const heroMediaSlides = [
    {
      src: HOTEL_CONFIG.images.reception,
      alt: t.galReception,
      label: t.heroReceptionTag,
    },
    {
      src: HOTEL_CONFIG.images.exteriorDay,
      alt: t.galExtDay,
      label: t.galFilterExterior,
    },
    {
      src: HOTEL_CONFIG.images.exteriorNight,
      alt: t.galExtNight,
      label: 'Lola Hotel · 24/7',
    },
  ];

  const activeSlide = heroMediaSlides[heroShowcaseIndex];

  return (
    <section
      id="hero-overview"
      className="border-b"
      style={{
        background: 'var(--hero-gradient)',
        borderColor: 'var(--border-hairline)',
      }}
    >
      {/* Main Hero 2-Column Split */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
          {/* Left Column: Transparent Animated 180-deg Gold Logo, Editorial Headline, Booking & Telegram Start */}
          <div className="flex flex-col justify-between gap-8 lg:col-span-6">
            <div className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="shrink-0 py-1">
                  <div
                    data-testid="hero-animated-logo"
                    className="logo-rotate-180 relative h-24 w-20 sm:h-28 sm:w-24"
                  >
                    <img
                      src={HOTEL_CONFIG.images.logo}
                      alt="Lola Hotel Official Gold Logo"
                      referrerPolicy="no-referrer"
                      className="logo-face h-full w-full object-contain"
                    />
                    <img
                      src={HOTEL_CONFIG.images.logo}
                      alt=""
                      aria-hidden="true"
                      referrerPolicy="no-referrer"
                      className="logo-face-back absolute inset-0 h-full w-full object-contain"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p
                    className="text-xs font-semibold tracking-wider"
                    style={{ color: 'var(--gold-primary)' }}
                  >
                    {t.heroEyebrow}
                  </p>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {HOTEL_CONFIG.address}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {t.heroCheckInOut}
                  </p>
                </div>
              </div>

              <h1
                className="font-display headline-balance font-semibold tracking-tight leading-[1.12]"
                style={{
                  fontSize: 'clamp(2.25rem, 3.8vw, 3.45rem)',
                  color: 'var(--text-primary)',
                }}
              >
                {t.heroTitle}
              </h1>

              <p
                className="max-w-xl text-base leading-relaxed sm:text-lg"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t.heroSubtitle}
              </p>
            </div>

            {/* Primary Actions: Booking.com + Direct Start via Telegram + Click-to-Call */}
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={HOTEL_CONFIG.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-md px-5 py-3 text-sm font-semibold transition-colors duration-150"
                  style={{
                    backgroundColor: 'var(--gold-primary)',
                    color: 'var(--gold-contrast-text)',
                  }}
                >
                  <span>{t.bookNow} · Booking.com</span>
                  <ExternalLink className="h-4 w-4" />
                </a>

                <a
                  href={HOTEL_CONFIG.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-md border px-5 py-3 text-sm font-semibold transition-colors duration-150"
                  style={{
                    backgroundColor: 'var(--bg-canvas)',
                    borderColor: 'var(--gold-primary)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <Send className="h-4 w-4" style={{ color: 'var(--gold-primary)' }} />
                  <span>{t.startTelegram}</span>
                </a>
              </div>

              {/* Direct Click-to-Call Phone Strip + Telegram Bot */}
              <div
                className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4 text-sm"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                {HOTEL_CONFIG.phones.map((phone) => (
                  <a
                    key={phone.href}
                    href={phone.href}
                    dir="ltr"
                    className="inline-flex min-h-10 items-center gap-2 font-clock font-medium transition-colors hover:underline underline-offset-4"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    <Phone className="h-4 w-4 shrink-0" style={{ color: 'var(--gold-primary)' }} />
                    <span>{phone.display}</span>
                  </a>
                ))}
                <a
                  href={HOTEL_CONFIG.telegramBotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-10 items-center gap-1.5 text-xs font-semibold transition-colors hover:underline underline-offset-4"
                  style={{ color: 'var(--gold-primary)' }}
                >
                  <Send className="h-3.5 w-3.5 shrink-0" />
                  <span>{t.telegramBotBtn}</span>
                </a>
              </div>

              <div
                className="inline-flex flex-col rounded-2xl border px-6 py-4 shadow-sm"
                style={{
                  backgroundColor: 'var(--bg-elevated)',
                  borderColor: 'var(--border-strong)',
                }}
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--gold-primary)' }}>
                  {t.kokandLiveTime} · UTC+5
                </span>
                <time
                  dateTime={now.toISOString()}
                  className="font-clock gold-text text-4xl font-semibold leading-tight sm:text-5xl"
                >
                  {kokandClock.time24}
                </time>
                <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                  {kokandClock.dateLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Reception & Facade Showcase */}
          <div className="flex flex-col justify-between gap-3 lg:col-span-6">
            <div
              className="relative flex-1 overflow-hidden rounded-xl border"
              style={{
                borderColor: 'var(--border-strong)',
                backgroundColor: 'var(--bg-surface)',
                minHeight: '340px',
              }}
            >
              <img
                src={activeSlide.src}
                alt={activeSlide.alt}
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover lg:absolute lg:inset-0"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent p-5 pt-16">
                <p className="text-xs font-medium text-amber-200">{activeSlide.label}</p>
                <p className="mt-0.5 text-sm font-medium text-white">{activeSlide.alt}</p>
              </div>
            </div>

            {/* Interactive Slide Selector (Reception / Exterior Day / Exterior Night) */}
            <div className="grid grid-cols-3 gap-2">
              {heroMediaSlides.map((slide, idx) => {
                const selected = idx === heroShowcaseIndex;
                return (
                  <button
                    key={slide.src}
                    type="button"
                    onClick={() => setHeroShowcaseIndex(idx)}
                    className="flex items-center gap-2.5 rounded-lg border p-2 text-left transition-colors duration-150"
                    style={{
                      backgroundColor: selected ? 'var(--bg-accent-soft)' : 'var(--bg-canvas)',
                      borderColor: selected ? 'var(--gold-primary)' : 'var(--border-hairline)',
                    }}
                  >
                    <img
                      src={slide.src}
                      alt={slide.alt}
                      referrerPolicy="no-referrer"
                      className="h-10 w-12 shrink-0 rounded object-cover"
                    />
                    <span
                      className="truncate text-xs font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {slide.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Full-Width Reception World Clocks Row */}
        <div
          className="mt-10 rounded-xl border p-4 sm:p-5"
          style={{
            backgroundColor: 'var(--bg-canvas)',
            borderColor: 'var(--border-hairline)',
          }}
        >
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-semibold" style={{ color: 'var(--gold-primary)' }}>
              {t.receptionWorldClocks}
            </span>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {HOTEL_CONFIG.shortName} · {HOTEL_CONFIG.city}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            <div
              className="rounded-lg border px-3.5 py-2.5"
              style={{
                backgroundColor: 'var(--bg-accent-soft)',
                borderColor: 'var(--gold-primary)',
              }}
            >
              <div className="text-xs font-semibold" style={{ color: 'var(--gold-primary)' }}>
                {HOTEL_CONFIG.city} (UZ)
              </div>
              <div
                className="font-clock mt-1 text-lg font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                {kokandClock.time24}
              </div>
            </div>

            {RECEPTION_WORLD_CLOCKS.map((city) => {
              const cityTime = formatCityClock(now, city.timeZone, language);
              return (
                <div
                  key={city.id}
                  className="rounded-lg border px-3.5 py-2.5"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-hairline)',
                  }}
                >
                  <div className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
                    {city.label}
                  </div>
                  <div
                    className="font-clock mt-1 text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {cityTime.hoursMinutes}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
