import type { SectionId } from '../content/content';
import type { CatVariant } from '../components/scene/objects/Cat';

/**
 * TATA LETAK ADEGAN.
 *
 * Setiap objek SVG digambar dalam koordinat lokalnya sendiri (ukuran di
 * `objectSizes`). Layout hanya menentukan posisi (x, y) dan skala (s) di dalam
 * viewBox adegan. Ada dua komposisi: desktop (landscape) dan mobile (portrait),
 * sehingga di layar kecil objek disusun ulang — bukan sekadar diperkecil.
 *
 * Tombol interaksi HTML dihitung dari angka yang sama, jadi area klik selalu
 * menempel pada objeknya.
 */

export type ObjectKey =
  | 'bookshelf'
  | 'window'
  | 'visionBoard'
  | 'journeyFrames'
  | 'chair'
  | 'desk'
  | 'profileFrame'
  | 'actionBook'
  | 'deskLamp'
  | 'aspirationBox'
  | 'plant'
  | 'eaglePerch';

/** Ukuran lokal tiap komponen objek (harus sama dengan gambar di komponen). */
export const objectSizes: Record<ObjectKey, { w: number; h: number }> = {
  bookshelf: { w: 260, h: 620 },
  window: { w: 380, h: 420 },
  visionBoard: { w: 360, h: 300 },
  journeyFrames: { w: 320, h: 290 },
  chair: { w: 220, h: 280 },
  desk: { w: 760, h: 280 },
  profileFrame: { w: 150, h: 190 },
  actionBook: { w: 280, h: 140 },
  deskLamp: { w: 150, h: 220 },
  aspirationBox: { w: 190, h: 340 },
  plant: { w: 180, h: 330 },
  eaglePerch: { w: 160, h: 560 },
};

/** Objek mana yang membuka bagian mana. */
export const interactiveObjects: Record<SectionId, ObjectKey> = {
  profile: 'profileFrame',
  vision: 'visionBoard',
  actions: 'actionBook',
  journey: 'journeyFrames',
  aspiration: 'aspirationBox',
};

export interface Placement {
  x: number;
  y: number;
  /** skala, default 1 */
  s?: number;
}

export interface SceneLayout {
  name: 'desktop' | 'mobile';
  width: number;
  height: number;
  /** y awal lantai */
  floorY: number;
  /** y awal panel dinding bawah (wainscot) */
  wainscotY: number;
  rug: { cx: number; cy: number; rx: number; ry: number };
  /** cahaya jendela di lantai (titik poligon) */
  lightPatch: string;
  placements: Record<ObjectKey, Placement>;
  /**
   * Kucing yang berjalan bolak-balik di atas karpet.
   * x,y = posisi awal (kiri-atas), toX = batas kanan, s = skala,
   * phase 0..1 = titik awal siklus (0.5 → mulai dari ujung kanan).
   */
  walkingCats: { variant: CatVariant; x: number; y: number; s: number; toX: number; phase: number }[];
  /** Kucing yang tidur diam di karpet (x,y = kiri-atas, s = skala). Digambar di depan kucing yang berjalan. */
  sleepingCats: { variant: CatVariant; x: number; y: number; s: number }[];
  /** Titik tengah label tiap objek interaktif (koordinat viewBox). */
  labels: Record<SectionId, { x: number; y: number }>;
}

export const layouts: Record<'desktop' | 'mobile', SceneLayout> = {
  desktop: {
    name: 'desktop',
    width: 1600,
    height: 1000,
    floorY: 720,
    wainscotY: 560,
    rug: { cx: 830, cy: 925, rx: 540, ry: 58 },
    lightPatch: '360,735 740,735 860,860 300,860',
    placements: {
      bookshelf: { x: 40, y: 150 },
      window: { x: 350, y: 70 },
      visionBoard: { x: 790, y: 100 },
      journeyFrames: { x: 1210, y: 105 },
      chair: { x: 720, y: 455 },
      desk: { x: 430, y: 618 },
      profileFrame: { x: 490, y: 442 },
      actionBook: { x: 735, y: 506 },
      deskLamp: { x: 1030, y: 415 },
      aspirationBox: { x: 1300, y: 560 },
      plant: { x: 268, y: 612 },
      // elang jawa berdiri di samping jendela, sedikit di depan tirai kiri
      eaglePerch: { x: 288, y: 200, s: 0.96 },
    },
    // kucing hitam-putih berjalan di jalur belakang, lewat di belakang kucing calico yang tidur
    walkingCats: [{ variant: 'bicolor', x: 430, y: 830, s: 1.0, toX: 1100, phase: 0.1 }],
    sleepingCats: [{ variant: 'calico', x: 750, y: 888, s: 1.1 }],
    labels: {
      profile: { x: 565, y: 418 },
      vision: { x: 970, y: 426 },
      actions: { x: 875, y: 486 },
      journey: { x: 1370, y: 426 },
      aspiration: { x: 1395, y: 536 },
    },
  },
  mobile: {
    name: 'mobile',
    width: 900,
    height: 1540,
    floorY: 1120,
    wainscotY: 950,
    rug: { cx: 450, cy: 1462, rx: 430, ry: 62 },
    lightPatch: '70,1130 390,1130 470,1250 20,1250',
    placements: {
      // baris atas diberi ruang untuk toolbar Petunjuk/Menu
      visionBoard: { x: 44, y: 175, s: 1.1 },
      journeyFrames: { x: 500, y: 182, s: 1.08 },
      window: { x: 60, y: 590, s: 0.84 },
      bookshelf: { x: 650, y: 600, s: 0.86 },
      chair: { x: 268, y: 1010, s: 0.8 },
      desk: { x: 30, y: 1140, s: 0.8 },
      profileFrame: { x: 74, y: 970 },
      actionBook: { x: 246, y: 1036, s: 0.92 },
      deskLamp: { x: 512, y: 980, s: 0.85 },
      aspirationBox: { x: 690, y: 1160 },
      plant: { x: -6, y: 1262, s: 0.8 },
      // di antara jendela & rak; kaki tiang tersembunyi di belakang meja
      eaglePerch: { x: 404, y: 626, s: 0.95 },
    },
    walkingCats: [{ variant: 'bicolor', x: 140, y: 1330, s: 1.05, toX: 520, phase: 0.1 }],
    sleepingCats: [{ variant: 'calico', x: 360, y: 1414, s: 1.15 }],
    labels: {
      vision: { x: 242, y: 540 },
      journey: { x: 673, y: 540 },
      profile: { x: 150, y: 926 },
      actions: { x: 375, y: 1226 },
      aspiration: { x: 740, y: 1132 },
    },
  },
};

/** Kotak pembatas objek di koordinat viewBox. */
export function objectBox(layout: SceneLayout, key: ObjectKey) {
  const p = layout.placements[key];
  const s = p.s ?? 1;
  const { w, h } = objectSizes[key];
  return { x: p.x, y: p.y, w: w * s, h: h * s };
}

export function placementTransform(p: Placement) {
  const s = p.s ?? 1;
  return s === 1 ? `translate(${p.x} ${p.y})` : `translate(${p.x} ${p.y}) scale(${s})`;
}

export interface ViewBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

/**
 * viewBox yang mengikuti rasio layar. Seluruh komposisi (width × height) selalu
 * terlihat utuh; sisa ruang diisi dengan memperpanjang dinding/lantai ke samping
 * (layar lebar) atau ke atas-bawah (layar tinggi) — tidak ada objek yang terpotong.
 */
export function fitViewBox(layout: SceneLayout, pxW: number, pxH: number): ViewBox {
  const { width: W, height: H } = layout;
  if (!pxW || !pxH) return { x: 0, y: 0, w: W, h: H };
  const screen = pxW / pxH;
  if (screen > W / H) {
    const w = H * screen;
    return { x: -(w - W) / 2, y: 0, w, h: H };
  }
  const h = W / screen;
  return { x: 0, y: -(h - H) / 2, w: W, h };
}

/** Breakpoint komposisi mobile (portrait). */
export const MOBILE_QUERY = '(max-width: 760px), (max-aspect-ratio: 4/5)';
