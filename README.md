# Ruang Bersama Dimas

Website kampanye interaktif untuk **Dimas**, calon Komandan Batch Korps P3MD. Seluruh halaman berupa satu adegan ruang ilustrasi SVG layar penuh (tanpa header/footer). Pengunjung memilih objek untuk membuka informasi.

> Halaman kampanye Dimas Satria Dwi Putra, **bukan** portal resmi penyelenggara P3MD.

Stack: React 18 + TypeScript + Vite + CSS biasa. Tidak ada backend, Three.js, WebGL, atau model 3D.

## Menjalankan

```bash
npm install
npm run dev       # server pengembangan → http://localhost:5173
npm run build     # type-check + build produksi ke dist/
npm run preview   # mencoba hasil build → http://localhost:4173
```

Hasil `dist/` berupa situs statis, jadi bisa di-deploy ke Vercel, Netlify, GitHub Pages, dan sejenisnya.

## Struktur

```
src/
  content/content.ts          ← SATU sumber untuk semua teks & foto
  config/motion.ts            ← durasi, easing, skala hover, petunjuk, gerak suasana
  config/layout.ts            ← posisi objek di adegan (desktop & mobile), posisi label
  components/
    scene/Scene.tsx           ← menyusun adegan SVG + lapisan tombol HTML
    scene/Hotspot.tsx         ← tombol interaktif + label yang selalu terlihat
    scene/objects/*.tsx       ← tiap objek SVG (Background, Furniture, Decorations,
                                 Dimas (ilustrasi Dimas menyapa), Eagle (elang jawa), Cat (kucing berjalan & tidur), ProfileFrame, VisionBoard, ActionBook, JourneyFrames,
                                 AspirationBox, Avatar)
    InfoDialog.tsx            ← panel modal (focus trap, Escape, transisi)
    SectionMenu.tsx           ← menu teks di pojok adegan
    sections/Sections.tsx     ← isi panel Profil, Visi-Misi, Rencana Aksi, Perjalanan
    sections/AspirationForm.tsx ← formulir aspirasi (dikirim lewat aplikasi email pengunjung)
  styles/                     ← global.css, scene.css, dialog.css
public/assets/                ← tempat foto dan dokumentasi asli
```

Lima objek interaktif:

| Objek di adegan | Label | Membuka |
|---|---|---|
| Bingkai foto di meja (`#scene-profile`) | Kenal Dimas | Profil & motivasi |
| Papan di dinding (`#scene-vision-board`) | Arah Bersama | Visi & misi |
| Buku kerja terbuka (`#scene-action-book`) | Rencana Aksi | Tiga program utama |
| Bingkai dokumentasi (`#scene-journey-frame`) | Perjalanan Dimas | Galeri + pengalaman |
| Kotak surat (`#scene-aspiration-box`) | Suara Serdik | Formulir aspirasi |

Kelima bagian juga bisa dibuka dari tombol **Menu** di pojok kiri atas adegan (alternatif teks untuk keyboard & pembaca layar). Keterangan "bukan portal resmi P3MD" ada di bagian bawah panel Menu. Judul dan pengantar tetap ada sebagai teks tersembunyi untuk pembaca layar.

### Adegan layar penuh

Adegan selalu memenuhi layar. Komposisi utama (`width × height` di `layout.ts`) selalu terlihat utuh, lalu dinding dan lantai diperpanjang mengikuti rasio layar: ke samping di layar lebar, ke atas-bawah di layar tinggi. Logikanya ada di `fitViewBox()`. Tombol interaksi HTML memakai viewBox yang sama, jadi tetap menempel pada objeknya.

## Mengganti konten

Semua konten ada di **`src/content/content.ts`**. Kode ilustrasi tidak perlu diubah.

- **Foto Dimas**: `public/assets/foto-dimas.jpg` (potret 4:5, 800 × 1000 px). Untuk mengganti, timpa file ini. Foto muncul di bingkai meja dan di panel profil. Jika `profile.photo` diisi `null`, avatar ilustrasi muncul kembali.
- **Foto dokumentasi**: tambahkan ke `journey.gallery`, misalnya `{ src: '/assets/dokumentasi-1.jpg', alt: '…', caption: '…' }`. Galeri baru muncul setelah ada minimal satu foto.
- **Kontak**: `site.contacts`. Tampil di panel profil dan di panel Menu.
- **Email penerima aspirasi**: `aspiration.delivery.email`.
- **Dokumentasi**: isi `journey.gallery[i].src` dan `alt`.
- **Pengalaman**: ganti isi `journey.experience`.
- **Label "Konten contoh"**: tampil hanya di bagian yang dicantumkan di `site.sampleSections` (saat ini kosong karena semua konten sudah final).

Jangan menambahkan institusi asal, penghargaan, testimoni, nomor kandidat, atau jadwal pemilihan sebelum dikonfirmasi.

## Mengubah interaksi & gerak

Semua angka gerak ada di **`src/config/motion.ts`** dan diteruskan ke CSS sebagai custom property, jadi JS dan CSS selalu memakai nilai yang sama:

| Kunci | Fungsi |
|---|---|
| `panel.enterMs / exitMs / easing*` | Durasi & kurva panel muncul/menutup |
| `panel.fromScale / fromY` | Skala & geser awal panel |
| `backdrop.opacity` | Seberapa gelap adegan saat panel terbuka |
| `object.hoverScale / hoverMs` | Efek hover/fokus objek |
| `hint.durationMs / pulseMs / autoOnLoad` | Tombol Petunjuk & sorotan otomatis saat halaman dibuka |
| `ambient.*` | Gerak tirai, tanaman, halaman buku, elang jawa (`eagle*Ms`: napas, menoleh, jambul, kedipan), dan kucing (`catSpeed`, `catStepMs`, `catTailMs`; kucing tidur: `catSleepBreathMs`, `catSleepZMs`), serta ilustrasi Dimas (`dimasWaveMs`: lambaian + balon kata, `dimasBlinkMs`, `dimasBreathMs`, `dimasHeadMs`). Ubah `enabled` ke `false` untuk mematikan semuanya |

Posisi objek dan label per breakpoint ada di **`src/config/layout.ts`**. Kucing yang berjalan diatur di `walkingCats` (posisi awal `x`, batas kanan `toX`, skala, fase awal). Kucing yang tidur diatur di `sleepingCats` (posisi & skala). Posisi ilustrasi Dimas diatur di `placements.dimas`, dan balon katanya di `dimasBubble`. Teks balon kata ada di `site.greeting` pada `content.ts`. Satu kucing bisa dipindah dari satu daftar ke daftar lain tanpa mengubah gambarnya. Komposisi `desktop` (1600×1000) dan `mobile` (900×1540) berbeda, dan breakpoint-nya adalah `MOBILE_QUERY`.

## Catatan video referensi

Video `WhatsApp Video 2026-10-13 at 7.46.08 AM.mp4` (±109 detik, direkam di ponsel) sudah dianalisis frame demi frame.

**Observasi (terlihat di video)**
1. Adegan berupa satu ruangan ilustrasi penuh layar. Di pojok kiri atas ada ikon bohlam (dan ikon bercoret).
2. Detik 0–0,3: adegan berubah dari warna terang polos ke mode di mana objek interaktif diberi garis tepi kuning-hijau.
3. Ketuk objek → panel muncul dengan *fade* ±300 ms, dan adegan di belakang meredup (±55–65% gelap, tanpa blur).
4. Panel bergaya jendela kertas: bilah judul di atas dengan tombol tutup kotak di kanan atas. Beberapa panel memakai tombol X bulat merah. Isinya panjang dan di-scroll.
5. Tutup panel → *crossfade* ±300 ms kembali ke adegan. Satu panel terbuka pada satu waktu.

**Tidak terlihat / asumsi**
- Efek hover tidak terlihat karena perekaman di ponsel. Hover dan fokus (sorotan halo + skala halus) mengikuti spesifikasi prompt.
- Tidak terdengar suara. Proyek ini tidak memakai suara.
- Belum jelas apakah adegan di video bisa digeser horizontal. Proyek ini memakai komposisi portrait khusus untuk mobile, jadi tidak ada objek yang terpotong.

**Pemetaan ke komponen**
- Fade panel + adegan meredup → `motion.panel.*`, `motion.backdrop.opacity`, `dialog.css`.
- Ikon bohlam + garis tepi objek → tombol **Petunjuk** (`hint.*`) + halo emas `.obj__halo`. Sorotan juga berjalan sekali saat halaman dibuka (`hint.autoOnLoad`).
- Panel bergaya jendela → `.dialog__titlebar` dengan judul jendela (`sections.*.windowTitle`) dan tombol tutup kotak.

## Aksesibilitas & perilaku yang sudah diverifikasi

Diuji otomatis dengan Chrome headless (desktop 1440×900, mobile 390×844, lebar 320–1920 px):

- Lima objek dan menu pojok membuka panel yang benar. Hanya satu panel terbuka pada satu waktu.
- Escape, tombol tutup, dan klik backdrop menutup panel. Klik di dalam panel tidak menutup. Fokus kembali ke pemicu.
- Fokus terkunci di dalam dialog, dan konten di belakangnya `inert`.
- Objek bisa dioperasikan dengan keyboard (Tab + Enter). Area sentuh ≥ 44×44 px.
- Di 360×640 sampai 1920×1080, semua objek dan label berada di dalam layar dan tidak menimpa toolbar. Halaman tidak bisa di-scroll, tidak ada error console, dan tidak ada request selain aset lokal + Google Fonts.
- Formulir: validasi kategori dan panjang aspirasi, fokus ke field yang salah. Setelah valid, aplikasi email pengunjung terbuka (`mailto`) dengan subjek dan isi yang sudah terisi. Pengunjung tetap harus menekan "Kirim" sendiri. Website tidak memakai server, `fetch`, atau `localStorage`/`sessionStorage`.
- Animasi suasana berhenti saat panel terbuka dan saat adegan tidak terlihat di layar.
- `prefers-reduced-motion`: semua animasi mati, panel tampil/tertutup instan, dan sorotan petunjuk tampil statis.
