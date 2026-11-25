import { Coffee, Compass, MapPin, ShieldCheck, Wifi } from 'lucide-react';
import { HOTEL_CONFIG, KOKAND_LANDMARKS } from '../data/hotelData';
import { TranslationDictionary } from '../data/translations';

interface KokandAndConciergeSectionProps {
  t: TranslationDictionary;
}

export function KokandAndConciergeSection({ t }: KokandAndConciergeSectionProps) {
  const amenities = [
    { num: '01.', title: t.am1Title, desc: t.am1Desc, Icon: ShieldCheck },
    { num: '02.', title: t.am2Title, desc: t.am2Desc, Icon: Wifi },
    { num: '03.', title: t.am3Title, desc: t.am3Desc, Icon: Coffee },
    { num: '04.', title: t.am4Title, desc: t.am4Desc, Icon: MapPin },
  ];

  return (
    <>
      {/* Amenities Section */}
      <section
        id="amenities"
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
              {t.amenitiesTitle}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t.amenitiesSubtitle}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {amenities.map(({ num, title, desc, Icon }) => (
              <div
                key={num}
                className="flex flex-col justify-between gap-4 rounded-xl border p-6"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border-hairline)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="font-clock text-sm font-semibold"
                    style={{ color: 'var(--gold-primary)' }}
                  >
                    {num}
                  </span>
                  <Icon className="h-5 w-5" style={{ color: 'var(--gold-primary)' }} />
                </div>
                <div className="space-y-2">
                  <h3
                    className="font-display text-xl font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kokand Heritage Guide */}
      <section
        id="kokand"
        className="border-b py-16 lg:py-20"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-hairline)',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <div
              className="flex items-center gap-2 text-xs font-semibold"
              style={{ color: 'var(--gold-primary)' }}
            >
              <Compass className="h-4 w-4" />
              <span>{HOTEL_CONFIG.city} · Uzbekistan</span>
            </div>
            <h2
              className="font-display headline-balance text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: 'var(--text-primary)' }}
            >
              {t.kokandTitle}
            </h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {t.kokandSubtitle}
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {KOKAND_LANDMARKS.map((lm) => (
              <div
                key={lm.id}
                className="flex items-center justify-between gap-4 rounded-xl border px-5 py-4"
                style={{
                  backgroundColor: 'var(--bg-canvas)',
                  borderColor: 'var(--border-hairline)',
                }}
              >
                <div className="space-y-0.5">
                  <div className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {t[lm.nameKey]}
                  </div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {t[lm.categoryKey]}
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className="font-clock text-sm font-semibold"
                    style={{ color: 'var(--gold-primary)' }}
                  >
                    {lm.distanceKm}
                  </div>
                  <div className="font-clock text-xs" style={{ color: 'var(--text-muted)' }}>
                    {lm.driveMinutes} {t.minDrive}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
