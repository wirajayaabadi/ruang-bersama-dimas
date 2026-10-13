import { memo } from 'react';
import { C, stroke, thin } from './palette';

const RIGHT_PAGE = 'M140,46 Q202,24 264,34 L270,122 Q204,110 140,130 Z';

/** Buku kerja terbuka di meja — objek "Rencana Aksi". Ukuran lokal 280×140. Satu halaman bergerak pelan. */
export const ActionBook = memo(function ActionBook() {
  return (
    <g>
      <ellipse cx="140" cy="134" rx="138" ry="8" fill={C.navy} opacity="0.25" />
      {/* sampul */}
      <path d="M6,40 L140,54 L274,40 L280,128 L140,140 L0,128 Z" fill={C.navy2} {...stroke} />
      {/* tumpukan halaman */}
      <path d="M12,38 Q78,26 140,50 Q202,26 268,38 L274,124 Q204,114 140,136 Q76,114 6,124 Z" fill={C.cream} {...thin} />
      {/* halaman kiri */}
      <path d="M16,34 Q78,22 140,46 L140,130 Q76,110 10,120 Z" fill={C.paper} {...thin} />
      <g stroke={C.ink} strokeWidth="2" strokeLinecap="round" opacity="0.5">
        <line x1="36" y1="46" x2="112" y2="52" />
        <line x1="34" y1="62" x2="122" y2="68" />
      </g>
      {/* daftar centang */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={34 - i * 1.5} y={78 + i * 14} width="9" height="9" rx="2" fill="none" {...thin} />
          <path
            d={`M${35 - i * 1.5},${82 + i * 14} l3,3 l6,-7`}
            fill="none"
            stroke={i === 2 ? C.goldDark : C.red}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <line x1={50 - i * 1.5} y1={83 + i * 14} x2={118} y2={88 + i * 14} stroke={C.ink} strokeWidth="2" opacity="0.45" strokeLinecap="round" />
        </g>
      ))}
      {/* halaman kanan (statis) */}
      <path d={RIGHT_PAGE} fill={C.paper} {...thin} />
      <g stroke={C.ink} strokeWidth="2" strokeLinecap="round" opacity="0.45">
        <line x1="160" y1="56" x2="246" y2="46" />
        <line x1="160" y1="72" x2="236" y2="64" />
        <line x1="160" y1="88" x2="250" y2="80" />
        <line x1="160" y1="104" x2="226" y2="98" />
      </g>
      {/* halaman yang terangkat (bergerak) */}
      <g className="amb amb-page">
        <path d={RIGHT_PAGE} fill={C.cream2} {...thin} />
        <path d="M168,62 Q200,52 236,52" fill="none" stroke={C.gold} strokeWidth="4" strokeLinecap="round" />
        <path d="M168,80 Q200,72 228,70" fill="none" stroke={C.ink} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
      </g>
      <path d="M140,46 L140,130" stroke={C.ink} strokeWidth="2.5" />
      {/* pita pembatas */}
      <path d="M134,128 L134,152 L139,146 L144,152 L144,128" fill={C.red} {...thin} />
      {/* pena */}
      <g transform="rotate(-18 250 120)">
        <rect x="200" y="114" width="78" height="9" rx="4.5" fill={C.navy} {...thin} />
        <rect x="262" y="114" width="16" height="9" rx="2" fill={C.gold} {...thin} />
        <path d="M200,114 L188,118.5 L200,123 Z" fill={C.goldDark} {...thin} />
      </g>
    </g>
  );
});
