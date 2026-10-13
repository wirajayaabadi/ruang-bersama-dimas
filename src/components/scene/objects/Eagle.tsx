import { memo } from 'react';
import { C, stroke, thin } from './palette';

/** Warna bulu elang jawa (Nisaetus bartelsi). */
const E = {
  dark: '#5B3D24',
  mid: '#8E6239',
  light: '#B88A5A',
  pale: '#D4AE7E',
  bar: '#3E2A18',
  eye: '#F1E59A',
  beak: '#4A5260',
  cere: '#E5CB72',
  leg: '#EACF88',
  claw: '#1E1E1E',
  band: '#EDE6D6',
};

function Foot({ x }: { x: number }) {
  return (
    <g>
      <ellipse cx={x} cy={265} rx="10" ry="4.5" fill={E.leg} {...thin} />
      <g fill="none" stroke={E.claw} strokeWidth="2.6" strokeLinecap="round">
        <path d={`M${x - 8},266 q-3,6 1,10`} />
        <path d={`M${x - 1},268 q-1,7 3,10`} />
        <path d={`M${x + 7},267 q2,6 -1,10`} />
      </g>
    </g>
  );
}

/**
 * Elang jawa berdiri tegak di tiang tenggeran — dekorasi bergerak.
 * Ukuran lokal 160×560 (burung ±0..335, tiang 260..560).
 * Gerak: napas (badan), kepala menoleh, jambul bergoyang, mata berkedip.
 */
export const EaglePerch = memo(function EaglePerch() {
  return (
    <g>
      <ellipse cx="80" cy="558" rx="52" ry="7" fill={C.navy} opacity="0.25" />

      {/* Ekor (menggantung di belakang tenggeran) */}
      <path d="M66,236 L94,236 L102,334 Q80,342 58,334 Z" fill={E.mid} {...stroke} />
      <path d="M63,272 L97,272 L98,284 L62,284 Z" fill={E.band} />
      <path d="M61,304 L99,304 L100,316 L60,316 Z" fill={E.band} />
      <g stroke={E.dark} strokeWidth="2" opacity="0.6">
        <line x1="74" y1="240" x2="72" y2="334" />
        <line x1="86" y1="240" x2="88" y2="334" />
      </g>

      {/* Tiang & kaki penyangga */}
      <rect x="73" y="272" width="14" height="252" fill={C.wood} {...stroke} />
      <rect x="69" y="286" width="22" height="8" rx="3" fill={C.gold} {...thin} />
      <g fill="none" strokeLinecap="round">
        <g stroke={C.ink} strokeWidth="9">
          <path d="M80,520 L40,556" />
          <path d="M80,520 L120,556" />
        </g>
        <g stroke={C.woodDark} strokeWidth="5">
          <path d="M80,520 L40,556" />
          <path d="M80,520 L120,556" />
        </g>
      </g>
      <rect x="68" y="512" width="24" height="14" rx="4" fill={C.navy2} {...thin} />

      {/* Badan (bernapas pelan) */}
      <g className="amb amb-breathe">
        {/* sayap terlipat */}
        <path d="M56,100 C36,124 30,178 38,226 C42,246 50,258 58,266 C56,230 56,170 62,112 Z" fill={E.dark} {...stroke} />
        <path d="M104,100 C124,124 130,178 122,226 C118,246 110,258 102,266 C104,230 104,170 98,112 Z" fill={E.dark} {...stroke} />
        <g fill="none" stroke={E.mid} strokeWidth="2.2" strokeLinecap="round">
          <path d="M42,200 C46,222 50,240 56,258" />
          <path d="M46,156 C46,188 50,218 54,244" />
          <path d="M118,200 C114,222 110,240 104,258" />
          <path d="M114,156 C114,188 110,218 106,244" />
        </g>

        {/* dada */}
        <path d="M64,84 C48,96 42,136 44,180 C46,222 58,248 80,252 C102,248 114,222 116,180 C118,136 112,96 96,84 C88,80 72,80 64,84 Z" fill={E.mid} {...stroke} />
        <path d="M66,96 C56,120 54,160 60,196 C66,214 94,214 100,196 C106,160 104,120 94,96 Z" fill={E.light} />
        <g fill="none" stroke={E.mid} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {[112, 132, 152, 172, 192].map((y, r) =>
            (r % 2 ? [73, 87] : [66, 80, 94]).map((x) => (
              <path key={`${x}-${y}`} d={`M${x - 6},${y} L${x},${y + 7} L${x + 6},${y}`} />
            )),
          )}
        </g>

        {/* paha bergaris */}
        <path d="M56,190 C52,214 56,240 68,250 L80,248 L80,200 C72,192 62,188 56,190 Z" fill={E.pale} {...thin} />
        <path d="M104,190 C108,214 104,240 92,250 L80,248 L80,200 C88,192 98,188 104,190 Z" fill={E.pale} {...thin} />
        <g fill="none" stroke={E.bar} strokeWidth="2" strokeLinecap="round">
          {[202, 211, 220, 229, 238].map((y, i) => (
            <g key={y}>
              <path d={`M${58 + (i % 2) * 2},${y} q5,-3 10,0 q5,3 10,0`} />
              <path d={`M${82 + (i % 2) * 2},${y} q5,-3 10,0 q5,3 10,0`} />
            </g>
          ))}
        </g>

        {/* Kepala (sesekali menoleh) */}
        <g className="amb amb-head">
          {/* jambul */}
          <g className="amb amb-crest">
            <path d="M84,48 C84,30 86,12 90,0 C94,16 96,32 96,48 Z" fill={E.dark} {...thin} />
            <path d="M92,50 C96,32 102,18 110,8 C108,24 104,38 102,52 Z" fill={E.mid} {...thin} />
            <path d="M98,56 C104,44 112,36 120,30 C116,42 110,52 106,60 Z" fill={E.dark} {...thin} />
          </g>
          <path d="M54,72 C52,52 66,40 84,40 C102,40 112,52 112,68 C112,86 100,98 82,100 C66,100 56,90 54,72 Z" fill={E.light} {...stroke} />
          <path d="M92,44 C106,48 112,62 110,80 C104,90 96,96 86,98 C94,84 96,62 92,44 Z" fill={E.mid} opacity="0.75" />
          {/* garis gelap mata */}
          <path d="M56,66 C62,58 76,56 92,62 C86,70 70,72 58,70 Z" fill={E.bar} />
          <path d="M60,57 C68,51 80,51 88,57" fill="none" stroke={E.bar} strokeWidth="2.6" strokeLinecap="round" />
          {/* mata + kelopak berkedip */}
          <circle cx="70" cy="64" r="6" fill={E.eye} stroke={C.ink} strokeWidth="1.5" />
          <circle cx="70.5" cy="64" r="2.8" fill="#111" />
          <circle cx="69" cy="62.6" r="1.1" fill="#fff" />
          <ellipse className="amb amb-blink" cx="70" cy="64" rx="7.2" ry="7.2" fill={E.light} />
          {/* paruh */}
          <path d="M58,61 L50,61 C48,65 48,69 50,72 L58,72 Z" fill={E.cere} {...thin} />
          <path d="M50,60 C40,59 32,66 32,76 C32,82 35,86 38,87 C38,80 42,76 48,76 L52,72 Z" fill={E.beak} {...thin} />
          <path d="M50,72 L60,74" stroke={C.ink} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M66,86 L71,98" stroke={E.bar} strokeWidth="2" opacity="0.55" strokeLinecap="round" />
        </g>
      </g>

      {/* Tenggeran (di depan badan bawah) */}
      <rect x="8" y="258" width="144" height="16" rx="8" fill={C.woodLight} {...stroke} />
      <path d="M22,264 L60,264 M100,268 L138,268" stroke={C.woodDark} strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      <circle cx="12" cy="266" r="7" fill={C.gold} {...thin} />
      <circle cx="148" cy="266" r="7" fill={C.gold} {...thin} />

      {/* Kaki mencengkeram */}
      <path d="M63,244 L71,244 L70,264 L62,264 Z" fill={E.leg} {...thin} />
      <path d="M89,244 L97,244 L98,264 L90,264 Z" fill={E.leg} {...thin} />
      <Foot x={66} />
      <Foot x={94} />
    </g>
  );
});
