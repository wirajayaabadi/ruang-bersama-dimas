import { memo, type CSSProperties } from 'react';
import { C } from './palette';
import { useSvgId } from './useSvgId';

export type CatVariant = 'bicolor' | 'calico';

const WHITE = '#FBF7EF';
const PINK = '#E8A3A0';
const line = { stroke: C.ink, strokeWidth: 2.2, strokeLinejoin: 'round' as const, strokeLinecap: 'round' as const };

const COLORS = {
  bicolor: { a: '#45464D', b: '#45464D', eye: '#B7C76A', farLeg: '#E6E0D4' },
  calico: { a: '#E08E3C', b: '#5A4636', eye: '#C9A24A', farLeg: '#E6E0D4' },
} as const;

const BODY = 'M30,50 C32,32 62,28 92,32 C112,34 122,46 120,62 C118,78 98,84 70,84 C46,84 28,72 30,50 Z';
const HEAD = 'M100,42 C100,26 110,18 122,18 C136,18 146,28 146,42 C146,56 136,64 122,64 C108,64 100,56 100,42 Z';
const LEG = 'M-7,0 L-7,36 Q-7,44 1,44 L6,44 Q11,44 9,38 L7,0 Z';

/** Satu kaki; `back` = fase berlawanan agar langkah bergantian. */
function Leg({ x, fill, back, spot }: { x: number; fill: string; back?: boolean; spot?: string }) {
  return (
    <g transform={`translate(${x} 62)`}>
      <g className={`amb cat-leg${back ? ' cat-leg--alt' : ''}`}>
        <path d={LEG} fill={fill} {...line} />
        {spot && <path d="M-6,4 C0,2 7,4 7,12 C2,16 -4,14 -6,10 Z" fill={spot} />}
      </g>
    </g>
  );
}

/**
 * Kucing berjalan, tampak samping menghadap kanan. Ukuran lokal 160×110, telapak di y≈106.
 * Pola bulu bergantung `variant`. Kaki, ekor, dan ayunan badan dianimasikan lewat CSS.
 */
export const Cat = memo(function Cat({ variant }: { variant: CatVariant }) {
  const k = COLORS[variant];
  const bodyClip = useSvgId('catbody');
  const headClip = useSvgId('cathead');

  return (
    <g>
      <defs>
        <clipPath id={bodyClip}>
          <path d={BODY} />
        </clipPath>
        <clipPath id={headClip}>
          <path d={HEAD} />
        </clipPath>
      </defs>

      {/* kaki sisi jauh */}
      <Leg x={44} fill={k.farLeg} back />
      <Leg x={96} fill={k.farLeg} />

      <g className="amb cat-bob">
        {/* ekor */}
        <g className="amb cat-tail">
          <path d="M33,52 C14,50 4,32 12,10" fill="none" stroke={C.ink} strokeWidth="13" strokeLinecap="round" />
          <path d="M33,52 C14,50 4,32 12,10" fill="none" stroke={k.a} strokeWidth="8.5" strokeLinecap="round" />
          {variant === 'calico' && (
            <path d="M33,52 C14,50 4,32 12,10" fill="none" stroke={k.b} strokeWidth="8.5" strokeDasharray="7 9" />
          )}
        </g>

        {/* badan + pola */}
        <path d={BODY} fill={WHITE} />
        <g clipPath={`url(#${bodyClip})`}>
          {variant === 'bicolor' ? (
            <>
              <path d="M38,40 C50,24 94,24 114,36 C112,48 96,54 78,52 C60,56 46,54 38,40 Z" fill={k.a} />
              <path d="M26,54 C36,50 50,58 46,74 C40,82 28,76 26,54 Z" fill={k.a} />
            </>
          ) : (
            <>
              <path d="M62,28 C80,24 102,28 112,40 C98,50 80,48 68,46 C62,40 60,34 62,28 Z" fill={k.a} />
              <path d="M30,38 C40,26 58,26 66,34 C64,48 54,54 42,54 C32,52 28,46 30,38 Z" fill={k.b} />
              <path d="M70,60 C78,55 90,58 88,67 C82,74 70,70 70,60 Z" fill={k.b} />
            </>
          )}
        </g>
        <path d={BODY} fill="none" {...line} />

        {/* kepala */}
        <path d="M104,30 L106,5 L121,20 Z" fill={variant === 'calico' ? k.b : k.a} {...line} />
        <path d="M127,20 L142,5 L145,32 Z" fill={k.a} {...line} />
        <path d="M108,25 L109,12 L116,20 Z" fill={PINK} />
        <path d="M131,20 L139,12 L141,27 Z" fill={PINK} />
        <path d={HEAD} fill={WHITE} />
        <g clipPath={`url(#${headClip})`}>
          {variant === 'bicolor' ? (
            <>
              <path d="M96,46 C96,20 110,12 121,14 C118,24 116,32 112,40 C108,45 102,47 96,46 Z" fill={k.a} />
              <path d="M123,14 C140,12 150,26 150,44 C142,46 136,40 132,35 C128,29 125,22 123,14 Z" fill={k.a} />
            </>
          ) : (
            <>
              <path d="M96,48 C96,20 110,12 121,14 C120,26 116,36 110,44 C106,48 100,50 96,48 Z" fill={k.b} />
              <path d="M123,14 C140,12 150,26 150,40 C142,40 136,36 132,32 C128,26 125,20 123,14 Z" fill={k.a} />
            </>
          )}
        </g>
        <path d={HEAD} fill="none" {...line} />

        {/* wajah */}
        <ellipse cx="115" cy="40" rx="3.8" ry="4.4" fill={k.eye} stroke={C.ink} strokeWidth="1.2" />
        <ellipse cx="133" cy="40" rx="3.8" ry="4.4" fill={k.eye} stroke={C.ink} strokeWidth="1.2" />
        <ellipse cx="115.6" cy="40.4" rx="1.5" ry="3" fill="#111" />
        <ellipse cx="133.6" cy="40.4" rx="1.5" ry="3" fill="#111" />
        <path d="M122,47 L127,47 L124.5,50 Z" fill={PINK} stroke={C.ink} strokeWidth="1" strokeLinejoin="round" />
        <path d="M124.5,50 q-2.5,4 -5.5,2 M124.5,50 q2.5,4 5.5,2" fill="none" stroke={C.ink} strokeWidth="1.4" strokeLinecap="round" />
        <g stroke={C.ink} strokeWidth="1" opacity="0.7" strokeLinecap="round">
          <line x1="138" y1="48" x2="156" y2="44" />
          <line x1="138" y1="51" x2="157" y2="52" />
          <line x1="110" y1="48" x2="96" y2="45" />
        </g>
      </g>

      {/* kaki sisi dekat */}
      <Leg x={52} fill={WHITE} spot={k.a} />
      <Leg x={106} fill={WHITE} back />
    </g>
  );
});

export interface CatWalkerProps {
  variant: CatVariant;
  /** posisi awal (kiri-atas) di viewBox */
  x: number;
  y: number;
  s: number;
  /** posisi x paling kanan yang dituju */
  toX: number;
  /** durasi satu siklus pergi-pulang (ms) */
  cycleMs: number;
  /** mulai dari fase ini (0..1); 0.5 = mulai di ujung kanan menghadap kiri */
  phase: number;
}

/**
 * Membungkus kucing dengan gerak pergi-pulang di atas karpet:
 * terjemahan horizontal (walk) + berbalik arah (turn) di kedua ujung.
 */
export function CatWalker({ variant, x, y, s, toX, cycleMs, phase }: CatWalkerProps) {
  const style = {
    '--walk-dist': `${(toX - x) / s}px`,
    animationDuration: `${cycleMs}ms`,
    animationDelay: `${-phase * cycleMs}ms`,
  } as CSSProperties;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="amb cat-walk" style={style}>
        <ellipse cx="78" cy="108" rx="54" ry="6" fill={C.navy} opacity="0.35" />
        <g className="amb cat-turn" style={{ animationDuration: style.animationDuration, animationDelay: style.animationDelay }}>
          <Cat variant={variant} />
        </g>
      </g>
    </g>
  );
}

/**
 * Kucing tidur meringkuk — diam, hanya bernapas pelan dengan "z" melayang.
 * Ukuran lokal 150×80, alas di y≈78. Pola bulu mengikuti `variant`.
 */
export const SleepingCat = memo(function SleepingCat({ variant }: { variant: CatVariant }) {
  const k = COLORS[variant];
  const bodyClip = useSvgId('sleepbody');
  const headClip = useSvgId('sleephead');
  const SBODY = 'M10,60 C8,30 40,14 80,14 C120,14 146,32 144,56 C142,72 120,78 78,78 C36,78 12,74 10,60 Z';
  const SHEAD = 'M16,56 C16,40 28,32 42,32 C56,32 66,42 66,56 C66,68 56,74 42,74 C28,74 16,68 16,56 Z';
  const TAIL = 'M138,62 C134,77 104,81 74,80 C56,79 44,77 40,72';
  const second = variant === 'calico' ? k.b : k.a;

  return (
    <g>
      <defs>
        <clipPath id={bodyClip}>
          <path d={SBODY} />
        </clipPath>
        <clipPath id={headClip}>
          <path d={SHEAD} />
        </clipPath>
      </defs>
      <ellipse cx="78" cy="78" rx="72" ry="7" fill={C.navy} opacity="0.35" />

      <g className="amb cat-sleep">
        {/* badan meringkuk */}
        <path d={SBODY} fill={WHITE} />
        <g clipPath={`url(#${bodyClip})`}>
          <path d="M70,10 C100,8 140,20 150,44 C130,50 110,44 96,40 C82,36 72,26 70,10 Z" fill={k.a} />
          <path d="M60,12 C70,14 76,26 74,36 C66,44 52,42 44,36 C40,26 46,16 60,12 Z" fill={second} />
          <path d="M108,52 C118,48 130,52 128,62 C120,68 108,64 108,52 Z" fill={second} />
        </g>
        <path d={SBODY} fill="none" {...line} />

        {/* ekor melingkar ke depan */}
        <path d={TAIL} fill="none" stroke={C.ink} strokeWidth="13" strokeLinecap="round" />
        <path d={TAIL} fill="none" stroke={k.a} strokeWidth="8.5" strokeLinecap="round" />
        {variant === 'calico' && <path d={TAIL} fill="none" stroke={k.b} strokeWidth="8.5" strokeDasharray="7 9" />}

        {/* kaki depan di bawah dagu */}
        <ellipse cx="34" cy="74" rx="9" ry="4.5" fill={WHITE} {...line} />
        <ellipse cx="52" cy="75" rx="9" ry="4.5" fill={WHITE} {...line} />

        {/* kepala bersandar */}
        <path d="M21,46 L15,25 L33,37 Z" fill={second} {...line} />
        <path d="M50,35 L62,18 L65,42 Z" fill={k.a} {...line} />
        <path d="M22,40 L19,30 L28,37 Z" fill={PINK} />
        <path d="M54,35 L60,26 L62,38 Z" fill={PINK} />
        <path d={SHEAD} fill={WHITE} />
        <g clipPath={`url(#${headClip})`}>
          <path d="M12,60 C12,34 28,26 40,28 C38,40 34,48 28,54 C22,58 16,60 12,60 Z" fill={second} />
          <path d="M44,28 C60,26 70,38 70,52 C62,52 56,46 52,42 C48,36 46,32 44,28 Z" fill={k.a} />
        </g>
        <path d={SHEAD} fill="none" {...line} />

        {/* mata terpejam */}
        <g fill="none" stroke={C.ink} strokeWidth="1.8" strokeLinecap="round">
          <path d="M27,55 q5,4 10,0" />
          <path d="M46,55 q5,4 10,0" />
        </g>
        <path d="M39.5,61 L44.5,61 L42,64 Z" fill={PINK} stroke={C.ink} strokeWidth="1" strokeLinejoin="round" />
        <path d="M42,64 q-2,3 -4.5,1.5 M42,64 q2,3 4.5,1.5" fill="none" stroke={C.ink} strokeWidth="1.2" strokeLinecap="round" />
      </g>

      {/* z melayang */}
      <g fontFamily="'Plus Jakarta Sans', system-ui, sans-serif" fontWeight="800" fill={C.cream2} stroke={C.ink} strokeWidth="1.2" paintOrder="stroke">
        <text className="amb sleep-z" x="62" y="26" fontSize="13">z</text>
        <text className="amb sleep-z" x="72" y="14" fontSize="16" style={{ animationDelay: '-1.2s' }}>z</text>
        <text className="amb sleep-z" x="84" y="0" fontSize="19" style={{ animationDelay: '-2.4s' }}>Z</text>
      </g>
    </g>
  );
});
