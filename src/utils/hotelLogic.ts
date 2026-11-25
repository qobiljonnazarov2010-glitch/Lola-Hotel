import { HOTEL_CONFIG } from '../data/hotelData';

export interface FormattedClock {
  time24: string;
  seconds: string;
  hoursMinutes: string;
  dateLabel: string;
  periodOfDay: 'morning' | 'afternoon' | 'evening' | 'night';
}

export function formatCityClock(date: Date, timeZone: string, locale = 'en-GB'): FormattedClock {
  const safeLocale = normalizeIntlLocale(locale);
  const partsFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = partsFormatter.formatToParts(date);
  const hourStr = parts.find((p) => p.type === 'hour')?.value ?? '00';
  const minStr = parts.find((p) => p.type === 'minute')?.value ?? '00';
  const secStr = parts.find((p) => p.type === 'second')?.value ?? '00';

  const hourNum = Number.parseInt(hourStr, 10) % 24;
  const normalizedHour = String(hourNum).padStart(2, '0');

  let periodOfDay: FormattedClock['periodOfDay'] = 'night';
  if (hourNum >= 5 && hourNum < 12) periodOfDay = 'morning';
  else if (hourNum >= 12 && hourNum < 17) periodOfDay = 'afternoon';
  else if (hourNum >= 17 && hourNum < 22) periodOfDay = 'evening';

  let dateLabel = '';
  if (safeLocale.startsWith('uz')) {
    const uzParts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'short',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    }).formatToParts(date);
    const wdMap: Record<string, string> = {
      Sun: 'Yak',
      Mon: 'Dush',
      Tue: 'Sesh',
      Wed: 'Chor',
      Thu: 'Pay',
      Fri: 'Jum',
      Sat: 'Shan',
    };
    const monthNames = [
      'yanvar',
      'fevral',
      'mart',
      'aprel',
      'may',
      'iyun',
      'iyul',
      'avgust',
      'sentabr',
      'oktabr',
      'noyabr',
      'dekabr',
    ];
    const wdRaw = uzParts.find((p) => p.type === 'weekday')?.value ?? '';
    const dayVal = uzParts.find((p) => p.type === 'day')?.value ?? '';
    const monthIdx = Number.parseInt(uzParts.find((p) => p.type === 'month')?.value ?? '1', 10) - 1;
    const yearVal = uzParts.find((p) => p.type === 'year')?.value ?? '';
    dateLabel = `${wdMap[wdRaw] ?? wdRaw}, ${dayVal}-${monthNames[monthIdx] ?? ''}, ${yearVal}`;
  } else {
    try {
      dateLabel = new Intl.DateTimeFormat(safeLocale, {
        timeZone,
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(date);
    } catch {
      dateLabel = new Intl.DateTimeFormat('en-GB', {
        timeZone,
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(date);
    }
  }

  return {
    time24: `${normalizedHour}:${minStr}:${secStr}`,
    hoursMinutes: `${normalizedHour}:${minStr}`,
    seconds: secStr,
    dateLabel,
    periodOfDay,
  };
}

export function normalizeIntlLocale(lang: string): string {
  const map: Record<string, string> = {
    uz: 'uz-Latn-UZ',
    en: 'en-US',
    ru: 'ru-RU',
    kk: 'kk-KZ',
    ky: 'ky-KG',
    tg: 'tg-TJ',
    ja: 'ja-JP',
    ko: 'ko-KR',
    hi: 'hi-IN',
    zh: 'zh-CN',
    fr: 'fr-FR',
    de: 'de-DE',
    it: 'it-IT',
    pt: 'pt-BR',
    ar: 'ar-SA',
    fa: 'fa-IR',
  };
  return map[lang] ?? 'en-US';
}

export function calculateStayNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const start = Date.parse(`${checkIn}T00:00:00Z`);
  const end = Date.parse(`${checkOut}T00:00:00Z`);
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) {
    return 1;
  }
  const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(diffDays, 90));
}

export function getDefaultStayDates(referenceDate: Date = new Date()): { checkIn: string; checkOut: string } {
  const tzDateStr = new Intl.DateTimeFormat('en-CA', {
    timeZone: HOTEL_CONFIG.timezone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(referenceDate);

  const base = new Date(`${tzDateStr}T00:00:00Z`);
  const next = new Date(base.getTime() + 2 * 24 * 60 * 60 * 1000);

  return {
    checkIn: base.toISOString().slice(0, 10),
    checkOut: next.toISOString().slice(0, 10),
  };
}

export function buildTelegramInquiryText(params: {
  roomLabel: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
}): string {
  return [
    'Lola Hotel — Booking Inquiry',
    `Room: ${params.roomLabel}`,
    `Check-in: ${params.checkIn}`,
    `Check-out: ${params.checkOut} (${params.nights} nights)`,
    `Guests: ${params.guests}`,
  ].join('\n');
}

export function isRtlLanguage(langCode: string): boolean {
  return langCode === 'ar' || langCode === 'fa';
}
