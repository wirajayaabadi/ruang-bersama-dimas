import { memo } from 'react';
import { C, stroke, thin } from './palette';

/** Warna mengikuti foto Dimas: jas hitam berlis abu-abu, kemeja putih, dasi & tali jam merah marun. */
const D = {
  skin: '#C98E6A',
  skinShade: '#A9704F',
  hair: '#16161A',
  hairLine: '#3A3A44',
  jacket: '#23262D',
  jacketDark: '#15171C',
  piping: '#8C9099',
  shirt: '#F7F5F0',
  tie: '#9C3F45',
  trousers: '#1C1E24',
  shoe: '#0E0F12',
  strap: '#8E2F36',
  watch: '#2B2E33',
};

/** Garis lengan: outline tinta lalu isi warna (lebih tebal di bawah). */
function Limb({ d, w, color }: { d: string; w: number; color: string }) {
  return (
    <>
      <path d={d} fill="none" stroke={C.ink} strokeWidth={w + 5} strokeLinecap="round" />
      <path d={d} fill="none" stroke={color} strokeWidth={w} strokeLinecap="round" />
    </>
  );
}

/**
 * Ilustrasi Dimas berdiri, tersenyum, dan melambaikan tangan.
 * Ukuran lokal 260×480 (tokoh di x≈40..200, telapak sepatu di y≈472).
 * Gerak: lambaian tangan, kedipan, kepala sedikit miring, napas.
 * Balon kata "Halo" berupa HTML di Scene agar teksnya tetap terbaca di layar kecil.
 */
export const DimasFigure = memo(function DimasFigure() {
  return (
    <g>
      <ellipse cx="100" cy="476" rx="80" ry="9" fill={C.navy} opacity="0.28" />

      {/* Kaki (berdiri tegap, sedikit terbuka) & sepatu mengilap */}
      <path d="M66,318 L56,460 L96,460 L100,334 L104,460 L144,460 L134,318 Z" fill={D.trousers} {...stroke} />
      <path d="M78,340 L74,452 M122,340 L126,452" stroke={D.jacketDark} strokeWidth="2" />
      <path d="M50,458 L98,458 L98,475 L42,475 C42,466 45,460 50,458 Z" fill={D.shoe} {...thin} />
      <path d="M102,458 L150,458 C155,460 158,466 158,475 L102,475 Z" fill={D.shoe} {...thin} />
      <path d="M50,464 L62,464 M138,464 L150,464" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />

      {/* Badan atas (bernapas) */}
      <g className="amb dimas-breathe">
        {/* leher kokoh */}
        <path d="M89,106 L89,140 L111,140 L111,106 Z" fill={D.skinShade} {...thin} />

        {/* lengan kiri (sisi penonton) lurus di samping, tangan mengepal */}
        <path d="M50,162 C36,180 33,238 37,300 L60,302 C58,254 60,208 68,178 Z" fill={D.jacket} {...stroke} />
        <rect x="37" y="295" width="23" height="7" rx="2" fill={D.shirt} {...thin} />
        <ellipse cx="48.5" cy="313" rx="11" ry="12.5" fill={D.skin} {...thin} />
        <path d="M42,309 q6,-3 13,0" fill="none" stroke={D.skinShade} strokeWidth="1.5" strokeLinecap="round" />

        {/* jas: bahu lebar berbantalan, meruncing ke pinggang */}
        <path d="M44,162 C50,146 72,136 100,136 C128,136 150,146 156,162 L149,252 C147,276 143,298 141,324 L59,324 C57,298 53,276 51,252 Z" fill={D.jacket} {...stroke} />
        <path d="M48,164 C56,170 62,172 70,172 M152,164 C144,170 138,172 130,172" fill="none" stroke={D.jacketDark} strokeWidth="2" strokeLinecap="round" />
        <path d="M76,250 L80,320 M124,250 L120,320" stroke={D.jacketDark} strokeWidth="1.5" opacity="0.7" />
        {/* kemeja, kerah, dasi */}
        <path d="M85,138 L100,208 L115,138 C108,134 92,134 85,138 Z" fill={D.shirt} />
        <path d="M95,146 L105,146 L103,157 L97,157 Z" fill={D.tie} {...thin} />
        <path d="M97,157 L103,157 L109,202 L100,212 L91,202 Z" fill={D.tie} {...thin} />
        <path d="M99.5,162 L101,198" stroke="#B85A60" strokeWidth="1.5" opacity="0.6" />
        <path d="M85,138 L92,155 L100,143 Z M115,138 L108,155 L100,143 Z" fill={D.shirt} {...thin} />
        {/* lis kerah abu-abu (ciri jas di foto) */}
        <path d="M85,138 L69,176 L100,240 M115,138 L131,176 L100,240" fill="none" stroke={D.piping} strokeWidth="3.2" strokeLinejoin="round" />
        <path d="M69,176 L77,169 M131,176 L123,169" stroke={D.piping} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M100,240 L100,324" stroke={D.jacketDark} strokeWidth="2" />
        <circle cx="100" cy="258" r="3.6" fill="#3A3D44" />
        <circle cx="100" cy="282" r="3.6" fill="#3A3D44" />
        <path d="M112,200 L134,197 M64,292 L86,290 M114,290 L136,292" stroke="#3A3D44" strokeWidth="2.5" strokeLinecap="round" />

        {/* lengan kanan melambai: lengan atas statis, lengan bawah + tangan berayun di siku (178,218) */}
        <Limb d="M150,166 L178,218" w={23} color={D.jacket} />
        <g className="amb dimas-wave">
          {/* kotak tak terlihat agar titik putar (tengah kotak) tepat di siku */}
          <rect x="38" y="78" width="280" height="280" fill="none" />
          <g transform="translate(8 4)">
            <Limb d="M170,214 L180,148" w={21} color={D.jacket} />
            <Limb d="M179.6,149 L180.6,141" w={16} color={D.shirt} />
            <Limb d="M180.8,140 L181.6,132" w={14} color={D.strap} />
            <circle cx="181.2" cy="136" r="5.5" fill={D.watch} stroke={C.ink} strokeWidth="1.5" />
            {/* tangan terbuka */}
            <rect x="172" y="88" width="6" height="22" rx="3" fill={D.skin} {...thin} />
            <rect x="178.5" y="83" width="6" height="27" rx="3" fill={D.skin} {...thin} />
            <rect x="185" y="84" width="6" height="26" rx="3" fill={D.skin} {...thin} />
            <rect x="191.5" y="90" width="5.5" height="20" rx="2.75" fill={D.skin} {...thin} />
            <rect x="159" y="111" width="17" height="7" rx="3.5" fill={D.skin} {...thin} transform="rotate(-32 168 115)" />
            <rect x="171" y="102" width="26" height="28" rx="9" fill={D.skin} {...thin} />
          </g>
        </g>

        {/* Kepala (tegak, sedikit miring) */}
        <g className="amb dimas-head">
          <ellipse cx="71" cy="76" rx="6.5" ry="10.5" fill={D.skin} {...thin} />
          <ellipse cx="129" cy="76" rx="6.5" ry="10.5" fill={D.skin} {...thin} />
          {/* wajah dengan rahang tegas */}
          <path d="M72,70 C72,44 85,30 100,30 C115,30 128,44 128,70 C128,90 124,104 114,112 C109,116 104,118 100,118 C96,118 91,116 86,112 C76,104 72,90 72,70 Z" fill={D.skin} {...stroke} />
          <path d="M76,96 C80,106 88,114 100,117 C112,114 120,106 124,96 C120,104 112,111 100,113 C88,111 80,104 76,96 Z" fill={D.skinShade} opacity="0.35" />
          {/* rambut: jambul tinggi disisir ke samping */}
          <path d="M70,80 C64,52 68,28 87,16 C101,6 127,5 138,22 C146,34 143,52 134,68 C132,58 128,51 121,47 C110,49 96,47 88,43 C81,51 76,63 74,80 Z" fill={D.hair} {...thin} />
          <path d="M90,22 C104,13 122,13 133,25" fill="none" stroke={D.hairLine} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <path d="M84,35 C94,29 104,27 114,29" fill="none" stroke={D.hairLine} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
          {/* alis tebal */}
          <path d="M81,64 Q89,58 97,61 M103,61 Q111,58 119,64" fill="none" stroke={D.hair} strokeWidth="4.2" strokeLinecap="round" />
          {/* mata tajam + kelopak berkedip */}
          <ellipse cx="90" cy="72.5" rx="3.2" ry="3.4" fill="#1B1B1B" />
          <ellipse cx="110" cy="72.5" rx="3.2" ry="3.4" fill="#1B1B1B" />
          <circle cx="89" cy="71.5" r="1" fill="#fff" />
          <circle cx="109" cy="71.5" r="1" fill="#fff" />
          <path d="M85,69.5 Q90,67 95,69.5 M105,69.5 Q110,67 115,69.5" fill="none" stroke={C.ink} strokeWidth="1.6" strokeLinecap="round" />
          <ellipse className="amb dimas-blink" cx="90" cy="72.5" rx="4.6" ry="4.6" fill={D.skin} />
          <ellipse className="amb dimas-blink" cx="110" cy="72.5" rx="4.6" ry="4.6" fill={D.skin} />
          {/* hidung & senyum percaya diri */}
          <path d="M100,76 C98,84 96,88 99,90 C101,91 104,90 105,88" fill="none" stroke={D.skinShade} strokeWidth="2" strokeLinecap="round" />
          <path d="M88,99 Q100,104 112,99 Q100,109 88,99 Z" fill="#fff" stroke={C.ink} strokeWidth="2" strokeLinejoin="round" />
          <path d="M86,97.5 q1,2 2.5,2 M114,97.5 q-1,2 -2.5,2" fill="none" stroke={C.ink} strokeWidth="1.4" strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
});
