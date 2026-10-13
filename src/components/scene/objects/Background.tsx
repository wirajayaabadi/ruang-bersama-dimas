import { memo } from 'react';
import type { SceneLayout, ViewBox } from '../../../config/layout';
import { C } from './palette';
import { useSvgId } from './useSvgId';

/**
 * Dinding, panel bawah, lantai berperspektif, karpet, dan cahaya jendela.
 * Digambar selebar/setinggi `vb` agar adegan selalu memenuhi layar tanpa celah.
 */
export const Background = memo(function Background({ layout, vb }: { layout: SceneLayout; vb: ViewBox }) {
  const { width: W, height: H, floorY, wainscotY, rug, lightPatch } = layout;
  const wallId = useSvgId('wall');
  const floorId = useSvgId('floor');
  const glowId = useSvgId('glow');
  const shadeId = useSvgId('shade');

  const left = vb.x;
  const right = vb.x + vb.w;
  const top = vb.y;
  const bottom = vb.y + vb.h;
  const fullW = vb.w;

  // Garis papan lantai menyebar dari titik hilang di tengah → kesan sedikit menyudut.
  const vpX = W / 2;
  const plankGap = W / 16;
  const spread = 0.9 / (H - floorY); // pelebaran per unit tinggi lantai
  const planks: string[] = [];
  for (let i = -30; i <= 30; i++) {
    const xTop = vpX + i * plankGap;
    const xBottom = xTop + (xTop - vpX) * spread * (bottom - floorY);
    if (Math.max(xTop, xBottom) < left - 50 || Math.min(xTop, xBottom) > right + 50) continue;
    planks.push(`M${xTop.toFixed(1)},${floorY} L${xBottom.toFixed(1)},${bottom.toFixed(1)}`);
  }
  const seams = [0.22, 0.48, 0.78, 1.12, 1.5, 1.95, 2.45]
    .map((t) => floorY + (H - floorY) * t)
    .filter((y) => y < bottom);

  // Panel wainscot dengan lebar tetap, berulang ke kiri-kanan
  const panelW = W / Math.max(4, Math.round(W / 230));
  const firstPanel = Math.floor(left / panelW);
  const lastPanel = Math.ceil(right / panelW);
  const firstLine = Math.floor(left / 64);
  const lastLine = Math.ceil(right / 64);

  return (
    <g id="background">
      <defs>
        <linearGradient id={wallId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3E8D2" />
          <stop offset="1" stopColor={C.wall} />
        </linearGradient>
        <linearGradient id={floorId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.floorDark} />
          <stop offset="0.35" stopColor={C.floor} />
          <stop offset="1" stopColor="#BC8756" />
        </linearGradient>
        <radialGradient id={glowId} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFF4D6" stopOpacity="0.85" />
          <stop offset="1" stopColor="#FFF4D6" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={shadeId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.navy} stopOpacity="0.28" />
          <stop offset="1" stopColor={C.navy} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Dinding */}
      <rect x={left} y={top} width={fullW} height={wainscotY - top} fill={`url(#${wallId})`} />
      {/* Motif garis dinding halus */}
      <g stroke={C.wallLine} strokeWidth="2" opacity="0.6">
        {Array.from({ length: lastLine - firstLine + 1 }, (_, k) => {
          const x = 32 + (firstLine + k) * 64;
          return <line key={k} x1={x} y1={top + 22} x2={x} y2={wainscotY - 8} />;
        })}
      </g>
      {/* Cahaya hangat di dinding */}
      <ellipse cx={W * 0.55} cy={wainscotY * 0.55} rx={W * 0.42} ry={wainscotY * 0.55} fill={`url(#${glowId})`} />
      {/* List plafon */}
      <rect x={left} y={top} width={fullW} height="22" fill="#E0CCA6" />
      <rect x={left} y={top + 22} width={fullW} height="5" fill={C.goldDark} opacity="0.55" />

      {/* Panel bawah (navy) */}
      <rect x={left} y={wainscotY} width={fullW} height={floorY - wainscotY} fill={C.navy2} />
      <g fill="none" stroke={C.navy3} strokeWidth="3">
        {Array.from({ length: lastPanel - firstPanel + 1 }, (_, k) => (
          <rect
            key={k}
            x={(firstPanel + k) * panelW + 18}
            y={wainscotY + 26}
            width={panelW - 36}
            height={floorY - wainscotY - 56}
            rx="6"
          />
        ))}
      </g>
      {/* List kursi emas */}
      <rect x={left} y={wainscotY - 7} width={fullW} height="14" fill={C.gold} stroke={C.ink} strokeWidth="2" />
      {/* Plint */}
      <rect x={left} y={floorY - 16} width={fullW} height="16" fill={C.woodDark} />

      {/* Lantai */}
      <rect x={left} y={floorY} width={fullW} height={bottom - floorY} fill={`url(#${floorId})`} />
      <g stroke={C.woodDark} strokeWidth="2" opacity="0.32" fill="none">
        {planks.map((d, i) => (
          <path key={i} d={d} />
        ))}
        {seams.map((y, i) => (
          <line key={`s${i}`} x1={left} y1={y} x2={right} y2={y} />
        ))}
      </g>
      {/* Bayangan pertemuan dinding-lantai */}
      <rect x={left} y={floorY} width={fullW} height="40" fill={`url(#${shadeId})`} />
      {/* Cahaya jendela di lantai */}
      <polygon points={lightPatch} fill="#FFF0C8" opacity="0.28" />

      {/* Karpet */}
      <ellipse cx={rug.cx} cy={rug.cy} rx={rug.rx} ry={rug.ry} fill={C.navy2} stroke={C.ink} strokeWidth="3" />
      <ellipse
        cx={rug.cx}
        cy={rug.cy}
        rx={rug.rx - 22}
        ry={rug.ry - 12}
        fill="none"
        stroke={C.gold}
        strokeWidth="3"
        strokeDasharray="14 10"
      />
    </g>
  );
});
