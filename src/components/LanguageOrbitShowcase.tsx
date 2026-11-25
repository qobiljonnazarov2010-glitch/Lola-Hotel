import { ArrowDown, ChevronLeft, ChevronRight, RotateCw } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { HOTEL_CONFIG } from '../data/hotelData';
import { LANGUAGES, LanguageCode, TranslationDictionary } from '../data/translations';
import {
  computePointerAngleDeg,
  getOrbitNodePosition,
  shortestAngleDeltaDeg,
} from '../utils/orbitMath';
import { CountryFlag } from './CountryFlag';

interface LanguageOrbitShowcaseProps {
  t: TranslationDictionary;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

const LOGICAL_STAGE_WIDTH = 760;
const LOGICAL_STAGE_HEIGHT = 636;
const ORBIT_RX = 316;
const ORBIT_RY = 272;

export function LanguageOrbitShowcase({
  t,
  language,
  onLanguageChange,
}: LanguageOrbitShowcaseProps) {
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const wheelHitAreaRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const angleRef = useRef(0);
  const velocityRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const dragDistanceRef = useRef(0);
  const lastPointerAngleRef = useRef(0);
  const pointerDownClientRef = useRef<{ x: number; y: number } | null>(null);
  const activePointerIdRef = useRef<number | null>(null);

  const [stageScale, setStageScale] = useState(1);
  const [isDraggingUI, setIsDraggingUI] = useState(false);

  const applyPositions = useCallback((rotationDeg: number) => {
    for (let i = 0; i < LANGUAGES.length; i++) {
      const node = nodeRefs.current[i];
      if (!node) continue;
      const { x, y } = getOrbitNodePosition(
        i,
        LANGUAGES.length,
        rotationDeg,
        ORBIT_RX,
        ORBIT_RY,
      );
      node.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) translate(-50%, -50%)`;
    }
  }, []);

  // Measure container width so mobile viewports scale the entire orbital wheel without overflow
  useEffect(() => {
    const el = outerContainerRef.current;
    if (!el) return;

    const updateScale = () => {
      const available = el.clientWidth;
      if (!available) return;
      const next = Math.min(1, Math.max(0.44, available / LOGICAL_STAGE_WIDTH));
      setStageScale(next);
    };

    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Smooth compositor-only rotation loop (60fps inertia on flick, lightweight ~25fps ambient drift)
  useEffect(() => {
    applyPositions(angleRef.current);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let rafId = 0;
    let lastTime = performance.now();
    let lastAmbientCommit = lastTime;

    const tick = (now: number) => {
      const dt = Math.min(0.05, Math.max(0.001, (now - lastTime) / 1000));
      lastTime = now;

      if (!isDraggingRef.current) {
        if (Math.abs(velocityRef.current) > 0.08) {
          angleRef.current += velocityRef.current * dt * 60;
          velocityRef.current *= Math.pow(0.94, dt * 60);
          applyPositions(angleRef.current);
          lastAmbientCommit = now;
        } else {
          velocityRef.current = 0;
          if (!isHoveredRef.current && !prefersReducedMotion && now - lastAmbientCommit >= 40) {
            const ambientDt = (now - lastAmbientCommit) / 1000;
            angleRef.current += 4.2 * ambientDt;
            applyPositions(angleRef.current);
            lastAmbientCommit = now;
          }
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(rafId);
  }, [applyPositions]);

  const getWheelCenter = () => {
    const el = wheelHitAreaRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 && event.pointerType === 'mouse') return;
    const center = getWheelCenter();
    if (!center) return;

    activePointerIdRef.current = event.pointerId;
    isDraggingRef.current = true;
    setIsDraggingUI(true);
    dragDistanceRef.current = 0;
    velocityRef.current = 0;
    pointerDownClientRef.current = { x: event.clientX, y: event.clientY };
    lastPointerAngleRef.current = computePointerAngleDeg(
      center.x,
      center.y,
      event.clientX,
      event.clientY,
    );
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || activePointerIdRef.current !== event.pointerId) return;
    const center = getWheelCenter();
    if (!center) return;

    if (pointerDownClientRef.current) {
      const dist = Math.hypot(
        event.clientX - pointerDownClientRef.current.x,
        event.clientY - pointerDownClientRef.current.y,
      );
      dragDistanceRef.current = Math.max(dragDistanceRef.current, dist);
      // Capture pointer only once intentional drag starts so regular clicks on buttons always fire cleanly
      if (dragDistanceRef.current >= 6 && !event.currentTarget.hasPointerCapture(event.pointerId)) {
        try {
          event.currentTarget.setPointerCapture(event.pointerId);
        } catch {
          // ignore pointer capture error
        }
      }
    }

    const nextAngle = computePointerAngleDeg(center.x, center.y, event.clientX, event.clientY);
    const delta = shortestAngleDeltaDeg(lastPointerAngleRef.current, nextAngle);
    lastPointerAngleRef.current = nextAngle;

    if (dragDistanceRef.current >= 6) {
      angleRef.current += delta;
      velocityRef.current = delta * 0.42;
      applyPositions(angleRef.current);
    }
  };

  const handlePointerUpOrCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerIdRef.current !== event.pointerId) return;
    isDraggingRef.current = false;
    setIsDraggingUI(false);
    activePointerIdRef.current = null;
    pointerDownClientRef.current = null;
    try {
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    } catch {
      // ignore release error
    }
  };

  const spinBy = (deltaDeg: number) => {
    velocityRef.current += deltaDeg;
  };

  const currentLang = LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];
  const scaledHeight = Math.round(LOGICAL_STAGE_HEIGHT * stageScale);

  return (
    <section
      aria-label={t.languageLabel}
      className="relative overflow-hidden border-b"
      style={{
        background: 'var(--hero-gradient)',
        borderColor: 'var(--border-hairline)',
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center px-3 pt-3 pb-5 sm:px-6 sm:pt-4 sm:pb-6 lg:px-8">
        {/* Responsive Scaled Wrapper preserving exact circular geometry on desktop & mobile */}
        <div
          ref={outerContainerRef}
          className="flex w-full items-center justify-center"
          style={{ height: `${scaledHeight}px` }}
        >
          <div
            ref={wheelHitAreaRef}
            data-testid="language-orbit-wheel"
            dir="ltr"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUpOrCancel}
            onPointerCancel={handlePointerUpOrCancel}
            onPointerEnter={() => {
              isHoveredRef.current = true;
            }}
            onPointerLeave={() => {
              isHoveredRef.current = false;
            }}
            className={`relative select-none touch-none ${
              isDraggingUI ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              width: `${LOGICAL_STAGE_WIDTH}px`,
              height: `${LOGICAL_STAGE_HEIGHT}px`,
              transform: `scale(${stageScale})`,
              transformOrigin: 'center center',
            }}
          >
            {/* Delicate Gold Concentric Orbital Rings & Tulip Motifs */}
            <svg
              viewBox="0 0 760 636"
              className="pointer-events-none absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="lolaOrbitGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="var(--gold-light)" stopOpacity="0.18" />
                  <stop offset="65%" stopColor="var(--gold-primary)" stopOpacity="0.06" />
                  <stop offset="100%" stopColor="var(--gold-primary)" stopOpacity="0" />
                </radialGradient>
              </defs>

              <circle cx="380" cy="318" r="308" fill="url(#lolaOrbitGlow)" />

              {/* Outer fine elliptical orbital paths matching luxury gold rings */}
              <ellipse
                cx="380"
                cy="318"
                rx="316"
                ry="272"
                fill="none"
                stroke="var(--gold-primary)"
                strokeOpacity="0.46"
                strokeWidth="1.25"
              />
              <ellipse
                cx="380"
                cy="318"
                rx="252"
                ry="220"
                fill="none"
                stroke="var(--gold-primary)"
                strokeOpacity="0.28"
                strokeWidth="1"
              />
              <circle
                cx="380"
                cy="318"
                r="178"
                fill="none"
                stroke="var(--gold-primary)"
                strokeOpacity="0.52"
                strokeWidth="1.35"
              />
              <circle
                cx="380"
                cy="318"
                r="146"
                fill="none"
                stroke="var(--gold-primary)"
                strokeOpacity="0.22"
                strokeWidth="0.9"
              />

              {/* Subtle gold node intersections */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const cx = 380 + Math.cos(rad) * 178;
                const cy = 318 + Math.sin(rad) * 178;
                return (
                  <circle
                    key={deg}
                    cx={cx}
                    cy={cy}
                    r="3.2"
                    fill="var(--gold-light)"
                    fillOpacity="0.82"
                  />
                );
              })}

              {/* Small decorative gold tulip silhouettes at outer 45-deg corners */}
              {[42, 138, 222, 318].map((deg) => {
                const rad = (deg * Math.PI) / 180;
                const tx = 380 + Math.cos(rad) * 356;
                const ty = 318 + Math.sin(rad) * 298;
                return (
                  <g
                    key={deg}
                    transform={`translate(${tx}, ${ty}) rotate(${deg + 90}) scale(0.7)`}
                    stroke="var(--gold-primary)"
                    strokeOpacity="0.35"
                    strokeWidth="1.5"
                    fill="none"
                  >
                    <path d="M0 10V-4M0 8C-8 4 -10 -4 -6 -10C-3 -6 -1 -4 0 -10C1 -4 3 -6 6 -10C10 -4 8 4 0 8Z" />
                    <path d="M0 8C-6 10 -11 8 -14 3M0 8C6 10 11 8 14 3" />
                  </g>
                );
              })}
            </svg>

            {/* Stationary Center Lola Hotel Gold Emblem */}
            <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-56 w-56 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
              <img
                src={HOTEL_CONFIG.images.logo}
                alt="Lola Hotel Official Gold Logo"
                referrerPolicy="no-referrer"
                className="h-44 w-auto object-contain drop-shadow-[0_6px_18px_rgba(176,141,59,0.18)]"
              />
            </div>

            {/* 16 Interactive Language Capsules Orbiting Around the Center */}
            {LANGUAGES.map((lang, index) => {
              const active = lang.code === language;
              return (
                <div
                  key={lang.code}
                  ref={(el) => {
                    nodeRefs.current[index] = el;
                  }}
                  className="absolute left-1/2 top-1/2 will-change-transform"
                >
                  <button
                    type="button"
                    data-testid={`orbit-lang-${lang.code}`}
                    aria-pressed={active}
                    aria-label={`${lang.countryTag} ${lang.nativeName}`}
                    onClick={(e) => {
                      // Prevent click trigger right after a drag gesture
                      if (dragDistanceRef.current >= 6) {
                        e.preventDefault();
                        return;
                      }
                      onLanguageChange(lang.code);
                    }}
                    className={`group flex h-10 w-[114px] items-center gap-1.5 rounded-full border px-2 py-1 text-left transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                      active ? 'scale-105 shadow-lg' : 'hover:scale-105 shadow-sm hover:shadow-md'
                    }`}
                    style={{
                      backgroundColor: active
                        ? 'var(--gold-primary)'
                        : 'color-mix(in srgb, var(--bg-canvas) 94%, var(--bg-accent-soft))',
                      borderColor: active ? 'var(--gold-primary)' : 'var(--border-strong)',
                      color: active ? 'var(--gold-contrast-text)' : 'var(--text-primary)',
                    }}
                  >
                    <CountryFlag code={lang.code} className="h-6 w-6" />
                    <span className="flex min-w-0 flex-1 flex-col leading-tight">
                      <span
                        className="font-clock text-[9.5px] font-bold tracking-wider"
                        style={{
                          color: active ? 'var(--gold-contrast-text)' : 'var(--gold-primary)',
                        }}
                      >
                        {lang.countryTag}
                      </span>
                      <span className="truncate text-[10.5px] font-semibold">
                        {lang.nativeName}
                      </span>
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Spin Controls + Instant Active Language Readout + Explore Anchor */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <div
            className="inline-flex items-center gap-1 rounded-full border p-1"
            style={{
              backgroundColor: 'var(--bg-canvas)',
              borderColor: 'var(--border-hairline)',
            }}
          >
            <button
              type="button"
              data-testid="orbit-spin-left"
              aria-label={t.rotateLeft}
              onClick={() => spinBy(-3.2)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-150 hover:opacity-80"
              style={{
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--gold-primary)',
              }}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <span
              className="inline-flex items-center gap-2 px-3 text-xs font-medium whitespace-nowrap"
              style={{ color: 'var(--text-secondary)' }}
            >
              <RotateCw className="h-3.5 w-3.5" style={{ color: 'var(--gold-primary)' }} />
              <span>{t.orbitHint}</span>
              <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
                ·
              </span>
              <strong style={{ color: 'var(--text-primary)' }}>
                {currentLang.countryTag} {currentLang.nativeName}
              </strong>
            </span>

            <button
              type="button"
              data-testid="orbit-spin-right"
              aria-label={t.rotateRight}
              onClick={() => spinBy(3.2)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-150 hover:opacity-80"
              style={{
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--gold-primary)',
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <a
            href="#hero-overview"
            className="inline-flex min-h-10 items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0"
            style={{
              backgroundColor: 'var(--gold-primary)',
              color: 'var(--gold-contrast-text)',
            }}
          >
            <span>{t.exploreHotel}</span>
            <ArrowDown className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
