import { useId } from 'react';
import { LanguageCode } from '../data/translations';

interface CountryFlagProps {
  code: LanguageCode;
  className?: string;
}

export function CountryFlag({ code, className = 'h-7 w-7' }: CountryFlagProps) {
  const rawId = useId();
  const clipId = `flag-clip-${code}-${rawId.replace(/:/g, '')}`;

  return (
    <svg
      viewBox="0 0 32 32"
      className={`${className} shrink-0 rounded-full shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]`}
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="16" cy="16" r="16" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>{renderFlagVector(code)}</g>
    </svg>
  );
}

function renderFlagVector(code: LanguageCode) {
  switch (code) {
    case 'uz':
      return (
        <>
          <rect width="32" height="10.2" y="0" fill="#1EB5E7" />
          <rect width="32" height="1.2" y="10.2" fill="#CE1126" />
          <rect width="32" height="9.2" y="11.4" fill="#FFFFFF" />
          <rect width="32" height="1.2" y="20.6" fill="#CE1126" />
          <rect width="32" height="10.2" y="21.8" fill="#1EB53A" />
          <circle cx="8" cy="5.2" r="2.5" fill="#FFFFFF" />
          <circle cx="9.1" cy="5.2" r="2" fill="#1EB5E7" />
          <circle cx="12.5" cy="4" r="0.6" fill="#FFFFFF" />
          <circle cx="14.5" cy="4" r="0.6" fill="#FFFFFF" />
          <circle cx="12.5" cy="6.2" r="0.6" fill="#FFFFFF" />
          <circle cx="14.5" cy="6.2" r="0.6" fill="#FFFFFF" />
        </>
      );
    case 'en':
      return (
        <>
          <rect width="32" height="32" fill="#012169" />
          <path d="M0 0L32 32M32 0L0 32" stroke="#FFFFFF" strokeWidth="6" />
          <path d="M0 0L32 32M32 0L0 32" stroke="#C8102E" strokeWidth="2.6" />
          <path d="M16 0V32M0 16H32" stroke="#FFFFFF" strokeWidth="9" />
          <path d="M16 0V32M0 16H32" stroke="#C8102E" strokeWidth="5.2" />
        </>
      );
    case 'ru':
      return (
        <>
          <rect width="32" height="10.7" y="0" fill="#FFFFFF" />
          <rect width="32" height="10.7" y="10.7" fill="#0039A6" />
          <rect width="32" height="10.7" y="21.3" fill="#D52B1E" />
        </>
      );
    case 'kk':
      return (
        <>
          <rect width="32" height="32" fill="#00AFCA" />
          <circle cx="16.5" cy="15.5" r="5" fill="#FEC50C" />
          <path d="M9 21.5C12.5 19.5 20.5 19.5 24 21.5C20.5 23.5 12.5 23.5 9 21.5Z" fill="#FEC50C" />
          <rect x="2.5" y="4" width="2.2" height="24" fill="#FEC50C" />
        </>
      );
    case 'ky':
      return (
        <>
          <rect width="32" height="32" fill="#E8112D" />
          <circle cx="16" cy="16" r="6.8" fill="#FFEF00" />
          <circle cx="16" cy="16" r="4.3" fill="#E8112D" />
          <path d="M12.5 14C14.8 16.2 17.2 16.2 19.5 14M12.5 18C14.8 15.8 17.2 15.8 19.5 18" stroke="#FFEF00" strokeWidth="1" fill="none" />
        </>
      );
    case 'tg':
      return (
        <>
          <rect width="32" height="9.5" y="0" fill="#CC0000" />
          <rect width="32" height="13" y="9.5" fill="#FFFFFF" />
          <rect width="32" height="9.5" y="22.5" fill="#006600" />
          <path d="M12 18C13.8 15.2 18.2 15.2 20 18" stroke="#F8C300" strokeWidth="1.6" fill="none" />
          <circle cx="16" cy="13.5" r="1.2" fill="#F8C300" />
          <circle cx="13.4" cy="14.5" r="0.8" fill="#F8C300" />
          <circle cx="18.6" cy="14.5" r="0.8" fill="#F8C300" />
        </>
      );
    case 'ja':
      return (
        <>
          <rect width="32" height="32" fill="#FFFFFF" />
          <circle cx="16" cy="16" r="7.2" fill="#BC002D" />
        </>
      );
    case 'ko':
      return (
        <>
          <rect width="32" height="32" fill="#FFFFFF" />
          <circle cx="16" cy="16" r="6.5" fill="#CD2E3A" />
          <path d="M9.5 16A6.5 6.5 0 0 0 22.5 16A3.25 3.25 0 0 1 16 16A3.25 3.25 0 0 0 9.5 16Z" fill="#0047A0" />
          <path d="M6.5 8.5L9.5 5.5M7.8 9.8L10.8 6.8" stroke="#111111" strokeWidth="1.3" />
          <path d="M22.5 5.5L25.5 8.5M21.2 6.8L24.2 9.8" stroke="#111111" strokeWidth="1.3" />
          <path d="M6.5 23.5L9.5 26.5M7.8 22.2L10.8 25.2" stroke="#111111" strokeWidth="1.3" />
          <path d="M22.5 26.5L25.5 23.5M21.2 25.2L24.2 22.2" stroke="#111111" strokeWidth="1.3" />
        </>
      );
    case 'hi':
      return (
        <>
          <rect width="32" height="10.7" y="0" fill="#FF9933" />
          <rect width="32" height="10.7" y="10.7" fill="#FFFFFF" />
          <rect width="32" height="10.7" y="21.3" fill="#138808" />
          <circle cx="16" cy="16" r="3.6" fill="none" stroke="#000080" strokeWidth="1.2" />
          <circle cx="16" cy="16" r="0.9" fill="#000080" />
        </>
      );
    case 'zh':
      return (
        <>
          <rect width="32" height="32" fill="#DE2910" />
          <polygon points="8.5,5.5 9.6,8.8 13,8.8 10.2,10.8 11.3,14 8.5,12 5.7,14 6.8,10.8 4,8.8 7.4,8.8" fill="#FFDE00" />
          <circle cx="15" cy="5.5" r="1" fill="#FFDE00" />
          <circle cx="17" cy="8.2" r="1" fill="#FFDE00" />
          <circle cx="17" cy="11.5" r="1" fill="#FFDE00" />
          <circle cx="15" cy="14" r="1" fill="#FFDE00" />
        </>
      );
    case 'fr':
      return (
        <>
          <rect width="10.7" height="32" x="0" fill="#002395" />
          <rect width="10.7" height="32" x="10.7" fill="#FFFFFF" />
          <rect width="10.7" height="32" x="21.3" fill="#ED2939" />
        </>
      );
    case 'de':
      return (
        <>
          <rect width="32" height="10.7" y="0" fill="#111111" />
          <rect width="32" height="10.7" y="10.7" fill="#DD0000" />
          <rect width="32" height="10.7" y="21.3" fill="#FFCE00" />
        </>
      );
    case 'it':
      return (
        <>
          <rect width="10.7" height="32" x="0" fill="#009246" />
          <rect width="10.7" height="32" x="10.7" fill="#FFFFFF" />
          <rect width="10.7" height="32" x="21.3" fill="#CE2B37" />
        </>
      );
    case 'pt':
      return (
        <>
          <rect width="32" height="32" fill="#009C3B" />
          <polygon points="16,4.5 28.5,16 16,27.5 3.5,16" fill="#FFDF00" />
          <circle cx="16" cy="16" r="5.5" fill="#002776" />
          <path d="M11 15.2C14.5 13.8 18.2 14.3 21.2 16.8" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />
        </>
      );
    case 'ar':
      return (
        <>
          <rect width="32" height="32" fill="#006C35" />
          <path d="M8.5 13.5H23.5M10.5 11.5V14.5M14 11V14.5M18 11.5V14.5M21.5 11.5V14.5" stroke="#FFFFFF" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M9.5 19.5H22.5" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" />
        </>
      );
    case 'fa':
      return (
        <>
          <rect width="32" height="10.7" y="0" fill="#239F40" />
          <rect width="32" height="10.7" y="10.7" fill="#FFFFFF" />
          <rect width="32" height="10.7" y="21.3" fill="#DA0000" />
          <circle cx="16" cy="16" r="2.6" fill="none" stroke="#DA0000" strokeWidth="1.2" />
          <path d="M16 13.2V18.8" stroke="#DA0000" strokeWidth="1.2" />
        </>
      );
  }
}
