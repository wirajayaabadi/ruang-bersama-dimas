import { memo } from 'react';
import { C, stroke, thin } from './palette';
import { useSvgId } from './useSvgId';

const BOOK_COLORS = [C.navy2, C.red, C.gold, C.cream, C.leaf, C.teal, C.plum, C.navy3, C.goldLight];

/** Urutan buku deterministik (tanpa Math.random agar render stabil). */
function shelfBooks(row: number, startX: number, endX: number, baseY: number, maxH: number) {
  const books: JSX.Element[] = [];
  let x = startX;
  let i = 0;
  while (x < endX - 14) {
    const seed = (row * 7 + i * 13) % 11;
    const w = 14 + (seed % 4) * 4;
    const h = maxH - 22 + ((seed * 5) % 20);
    if (x + w > endX) break;
    const color = BOOK_COLORS[(row * 3 + i) % BOOK_COLORS.length];
    // satu buku miring per baris agar terlihat alami
    if (i === 4 + (row % 2) && x + h * 0.4 < endX) {
      books.push(
        <g key={i} transform={`rotate(-16 ${x + w} ${baseY})`}>
          <rect x={x} y={baseY - h} width={w} height={h} fill={color} {...thin} />
          <line x1={x + 3} y1={baseY - h + 12} x2={x + w - 3} y2={baseY - h + 12} stroke={C.ink} strokeWidth="1.5" opacity="0.5" />
        </g>,
      );
      x += w + 22;
    } else {
      books.push(
        <g key={i}>
          <rect x={x} y={baseY - h} width={w} height={h} fill={color} {...thin} />
          <line x1={x + 3} y1={baseY - h + 12} x2={x + w - 3} y2={baseY - h + 12} stroke={C.ink} strokeWidth="1.5" opacity="0.5" />
          <line x1={x + 3} y1={baseY - 14} x2={x + w - 3} y2={baseY - 14} stroke={C.ink} strokeWidth="1.5" opacity="0.5" />
        </g>,
      );
      x += w + 1;
    }
    i++;
  }
  return books;
}

export const Bookshelf = memo(function Bookshelf() {
  const rows = [
    { top: 16, base: 130 },
    { top: 144, base: 250 },
    { top: 264, base: 370 },
    { top: 384, base: 490 },
    { top: 504, base: 590 },
  ];
  return (
    <g>
      <ellipse cx="130" cy="618" rx="150" ry="12" fill={C.navy} opacity="0.22" />
      <rect x="0" y="0" width="260" height="620" rx="6" fill={C.wood} {...stroke} />
      <rect x="16" y="16" width="228" height="574" fill={C.woodDark} />
      {rows.map((r, idx) => (
        <g key={idx}>
          {idx === 2 ? (
            <>
              {/* tumpukan buku mendatar + kotak arsip */}
              {[0, 1, 2, 3].map((k) => (
                <rect
                  key={k}
                  x={26 + (k % 2) * 6}
                  y={r.base - 18 - k * 18}
                  width={96 - k * 6}
                  height="18"
                  fill={BOOK_COLORS[(k + 2) % BOOK_COLORS.length]}
                  {...thin}
                />
              ))}
              <rect x="140" y={r.base - 78} width="88" height="78" rx="4" fill={C.cream} {...thin} />
              <rect x="164" y={r.base - 60} width="40" height="18" rx="3" fill={C.paper} {...thin} />
            </>
          ) : (
            shelfBooks(idx, 24, 236, r.base, r.base - r.top)
          )}
          <rect x="8" y={r.base} width="244" height="14" fill={C.woodLight} {...thin} />
        </g>
      ))}
      <rect x="0" y="590" width="260" height="30" rx="4" fill={C.wood} {...stroke} />
      {/* pot kecil di atas rak, sulur bergerak pelan */}
      <g transform="translate(176 -2)">
        <g className="amb amb-leaf" style={{ animationDelay: '-1.2s' }}>
          <path d="M22,-34 C2,-58 -6,-40 -2,-26" fill="none" stroke={C.leafDark} strokeWidth="3" />
          <path d="M-2,-26 c-14,-6 -18,6 -10,10 c8,4 12,-4 10,-10z" fill={C.leafLight} {...thin} />
          <path d="M8,-46 c-14,-10 -22,0 -14,6 c8,6 14,0 14,-6z" fill={C.leaf} {...thin} />
          <path d="M30,-34 C48,-50 60,-20 56,10 C54,30 60,50 52,70" fill="none" stroke={C.leafDark} strokeWidth="3" />
          <path d="M54,14 c14,-2 18,10 8,14 c-10,4 -12,-8 -8,-14z" fill={C.leaf} {...thin} />
          <path d="M54,52 c-14,0 -16,12 -6,14 c10,2 12,-10 6,-14z" fill={C.leafLight} {...thin} />
          <path d="M26,-36 c-6,-22 8,-34 14,-30 c6,4 -4,22 -14,30z" fill={C.leafLight} {...thin} />
        </g>
        <path d="M6,-34 L50,-34 L44,2 L12,2 Z" fill={C.red} {...thin} />
        <rect x="2" y="-40" width="52" height="10" rx="3" fill={C.cream} {...thin} />
      </g>
    </g>
  );
});

export const Desk = memo(function Desk() {
  return (
    <g>
      <ellipse cx="380" cy="276" rx="400" ry="14" fill={C.navy} opacity="0.25" />
      {/* panel tengah */}
      <rect x="248" y="40" width="264" height="120" fill={C.woodDark} {...stroke} />
      {/* laci kiri */}
      <rect x="20" y="40" width="230" height="226" fill={C.wood} {...stroke} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="34" y={56 + i * 68} width="202" height="56" rx="4" fill={C.woodLight} {...thin} />
          <rect x="114" y={80 + i * 68} width="42" height="9" rx="4.5" fill={C.gold} {...thin} />
        </g>
      ))}
      {/* lemari kanan */}
      <rect x="510" y="40" width="230" height="226" fill={C.wood} {...stroke} />
      <rect x="524" y="56" width="202" height="56" rx="4" fill={C.woodLight} {...thin} />
      <rect x="604" y="80" width="42" height="9" rx="4.5" fill={C.gold} {...thin} />
      <rect x="524" y="124" width="202" height="126" rx="4" fill={C.woodLight} {...thin} />
      <circle cx="704" cy="187" r="6" fill={C.gold} {...thin} />
      {/* kaki */}
      <rect x="20" y="262" width="230" height="16" fill={C.woodDark} {...thin} />
      <rect x="510" y="262" width="230" height="16" fill={C.woodDark} {...thin} />
      {/* daun meja */}
      <rect x="0" y="24" width="760" height="20" rx="4" fill={C.wood} {...stroke} />
      <path d="M16,2 L744,2 L760,26 L0,26 Z" fill={C.woodTop} {...stroke} />
      <path d="M60,10 L260,10" stroke={C.cream} strokeWidth="3" opacity="0.4" strokeLinecap="round" />
      {/* aksesori: map & mug */}
      <path d="M318,8 L376,4 L384,20 L322,24 Z" fill={C.cream} {...thin} />
      <path d="M324,6 L380,2" stroke={C.red} strokeWidth="2" />
      <g transform="translate(206 -34)">
        <path d="M2,8 L2,34 Q2,40 10,40 L26,40 Q34,40 34,34 L34,8 Z" fill={C.cream} {...thin} />
        <path d="M34,14 q12,0 12,10 q0,10 -12,10" fill="none" {...thin} />
        <ellipse cx="18" cy="8" rx="16" ry="4" fill={C.woodDark} {...thin} />
        <rect x="8" y="18" width="20" height="10" rx="2" fill={C.navy2} />
      </g>
    </g>
  );
});

export const Chair = memo(function Chair() {
  return (
    <g>
      <rect x="22" y="160" width="176" height="40" rx="14" fill={C.navy} {...stroke} />
      <path d="M36,10 Q110,-12 184,10 L190,190 L30,190 Z" fill={C.navy2} {...stroke} />
      <path d="M58,34 Q110,20 162,34 L164,170 L56,170 Z" fill={C.navy3} opacity="0.65" />
      {[60, 100, 140].map((y) => (
        <g key={y}>
          <circle cx="82" cy={y} r="3.5" fill={C.navy} />
          <circle cx="110" cy={y - 6} r="3.5" fill={C.navy} />
          <circle cx="138" cy={y} r="3.5" fill={C.navy} />
        </g>
      ))}
      <rect x="0" y="132" width="34" height="64" rx="12" fill={C.navy} {...stroke} />
      <rect x="186" y="132" width="34" height="64" rx="12" fill={C.navy} {...stroke} />
    </g>
  );
});

export const DeskLamp = memo(function DeskLamp() {
  const glow = useSvgId('lampglow');
  return (
    <g>
      <defs>
        <radialGradient id={glow} cx="0.5" cy="0.2" r="0.8">
          <stop offset="0" stopColor="#FFE9A8" stopOpacity="0.75" />
          <stop offset="1" stopColor="#FFE9A8" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* sorot cahaya */}
      <path d="M44,74 L-110,206 L70,214 L70,82 Z" fill={`url(#${glow})`} />
      <ellipse cx="96" cy="208" rx="46" ry="10" fill={C.navy2} {...stroke} />
      <path d="M96,204 L120,104 L58,50" fill="none" stroke={C.ink} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M96,204 L120,104 L58,50" fill="none" stroke={C.gold} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="120" cy="104" r="8" fill={C.navy2} {...thin} />
      <g transform="translate(52 52) rotate(28)">
        <path d="M-16,-26 L16,-26 L38,22 L-38,22 Z" fill={C.navy2} {...stroke} />
        <path d="M-38,22 L38,22" stroke={C.gold} strokeWidth="5" />
        <ellipse cx="0" cy="24" rx="16" ry="6" fill="#FFF2C2" />
      </g>
    </g>
  );
});
