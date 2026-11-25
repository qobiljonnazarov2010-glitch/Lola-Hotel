import { useEffect, useState } from 'react';
import { ContactAndFooter } from './components/ContactAndFooter';
import { ExperienceToolbar } from './components/ExperienceToolbar';
import { GallerySection } from './components/GallerySection';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { KokandAndConciergeSection } from './components/KokandAndConciergeSection';
import { LanguageOrbitShowcase } from './components/LanguageOrbitShowcase';
import { RoomsSection } from './components/RoomsSection';
import { ThemeId } from './data/hotelData';
import { LanguageCode, TRANSLATIONS } from './data/translations';
import { isRtlLanguage } from './utils/hotelLogic';

const STORAGE_LANG_KEY = 'lola-hotel-uz-lang';
const STORAGE_THEME_KEY = 'lola-hotel-uz-theme';

function getInitialLanguage(): LanguageCode {
  try {
    const saved = window.localStorage.getItem(STORAGE_LANG_KEY) as LanguageCode | null;
    if (saved && saved in TRANSLATIONS) return saved;
  } catch {
    // ignore storage errors
  }
  return 'uz';
}

function getInitialTheme(): ThemeId {
  try {
    const saved = window.localStorage.getItem(STORAGE_THEME_KEY) as ThemeId | null;
    if (saved === 'ivory-gold' || saved === 'royal-gold' || saved === 'obsidian') {
      return saved;
    }
  } catch {
    // ignore storage errors
  }
  return 'ivory-gold';
}

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>(getInitialLanguage);
  const [theme, setTheme] = useState<ThemeId>(getInitialTheme);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [now, setNow] = useState<Date>(() => new Date());

  const t = TRANSLATIONS[language];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const canonicalHref = `${window.location.origin}${window.location.pathname}`;
    let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;

    let ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.content = canonicalHref;
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = isRtlLanguage(language) ? 'rtl' : 'ltr';
    try {
      window.localStorage.setItem(STORAGE_LANG_KEY, language);
    } catch {
      // ignore storage errors
    }
  }, [language]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      window.localStorage.setItem(STORAGE_THEME_KEY, theme);
    } catch {
      // ignore storage errors
    }
  }, [theme]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        t={t}
        language={language}
        onLanguageChange={setLanguage}
        theme={theme}
        onThemeChange={setTheme}
      />

      <main className="flex-1">
        <ExperienceToolbar
          t={t}
          language={language}
          onLanguageChange={setLanguage}
          theme={theme}
          onThemeChange={setTheme}
          now={now}
        />

        <LanguageOrbitShowcase
          t={t}
          language={language}
          onLanguageChange={setLanguage}
        />

        <HeroSection
          t={t}
          language={language}
          now={now}
        />

        <RoomsSection t={t} onOpenLightbox={(src) => setLightboxSrc(src)} />

        <GallerySection
          t={t}
          lightboxSrc={lightboxSrc}
          onOpenLightbox={(src) => setLightboxSrc(src)}
          onCloseLightbox={() => setLightboxSrc(null)}
        />

        <KokandAndConciergeSection t={t} />

        <ContactAndFooter t={t} />
      </main>
    </div>
  );
}
