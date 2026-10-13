/** Palet ilustrasi. Pendekatan visual dari logo P3MD — bukan kode warna resmi. */
export const C = {
  ink: '#1B2A38',
  navy: '#08243A',
  navy2: '#12385A',
  navy3: '#1E4A6E',
  gold: '#D9AC4B',
  goldDark: '#B48731',
  goldLight: '#EBCB82',
  cream: '#F3E9D5',
  cream2: '#FBF6EC',
  paper: '#FFFDF7',
  red: '#A52B32',
  redSoft: '#E3AFA6',
  wall: '#EDE0C6',
  wallLine: '#E2D2B2',
  wood: '#8E5E36',
  woodDark: '#5F3C21',
  woodLight: '#B7814D',
  woodTop: '#C79560',
  floor: '#B07A4A',
  floorDark: '#946238',
  leaf: '#4E7B53',
  leafLight: '#78A469',
  leafDark: '#355840',
  teal: '#2F6E72',
  plum: '#7A4A63',
  sky: '#BFD8E2',
  skin: '#C99272',
  hair: '#2A211B',
} as const;

/** Garis tepi konsisten untuk semua objek. */
export const stroke = {
  stroke: C.ink,
  strokeWidth: 3,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
};

export const thin = {
  stroke: C.ink,
  strokeWidth: 2,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
};
