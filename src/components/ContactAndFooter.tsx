import { Check, Copy, ExternalLink, Instagram, MapPin, Phone, Send } from 'lucide-react';
import { useState } from 'react';
import { HOTEL_CONFIG } from '../data/hotelData';
import { TranslationDictionary } from '../data/translations';

interface ContactAndFooterProps {
  t: TranslationDictionary;
}

export function ContactAndFooter({ t }: ContactAndFooterProps) {
  const [addressCopied, setAddressCopied] = useState(false);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(HOTEL_CONFIG.address);
      setAddressCopied(true);
      window.setTimeout(() => setAddressCopied(false), 2200);
    } catch {
      setAddressCopied(false);
    }
  };

  return (
    <>
      <section
        id="contact"
        className="border-b py-16 lg:py-20"
        style={{
          backgroundColor: 'var(--bg-canvas)',
          borderColor: 'var(--border-hairline)',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <h2
              className="font-display headline-balance text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: 'var(--text-primary)' }}
            >
              {t.contactTitle}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t.contactSubtitle}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Left: Direct Phones (tap to call), Address, Telegram, Instagram */}
            <div className="flex flex-col justify-between gap-6 lg:col-span-6">
              {/* Click-to-call phone numbers */}
              <div
                className="rounded-xl border p-6"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-hairline)',
                }}
              >
                <p className="text-xs font-semibold" style={{ color: 'var(--gold-primary)' }}>
                  {t.callDirectLabel}
                </p>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {HOTEL_CONFIG.phones.map((phone) => (
                    <a
                      key={phone.href}
                      href={phone.href}
                      className="flex min-h-14 items-center justify-between gap-3 rounded-lg border px-4 py-3 transition-colors hover:opacity-90"
                      style={{
                        backgroundColor: 'var(--bg-canvas)',
                        borderColor: 'var(--border-strong)',
                        color: 'var(--text-primary)',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 shrink-0" style={{ color: 'var(--gold-primary)' }} />
                        <span className="font-clock text-sm font-semibold">{phone.display}</span>
                      </div>
                      <span
                        className="text-xs font-medium whitespace-nowrap"
                        style={{ color: 'var(--gold-primary)' }}
                      >
                        {t.tapToCall}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Exact Address Card */}
              <div
                className="rounded-xl border p-6"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-hairline)',
                }}
              >
                <p className="text-xs font-semibold" style={{ color: 'var(--gold-primary)' }}>
                  {t.addressLabel}
                </p>
                <p
                  className="mt-2 text-base font-semibold leading-snug"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {HOTEL_CONFIG.address}
                </p>
                <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                  {HOTEL_CONFIG.addressIntl}
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={HOTEL_CONFIG.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-md px-4 py-2 text-xs font-semibold"
                    style={{
                      backgroundColor: 'var(--gold-primary)',
                      color: 'var(--gold-contrast-text)',
                    }}
                  >
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{t.openGoogleMaps}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyAddress}
                    className="inline-flex min-h-11 items-center gap-2 rounded-md border px-4 py-2 text-xs font-semibold"
                    style={{
                      backgroundColor: 'var(--bg-canvas)',
                      borderColor: 'var(--border-hairline)',
                      color: 'var(--text-primary)',
                    }}
                  >
                    {addressCopied ? (
                      <>
                        <Check className="h-3.5 w-3.5" style={{ color: 'var(--gold-primary)' }} />
                        <span>{t.copiedConfirm}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" style={{ color: 'var(--gold-primary)' }} />
                        <span>{t.copyAddress}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Social & Messaging Channels (Telegram, Telegram Bot, Instagram) */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <a
                  href={HOTEL_CONFIG.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-xs font-semibold transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-hairline)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <Send className="h-4 w-4 shrink-0" style={{ color: 'var(--gold-primary)' }} />
                  <span className="truncate">@lolahotel</span>
                </a>

                <a
                  href={HOTEL_CONFIG.telegramBotUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-xs font-semibold transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-hairline)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <Send className="h-4 w-4 shrink-0" style={{ color: 'var(--gold-primary)' }} />
                  <span className="truncate">@lola_hotel_bot</span>
                </a>

                <a
                  href={HOTEL_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-12 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-xs font-semibold transition-colors"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderColor: 'var(--border-hairline)',
                    color: 'var(--text-primary)',
                  }}
                >
                  <Instagram className="h-4 w-4 shrink-0" style={{ color: 'var(--gold-primary)' }} />
                  <span className="truncate">@lolahotel_kokand</span>
                </a>
              </div>
            </div>

            {/* Right: Architectural Facade + Google Maps Pin Card */}
            <div
              className="flex flex-col justify-between overflow-hidden rounded-xl border lg:col-span-6"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-hairline)',
              }}
            >
              <div className="relative flex-1 min-h-[260px]">
                <img
                  src={HOTEL_CONFIG.images.exteriorEntrance}
                  alt={t.galExtEntrance}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover lg:absolute lg:inset-0"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-6 pt-16 text-white">
                  <div className="font-clock text-xs text-amber-200">
                    40.5497349° N · 70.922717° E
                  </div>
                  <div className="mt-1 font-display text-2xl font-semibold">Lola Hotel</div>
                  <div className="mt-0.5 text-xs text-white/85">{HOTEL_CONFIG.address}</div>
                </div>
              </div>

              <div
                className="flex flex-wrap items-center justify-between gap-4 border-t p-5"
                style={{ borderColor: 'var(--border-hairline)' }}
              >
                <a
                  href={HOTEL_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold hover:underline underline-offset-4"
                  style={{ color: 'var(--gold-primary)' }}
                >
                  <MapPin className="h-4 w-4" />
                  <span>{t.openGoogleMaps}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <a
                  href={HOTEL_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium hover:underline underline-offset-4"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <Instagram className="h-4 w-4" style={{ color: 'var(--gold-primary)' }} />
                  <span>{t.followInstagram}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiet Branded Footer */}
      <footer
        className="py-10"
        style={{
          backgroundColor: 'var(--bg-surface)',
          color: 'var(--text-secondary)',
        }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <div className="group flex items-center gap-3">
            <img
              src={HOTEL_CONFIG.images.logo}
              alt="Lola Hotel"
              referrerPolicy="no-referrer"
              className="logo-hover-180 h-12 w-auto object-contain"
            />
            <div>
              <div className="font-display text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
                Lola Hotel
              </div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {t.footerTagline}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs font-medium">
            <a href="#rooms" className="hover:underline underline-offset-4">
              {t.navRooms}
            </a>
            <a href="#gallery" className="hover:underline underline-offset-4">
              {t.navGallery}
            </a>
            <a href="#kokand" className="hover:underline underline-offset-4">
              {t.navKokand}
            </a>
            <a
              href={HOTEL_CONFIG.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4"
              style={{ color: 'var(--gold-primary)' }}
            >
              Booking.com
            </a>
            <a
              href={HOTEL_CONFIG.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline underline-offset-4"
            >
              Telegram
            </a>
          </div>

          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {t.footerRights}
          </p>
        </div>
      </footer>
    </>
  );
}
