import { memo } from 'react';
import { C, stroke, thin } from './palette';

function Note({ x, y, w, h, rot, fill }: { x: number; y: number; w: number; h: number; rot: number; fill: string }) {
  return (
    <g transform={`rotate(${rot} ${x + w / 2} ${y + h / 2})`}>
      <rect x={x + 3} y={y + 4} width={w} height={h} fill={C.navy} opacity="0.18" />
      <rect x={x} y={y} width={w} height={h} fill={fill} {...thin} />
      <g stroke={C.ink} strokeWidth="2.5" strokeLinecap="round" opacity="0.55">
        <line x1={x + 12} y1={y + 24} x2={x + w - 14} y2={y + 24} />
        <line x1={x + 12} y1={y + 40} x2={x + w - 24} y2={y + 40} />
        <line x1={x + 12} y1={y + 56} x2={x + w - 18} y2={y + 56} />
      </g>
      <circle cx={x + w / 2} cy={y + 6} r="6" fill={C.red} {...thin} />
    </g>
  );
}

/** Papan di dinding — objek "Arah Bersama". Ukuran lokal 360×300. */
export const VisionBoard = memo(function VisionBoard() {
  return (
    <g>
      {/* kait */}
      <path d="M120,0 L180,-26 L240,0" fill="none" stroke={C.ink} strokeWidth="2.5" />
      <circle cx="180" cy="-26" r="5" fill={C.gold} {...thin} />
      <rect x="6" y="8" width="360" height="300" rx="12" fill={C.navy} opacity="0.18" />
      <rect x="0" y="0" width="360" height="300" rx="12" fill={C.navy2} {...stroke} />
      <rect x="16" y="16" width="328" height="252" rx="6" fill="#D2B184" {...thin} />
      {/* tekstur gabus */}
      <g fill={C.woodLight} opacity="0.5">
        {[
          [40, 40], [90, 150], [150, 60], [210, 240], [300, 120], [320, 230], [60, 250], [250, 40], [130, 220], [280, 70],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 2 ? 3 : 2} />
        ))}
      </g>
      {/* benang penghubung */}
      <g fill="none" stroke={C.red} strokeWidth="2.5" strokeDasharray="7 6" strokeLinecap="round">
        <path d="M84,72 Q130,100 150,128" />
        <path d="M84,196 Q120,180 148,166" />
        <path d="M282,70 Q240,100 212,128" />
        <path d="M282,200 Q246,180 212,166" />
      </g>
      <Note x={34} y={34} w={96} h={80} rot={-4} fill={C.goldLight} />
      <Note x={30} y={160} w={100} h={84} rot={3} fill={C.cream2} />
      <Note x={234} y={30} w={96} h={84} rot={4} fill={C.redSoft} />
      <Note x={232} y={164} w={98} h={82} rot={-3} fill="#CFE0C3" />
      {/* kompas tujuan bersama */}
      <circle cx="180" cy="148" r="50" fill={C.cream2} {...stroke} />
      <circle cx="180" cy="148" r="36" fill="none" stroke={C.navy2} strokeWidth="3" />
      <circle cx="180" cy="148" r="20" fill="none" stroke={C.gold} strokeWidth="4" />
      <path d="M180,104 L190,148 L180,192 L170,148 Z" fill={C.navy2} {...thin} />
      <path d="M180,104 L190,148 L170,148 Z" fill={C.gold} {...thin} />
      <circle cx="180" cy="148" r="5" fill={C.red} {...thin} />
      {/* baki spidol */}
      <rect x="40" y="276" width="280" height="12" rx="4" fill={C.navy3} {...thin} />
      <rect x="70" y="268" width="48" height="10" rx="4" fill={C.red} {...thin} />
      <rect x="128" y="268" width="48" height="10" rx="4" fill={C.gold} {...thin} />
    </g>
  );
});
