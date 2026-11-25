import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { HOTEL_CONFIG, ThemeId } from '../data/hotelData';
import { LanguageCode, TranslationDictionary } from '../data/translations';
import { LanguagePicker } from './LanguagePicker';

interface HeaderProps {
  t: TranslationDictionary;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  theme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
}

export function Header({
  t,
  language,
  onLanguageChange,
  theme,
  onThemeChange,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '#rooms', label: t.navRooms },
    { href: '#gallery', label: t.navGallery },
    { href: '#kokand', label: t.navKokand },
    { href: '#amenities', label: t.navAmenities },
    { href: '#contact', label: t.navContact },
  ];

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-200"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-canvas) 92%, transparent)',
        borderColor: 'var(--border-hairline)',
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Zone 1: Transparent Gold Logo + Brand Wordmark */}
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-3 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4"
          style={{ outlineColor: 'var(--gold-primary)' }}
        >
          <img
            src={HOTEL_CONFIG.images.logo}
            alt="Lola Hotel"
            referrerPolicy="no-referrer"
            className="logo-hover-180 h-10 w-auto object-contain"
          />
          <span
            className="font-display text-xl font-semibold tracking-tight whitespace-nowrap"
            style={{ color: 'var(--text-primary)' }}
          >
            Lola Hotel
          </span>
        </a>

        {/* Zone 2: 5 concise single-line nav links */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap shrink-0 text-sm font-medium transition-colors duration-150 hover:underline underline-offset-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary CTA button (+ mobile toggle on small viewports) */}
        <div className="flex shrink-0 items-center gap-3">
          <a
            href={HOTEL_CONFIG.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center whitespace-nowrap shrink-0 rounded-md px-5 py-2.5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2"
            style={{
              backgroundColor: 'var(--gold-primary)',
              color: 'var(--gold-contrast-text)',
              outlineColor: 'var(--gold-primary)',
            }}
          >
            {t.bookNow}
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? t.closeLightbox : 'Menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border md:hidden"
            style={{
              borderColor: 'var(--border-hairline)',
              color: 'var(--text-primary)',
              backgroundColor: 'var(--bg-surface)',
            }}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="border-t px-4 py-5 md:hidden"
          style={{
            backgroundColor: 'var(--bg-canvas)',
            borderColor: 'var(--border-hairline)',
          }}
        >
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex min-h-11 items-center rounded-md px-3 text-base font-medium"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div
            className="mt-4 space-y-4 border-t pt-4"
            style={{ borderColor: 'var(--border-hairline)' }}
          >
            <div>
              <p
                className="mb-1.5 text-xs font-medium"
                style={{ color: 'var(--text-muted)' }}
              >
                {t.languageLabel}
              </p>
              <LanguagePicker
                language={language}
                onLanguageChange={onLanguageChange}
                label={t.languageLabel}
                fullWidth
                testIdPrefix="mobile-"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: 'ivory-gold', label: t.themeIvoryGold },
                  { id: 'royal-gold', label: t.themeRoyalGold },
                  { id: 'obsidian', label: t.themeObsidian },
                ] as const
              ).map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => onThemeChange(preset.id)}
                  className="min-h-11 flex-1 rounded-md border px-3 text-xs font-medium whitespace-nowrap"
                  style={{
                    backgroundColor:
                      theme === preset.id ? 'var(--gold-primary)' : 'var(--bg-surface)',
                    color:
                      theme === preset.id ? 'var(--gold-contrast-text)' : 'var(--text-primary)',
                    borderColor: 'var(--border-hairline)',
                  }}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={HOTEL_CONFIG.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center justify-center rounded-md px-3 text-sm font-semibold"
                style={{
                  backgroundColor: 'var(--gold-primary)',
                  color: 'var(--gold-contrast-text)',
                }}
              >
                {t.bookNow}
              </a>
              <a
                href={HOTEL_CONFIG.telegramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center justify-center rounded-md border px-3 text-sm font-semibold"
                style={{
                  borderColor: 'var(--gold-primary)',
                  color: 'var(--text-primary)',
                }}
              >
                Telegram
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
