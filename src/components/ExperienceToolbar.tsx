import { Clock, Palette } from 'lucide-react';
import { HOTEL_CONFIG, ThemeId } from '../data/hotelData';
import { LanguageCode, TranslationDictionary } from '../data/translations';
import { formatCityClock } from '../utils/hotelLogic';
import { LanguagePicker } from './LanguagePicker';

interface ExperienceToolbarProps {
  t: TranslationDictionary;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  theme: ThemeId;
  onThemeChange: (theme: ThemeId) => void;
  now: Date;
}

export function ExperienceToolbar({
  t,
  language,
  onLanguageChange,
  theme,
  onThemeChange,
  now,
}: ExperienceToolbarProps) {
  const kokandClock = formatCityClock(now, HOTEL_CONFIG.timezone, language);

  return (
    <div
      id="top"
      className="border-b"
      style={{
        borderColor: 'var(--border-hairline)',
        backgroundColor: 'color-mix(in srgb, var(--bg-surface) 90%, transparent)',
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Live Kokand Clock (Asia/Tashkent UTC+5) */}
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0" style={{ color: 'var(--gold-primary)' }} />
            <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
              {t.kokandLiveTime}:
            </span>
            <time
              data-testid="kokand-live-clock"
              dateTime={now.toISOString()}
              dir="ltr"
              className="font-clock text-sm font-semibold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              {kokandClock.time24}
            </time>
          </div>
          <span aria-hidden="true" className="hidden sm:inline" style={{ color: 'var(--text-muted)' }}>
            ·
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {kokandClock.dateLabel} (UTC+5)
            </span>
            <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
              ·
            </span>
            <span className="text-xs font-semibold" style={{ color: 'var(--gold-primary)' }}>
              {t.open247}
            </span>
          </div>
        </div>

        {/* Language (16) + Gold & White Design Collaboration Switcher */}
        <div className="flex flex-wrap items-center gap-3">
          <div
            role="group"
            aria-label={t.themeLabel}
            className="flex items-center gap-1 rounded-lg border p-1"
            style={{
              backgroundColor: 'var(--bg-canvas)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            <Palette className="mx-1.5 h-3.5 w-3.5 shrink-0" style={{ color: 'var(--gold-primary)' }} />
            {(
              [
                { id: 'ivory-gold', label: t.themeIvoryGold },
                { id: 'royal-gold', label: t.themeRoyalGold },
                { id: 'obsidian', label: t.themeObsidian },
              ] as const
            ).map((item) => {
              const active = theme === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-testid={`theme-${item.id}`}
                  aria-pressed={active}
                  onClick={() => onThemeChange(item.id)}
                  className="whitespace-nowrap shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors duration-150"
                  style={{
                    backgroundColor: active ? 'var(--gold-primary)' : 'transparent',
                    color: active ? 'var(--gold-contrast-text)' : 'var(--text-secondary)',
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <LanguagePicker
            language={language}
            onLanguageChange={onLanguageChange}
            label={t.languageLabel}
          />
        </div>
      </div>
    </div>
  );
}
