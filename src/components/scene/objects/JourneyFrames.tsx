import { memo } from 'react';
import { C, stroke, thin } from './palette';
import { useSvgId } from './useSvgId';

/** Ikon "foto belum ada" sederhana. */
function PhotoGlyph({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="#E4E0D6" />
      <circle cx={x + w * 0.7} cy={y + h * 0.3} r={Math.min(w, h) * 0.1} fill={C.gold} />
      <path
        d={`M${x},${y + h} L${x + w * 0.35},${y + h * 0.5} L${x + w * 0.55},${y + h * 0.72} L${x + w * 0.72},${y + h * 0.58} L${x + w},${y + h} Z`}
        fill="#B9B3A4"
      />
    </g>
  );
}

/** Bingkai dokumentasi & tali polaroid — objek "Perjalanan Dimas". Ukuran lokal 320×290. */
export const JourneyFrames = memo(function JourneyFrames() {
  const clip = useSvgId('journey');
  return (
    <g>
      <defs>
        <clipPath id={clip}>
          <rect x="14" y="34" width="162" height="122" />
        </clipPath>
      </defs>
      {/* bingkai utama: jalur menuju puncak */}
      <rect x="4" y="28" width="190" height="150" rx="4" fill={C.navy} opacity="0.18" />
      <rect x="0" y="20" width="190" height="150" rx="4" fill={C.wood} {...stroke} />
      <g clipPath={`url(#${clip})`}>
        <rect x="14" y="34" width="162" height="122" fill="#F6E7C4" />
        <circle cx="140" cy="62" r="14" fill="#F8D27E" />
        <path d="M14,130 L62,72 L92,104 L124,66 L176,124 L176,156 L14,156 Z" fill={C.navy3} />
        <path d="M124,66 L138,82 L130,86 L120,76 L110,84 Z" fill={C.paper} />
        <path d="M14,156 L14,138 Q80,112 176,142 L176,156 Z" fill={C.leaf} />
        <path d="M54,156 Q78,134 102,128 Q118,118 124,96" fill="none" stroke={C.cream2} strokeWidth="4" strokeDasharray="6 5" strokeLinecap="round" />
        <line x1="124" y1="96" x2="124" y2="70" stroke={C.ink} strokeWidth="2" />
        <path d="M124,70 L140,75 L124,80 Z" fill={C.red} />
      </g>
      <rect x="14" y="34" width="162" height="122" fill="none" {...thin} />

      {/* bingkai kecil 1 */}
      <rect x="210" y="0" width="100" height="112" rx="4" fill={C.gold} {...stroke} />
      <rect x="220" y="10" width="80" height="92" fill={C.cream2} {...thin} />
      <PhotoGlyph x={226} y={16} w={68} h={80} />

      {/* bingkai kecil 2 */}
      <rect x="210" y="128" width="100" height="84" rx="4" fill={C.navy2} {...stroke} />
      <rect x="219" y="137" width="82" height="66" fill={C.cream2} {...thin} />
      <PhotoGlyph x={224} y={142} w={72} h={56} />

      {/* tali polaroid */}
      <path d="M0,200 Q160,236 316,210" fill="none" stroke={C.woodDark} strokeWidth="2.5" />
      {[
        { x: 22, y: 206, r: -6 },
        { x: 120, y: 218, r: 4 },
        { x: 218, y: 214, r: -3 },
      ].map((p, i) => (
        <g key={i} transform={`rotate(${p.r} ${p.x + 32} ${p.y})`}>
          <rect x={p.x} y={p.y + 6} width="64" height="70" fill={C.paper} {...thin} />
          <PhotoGlyph x={p.x + 7} y={p.y + 13} w={50} h={44} />
          <rect x={p.x + 26} y={p.y - 2} width="12" height="18" rx="2" fill={C.woodLight} {...thin} />
        </g>
      ))}
    </g>
  );
});
