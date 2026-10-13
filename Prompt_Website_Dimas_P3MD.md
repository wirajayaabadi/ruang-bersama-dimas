# Prompt Pembangunan Website “Ruang Bersama Dimas”

Bertindaklah sebagai frontend developer, UI/UX designer, dan SVG illustrator. Bangun website kampanye interaktif untuk Dimas, calon Komandan Batch Korps di Program Presiden untuk Pemimpin Masa Depan (P3MD), dengan konsep “Ruang Bersama Dimas”.

## 1. Tujuan dan referensi

Buat pengalaman menjelajahi ruang ilustrasi: pengunjung memilih objek untuk mengenal Dimas, membaca gagasan, melihat contoh rencana aksi, dan mencoba kanal aspirasi.

Referensi pengalaman: https://haveaniesdayclone.vercel.app/
Ambil inspirasi dari navigasi melalui objek dalam satu adegan. Buat komposisi dan ilustrasi original untuk Dimas. Gunakan SVG sebagai ilustrasi utama, tanpa Three.js, WebGL, atau model 3D.

Video referensi interaksi akan diberikan kemudian. Jangan menganggap video sudah tersedia atau mengklaim telah menganalisisnya. Untuk sekarang, implementasikan perilaku dasar yang dijelaskan di bawah. Pusatkan pengaturan durasi, easing, perpindahan panel, dan gerakan dalam konfigurasi agar mudah direvisi.

## 2. Data dummy dan aset

Gunakan nama tampilan “Dimas”. Nama lengkap, biodata, pengalaman, foto, dokumentasi, visi, misi, serta program belum tersedia.

- Buat avatar ilustrasi SVG netral dengan label “Foto placeholder”, mudah diganti dengan foto asli.
- Gunakan teks contoh berbahasa Indonesia yang jelas, singkat, dan relevan dengan organisasi peserta didik.
- Tampilkan label “Konten contoh — menunggu konfirmasi Dimas” pada bagian substantif.
- Jangan mengarang institusi asal, penghargaan, pencapaian, dukungan, testimoni, nomor kandidat, atau jadwal pemilihan.
- Gunakan placeholder untuk kontak dan tautan yang belum diberikan; jangan membuat tujuan tautan fiktif.
- Simpan seluruh konten dalam satu berkas data terstruktur. Penggantian konten tidak boleh mengharuskan perubahan kode ilustrasi.
- Identifikasi halaman sebagai kampanye Dimas, bukan portal resmi penyelenggara P3MD.

## 3. Arah visual

Tema: ruang diskusi Serdik yang hangat, rapi, terbuka, dan berwibawa. Gunakan ilustrasi vektor dengan bentuk organik, garis yang konsisten, detail furnitur secukupnya, dan kedalaman melalui tumpang tindih serta bayangan sederhana.

Gunakan logo P3MD Soedirman yang disertakan sebagai referensi warna. Palet awal berikut adalah pendekatan visual, bukan kode warna resmi:
- Navy: #08243A
- Emas: #D9AC4B
- Krem: #F3E9D5
- Merah: #A52B32

Navy untuk struktur utama, krem untuk bidang baca, emas untuk aksen, merah secara terbatas untuk tindakan utama. Periksa kontras teks. Jika logo tersedia, tampilkan proporsional dan utuh sebagai gambar pendukung; jangan menggambar ulang lambangnya. Jika belum tersedia di proyek, gunakan placeholder logo yang jelas.

Utamakan ilustrasi yang memenuhi bidang utama halaman. Hindari tampilan kumpulan kartu dashboard. Gunakan perspektif frontal sedikit menyudut dengan komposisi ruang yang masuk akal.

## 4. Struktur halaman dan adegan

Pada tampilan pertama, pengunjung melihat:
- Identitas “Ruang Bersama Dimas”.
- Nama Dimas dan keterangan “Calon Komandan Batch Korps P3MD”.
- Pengantar singkat: “Kenali Dimas, jelajahi gagasannya, dan sampaikan aspirasimu.”
- Adegan SVG sebagai pusat perhatian.
- Petunjuk “Ketuk objek berlabel untuk menjelajah”.
- Akses langsung “Kenal Dimas” dan “Lihat Rencana Aksi”.

Bangun lima objek utama:
1. Foto atau avatar di meja, label “Kenal Dimas”: membuka profil dan motivasi berupa placeholder.
2. Papan di dinding, label “Arah Bersama”: membuka contoh visi dan misi.
3. Buku kerja terbuka, label “Rencana Aksi”: membuka tiga contoh program; setiap program memuat tujuan, langkah awal, serta indikator keberhasilan, semuanya berlabel contoh.
4. Bingkai dokumentasi, label “Perjalanan Dimas”: membuka galeri placeholder dan struktur pengalaman yang bisa diisi kemudian.
5. Kotak surat, label “Suara Serdik”: membuka formulir aspirasi demo.

Sertakan meja, jendela, rak, lampu, tirai, dan tanaman sebagai pendukung. Pastikan objek interaktif mudah dikenali dan tidak tertutup dekorasi.

## 5. Aturan SVG

Gunakan inline SVG atau komponen SVG React dengan viewBox yang konsisten. Kelompokkan objek dengan elemen g dan penamaan semantik, misalnya background, furniture, profile, vision-board, action-book, journey-frame, aspiration-box, decorations.

Pisahkan objek statis, objek bergerak, dan area interaksi. Jangan menampilkan seluruh adegan sebagai satu gambar raster atau memakai tag img untuk adegan yang membutuhkan kontrol elemen internal.

Atur titik putar dengan benar, gunakan ID unik pada gradient, mask, dan clipPath, serta hindari filter berat dan path berlebihan. Pastikan area di belakang objek bergerak tetap tergambar.

Panel konten, navigasi, formulir, dan teks panjang menggunakan HTML. Sediakan kontrol HTML yang dapat diakses keyboard untuk semua fungsi adegan; bila memakai tombol overlay, pertahankan koordinatnya relatif terhadap pembungkus SVG yang sama.

## 6. Interaksi dan animasi

- Hover dan fokus memberi highlight atau perubahan skala halus pada objek.
- Label lima objek tetap dapat ditemukan di perangkat sentuh, tanpa bergantung pada hover.
- Klik atau tap membuka satu panel informasi yang sesuai.
- Desktop: panel dialog dengan backdrop; mobile: panel hampir layar penuh dengan scroll internal.
- Tombol tutup dan Escape menutup panel; fokus kembali ke pemicu.
- Klik di dalam panel tidak menutupnya. Batasi fokus ke dalam dialog selama terbuka.
- Hanya satu panel terbuka pada satu waktu.
- Tombol “Petunjuk” menyorot kelima objek secara singkat.
- Sediakan menu teks alternatif untuk membuka kelima bagian yang sama.
- Batasi gerakan suasana pada tirai, tanaman, dan halaman buku; gunakan gerakan pelan dengan fase berbeda.
- Saat panel terbuka, jeda animasi suasana bila memungkinkan.
- Hormati prefers-reduced-motion; informasi tetap lengkap tanpa animasi.
- Tidak perlu musik, suara otomatis, atau zoom kamera pada versi awal.

## 7. Responsif dan performa

Di desktop, tata pengantar dan adegan sehingga ilustrasi tetap dominan. Di mobile, tempatkan identitas ringkas di atas adegan, pertahankan proporsi, dan izinkan scroll halaman bila diperlukan.

Jangan sekadar mengecilkan seluruh halaman desktop sampai label sulit dibaca. Sesuaikan tata letak atau komposisi pada breakpoint yang jelas. Semua objek penting harus dapat diakses tanpa terpotong; hindari scroll horizontal.

Targetkan area sentuh minimal 44 × 44 CSS px. Gunakan transform dan opacity untuk animasi yang sesuai, batasi efek blur, dan hentikan kerja animasi yang tidak perlu. Uji ukuran layar kecil maupun lebar.

## 8. Formulir aspirasi demo

Field: nama opsional, kategori, dan aspirasi. Sediakan validasi yang jelas.

Tuliskan sebelum tombol: “Mode demo — pesan tidak dikirim atau disimpan.”
Tombol bertuliskan “Coba formulir”. Setelah validasi, tampilkan “Simulasi selesai. Pesan tidak dikirim.”

Jangan mengirim data ke server, menyimpan isi aspirasi di localStorage, atau menampilkan klaim pengiriman berhasil. Integrasi backend berada di luar versi awal.

## 9. Implementasi dan hasil

Jika proyek sudah tersedia, ikuti framework dan konvensinya. Jika mulai dari kosong, gunakan React, TypeScript, dan CSS atau Tailwind; CSS cukup untuk animasi awal. Backend, login, dashboard admin, dan sistem voting tidak diperlukan.

Pisahkan komponen adegan, objek interaktif, dialog informasi, formulir, serta konfigurasi konten dan animasi. Buat README yang menjelaskan cara menjalankan proyek, mengganti foto/logo/konten, serta mengubah interaksi setelah video tersedia.

Mulai dengan rencana implementasi singkat, kemudian bangun prototipe yang dapat dijalankan. Jangan berhenti pada penjelasan konsep.

Verifikasi:
- Lima objek dan menu alternatif membuka konten yang benar.
- Semua dialog dapat ditutup dan dioperasikan dengan keyboard.
- Tata letak tetap terbaca pada mobile dan desktop.
- Label dummy dan mode demo terlihat jelas.
- Tidak ada tautan rusak, kesalahan console, atau pengiriman data yang tidak diminta.
- Reduced motion berfungsi.
- Konten mudah diganti dari satu sumber data.

## 10. Ketika video referensi tersedia

Analisis video hanya setelah benar-benar diterima. Catat urutan interaksi, pemicu, respons objek, timing perkiraan, transisi, dan perilaku panel yang terlihat. Bedakan observasi dari asumsi; jangan menyimpulkan fitur yang tidak ditampilkan.

Petakan pola tersebut ke komponen yang sudah dibangun. Sesuaikan gerakan dan transisi dengan tetap menjaga SVG, identitas Dimas, aksesibilitas, dan kemudahan penggunaan mobile.

