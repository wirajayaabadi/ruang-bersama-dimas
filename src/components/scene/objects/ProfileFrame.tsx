import { memo } from 'react';
import { AvatarArt } from './Avatar';
import { C, stroke, thin } from './palette';
import { useSvgId } from './useSvgId';

interface Props {
  /** URL foto asli; null = avatar placeholder. */
  photo: string | null;
  placeholderLabel: string;
}

/** Bingkai foto berdiri di meja — objek "Kenal Dimas". Ukuran lokal 150×190. */
export const ProfileFrame = memo(function ProfileFrame({ photo, placeholderLabel }: Props) {
  const clip = useSvgId('photo');
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <rect x="26" y="20" width="98" height="118" rx="3" />
        </clipPath>
      </defs>
      <ellipse cx="78" cy="186" rx="66" ry="6" fill={C.navy} opacity="0.25" />
      {/* penyangga */}
      <path d="M96,120 L132,184" stroke={C.ink} strokeWidth="7" strokeLinecap="round" />
      <path d="M96,120 L132,184" stroke={C.woodDark} strokeWidth="3" strokeLinecap="round" />
      {/* bingkai */}
      <rect x="6" y="2" width="138" height="180" rx="8" fill={C.gold} {...stroke} />
      <rect x="14" y="10" width="122" height="164" rx="4" fill={C.goldDark} opacity="0.35" />
      <rect x="18" y="12" width="114" height="160" rx="3" fill={C.cream2} {...thin} />
      <g clipPath={`url(#${clip})`}>
        {photo ? (
          <image href={photo} x="26" y="20" width="98" height="118" preserveAspectRatio="xMidYMin slice" />
        ) : (
          <svg x="26" y="20" width="98" height="118" viewBox="0 0 100 120" preserveAspectRatio="xMidYMid slice">
            <AvatarArt />
          </svg>
        )}
      </g>
      <rect x="26" y="20" width="98" height="118" rx="3" fill="none" {...thin} />
      {!photo && (
        <text
          x="75"
          y="158"
          textAnchor="middle"
          fontSize="11.5"
          fontWeight="700"
          fill={C.navy}
          fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        >
          {placeholderLabel}
        </text>
      )}
    </g>
  );
});
