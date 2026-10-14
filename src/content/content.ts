/**
 * SATU-SATUNYA SUMBER KONTEN situs.
 *
 * Ganti teks dan foto di sini. Komponen ilustrasi SVG tidak
 * perlu disentuh untuk mengganti konten.
 *
 * Aturan konten contoh:
 * - Jangan menambahkan institusi asal, penghargaan, pencapaian, dukungan,
 *   testimoni, nomor kandidat, atau jadwal pemilihan sebelum dikonfirmasi Dimas.
 */

export type SectionId = 'profile' | 'vision' | 'actions' | 'journey' | 'aspiration';

export interface ContactItem {
  label: string;
  value: string;
  /** null = tampil sebagai teks biasa (bukan tautan). */
  href: string | null;
}

export interface ActionProgram {
  title: string;
  goal: string;
  firstSteps: string[];
  indicators: string[];
}

export interface JourneySlot {
  period: string;
  role: string;
  summary: string;
}

export interface GalleryItem {
  /** null = tampilkan placeholder. Isi dengan path di /public, mis. "/assets/dokumentasi-1.jpg". */
  src: string | null;
  alt: string;
  caption: string;
}

export const content = {
  site: {
    title: 'Ruang Bersama Dimas',
    candidateName: 'Dimas',
    candidateFullName: 'Dimas Satria Dwi Putra',
    candidateRole: 'Calon Komandan Batch Korps P3MD',
    intro: 'Kenali Dimas, jelajahi gagasannya, dan sampaikan aspirasimu.',
    /** Teks balon kata ilustrasi Dimas yang melambai (pendek, ±14 karakter). */
    greeting: 'Halo, Serdik!',
    sceneHint: 'Ketuk objek berlabel untuk menjelajah',
    sceneAriaLabel:
      'Ilustrasi ruang diskusi Serdik: Dimas berdiri tersenyum sambil melambaikan tangan, meja dengan foto Dimas dan buku kerja, papan di dinding, bingkai dokumentasi, kotak surat aspirasi, elang jawa yang berdiri di tiang tenggeran dekat jendela, serta dua kucing di atas karpet: kucing hitam-putih yang berjalan dan kucing calico yang tidur.',
    sampleBadge: 'Konten contoh — menunggu konfirmasi Dimas',
    /** Bagian yang masih berisi konten contoh → menampilkan label `sampleBadge`. Kosongkan bila semua sudah final. */
    sampleSections: [] as SectionId[],
    disclaimer:
      'Halaman kampanye Dimas sebagai calon Komandan Batch Korps. Bukan portal resmi penyelenggara P3MD.',
    contacts: [{ label: 'Kontak', value: '0896-5361-2299', href: 'tel:+6289653612299' }] as ContactItem[],
    controls: {
      hint: 'Petunjuk',
      menu: 'Menu',
      menuTitle: 'Jelajahi bagian',
      close: 'Tutup',
    },
  },

  /** Label objek di adegan + judul panel. Urutan ini juga dipakai menu alternatif. */
  sections: {
    profile: {
      label: 'Kenal Dimas',
      windowTitle: 'Profil',
      description: 'Profil dan motivasi Dimas',
    },
    vision: {
      label: 'Arah Bersama',
      windowTitle: 'Visi & Misi',
      description: 'Visi dan misi',
    },
    actions: {
      label: 'Rencana Aksi',
      windowTitle: 'Buku Kerja',
      description: 'Tiga program utama',
    },
    journey: {
      label: 'Perjalanan Dimas',
      windowTitle: 'Dokumentasi',
      description: 'Pengalaman Dimas',
    },
    aspiration: {
      label: 'Suara Serdik',
      windowTitle: 'Kotak Aspirasi',
      description: 'Kirim aspirasi untuk Dimas',
    },
  } satisfies Record<SectionId, { label: string; windowTitle: string; description: string }>,

  sectionOrder: ['profile', 'vision', 'actions', 'journey', 'aspiration'] as SectionId[],

  profile: {
    /** null = avatar ilustrasi netral. Foto potret 4:5 di /public/assets. */
    photo: '/assets/foto-dimas.jpg' as string | null,
    photoAlt: 'Foto Dimas Satria Dwi Putra mengenakan jas hitam dan dasi merah',
    photoPlaceholderLabel: 'Foto placeholder',
    heading: 'Halo, saya Dimas.',
    facts: [
      { label: 'Nama lengkap', value: 'Dimas Satria Dwi Putra' },
      { label: 'Asal', value: 'PT Mineral Industri Indonesia (MIND.ID)' },
      { label: 'Peran saat ini', value: 'Peserta didik P3MD (Management Trainee MIND.ID)' },
    ],
    motivationTitle: 'Mengapa saya maju',
    motivation: [
      'Kita datang ke P3MD sebagai 384 orang dari berbagai BUMN, dengan latar dan kesiapan yang berbeda-beda. Tidak semua dari kita langsung nyaman dengan pendidikan karakter ini, dan itu wajar. Tapi saya percaya setiap orang di batch ini punya cahaya di dalam dirinya. Tugas kita bukan saling menyalahkan, tetapi saling menyalakan.',
      'Saya maju karena ingin batch ini tumbuh dari kebaikan, kreativitas, dan semangat bertumbuh bersama, bukan dari paksaan. Kegelapan adalah default semesta, dan hanya ada satu cara melawannya: nyalakan cahaya yang terang. Ketika kebaikan dan kreativitas tumbuh, niat buruk dan penolakan akan hilang dengan sendirinya.',
    ],
    valuesTitle: 'Nilai yang saya pegang',
    values: [
      { title: 'Kebaikan', text: 'Kebaikan sekecil apa pun layak dihargai, karena kebaikan yang dihargai akan menular.' },
      { title: 'Kreativitas', text: 'Setiap orang punya cara sendiri untuk berkontribusi, dan setiap ide layak diberi ruang.' },
      { title: 'Bertumbuh', text: 'Setiap orang punya ruang untuk belajar dan berkembang, dan tidak ada yang ditinggalkan.' },
    ],
  },

  vision: {
    visionTitle: 'Visi',
    vision:
      'Menjadikan Batch P3MD arena berlomba dalam kebaikan, tempat kreativitas, dan tempat bertumbuh menjadi karakter pemimpin masa depan.',
    missionTitle: 'Misi',
    missions: [
      'Membuat ekosistem yang mengapresiasi setiap perbuatan baik serdik, sehingga tumbuh budaya berlomba-lomba dalam kebaikan.',
      'Mewadahi setiap kreativitas serdik untuk didorong dan disebarluaskan, sehingga bermanfaat bagi batch.',
      'Mendorong keaktifan dan pengembangan diri setiap serdik melalui program belajar bersama, sehingga tidak ada yang tertinggal.',
    ],
  },

  actions: {
    intro:
      'Tiga program untuk mewujudkan visi: kebaikan yang diapresiasi, kreativitas yang diberi panggung, dan ruang bertumbuh untuk semua serdik.',
    labels: {
      goal: 'Tujuan',
      firstSteps: 'Langkah awal',
      indicators: 'Indikator keberhasilan',
    },
    programs: [
      {
        title: 'Apresiasi Kebaikan',
        goal: 'Setiap perbuatan baik dicatat, dihargai, dan ditularkan, sehingga tumbuh budaya berlomba dalam kebaikan.',
        firstSteps: [
          'Membuat sistem Poin Kebaikan per elemen yang direkap setiap pekan.',
          'Memilih satu Insan Best Heart setiap pekan untuk diapresiasi saat apel.',
          'Membuka ruang Sharing Kebaikan di grup batch.',
        ],
        indicators: [
          'Jumlah perbuatan baik yang tercatat naik setiap pekan.',
          'Jumlah serdik yang aktif terlibat terus bertambah.',
        ],
      },
      {
        title: 'Panggung Kreasi',
        goal: 'Ide setiap serdik tidak berhenti sebagai ide, tetapi didorong, dijalankan, dan disebarluaskan untuk manfaat batch.',
        firstSteps: [
          'Membuka Ruang Ide sebagai kanal usulan untuk semua serdik.',
          'Membentuk tim kecil untuk mendampingi ide terpilih sampai terlaksana.',
          'Mengadakan Panggung Kreasi rutin di forum batch.',
        ],
        indicators: [
          'Ada ide kreatif yang benar-benar terlaksana, bukan hanya diusulkan.',
          'Karya dan konten serdik tersebar ke seluruh batch.',
        ],
      },
      {
        title: 'Bertumbuh Bersama',
        goal: 'Setiap serdik didorong aktif dan terus berkembang, dengan ruang belajar yang terbuka untuk semua.',
        firstSteps: [
          'Memulai monitoring keaktifan serdik secara berkala.',
          'Membuka kelas mentoring public speaking.',
          'Mengadakan mentoring dan latihan rutin English speaking.',
        ],
        indicators: [
          'Tingkat keaktifan serdik dalam kegiatan batch meningkat.',
          'Peserta mentoring public speaking dan English terus bertambah.',
        ],
      },
    ] as ActionProgram[],
  },

  journey: {
    intro: 'Pengalaman yang membentuk cara saya bekerja, mendengar, dan memimpin.',
    galleryTitle: 'Galeri dokumentasi',
    /** Galeri hanya tampil bila minimal satu foto punya `src`. Contoh: { src: '/assets/dokumentasi-1.jpg', alt: '…', caption: '…' } */
    gallery: [] as GalleryItem[],
    experienceTitle: 'Pengalaman',
    experience: [
      {
        period: '2025 – 2026',
        role: 'Junior Planning & Scheduling Engineer, PT Tatamulia Nusantara Indah',
        summary: 'Mengelola jadwal dan monitoring progres proyek gedung 37 lantai (Hotel Mega Kuningan).',
      },
      {
        period: '2023 – 2024',
        role: 'Staf Komisi Aspirasi, Dewan Perwakilan Mahasiswa (Student Representative Council), Universitas Brawijaya',
        summary: 'Menyerap dan menindaklanjuti aspirasi mahasiswa; juga Sekretaris Umum Diskusi Interaktif 2023.',
      },
      {
        period: '2022',
        role: 'Chief Executive MW Funcy, Brawijaya Student Entrepreneurship Organization',
        summary:
          'Memimpin pelaksanaan kegiatan; sebelumnya juga Kepala Divisi Logistik di Kongres Mahasiswa Teknik Sipil 2023.',
      },
    ] as JourneySlot[],
  },

  aspiration: {
    intro: 'Apa yang ingin kamu sampaikan untuk korps kita? Tulis singkat dan jelas.',
    /**
     * Aspirasi dikirim lewat aplikasi email pengunjung (tautan mailto) — tanpa server,
     * tanpa penyimpanan di website. Pengunjung tetap harus menekan "Kirim" di aplikasi emailnya.
     */
    delivery: {
      email: 'dimas_satria@p3md.sbm-itb.ac.id',
      subjectPrefix: 'Aspirasi Serdik',
      anonymousName: 'Tidak disebutkan',
    },
    fields: {
      name: { label: 'Nama', hint: 'Opsional — boleh dikosongkan.', maxLength: 60 },
      category: {
        label: 'Kategori',
        placeholder: 'Pilih kategori',
        options: ['Kegiatan & jadwal', 'Akademik', 'Kebugaran', 'Kesejahteraan', 'Lainnya'],
        required: 'Pilih salah satu kategori.',
      },
      message: {
        label: 'Aspirasi',
        hint: 'Minimal 10 karakter, maksimal 500 karakter.',
        minLength: 10,
        maxLength: 500,
        required: 'Aspirasi belum diisi.',
        tooShort: 'Aspirasi terlalu singkat — minimal 10 karakter.',
        tooLong: 'Aspirasi terlalu panjang — maksimal 500 karakter.',
      },
    },
    sendNotice:
      'Aspirasi dikirim lewat aplikasi email di perangkatmu. Alamat email yang kamu pakai akan terlihat oleh penerima.',
    submitLabel: 'Kirim aspirasi',
    resultMessage:
      'Aplikasi email sudah dibuka dengan pesan yang terisi. Tekan "Kirim" di aplikasi email untuk menyelesaikan.',
    fallbackLabel: 'Aplikasi email tidak terbuka? Kirim manual ke',
    errorSummary: 'Periksa kembali isian yang ditandai.',
  },
};

export type Content = typeof content;
