# DESIGN.md — Web Portofolio Full Stack Developer

Dokumen ini adalah sumber kebenaran visual dan interaksi untuk portofolio. Pelengkap dari `PRD`. Semua keputusan desain, mulai dari warna, layout, komponen, sampai motion, mengacu ke sini.

---

## 1. Arah Desain

**Nama konsep: "Midnight Glass"**

Antarmuka gelap yang **kaya dan bertenaga**, bukan gelap yang suram. Kedalaman dibangun dari lapisan kaca buram (glassmorphism) yang melayang di atas latar biru malam pekat, dengan cahaya ambient lembut di belakangnya. Bayangkan lobi hotel butik di malam hari: gelap, hangat, mewah, dan setiap permukaan memantulkan cahaya dengan tenang.

### Tiga kata kunci
1. **Pekat** — warna dasar dalam dan solid, kontras tinggi, terasa kuat.
2. **Berkaca** — permukaan translusen, tepi tipis bercahaya, kedalaman berlapis.
3. **Visual-first** — gambar, video, mockup, dan 3D yang bicara. Teks hanya penanda.

### Prinsip
- **Gelap tapi hidup.** Latar bukan hitam mati. Ia biru malam dengan cahaya ambient berwarna di balik kaca sehingga halaman terasa bernapas.
- **Satu momen berani.** Hero menjadi satu-satunya elemen paling dramatis. Sisanya tenang dan disiplin.
- **Gambar sebagai konten utama.** Target rasio: 80% visual, 20% teks.
- **Presisi profesional.** Grid konsisten, jarak berirama, tidak ada elemen yang tampak kebetulan.
- **Kaca dipakai dengan hemat.** Tidak semua hal berbentuk kartu kaca. Kaca untuk elemen yang perlu "melayang": navigasi, panel info, kartu proyek, modal.

---

## 2. Aturan Mutlak

### Wajib
- Latar gelap berwarna (biru malam), bukan hitam netral.
- Kontras teks minimal WCAG AA (4,5:1 untuk teks isi).
- Kaca dengan blur, border 1px terang halus, dan highlight tepi atas.
- Layout rapi, sejajar pada grid, responsif di mobile, tablet, dan desktop.
- Dominan gambar, video loop, mockup perangkat, ilustrasi 3D, dan aset visual berkualitas tinggi.
- Teks singkat: judul maksimal 6 kata, deskripsi maksimal 1 kalimat (sekitar 18 kata).

### Dilarang
- Emoji dan emoticon dalam bentuk apa pun (UI, copy, ikon, placeholder).
- Warna neon (hijau stabilo, magenta, cyan listrik, ungu ultraviolet).
- Gradasi neon atau gradasi pelangi. Gradasi hanya boleh **satu rumpun warna, kontras rendah** (tonal).
- Efek glow keras, outer glow tebal, atau teks bercahaya.
- Paragraf panjang, blok teks lebih dari 3 baris di halaman utama.
- Label kecil huruf kapital berjarak lebar di atas setiap judul.
- Penomoran dekoratif (01, 02, 03) kecuali konten memang berurutan.
- Kartu seragam yang diulang tanpa hirarki (variasikan ukuran dan rasio).
- Animasi masuk generik "fade + naik" pada setiap section.
- Ikon bergaya kartun atau stock icon pasaran.

---

## 3. Sistem Warna

Latar memakai **biru malam berwarna**, ditemani satu aksen hangat (champagne) dan satu aksen dingin (sapphire) yang tenang. Tidak ada warna yang berada di zona neon (saturasi dan kecerahan dibatasi).

### 3.1 Palet inti

| Peran | Nama | Hex | Pemakaian |
|---|---|---|---|
| Latar dasar | Midnight Ink | `#0A1020` | Background utama halaman |
| Latar lapis 2 | Deep Navy | `#0F1830` | Section bergantian, footer |
| Latar lapis 3 | Night Slate | `#16213F` | Area terangkat di bawah kaca |
| Aksen utama | Champagne | `#D9B976` | CTA utama, garis aktif, detail mewah |
| Aksen dingin | Sapphire | `#4C6FD1` | Fokus, link, status interaktif |
| Aksen pendukung | Petrol | `#2C7A85` | Ambient, indikator tersedia, chart sekunder |
| Teks utama | Pearl | `#F3F5FA` | Judul dan teks utama |
| Teks sekunder | Mist | `#A8B2C7` | Deskripsi, meta |
| Teks tersier | Fog | `#76819B` | Placeholder, disabled |
| Garis | Hairline | `rgba(255,255,255,0.10)` | Pembatas halus |

### 3.2 Cahaya ambient (kunci agar tidak suram)

Di belakang kaca ditempatkan 2 sampai 3 bentuk cahaya besar yang sangat blur. Ini yang membuat kaca terlihat "hidup".

| Cahaya | Warna | Opasitas | Ukuran | Posisi contoh |
|---|---|---|---|---|
| Ambient A | Sapphire `#3A58B8` | 0.40 | 60vw | Kiri atas hero |
| Ambient B | Petrol `#1F6670` | 0.30 | 45vw | Kanan tengah |
| Ambient C | Champagne `#B8955A` | 0.18 | 35vw | Kiri bawah |

Aturan: blur 120 sampai 180px, bergerak sangat lambat (40 sampai 60 detik per siklus), tidak pernah berkedip. Jangan menumpuk lebih dari 3 sumber cahaya dalam satu viewport.

### 3.3 Gradasi yang diizinkan (tonal saja)

```css
--grad-base: linear-gradient(180deg, #0A1020 0%, #0F1830 100%);
--grad-gold: linear-gradient(135deg, #D9B976 0%, #B8955A 100%);   /* hanya untuk tombol utama & garis tipis */
--grad-glass: linear-gradient(145deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 100%);
```

Tidak ada gradasi lintas rumpun (misalnya biru ke ungu ke pink).

### 3.4 Warna status

| Status | Hex |
|---|---|
| Sukses / tersedia | `#3FA58A` |
| Peringatan | `#D9A441` |
| Error | `#D9605F` |
| Info | `#4C6FD1` |

---

## 4. Sistem Glassmorphism

### 4.1 Tiga level kaca

| Level | Pemakaian | Fill | Blur | Border |
|---|---|---|---|---|
| Glass 1 (halus) | Kartu besar, section panel | `rgba(255,255,255,0.05)` | 20px | `rgba(255,255,255,0.10)` |
| Glass 2 (standar) | Kartu proyek, nav, panel info | `rgba(255,255,255,0.07)` | 28px | `rgba(255,255,255,0.14)` |
| Glass 3 (kuat) | Modal, command palette, dropdown | `rgba(20,30,58,0.72)` | 40px | `rgba(255,255,255,0.18)` |

### 4.2 Resep CSS kaca

```css
.glass {
  background: var(--glass-fill);
  backdrop-filter: blur(var(--glass-blur)) saturate(140%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(140%);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  box-shadow:
    0 1px 0 0 rgba(255,255,255,0.10) inset,      /* highlight tepi atas */
    0 24px 48px -24px rgba(0,0,0,0.55);          /* bayangan dalam & lembut */
  position: relative;
}

/* kilau tipis di sudut kiri atas */
.glass::before {
  content: "";
  position: absolute; inset: 0;
  border-radius: inherit;
  background: radial-gradient(120% 80% at 0% 0%, rgba(255,255,255,0.08), transparent 55%);
  pointer-events: none;
}

/* Fallback jika backdrop-filter tidak didukung */
@supports not (backdrop-filter: blur(1px)) {
  .glass { background: rgba(22,33,63,0.92); }
}
```

### 4.3 Aturan pemakaian kaca
- Kaca selalu berada **di atas sesuatu yang berwarna** (cahaya ambient atau gambar), jika tidak efeknya hilang.
- Maksimal 3 lapisan kaca bertumpuk dalam satu area.
- Jangan menaruh teks kecil di atas kaca yang berada di atas gambar ramai. Tambahkan scrim gelap `rgba(10,16,32,0.35)` jika perlu.
- Tepi kaca selalu memakai border 1px, tidak pernah tanpa border.
- Performa: batasi elemen ber-blur aktif maksimal 6 per viewport; pada perangkat lemah turunkan blur ke 12px.

---

## 5. Tipografi

Dua keluarga huruf yang jelas berbeda.

| Peran | Font | Bobot | Catatan |
|---|---|---|---|
| Display (judul besar) | **Instrument Serif** | 400 (regular, italic untuk variasi langka) | Kesan editorial mewah, hanya untuk judul besar |
| UI & isi | **Manrope** | 400, 500, 600 | Bersih, modern, mudah dibaca di layar gelap |

Alternatif cadangan: Fraunces (display), DM Sans (UI). Font di-*subset* dan di-*preload*.

### Skala tipografi (fluid)

| Token | Ukuran (mobile → desktop) | Line-height | Tracking | Pemakaian |
|---|---|---|---|---|
| `display-xl` | 44px → 112px | 1.0 | -0.03em | Nama di hero |
| `display-lg` | 36px → 72px | 1.05 | -0.02em | Judul section |
| `heading` | 24px → 36px | 1.15 | -0.01em | Judul kartu, case study |
| `title` | 18px → 22px | 1.3 | 0 | Subjudul |
| `body` | 16px → 17px | 1.65 | 0 | Teks isi |
| `small` | 13px → 14px | 1.5 | 0.01em | Meta, caption |

### Aturan teks
- Panjang baris maksimal 62 karakter.
- Teks isi berwarna Pearl atau Mist, tidak pernah abu terlalu redup (jaga kontras).
- Judul tidak memakai trik "satu kata berwarna beda". Jika perlu penekanan, gunakan ukuran atau bobot secara konsisten.
- Sentence case untuk tombol dan label. Tidak ada label huruf kapital berjarak lebar.
- Angka memakai `font-variant-numeric: tabular-nums` pada statistik.

---

## 6. Layout & Grid

### 6.1 Breakpoint

| Nama | Lebar | Kolom | Margin sisi | Gutter |
|---|---|---|---|---|
| `xs` (mobile kecil) | 320 – 479 | 4 | 20px | 16px |
| `sm` (mobile) | 480 – 767 | 4 | 24px | 16px |
| `md` (tablet) | 768 – 1023 | 8 | 32px | 24px |
| `lg` (laptop) | 1024 – 1439 | 12 | 48px | 24px |
| `xl` (desktop) | 1440 – 1919 | 12 | 64px | 32px |
| `2xl` (layar lebar) | 1920+ | 12 | auto (maks 1560px) | 32px |

### 6.2 Ritme jarak (basis 8px)

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160`

- Jarak antar section: 96px (mobile) → 160px (desktop).
- Jarak dalam kartu: 20px (mobile) → 32px (desktop).
- Semua elemen sejajar pada grid. Tidak ada margin acak.

### 6.3 Radius & elevasi

| Token | Nilai | Pemakaian |
|---|---|---|
| `radius-sm` | 10px | Chip, input |
| `radius-md` | 16px | Tombol, kartu kecil |
| `radius-lg` | 24px | Kartu proyek, panel |
| `radius-xl` | 32px | Hero panel, modal |
| `radius-full` | 999px | Pill, avatar |

Hirarki radius konsisten: elemen di dalam kartu memakai radius satu tingkat lebih kecil dari induknya.

### 6.4 Lebar konten
- Kontainer utama maks 1320px, hero boleh full-bleed.
- Konten teks maks 62 karakter.

---

## 7. Wireframe Halaman

### 7.1 Beranda (desktop)

```
+----------------------------------------------------------------------+
| [Monogram]        Work   Lab   About   Contact      [Cmd K] [Tema]   |   <- nav kaca, melayang
+----------------------------------------------------------------------+
|                                                                      |
|   NAMA ANDA  (display-xl, serif)             [  OBJEK 3D / VISUAL  ] |
|   Full Stack Developer                       [   kaca + cahaya     ] |
|   [ Lihat karya ]  [ Hubungi ]               [   ambient           ] |
|                                                                      |
|   ( status: tersedia )                  [ strip teknologi, ikon ]    |
+----------------------------------------------------------------------+
|  KARYA PILIHAN                                                       |
|  +--------------------------+  +----------------+  +--------------+  |
|  |                          |  |                |  |              |  |
|  |   Proyek 1 (besar,       |  |  Proyek 2      |  |  Proyek 3    |  |
|  |   mockup / video loop)   |  |  (portrait)    |  |  (square)    |  |
|  |                          |  |                |  +--------------+  |
|  |  [judul + 1 baris]       |  |                |  |  Proyek 4    |  |
|  +--------------------------+  +----------------+  +--------------+  |
+----------------------------------------------------------------------+
|  Bento: [Stack visual] [Statistik] [Peta/jam lokal] [Foto profil]    |
+----------------------------------------------------------------------+
|  Testimoni (carousel kaca, 1 kalimat) | Logo klien                   |
+----------------------------------------------------------------------+
|  CTA besar: "Mari bangun sesuatu."     [ Mulai proyek ]              |
+----------------------------------------------------------------------+
| Footer: monogram | sosial | jam lokal WIB                            |
+----------------------------------------------------------------------+
```

### 7.2 Beranda (mobile, satu kolom)

```
+------------------------+
| [Monogram]    [Menu]   |  <- bar kaca
+------------------------+
|                        |
|  [ VISUAL / 3D  ]      |
|                        |
|  NAMA ANDA             |
|  Full Stack Developer  |
|  [ Lihat karya ]       |
|  [ Hubungi ]           |
+------------------------+
|  Karya pilihan         |
|  [ kartu proyek 4:5 ]  |  <- swipe horizontal
|  [ kartu proyek 4:5 ]  |
+------------------------+
|  Bento 2 kolom         |
|  [stat] [stat]         |
|  [stack, lebar penuh]  |
+------------------------+
|  CTA                   |
+------------------------+
| [Home][Work][Lab][Chat]|  <- bottom nav kaca (opsional)
+------------------------+
```

### 7.3 Work (daftar proyek)

```
Filter (pill kaca):  Semua | Web App | API | Mobile | Open Source
Tampilan: [Grid visual] [Daftar]

Masonry 12 kolom, rasio bervariasi:
+---------------+ +--------+ +--------+
|  8 kolom      | | 4 kol  | | 4 kol  |
|  16:10        | | 4:5    | | 1:1    |
+---------------+ +--------+ +--------+
+--------+ +--------+ +---------------+
| 4 kol  | | 4 kol  | |  4 kolom      |
+--------+ +--------+ +---------------+
Tablet: 2 kolom.  Mobile: 1 kolom.
```

### 7.4 Case study

```
[Hero full-bleed: mockup perangkat di atas ambient]
Judul proyek | peran | tahun | stack (ikon)
-----------------------------------------------
[Galeri visual besar bergantian: layar, detail, video]
[Panel kaca: 3 metrik hasil, angka besar]
[Diagram arsitektur interaktif]
[Cuplikan kode (kaca, syntax highlight)]
[Sebelum / sesudah (slider)]
[Proyek berikutnya: panel besar dengan gambar]
```

### 7.5 About

```
Kiri: foto profil besar dalam bingkai kaca (rasio 4:5)
Kanan: 2 kalimat pengantar maksimal
Bawah: timeline horizontal (kartu kaca kecil, logo perusahaan)
Skill constellation (graf interaktif) lebar penuh
```

### 7.6 Contact

```
Kiri: 1 kalimat ajakan + tautan sosial (ikon)
Kanan: panel kaca besar berisi form singkat (nama, email, pesan)
Bawah: wizard estimator + jadwal call
```

---

## 8. Komponen

### 8.1 Navigasi
- **Desktop:** bar kaca (Glass 2) melayang 20px dari atas, lebar maks 960px, radius full, di tengah. Menyusut sedikit dan menebal blur saat scroll.
- **Tablet:** sama dengan desktop, menu diringkas.
- **Mobile:** bar atas kaca dengan monogram dan tombol menu. Menu terbuka sebagai panel kaca layar penuh (Glass 3). Opsional bottom nav kaca 4 ikon.
- Item aktif ditandai garis tipis Champagne di bawah teks, bukan blok warna.

### 8.2 Tombol

| Varian | Tampilan | Pemakaian |
|---|---|---|
| Primary | Isi Champagne tonal (`--grad-gold`), teks Midnight Ink, radius-md | Satu per layar: aksi utama |
| Secondary | Kaca (Glass 2), teks Pearl, border halus | Aksi pendukung |
| Ghost | Tanpa isi, garis bawah tipis | Tautan teks |
| Icon | Lingkaran kaca 44px | Tema, bahasa, sosial |

- Tinggi minimum 48px (target sentuh 44px+).
- Hover: kecerahan naik 6%, tepi menebal; tombol utama boleh efek *magnetic* ringan (maks 6px).
- Fokus: ring 2px Sapphire dengan offset 3px.
- Tidak ada panah dekoratif di akhir teks tombol.

### 8.3 Kartu proyek (komponen utama)
- Media memenuhi kartu (gambar atau video loop senyap).
- Panel info kaca kecil di bagian bawah kartu: judul (heading) dan satu baris deskripsi, plus ikon teknologi.
- Hover desktop: media zoom 1.04 lembut, panel kaca naik 6px, kursor berubah menjadi lingkaran bertuliskan "Lihat".
- Variasi rasio: 16:10, 4:5, 1:1, 3:4 agar ritme visual tidak monoton.

### 8.4 Bento grid (beranda & about)
Kartu berukuran berbeda yang membentuk mozaik rapi. Isi lebih banyak visual:
- Stack teknologi sebagai ikon dalam grid kaca.
- Statistik: angka besar + label 2 kata.
- Peta kecil atau jam lokal WIB.
- Foto profil.
- Status ketersediaan (titik Petrol/hijau tenang berdenyut halus).
- Aktivitas GitHub dalam heatmap bernada biru tonal.

### 8.5 Chip & tag
Pill kecil kaca, teks `small`, tinggi 32px. Teknologi memakai ikon logo monokrom Mist; saat hover berubah ke warna asli yang diredam.

### 8.6 Input & form
- Field kaca (Glass 1), radius-sm, tinggi 52px, label mengambang (floating label).
- Fokus: border Sapphire, bayangan dalam lembut.
- Error: teks Error 13px di bawah field, jelas dan spesifik. Tanpa ikon emoji.
- Maksimal 3 field di form kontak.

### 8.7 Command palette (Cmd/Ctrl + K)
Modal Glass 3 di tengah, lebar 640px (mobile: penuh dengan margin 16px). Daftar hasil dengan ikon garis tipis, sorotan Sapphire pada item aktif.

### 8.8 Kursor kustom (desktop)
Titik kecil Pearl 8px + cincin kaca 36px yang mengikuti dengan jeda halus. Berubah menjadi "Lihat" di atas kartu, "Seret" di carousel. Dinonaktifkan di layar sentuh dan saat `prefers-reduced-motion`.

### 8.9 Modal & overlay
Glass 3, radius-xl, latar di belakang diburamkan dan digelapkan `rgba(5,8,18,0.6)`. Tutup dengan Esc, klik luar, atau tombol ikon.

### 8.10 Footer
Latar Deep Navy, panel kaca tipis berisi monogram, 4 ikon sosial, jam lokal. Tanpa banyak tautan.

---

## 9. Panduan Aset Visual

Karena situs ini visual-first, kualitas aset menentukan kesan profesional.

### 9.1 Jenis aset dan spesifikasi

| Aset | Spesifikasi | Catatan |
|---|---|---|
| Mockup perangkat | Laptop, tablet, ponsel dengan layar proyek asli, bayangan lembut, latar transparan | Konsisten sudut dan pencahayaan di semua proyek |
| Video loop proyek | 6 sampai 10 detik, tanpa suara, MP4/WebM, maks 1,5 MB, poster AVIF | Rekam alur kunci aplikasi |
| Hero 3D | Objek abstrak berbahan kaca/logam (WebGL), palet Sapphire dan Champagne | Ada fallback gambar statis AVIF |
| Foto profil | Potret profesional, pencahayaan hangat dari samping, latar biru malam | Rasio 4:5, di-*color grade* senada |
| Ikon teknologi | Set SVG monokrom seragam, stroke 1.5px | Bukan campuran gaya |
| Ikon UI | Set garis tipis konsisten (misal Lucide, stroke 1.5) | Tanpa emoji |
| Diagram | SVG kustom, garis tipis Hairline, node kaca | Interaktif di case study |
| Tekstur | Film grain 3% opasitas, satu lapisan global | Memberi kesan mahal, bukan kotor |
| Gambar OG | Dibuat dinamis, memakai latar Midnight Ink dan kaca | Konsisten dengan situs |

### 9.2 Perlakuan gambar
- Semua gambar diberi *color grade* ringan agar selaras dengan palet (bayangan condong biru, highlight hangat).
- Sudut membulat sesuai hirarki radius.
- Overlay gelap `linear-gradient(180deg, transparent 55%, rgba(10,16,32,0.65))` tonal di bagian bawah bila ada teks di atas gambar.
- Format AVIF/WebP, `srcset` responsif, placeholder blur (LQIP) berwarna Night Slate.
- Rasio konsisten per tipe kartu, tidak ada gambar tertarik atau terpotong sembarangan.

### 9.3 Komposisi
- Satu fokus per gambar. Hindari tangkapan layar ramai tanpa mockup.
- Ruang napas minimal 24px di sekitar objek.
- Maksimal 2 tipe visual berbeda dalam satu baris (misalnya mockup + video).

---

## 10. Motion & Interaksi

**Prinsip:** gerak menjawab tindakan pengguna atau memandu perhatian. Satu momen orkestrasi saat halaman dibuka, sisanya tenang.

### 10.1 Token motion

| Token | Nilai |
|---|---|
| `ease-premium` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `dur-fast` | 180ms |
| `dur-base` | 320ms |
| `dur-slow` | 600ms |
| `dur-page` | 700ms |

### 10.2 Momen utama (satu orkestrasi)
**Pembukaan hero:** latar ambient menyala perlahan, kaca hero muncul dengan fokus (blur 16px → 0) selama 900ms, nama muncul per baris dengan masking, objek 3D berputar masuk. Setelah itu tenang.

### 10.3 Interaksi yang diizinkan
- Hover kartu: zoom media 1.04, panel naik 6px (320ms).
- Tombol magnetic ringan (maks 6px).
- Efek *spotlight* lembut mengikuti kursor pada kartu kaca (radial putih 6% opasitas).
- Transisi halaman: shared-element dari kartu proyek ke hero case study (View Transitions API), 700ms.
- Scroll horizontal tersematkan untuk karya pilihan (desktop), swipe native (mobile).
- Paralaks sangat ringan pada ambient dan media (maks 24px).
- Penghitung angka saat statistik pertama kali terlihat.

### 10.4 Dilarang
- Fade-up pada setiap blok teks.
- Efek berkedip, getar, atau berputar tanpa henti.
- Parallax agresif yang menyebabkan mual.
- Animasi yang menghambat klik atau pembacaan.

### 10.5 Aksesibilitas gerak
Dengan `prefers-reduced-motion: reduce`: matikan paralaks, kursor kustom, magnetic, dan putaran 3D. Ganti transisi dengan fade 150ms.

---

## 11. Fitur Interaktif (Spesifikasi Visual)

| Fitur | Tampilan | Interaksi |
|---|---|---|
| Hero 3D | Objek kaca/logam abstrak di atas ambient, warna Sapphire dan Champagne | Bereaksi lembut terhadap kursor dan giroskop |
| Command palette | Modal Glass 3, ikon garis tipis | Pintasan Cmd/Ctrl+K, navigasi keyboard penuh |
| Skill constellation | Node kaca bulat dihubungkan garis Hairline, warna tonal | Hover menyorot koneksi, klik membuka proyek terkait |
| Diagram arsitektur | Node kartu kaca, alur data garis bergerak halus | Klik node membuka panel penjelasan |
| Slider sebelum/sesudah | Dua gambar dengan pegangan kaca | Seret untuk membandingkan |
| Estimator | Wizard 4 langkah di panel kaca, pilihan berupa kartu visual (bukan dropdown) | Pilih kartu, rentang estimasi muncul |
| AI "Tanya saya" | Panel chat kaca di pojok kanan bawah, avatar monogram | Jawaban singkat dengan tautan ke proyek |
| Guestbook | Dinding kartu kaca kecil berisi tanda tangan coretan | Gambar tanda tangan di kanvas |
| Live stats | Heatmap GitHub biru tonal, jam lokal, status tersedia | Data langsung dengan fallback |
| Terminal mode | Panel kaca gelap bergaya terminal (hanya di Lab/easter egg) | Ketik perintah |
| Pengatur tema | Tombol ikon kaca | Tema gelap default; tema terang opsional bernuansa gading dan biru |

---

## 12. Aturan Teks (Anggaran Kata)

Situs harus terasa sedikit tulisan dan banyak gambar.

| Elemen | Batas |
|---|---|
| Judul hero | Nama + 1 peran (maks 4 kata) |
| Subjudul hero | Maks 12 kata |
| Judul kartu proyek | Maks 5 kata |
| Deskripsi kartu | 1 kalimat, maks 18 kata |
| Judul section | Maks 4 kata |
| Paragraf about | Maks 2 kalimat |
| Testimoni | 1 kalimat, maks 25 kata |
| Tombol | 1 sampai 3 kata |
| Satu layar mobile | Maks 40 kata total di luar navigasi |

Nada: tenang, percaya diri, langsung. Kalimat aktif, kalimat biasa (sentence case). Detail panjang dipindahkan ke halaman case study dan dibuka hanya jika pengunjung memilih.

Contoh gaya teks:
- Judul: "Karya pilihan"
- Tombol: "Lihat karya", "Hubungi saya", "Mulai proyek"
- Error form: "Email belum valid. Periksa penulisannya."

---

## 13. Responsivitas

| Elemen | Mobile | Tablet | Desktop |
|---|---|---|---|
| Nav | Bar atas + panel menu kaca, opsional bottom nav | Bar kaca ringkas | Bar kaca melayang di tengah |
| Hero | Visual di atas, teks di bawah, tombol tumpuk | Dua kolom 5/7 | Dua kolom 6/6, visual besar |
| Karya pilihan | Carousel swipe, kartu 4:5 | Grid 2 kolom | Grid bento 12 kolom atau scroll pinned |
| Bento | 2 kolom | 4 kolom | 6 sampai 12 kolom |
| Work list | 1 kolom | 2 kolom | Masonry 3 kolom |
| Form | Lebar penuh | Panel 80% | Panel 6 kolom |
| Tipografi | Skala bawah fluid | Skala tengah | Skala atas |
| Kursor kustom | Mati | Mati | Aktif |
| Blur kaca | 14 sampai 18px | 20 sampai 24px | 24 sampai 40px |
| Hero 3D | Kualitas rendah, atau gambar statis | Sedang | Penuh |

Aturan umum:
- Mobile-first, diuji dari 320px sampai 2560px.
- Target sentuh minimal 44 x 44px.
- Tidak ada scroll horizontal pada body.
- Orientasi lanskap di ponsel tidak merusak layout.
- Gunakan `100dvh` (bukan `100vh`) dan hormati `safe-area-inset`.
- Gambar selalu punya dimensi untuk mencegah CLS.

---

## 14. Aksesibilitas & Performa Visual

- Kontras: teks isi minimal 4,5:1, teks besar minimal 3:1, diuji di atas kaca dan gambar.
- Fokus keyboard selalu terlihat (ring Sapphire 2px).
- Informasi tidak hanya mengandalkan warna.
- `prefers-reduced-motion` dan `prefers-reduced-transparency` dihormati (kaca diganti permukaan solid Night Slate).
- Alt text pada semua gambar bermakna; gambar dekoratif `alt=""`.
- Budget performa visual: LCP < 2,0s, aset hero < 250 KB (gambar) dan model 3D < 600 KB, video loop < 1,5 MB.
- Video dimuat malas dan hanya diputar saat terlihat; pause otomatis di luar layar.
- Matikan efek berat otomatis pada perangkat dengan mode hemat daya.

---

## 15. Design Tokens (CSS)

```css
:root {
  /* Warna */
  --bg-0: #0A1020;
  --bg-1: #0F1830;
  --bg-2: #16213F;
  --champagne: #D9B976;
  --champagne-deep: #B8955A;
  --sapphire: #4C6FD1;
  --petrol: #2C7A85;
  --text-1: #F3F5FA;
  --text-2: #A8B2C7;
  --text-3: #76819B;
  --hairline: rgba(255,255,255,0.10);

  /* Status */
  --success: #3FA58A;
  --warning: #D9A441;
  --error: #D9605F;

  /* Kaca */
  --glass-fill-1: rgba(255,255,255,0.05);
  --glass-fill-2: rgba(255,255,255,0.07);
  --glass-fill-3: rgba(20,30,58,0.72);
  --glass-border: rgba(255,255,255,0.14);
  --glass-blur: 28px;

  /* Radius */
  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;

  /* Tipografi */
  --font-display: "Instrument Serif", "Times New Roman", serif;
  --font-ui: "Manrope", system-ui, -apple-system, "Segoe UI", sans-serif;

  --fs-display-xl: clamp(2.75rem, 1.2rem + 7vw, 7rem);
  --fs-display-lg: clamp(2.25rem, 1.2rem + 4vw, 4.5rem);
  --fs-heading: clamp(1.5rem, 1.1rem + 1.5vw, 2.25rem);
  --fs-title: clamp(1.125rem, 1rem + 0.5vw, 1.375rem);
  --fs-body: clamp(1rem, 0.95rem + 0.2vw, 1.0625rem);
  --fs-small: clamp(0.8125rem, 0.78rem + 0.15vw, 0.875rem);

  /* Jarak */
  --space-1: 4px;  --space-2: 8px;   --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px;  --space-7: 48px; --space-8: 64px;
  --space-9: 96px; --space-10: 128px; --space-11: 160px;

  /* Motion */
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --dur-fast: 180ms;
  --dur-base: 320ms;
  --dur-slow: 600ms;
  --dur-page: 700ms;

  /* Layout */
  --container: 1320px;
}

@media (prefers-reduced-transparency: reduce) {
  .glass { background: var(--bg-2); backdrop-filter: none; }
}

@media (prefers-reduced-motion: reduce) {
  * { animation-duration: 0.01ms !important; transition-duration: 150ms !important; }
}
```

---

## 16. Latar Halaman (Resep)

```css
body {
  background: var(--bg-0);
  color: var(--text-1);
  font-family: var(--font-ui);
}

.ambient {
  position: fixed; inset: 0; z-index: -1; overflow: hidden; pointer-events: none;
}
.ambient i {
  position: absolute; border-radius: 50%; filter: blur(150px);
}
.ambient .a { width: 60vw; height: 60vw; left: -15vw; top: -20vw; background: #3A58B8; opacity: .40; }
.ambient .b { width: 45vw; height: 45vw; right: -10vw; top: 25vh;  background: #1F6670; opacity: .30; }
.ambient .c { width: 35vw; height: 35vw; left: 5vw;   bottom: -10vw; background: #B8955A; opacity: .18; }

/* film grain tipis, satu lapisan global */
body::after {
  content: ""; position: fixed; inset: 0; z-index: 50; pointer-events: none;
  background-image: url("/assets/grain.png"); opacity: .03; mix-blend-mode: overlay;
}
```

---

## 17. Struktur Folder Aset

```
/assets
  /brand        monogram.svg, favicon, og-template
  /hero         hero-3d.glb, hero-fallback.avif
  /projects
    /{slug}     cover.avif, mockup-laptop.avif, mockup-phone.avif,
                loop.mp4, loop.webm, poster.avif, gallery-01..n.avif
  /icons
    /tech       react.svg, nextjs.svg, node.svg ... (monokrom, seragam)
    /ui         garis tipis, stroke 1.5
  /textures     grain.png
  /people       portrait-4x5.avif
```

Penamaan: huruf kecil, tanda hubung, tanpa spasi.

---

## 18. Checklist Kualitas Desain

Sebelum rilis, semua poin harus terpenuhi.

**Identitas**
- [ ] Latar biru malam berwarna, terasa pekat tapi hidup, bukan hitam suram.
- [ ] Tidak ada warna atau gradasi neon.
- [ ] Tidak ada emoji di UI, copy, atau aset.
- [ ] Champagne dipakai hemat (CTA utama dan detail).

**Kaca**
- [ ] Setiap kaca memiliki blur, border 1px, dan highlight tepi atas.
- [ ] Kaca selalu berada di atas ambient atau gambar.
- [ ] Fallback tanpa `backdrop-filter` berfungsi.

**Layout**
- [ ] Semua elemen sejajar grid, jarak mengikuti skala 8px.
- [ ] Tidak ada scroll horizontal tak sengaja di semua breakpoint.
- [ ] Hirarki radius konsisten.

**Konten**
- [ ] Rasio visual lebih dominan dari teks.
- [ ] Batas kata dipatuhi di setiap elemen.
- [ ] Setiap proyek punya mockup atau video yang seragam gayanya.

**Interaksi**
- [ ] Ada satu momen orkestrasi saat halaman dibuka, tidak ada animasi berlebihan lain.
- [ ] Semua fitur interaktif bisa dipakai dengan keyboard.
- [ ] Reduced motion dan reduced transparency berfungsi.

**Performa & akses**
- [ ] Lighthouse Performance dan Accessibility di atas 95.
- [ ] Kontras teks lulus AA di atas kaca.
- [ ] Hero, video, dan model 3D sesuai anggaran ukuran.

---

## 19. Referensi Arah Moodboard

Kumpulkan 12 sampai 15 referensi, kelompokkan ke empat kategori:
1. **Kaca berkelas** — antarmuka dengan kaca translusen halus di atas latar berwarna dalam.
2. **Fotografi produk gelap** — pencahayaan hangat pada permukaan logam dan kaca, bayangan biru.
3. **Mockup perangkat premium** — komposisi bersih, satu sudut pencahayaan konsisten.
4. **Tata letak bento rapi** — mozaik kartu dengan ritme ukuran seimbang.

Gunakan referensi untuk menurunkan keputusan ke token di atas, bukan untuk menyalin tampilan.

---

*Perbarui dokumen ini setiap kali ada perubahan token atau komponen, dan catat alasan perubahan sebagai catatan keputusan desain.*
