import { Phone, Send } from 'lucide-react';
import { HOTEL_CONFIG } from '../data/hotelData';
import { TranslationDictionary } from '../data/translations';

interface FloatingContactProps {
  t: TranslationDictionary;
}

export function FloatingContact({ t }: FloatingContactProps) {
  return (
    <div className="fixed bottom-5 end-5 z-50 flex flex-col items-end gap-3">
      <a
        href={HOTEL_CONFIG.phones[0].href}
        aria-label={HOTEL_CONFIG.phones[0].display}
        className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform duration-200 hover:scale-110"
        style={{
          background: 'linear-gradient(135deg, var(--gold-light), var(--gold-primary))',
          color: 'var(--gold-contrast-text)',
        }}
      >
        <Phone className="h-6 w-6" />
      </a>
      <a
        href={HOTEL_CONFIG.telegramUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.startTelegram}
        className="tg-pulse flex h-14 items-center gap-2 rounded-full bg-[#229ED9] px-5 font-semibold text-white shadow-lg transition-transform duration-200 hover:scale-105"
      >
        <Send className="h-5 w-5" />
        <span className="hidden text-sm sm:inline">{t.startTelegram}</span>
      </a>
    </div>
  );
}
