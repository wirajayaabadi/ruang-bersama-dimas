import { C } from './palette';
import { useSvgId } from './useSvgId';

/**
 * Avatar ilustrasi netral (placeholder foto). Koordinat 0..100 × 0..120.
 * Bisa dipakai sebagai <svg> mandiri (standalone) atau di dalam SVG adegan.
 */
export function AvatarArt() {
  const bg = useSvgId('avbg');
  return (
    <g>
      <defs>
        <linearGradient id={bg} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#DCE6EA" />
          <stop offset="1" stopColor={C.cream} />
        </linearGradient>
      </defs>
      <rect width="100" height="120" fill={`url(#${bg})`} />
      <circle cx="50" cy="48" r="38" fill={C.gold} opacity="0.18" />
      {/* bahu & jas */}
      <path d="M8,120 C10,92 28,82 50,82 C72,82 90,92 92,120 Z" fill={C.navy2} stroke={C.ink} strokeWidth="2" />
      <path d="M40,82 L50,100 L60,82 Z" fill={C.paper} stroke={C.ink} strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M34,86 L50,112 M66,86 L50,112" stroke={C.navy} strokeWidth="2" />
      <circle cx="72" cy="98" r="3" fill={C.gold} />
      {/* leher */}
      <path d="M43,68 L43,84 Q50,90 57,84 L57,68 Z" fill={C.skin} stroke={C.ink} strokeWidth="1.5" />
      {/* kepala */}
      <ellipse cx="50" cy="50" rx="21" ry="24" fill={C.skin} stroke={C.ink} strokeWidth="2" />
      <path d="M29,48 C27,28 40,22 52,23 C66,24 74,32 71,48 C66,38 56,34 44,36 C38,38 33,42 29,48 Z" fill={C.hair} stroke={C.ink} strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="42" cy="52" r="2.2" fill={C.ink} />
      <circle cx="58" cy="52" r="2.2" fill={C.ink} />
      <path d="M43,62 Q50,68 57,62" fill="none" stroke={C.ink} strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

export function AvatarStandalone({ label, className }: { label: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 120" className={className} role="img" aria-label={label}>
      <AvatarArt />
    </svg>
  );
}
