import { memo } from 'react';
import { C, stroke, thin } from './palette';
import { useSvgId } from './useSvgId';

function Curtain() {
  return (
    <>
      <path
        d="M4,14 L106,14 C98,110 80,190 92,252 C102,318 94,372 112,412 L4,412 Z"
        fill={C.gold}
        {...stroke}
      />
      <g fill="none" stroke={C.goldDark} strokeWidth="3" strokeLinecap="round">
        <path d="M30,22 C26,140 32,280 26,404" />
        <path d="M58,22 C54,140 60,280 56,404" />
        <path d="M82,24 C74,120 66,200 74,252 C80,300 80,360 88,404" />
      </g>
      {/* pengikat tirai */}
      <rect x="10" y="236" width="88" height="14" rx="6" fill={C.navy2} {...thin} />
    </>
  );
}

/** Jendela dengan pemandangan, tirai kiri-kanan bergerak pelan dengan fase berbeda. */
export const SceneWindow = memo(function SceneWindow() {
  const sky = useSvgId('sky');
  const clip = useSvgId('glass');
  return (
    <g>
      <defs>
        <linearGradient id={sky} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.sky} />
          <stop offset="1" stopColor="#F6E5BF" />
        </linearGradient>
        <clipPath id={clip}>
          <rect x="56" y="46" width="268" height="318" />
        </clipPath>
      </defs>

      {/* Bingkai & kaca */}
      <rect x="40" y="30" width="300" height="350" rx="8" fill={C.cream} {...stroke} />
      <g clipPath={`url(#${clip})`}>
        <rect x="56" y="46" width="268" height="318" fill={`url(#${sky})`} />
        <circle cx="256" cy="118" r="30" fill="#F8DB91" />
        <path d="M90,110 q14,-18 32,-6 q14,-14 30,2 q14,0 12,14 l-80,0 q-8,-4 6,-10z" fill={C.paper} opacity="0.9" />
        <path d="M210,180 q10,-12 24,-4 q12,-10 24,2 q10,2 6,10 l-60,0z" fill={C.paper} opacity="0.8" />
        <path d="M56,300 Q130,250 210,292 Q270,260 324,282 L324,364 L56,364 Z" fill={C.leafLight} />
        <path d="M56,330 Q150,296 250,330 Q290,318 324,326 L324,364 L56,364 Z" fill={C.leaf} />
        {/* pepohonan */}
        <g fill={C.leafDark}>
          <circle cx="104" cy="292" r="16" />
          <circle cx="122" cy="300" r="12" />
          <circle cx="282" cy="280" r="14" />
        </g>
        {/* tiang bendera */}
        <line x1="182" y1="230" x2="182" y2="306" stroke={C.ink} strokeWidth="3" />
        <rect x="183" y="232" width="26" height="9" fill={C.red} />
        <rect x="183" y="241" width="26" height="9" fill={C.paper} />
      </g>
      <rect x="56" y="46" width="268" height="318" fill="none" {...stroke} />
      {/* kusen */}
      <rect x="185" y="46" width="10" height="318" fill={C.cream} {...thin} />
      <rect x="56" y="196" width="268" height="10" fill={C.cream} {...thin} />
      {/* ambang */}
      <rect x="24" y="374" width="332" height="20" rx="5" fill={C.wallLine} {...stroke} />

      {/* Batang tirai */}
      <rect x="0" y="6" width="380" height="10" rx="5" fill={C.woodDark} {...thin} />
      <circle cx="6" cy="11" r="9" fill={C.gold} {...thin} />
      <circle cx="374" cy="11" r="9" fill={C.gold} {...thin} />

      {/* Tirai (bergerak) */}
      <g className="amb amb-curtain">
        <Curtain />
      </g>
      <g transform="translate(380 0) scale(-1 1)">
        <g className="amb amb-curtain" style={{ animationDelay: '-3.1s' }}>
          <Curtain />
        </g>
      </g>
    </g>
  );
});

function Leaf({ angle, len = 120, fill = C.leaf, delay = 0 }: { angle: number; len?: number; fill?: string; delay?: number }) {
  const w = len * 0.17;
  return (
    <g transform={`rotate(${angle})`}>
      <g className="amb amb-leaf" style={{ animationDelay: `${delay}s` }}>
        <path
          d={`M0,0 C${-w},${-len * 0.35} ${-w * 0.9},${-len * 0.8} 0,${-len} C${w * 0.9},${-len * 0.8} ${w},${-len * 0.35} 0,0 Z`}
          fill={fill}
          {...thin}
        />
        <path d={`M0,-6 L0,${-len * 0.86}`} stroke={C.leafDark} strokeWidth="2" opacity="0.7" />
      </g>
    </g>
  );
}

/** Tanaman lantai — daun bergerak pelan, tiap daun beda fase. */
export const Plant = memo(function Plant() {
  return (
    <g>
      <ellipse cx="90" cy="326" rx="64" ry="9" fill={C.navy} opacity="0.25" />
      <g transform="translate(90 246)">
        <Leaf angle={-58} len={110} fill={C.leafLight} delay={-0.4} />
        <Leaf angle={-34} len={150} delay={-2.1} />
        <Leaf angle={-12} len={186} fill={C.leafLight} delay={-1.3} />
        <Leaf angle={8} len={200} delay={-3.4} />
        <Leaf angle={28} len={160} fill={C.leafLight} delay={-0.9} />
        <Leaf angle={52} len={118} delay={-2.7} />
        <Leaf angle={-2} len={130} fill={C.leafDark} delay={-1.8} />
      </g>
      <path d="M40,240 L140,240 L128,326 L52,326 Z" fill={C.navy2} {...stroke} />
      <rect x="34" y="232" width="112" height="18" rx="5" fill={C.navy3} {...stroke} />
      <path d="M46,276 L134,276" stroke={C.gold} strokeWidth="5" />
    </g>
  );
});
