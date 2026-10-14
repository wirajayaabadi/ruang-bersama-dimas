/**
 * PUSAT PENGATURAN GERAK & INTERAKSI.
 *
 * Nilai awal disesuaikan dengan video referensi (lihat README → "Catatan video"):
 * - Panel muncul/hilang dengan fade ±300 ms; adegan di belakang meredup.
 * - Objek interaktif diberi garis/halo sorotan; mode petunjuk menyorot semuanya.
 *
 * Semua nilai di sini diteruskan ke CSS sebagai custom property (lihat
 * `motionCssVars`), jadi CSS dan JS selalu memakai angka yang sama.
 */

export const motion = {
  panel: {
    /** Durasi panel muncul (ms). */
    enterMs: 320,
    /** Durasi panel menutup (ms). JS menunggu durasi ini sebelum melepas panel dari DOM. */
    exitMs: 260,
    easingEnter: 'cubic-bezier(0.22, 1, 0.36, 1)',
    easingExit: 'cubic-bezier(0.4, 0, 1, 1)',
    /** Skala awal panel saat muncul (1 = tanpa skala). */
    fromScale: 0.97,
    /** Geser vertikal awal panel (px). */
    fromY: 14,
  },
  backdrop: {
    /** Opasitas lapisan gelap di atas adegan saat panel terbuka (video: ±0.55–0.65). */
    opacity: 0.62,
  },
  object: {
    /** Skala objek saat hover/fokus. */
    hoverScale: 1.04,
    hoverMs: 220,
    easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)',
  },
  hint: {
    /** Lama sorotan "Petunjuk" (ms). */
    durationMs: 2600,
    /** Durasi satu denyut sorotan (ms). */
    pulseMs: 900,
    /** Jalankan petunjuk sekali saat halaman dibuka (seperti awal video). */
    autoOnLoad: true,
    autoDelayMs: 700,
  },
  ambient: {
    /** Gerakan suasana — pelan, fase berbeda. Set enabled=false untuk mematikan. */
    enabled: true,
    curtainMs: 7000,
    plantMs: 5200,
    pageMs: 6400,
    /** Elang jawa: napas, kepala menoleh, jambul, kedipan mata. */
    eagleBreathMs: 3800,
    eagleHeadMs: 9000,
    eagleCrestMs: 2400,
    eagleBlinkMs: 5600,
    /** Kucing di karpet: kecepatan jalan (unit viewBox/detik), satu langkah kaki, ayunan ekor. */
    catSpeed: 46,
    catStepMs: 420,
    catTailMs: 1800,
    /** Kucing tidur: satu tarikan napas & satu siklus "z" melayang. */
    catSleepBreathMs: 3400,
    catSleepZMs: 3600,
    /** Ilustrasi Dimas: satu siklus lambaian + balon kata, kedipan, napas, kepala miring. */
    dimasWaveMs: 4200,
    dimasBlinkMs: 4600,
    dimasBreathMs: 4000,
    dimasHeadMs: 5200,
    /** Hentikan animasi suasana saat panel terbuka. */
    pauseWhenPanelOpen: true,
  },
} as const;

export function motionCssVars(): Record<string, string> {
  return {
    '--panel-enter': `${motion.panel.enterMs}ms`,
    '--panel-exit': `${motion.panel.exitMs}ms`,
    '--panel-ease-in': motion.panel.easingEnter,
    '--panel-ease-out': motion.panel.easingExit,
    '--panel-from-scale': String(motion.panel.fromScale),
    '--panel-from-y': `${motion.panel.fromY}px`,
    '--backdrop-opacity': String(motion.backdrop.opacity),
    '--obj-hover-scale': String(motion.object.hoverScale),
    '--obj-hover-dur': `${motion.object.hoverMs}ms`,
    '--obj-ease': motion.object.easing,
    '--hint-pulse': `${motion.hint.pulseMs}ms`,
    '--amb-curtain': `${motion.ambient.curtainMs}ms`,
    '--amb-plant': `${motion.ambient.plantMs}ms`,
    '--amb-page': `${motion.ambient.pageMs}ms`,
    '--amb-eagle-breath': `${motion.ambient.eagleBreathMs}ms`,
    '--amb-eagle-head': `${motion.ambient.eagleHeadMs}ms`,
    '--amb-eagle-crest': `${motion.ambient.eagleCrestMs}ms`,
    '--amb-eagle-blink': `${motion.ambient.eagleBlinkMs}ms`,
    '--cat-step': `${motion.ambient.catStepMs}ms`,
    '--cat-tail': `${motion.ambient.catTailMs}ms`,
    '--cat-sleep': `${motion.ambient.catSleepBreathMs}ms`,
    '--cat-z': `${motion.ambient.catSleepZMs}ms`,
    '--dimas-wave': `${motion.ambient.dimasWaveMs}ms`,
    '--dimas-blink': `${motion.ambient.dimasBlinkMs}ms`,
    '--dimas-breath': `${motion.ambient.dimasBreathMs}ms`,
    '--dimas-head': `${motion.ambient.dimasHeadMs}ms`,
  };
}
