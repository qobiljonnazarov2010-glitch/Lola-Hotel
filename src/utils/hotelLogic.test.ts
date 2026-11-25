import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildTelegramInquiryText,
  calculateStayNights,
  formatCityClock,
  isRtlLanguage,
  normalizeIntlLocale,
} from './hotelLogic';
import {
  getOrbitNodePosition,
  normalizeAngleDeg,
  shortestAngleDeltaDeg,
} from './orbitMath';
import { LANGUAGES, TRANSLATIONS } from '../data/translations';
import { GALLERY_PHOTOS, HOTEL_CONFIG, ROOMS } from '../data/hotelData';

test('formatCityClock computes Kokand (Asia/Tashkent UTC+5) accurately', () => {
  // 2026-06-15T12:30:45Z -> Kokand UTC+5 is 17:30:45
  const sampleDate = new Date('2026-06-15T12:30:45Z');
  const formatted = formatCityClock(sampleDate, HOTEL_CONFIG.timezone, 'en');
  assert.equal(formatted.hoursMinutes, '17:30');
  assert.equal(formatted.seconds, '45');
  assert.equal(formatted.time24, '17:30:45');
  assert.equal(formatted.periodOfDay, 'evening');
  assert.ok(formatted.dateLabel.includes('2026'));

  const uzFormatted = formatCityClock(sampleDate, HOTEL_CONFIG.timezone, 'uz');
  assert.ok(uzFormatted.dateLabel.includes('iyun'));
  assert.ok(!uzFormatted.dateLabel.includes('M06'));
});

test('calculateStayNights handles valid, invalid, and reversed date ranges', () => {
  assert.equal(calculateStayNights('2026-12-01', '2026-12-04'), 3);
  assert.equal(calculateStayNights('2026-12-04', '2026-12-01'), 1);
  assert.equal(calculateStayNights('2026-12-01', '2026-12-01'), 1);
  assert.equal(calculateStayNights('', ''), 1);
});

test('buildTelegramInquiryText formats stay summary cleanly', () => {
  const text = buildTelegramInquiryText({
    roomLabel: 'Deluxe King Suite',
    checkIn: '2026-12-01',
    checkOut: '2026-12-03',
    guests: 2,
    nights: 2,
  });
  assert.ok(text.includes('Lola Hotel'));
  assert.ok(!text.includes('Lola Hotel uz'));
  assert.ok(text.includes('Deluxe King Suite'));
  assert.ok(text.includes('2 nights'));
  assert.ok(text.includes('Guests: 2'));
});

test('all 16 requested languages have complete non-empty translations and clean Lola Hotel branding', () => {
  assert.equal(LANGUAGES.length, 16);
  const referenceKeys = Object.keys(TRANSLATIONS.en);

  for (const lang of LANGUAGES) {
    const dict = TRANSLATIONS[lang.code];
    assert.ok(dict, `Missing dictionary for ${lang.code}`);
    for (const key of referenceKeys) {
      const value = dict[key as keyof typeof dict];
      assert.equal(typeof value, 'string', `Non-string value for ${lang.code}.${key}`);
      assert.ok(value.trim().length > 0, `Empty translation for ${lang.code}.${key}`);
      assert.ok(!value.includes('Lola Hotel uz'), `Unexpected "Lola Hotel uz" in ${lang.code}.${key}`);
    }
  }
});

test('RTL detection and locale normalization work for Arabic and Persian', () => {
  assert.equal(isRtlLanguage('ar'), true);
  assert.equal(isRtlLanguage('fa'), true);
  assert.equal(isRtlLanguage('uz'), false);
  assert.equal(isRtlLanguage('ja'), false);
  assert.equal(normalizeIntlLocale('uz'), 'uz-Latn-UZ');
  assert.equal(normalizeIntlLocale('fa'), 'fa-IR');
});

test('rooms and gallery cover all uploaded assets without missing paths', () => {
  assert.ok(ROOMS.length >= 4);
  assert.equal(GALLERY_PHOTOS.length, 13);
  assert.equal(HOTEL_CONFIG.brandName, 'Lola Hotel');
  assert.equal(HOTEL_CONFIG.images.logo, 'assets/aistudio/logo_transparent.png');
  for (const photo of GALLERY_PHOTOS) {
    assert.ok(photo.src.startsWith('assets/aistudio/'));
  }
});

test('orbitMath positions 16 languages evenly without capsule overlap across rotation', () => {
  const rx = 316;
  const ry = 272;
  const badgeW = 114;
  const badgeH = 40;

  // UZ (index 0) top-left, EN (index 1) top-right at 0 rotation
  const uz = getOrbitNodePosition(0, 16, 0, rx, ry);
  const en = getOrbitNodePosition(1, 16, 0, rx, ry);
  assert.ok(uz.x < 0 && uz.y < 0);
  assert.ok(en.x > 0 && en.y < 0);
  assert.ok(Math.abs(uz.x + en.x) < 1e-6);

  // Check zero bounding-box overlap at 12 rotation angles
  for (let rot = 0; rot < 360; rot += 30) {
    const coords = Array.from({ length: 16 }, (_, idx) =>
      getOrbitNodePosition(idx, 16, rot, rx, ry),
    );
    for (let i = 0; i < coords.length; i++) {
      for (let j = i + 1; j < coords.length; j++) {
        const dx = Math.abs(coords[i].x - coords[j].x);
        const dy = Math.abs(coords[i].y - coords[j].y);
        assert.ok(
          dx >= badgeW || dy >= badgeH,
          `Overlap detected at rot=${rot} between node ${i} and ${j}: dx=${dx.toFixed(1)}, dy=${dy.toFixed(1)}`,
        );
      }
    }
  }

  assert.equal(normalizeAngleDeg(-45), 315);
  assert.equal(shortestAngleDeltaDeg(175, -175), 10);
  assert.equal(shortestAngleDeltaDeg(-175, 175), -10);
});
