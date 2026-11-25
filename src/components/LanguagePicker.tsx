import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { LANGUAGES, LanguageCode } from '../data/translations';
import { CountryFlag } from './CountryFlag';

interface LanguagePickerProps {
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  label: string;
  fullWidth?: boolean;
  testIdPrefix?: string;
}

export function LanguagePicker({
  language,
  onLanguageChange,
  label,
  fullWidth = false,
  testIdPrefix = '',
}: LanguagePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={containerRef} className={`relative ${fullWidth ? 'w-full' : ''}`}>
      <button
        type="button"
        data-testid={`${testIdPrefix}language-trigger`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        onClick={() => setOpen((prev) => !prev)}
        className={`inline-flex min-h-10 items-center justify-between gap-2.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors duration-150 ${
          fullWidth ? 'w-full min-h-11' : ''
        }`}
        style={{
          backgroundColor: 'var(--bg-canvas)',
          borderColor: open ? 'var(--gold-primary)' : 'var(--border-hairline)',
          color: 'var(--text-primary)',
        }}
      >
        <span className="flex items-center gap-2 whitespace-nowrap">
          <CountryFlag code={currentLang.code} className="h-4 w-4" />
          <span
            className="font-clock text-[11px] font-semibold"
            style={{ color: 'var(--gold-primary)' }}
          >
            {currentLang.countryTag}
          </span>
          <span>{currentLang.nativeName}</span>
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          style={{ color: 'var(--text-muted)' }}
        />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label={label}
          className={`z-50 mt-2 rounded-xl border p-3 shadow-xl backdrop-blur-md ${
            fullWidth ? 'w-full' : 'absolute end-0 w-[340px] sm:w-[390px]'
          }`}
          style={{
            backgroundColor: 'var(--bg-canvas)',
            borderColor: 'var(--border-strong)',
          }}
        >
          <div className="mb-2.5 flex items-center justify-between px-1.5 pt-0.5">
            <span className="text-[11px] font-semibold" style={{ color: 'var(--gold-primary)' }}>
              {label}
            </span>
            <span className="font-clock text-[11px]" style={{ color: 'var(--text-muted)' }}>
              16
            </span>
          </div>

          <div className="grid max-h-[70vh] grid-cols-2 gap-1.5 overflow-y-auto sm:max-h-[460px]">
            {LANGUAGES.map((lang) => {
              const selected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  data-testid={`${testIdPrefix}lang-option-${lang.code}`}
                  onClick={() => {
                    onLanguageChange(lang.code);
                    setOpen(false);
                  }}
                  className="flex min-h-9 items-center justify-between gap-2 rounded-lg border px-2.5 py-1.5 text-start text-xs transition-colors duration-150"
                  style={{
                    backgroundColor: selected ? 'var(--gold-primary)' : 'var(--bg-surface)',
                    borderColor: selected ? 'var(--gold-primary)' : 'var(--border-hairline)',
                    color: selected ? 'var(--gold-contrast-text)' : 'var(--text-primary)',
                  }}
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <CountryFlag code={lang.code} className="h-4 w-4" />
                    <span
                      className="font-clock shrink-0 text-[10px] font-semibold opacity-85"
                      style={{
                        color: selected ? 'var(--gold-contrast-text)' : 'var(--gold-primary)',
                      }}
                    >
                      {lang.countryTag}
                    </span>
                    <span className="truncate font-medium">{lang.nativeName}</span>
                  </span>
                  {selected && <Check className="h-3.5 w-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
