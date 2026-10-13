import { memo } from 'react';
import { C, stroke, thin } from './palette';

/** Kotak surat berdiri — objek "Suara Serdik". Ukuran lokal 190×340. */
export const AspirationBox = memo(function AspirationBox() {
  return (
    <g>
      <ellipse cx="96" cy="334" rx="72" ry="9" fill={C.navy} opacity="0.28" />
      {/* tiang & alas */}
      <rect x="82" y="176" width="26" height="150" fill={C.wood} {...stroke} />
      <rect x="50" y="318" width="90" height="18" rx="5" fill={C.woodDark} {...stroke} />
      {/* bendera */}
      <rect x="164" y="62" width="7" height="86" rx="3" fill={C.ink} />
      <path d="M171,64 L190,64 L190,88 L171,88 Z" fill={C.red} {...thin} />
      {/* badan kotak */}
      <path d="M26,182 L26,88 A69,69 0 0 1 164,88 L164,182 Z" fill={C.navy2} {...stroke} />
      <path d="M38,172 L38,92 A57,57 0 0 1 152,92 L152,172 Z" fill="none" stroke={C.gold} strokeWidth="3" />
      {/* surat masuk ke celah */}
      <g transform="rotate(-8 96 70)">
        <rect x="66" y="48" width="62" height="40" rx="3" fill={C.paper} {...thin} />
        <path d="M66,48 L97,70 L128,48" fill="none" {...thin} />
        <path d="M92,58 c-4,-6 -12,-2 -8,4 l8,7 l8,-7 c4,-6 -4,-10 -8,-4z" fill={C.red} />
      </g>
      <rect x="54" y="84" width="84" height="12" rx="6" fill={C.navy} {...thin} />
      {/* pelat label */}
      <rect x="50" y="118" width="92" height="32" rx="5" fill={C.cream} {...thin} />
      <text
        x="96"
        y="140"
        textAnchor="middle"
        fontSize="15"
        fontWeight="800"
        letterSpacing="1.5"
        fill={C.navy}
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
      >
        ASPIRASI
      </text>
      <circle cx="96" cy="166" r="4" fill={C.gold} />
    </g>
  );
});
