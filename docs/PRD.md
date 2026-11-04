# PRD — Web Portofolio Full Stack Developer

**Versi:** 1.1 (Draft)  
**Tanggal:** 4 November 2026  
**Pemilik Produk:** [Nama Anda]  
**Status:** Siap untuk review  
**Dokumen pendamping:** `design.md` (sumber kebenaran visual dan interaksi)

---

## 1. Ringkasan Eksekutif

Web portofolio ini bukan sekadar halaman "tentang saya + daftar proyek". Ia dirancang sebagai **produk digital jangka panjang** yang berfungsi sebagai etalase karya, bukti kemampuan teknis, dan aset personal branding yang terus tumbuh selama bertahun-tahun.

**Konsep kreatif: "Midnight Glass".**  
Tampilan gelap yang pekat dan hidup (bukan suram), bertema glassmorphism, bersih dan minimalis, dengan dominasi visual (gambar, video loop, mockup, 3D) dan teks yang sangat sedikit. Di balik tampilan yang tenang, tersimpan kedalaman rekayasa: animasi halus, interaksi cerdas, dan detail yang hanya disadari oleh mata yang jeli. Pengunjung merasa "ini dibuat oleh seseorang yang sangat peduli pada kualitas".

**Pembeda utama dari portofolio pasaran:**

- Portofolio itu sendiri adalah *case study* terbaik: arsitektur, performa, dan kode yang rapi menjadi bukti kompetensi full stack.
- Fitur interaktif bermakna (bukan dekorasi): AI assistant, command palette, playground, estimator proyek.
- Konten dikelola lewat CMS sendiri, sehingga mudah diperbarui tanpa deploy ulang.
- Dirancang untuk dipelihara jangka panjang: modular, terdokumentasi, dan mudah dikembangkan.

---

## 2. Latar Belakang & Masalah

| Masalah umum portofolio developer | Solusi di produk ini |
|---|---|
| Tampilan template, mudah dilupakan | Identitas visual unik dengan design system sendiri |
| Hanya daftar proyek tanpa cerita | Case study visual: masalah, keputusan teknis, hasil terukur |
| Pengunjung pasif | Interaksi: AI chat, playground, estimator, guestbook |
| Cepat usang karena sulit di-update | CMS + konten terstruktur, update dalam menit |
| Lambat dan berat karena animasi berlebihan | Budget performa ketat (Core Web Vitals hijau) |
| Terlalu banyak teks | Anggaran kata ketat, visual-first |
| Tidak ada alasan untuk kembali berkunjung | Blog/catatan, Lab, dan statistik live yang selalu berubah |

---

## 3. Tujuan & Sasaran

### 3.1 Tujuan Bisnis/Personal

1. Mendapat peluang kerja (full-time, kontrak, freelance) berkualitas tinggi.
2. Membangun otoritas dan reputasi sebagai full stack developer.
3. Menjadi hub identitas online jangka panjang (satu tempat untuk semua link, karya, tulisan).
4. Menjadi bukti nyata kemampuan end-to-end: desain, frontend, backend, DevOps.

### 3.2 Sasaran Terukur (KPI, 6 bulan pertama setelah rilis)

| KPI | Target |
|---|---|
| Lighthouse (Performance / A11y / SEO / Best Practices) | ≥ 95 / ≥ 95 / 100 / ≥ 95 |
| LCP | < 2,0 detik |
| CLS | < 0,05 |
| Rata-rata waktu di situs | > 2 menit 30 detik |
| Tingkat interaksi dengan fitur interaktif | > 35% pengunjung |
| Konversi kontak (form/CTA/booking) | > 3% |
| Pengunjung kembali | > 20% |
| Frekuensi update konten | Minimal 1 entri baru per bulan |

---

## 4. Target Pengguna (Persona)

**Persona 1 — Rekruter / HR Teknologi ("Rina")**  
Memindai puluhan portofolio per hari. Butuh: ringkasan cepat, proyek unggulan, tombol unduh CV, kontak jelas dalam waktu < 30 detik.

**Persona 2 — Engineering Manager / CTO ("Arif")**  
Mencari kedalaman teknis. Butuh: arsitektur, tech stack, keputusan teknis, kualitas kode, link GitHub, hasil terukur.

**Persona 3 — Klien Freelance / Startup Founder ("Dewi")**  
Tidak teknis. Butuh: bukti hasil bisnis, proses kerja, estimasi biaya/waktu, cara memulai proyek.

**Persona 4 — Sesama Developer / Komunitas ("Bayu")**  
Tertarik pada tulisan, eksperimen, dan kode. Butuh: blog teknis, Lab, snippet, open source.

Setiap persona mendapat **jalur cepat** di hero: *Lihat karya*, *Hubungi saya*, *Baca tulisan*, *Unduh CV*.

---

## 5. Konsep & Prinsip Desain

Detail lengkap ada di `design.md`. Ringkasannya:

### 5.1 Prinsip

1. **Pekat tapi hidup** — latar biru malam berwarna dengan cahaya ambient lembut, bukan hitam suram.
2. **Berkaca (glassmorphism)** — permukaan translusen, blur, border tipis, kedalaman berlapis.
3. **Visual-first** — gambar, video loop, mockup, dan 3D lebih dominan dari teks.
4. **Clean dan rapi** — grid konsisten, jarak berirama, responsif di mobile, tablet, dan desktop.
5. **Motion with meaning** — animasi hanya untuk memandu perhatian atau memberi umpan balik.
6. **Performance is part of design** — situs mewah harus terasa instan.
7. **Accessible by default** — elegan untuk semua orang.

### 5.2 Batasan Desain (wajib dipatuhi)

- Tidak memakai emoji atau emoticon.
- Tidak memakai warna atau gradasi neon (gradasi hanya tonal, satu rumpun warna).
- Teks minimal: judul maksimal 6 kata, deskripsi maksimal 1 kalimat.
- Tampilan profesional, bersih, dan elegan.

### 5.3 Palet Ringkas

| Peran | Hex |
|---|---|
| Latar dasar (Midnight Ink) | `#0A1020` |
| Latar lapis 2 (Deep Navy) | `#0F1830` |
| Latar lapis 3 (Night Slate) | `#16213F` |
| Aksen utama (Champagne) | `#D9B976` |
| Aksen dingin (Sapphire) | `#4C6FD1` |
| Aksen pendukung (Petrol) | `#2C7A85` |
| Teks utama (Pearl) | `#F3F5FA` |
| Teks sekunder (Mist) | `#A8B2C7` |

### 5.4 Tipografi

- Display: Instrument Serif (untuk judul besar).
- UI dan isi: Manrope.

### 5.5 Detail yang Membedakan

- Cahaya ambient berwarna di balik kaca.
- Film grain sangat halus (3% opasitas).
- Kursor kustom yang berubah konteks (desktop saja).
- Efek spotlight lembut pada kartu kaca.
- Tombol utama dengan efek magnetic ringan.
- Satu momen orkestrasi animasi saat halaman dibuka, tanpa animasi berlebihan lain.

---

## 6. Struktur Informasi (Sitemap)

```
/                  Beranda (visual storytelling)
/work              Daftar proyek (filter + tampilan grid/list)
/work/[slug]       Case study detail
/lab               Eksperimen & playground interaktif
/writing           Blog / catatan teknis
/writing/[slug]    Artikel
/about             Tentang saya, timeline, skill
/uses              Tools, setup, stack yang saya pakai
/guestbook         Buku tamu interaktif
/contact           Kontak + estimator + booking
/resume            Resume web + unduh PDF
/now               Apa yang sedang saya kerjakan/pelajari
/admin             Dashboard CMS (privat)
/404               Halaman error yang rapi dan informatif
```

Navigasi: bar kaca melayang (monogram, menu, tombol tema, tombol bahasa, tombol `Cmd/Ctrl+K`). Di mobile: bar atas dengan panel menu kaca, opsional bottom nav. Footer berisi jam lokal (WIB), status ketersediaan, dan link sosial.

---

## 7. Fitur Utama per Bagian

### 7.1 Beranda

1. **Hero sinematik**  
   Nama + peran dengan tipografi besar. Visual berupa objek 3D abstrak berbahan kaca/logam (WebGL/Three.js) yang bereaksi halus terhadap kursor/giroskop. Fallback gambar statis untuk perangkat lemah.
2. **Jalur cepat persona**  
   Tombol: *Lihat karya*, *Hubungi saya*, *Baca tulisan*, *Unduh CV*.
3. **Status ketersediaan live**  
   Lencana kecil "Tersedia untuk proyek" yang dikelola dari CMS, dengan titik berdenyut halus.
4. **Karya pilihan (Selected Work)**  
   3 sampai 4 proyek dalam grid bento atau scroll horizontal tersematkan. Pratinjau video loop saat hover.
5. **Bento grid**  
   Mozaik kartu kaca: stack teknologi (ikon), statistik, jam lokal/peta, foto profil, heatmap GitHub.
6. **Angka yang berbicara**  
   Metrik hasil dengan animasi hitung saat terlihat.
7. **Testimoni**  
   Carousel kaca tipis, satu kalimat per testimoni.
8. **CTA penutup**  
   Ajakan singkat dengan tombol utama.

### 7.2 Work & Case Study

Setiap case study mengikuti template visual:

- **Ringkasan**: peran, durasi, tim, stack, hasil utama.
- **Masalah & konteks** (singkat).
- **Proses & keputusan teknis**: trade-off dan alasan.
- **Arsitektur**: diagram interaktif (klik node untuk penjelasan).
- **Cuplikan kode** terpilih dengan syntax highlighting dan tombol salin.
- **Hasil terukur** sebelum vs sesudah (slider perbandingan).
- **Galeri**: mockup perangkat, video loop, detail layar.
- **Pelajaran** dan *next steps*.
- **Navigasi proyek berikutnya** dengan transisi shared-element.

Filter proyek: kategori (Web App, API, Mobile, DevOps, Open Source), teknologi, tahun. Tampilan dapat dialihkan antara *grid visual* dan *daftar*.

### 7.3 Lab (Playground Interaktif)

- **Live Code Playground**: editor mini (Monaco/CodeMirror) dengan demo komponen yang dapat diubah pengunjung.
- **Visualisator algoritma / struktur data** interaktif.
- **Demo real-time** (WebSocket): kursor kolaboratif atau papan gambar bersama.
- **API Explorer**: pengunjung mencoba endpoint buatan Anda dari browser.
- **Eksperimen shader/WebGL** dan generative art.
- **Mini tools** yang berguna sebagai magnet traffic organik.

Setiap eksperimen punya halaman sendiri dengan tautan ke source code.

### 7.4 Writing (Blog Teknis)

- Editor MDX dengan komponen interaktif tertanam (grafik, demo, diagram).
- Estimasi waktu baca, daftar isi lengket, progress bar baca, mode fokus.
- Salin kode, heading anchor, dan share.
- RSS feed, tag, pencarian, artikel terkait.
- Reaksi pembaca (ikon, bukan emoji) dan komentar ringan.
- Newsletter opsional.

### 7.5 About & Timeline

- Pengantar personal maksimal 2 kalimat dan foto profesional dalam bingkai kaca.
- **Timeline karier interaktif** dengan logo perusahaan dan teknologi.
- **Skill constellation**: visualisasi keahlian sebagai graf jaringan; klik skill untuk melihat proyek terkait.
- Bagian opsional: integrasi "Now Playing" (Spotify).

### 7.6 Contact (Konversi)

- Formulir kontak singkat (maksimal 3 field) dengan validasi, perlindungan spam (Turnstile/honeypot), dan notifikasi ke email/Telegram.
- **Project Estimator**: wizard 4 sampai 5 langkah berbasis kartu visual (jenis proyek, fitur, timeline, anggaran) yang menghasilkan rentang estimasi dan brief otomatis.
- **Booking call**: integrasi kalender (Cal.com) dengan zona waktu otomatis.
- Tautan sosial: GitHub, LinkedIn, X, email.

---

## 8. Fitur Interaktif Signature

| # | Fitur | Deskripsi | Nilai | Prioritas |
|---|---|---|---|---|
| 1 | **Command Palette (Cmd/Ctrl+K)** | Navigasi cepat: cari halaman, proyek, artikel, ganti tema, salin email. | Terasa seperti produk profesional | P0 |
| 2 | **"Tanya Saya" AI Assistant** | Chatbot berbasis RAG yang menjawab tentang pengalaman, skill, proyek, ketersediaan berdasarkan konten portofolio. | Jawaban instan 24/7; bukti kemampuan AI engineering | P1 |
| 3 | **Project Estimator** | Wizard estimasi biaya/waktu yang menghasilkan brief siap kirim. | Mengubah pengunjung menjadi lead berkualitas | P1 |
| 4 | **Interactive Architecture Diagram** | Diagram sistem yang bisa diklik dan dianimasikan alur datanya. | Menunjukkan kedalaman backend/DevOps | P1 |
| 5 | **Hero 3D Responsif** | Objek 3D bereaksi terhadap kursor, scroll, dan tema. | Kesan pertama kuat | P1 |
| 6 | **Transisi Halaman Sinematik** | View Transitions API / Framer Motion (shared element dari kartu ke halaman detail). | Terasa seperti aplikasi premium | P1 |
| 7 | **Pengaturan Tampilan** | Pengunjung memilih tema, mengurangi gerak/transparansi; preferensi tersimpan. | Aksesibilitas dan kenyamanan | P1 |
| 8 | **Dwibahasa (ID/EN)** | Toggle bahasa dengan transisi halus, SEO per bahasa. | Jangkauan lokal dan global | P1 |
| 9 | **Live Playground** | Editor kode + preview real-time di Lab. | Pengunjung "merasakan" kemampuan Anda | P2 |
| 10 | **Guestbook** | Login (GitHub/Google), pesan + tanda tangan digital (coretan canvas) di dinding bersama. | Keterlibatan dan bukti sosial | P2 |
| 11 | **Live Stats Dashboard** | Kontribusi GitHub, commit terakhir, bahasa dominan, jam lokal, status. | Situs terasa hidup | P2 |
| 12 | **Resume Builder Dinamis** | Pilih versi CV (Frontend/Backend/Full Stack/DevOps) dan unduh PDF dari data CMS. | Selalu sinkron dan relevan | P2 |
| 13 | **Terminal Mode (Easter egg)** | Ketik `~` untuk membuka terminal: `whoami`, `projects`, `hire-me`. | Disukai developer, mudah dibagikan | P3 |
| 14 | **Sapaan Personal** | Sapaan menyesuaikan waktu dan sumber kunjungan. | Sentuhan personal | P3 |

---

## 9. Persyaratan Fungsional

| ID | Persyaratan | Prioritas |
|---|---|---|
| FR-01 | Situs menampilkan beranda, work, case study, lab, writing, about, contact, resume, now, uses, guestbook | P0 |
| FR-02 | Konten (proyek, artikel, timeline, skill, testimoni, status ketersediaan) dikelola lewat CMS/admin tanpa deploy ulang | P0 |
| FR-03 | Toggle tema, gelap sebagai default, mengikuti preferensi sistem jika dipilih | P0 |
| FR-04 | Command palette dapat diakses lewat pintasan keyboard dan tombol di header | P0 |
| FR-05 | Formulir kontak dengan validasi, anti-spam, dan notifikasi ke Anda | P0 |
| FR-06 | Pencarian global atas proyek dan artikel | P1 |
| FR-07 | Filter dan pengurutan proyek | P1 |
| FR-08 | Toggle bahasa ID/EN dengan rute terlokalisasi | P1 |
| FR-09 | AI assistant dengan batas laju (rate limit), moderasi, dan sumber jawaban yang ditampilkan | P1 |
| FR-10 | Project Estimator dengan hasil yang dapat dikirim sebagai brief | P1 |
| FR-11 | Guestbook dengan autentikasi OAuth, moderasi, dan perlindungan spam | P2 |
| FR-12 | Blog MDX dengan RSS, tag, estimasi waktu baca, artikel terkait | P1 |
| FR-13 | Generator resume PDF dari data terstruktur | P2 |
| FR-14 | Integrasi live (GitHub API, Spotify, WakaTime) dengan cache dan fallback | P2 |
| FR-15 | Analitik privasi-first (tanpa cookie intrusif) dengan dashboard internal | P1 |
| FR-16 | Open Graph image dinamis untuk setiap proyek/artikel | P1 |
| FR-17 | Halaman 404 dan error yang rapi dan informatif | P2 |
| FR-18 | Dashboard admin dengan autentikasi aman, pratinjau draft, dan penjadwalan publikasi | P1 |
| FR-19 | Seluruh halaman responsif: mobile (320px), tablet, desktop, layar lebar | P0 |
| FR-20 | Pengaturan `prefers-reduced-motion` dan `prefers-reduced-transparency` dihormati | P0 |

---

## 10. Persyaratan Non-Fungsional

**Performa**

- Core Web Vitals hijau: LCP < 2,0s, INP < 200ms, CLS < 0,05.
- Budget JavaScript awal < 170 KB (gzip) untuk rute beranda; fitur berat (3D, editor) dimuat malas.
- Gambar modern (AVIF/WebP), responsif, placeholder blur.
- Aset hero < 250 KB, model 3D < 600 KB, video loop < 1,5 MB.
- Font di-*subset* dan di-*preload*; `font-display: swap`.
- Rendering hibrida: statis (SSG/ISR) untuk konten, edge untuk personalisasi.
- Deteksi perangkat lemah/hemat daya: turunkan kualitas 3D dan blur secara otomatis.

**Aksesibilitas (WCAG 2.2 AA)**

- Kontras teks memadai, termasuk di atas kaca dan gambar.
- Navigasi penuh dengan keyboard, fokus terlihat jelas.
- Animasi menghormati `prefers-reduced-motion`; kaca menjadi solid saat `prefers-reduced-transparency`.
- Semantik HTML benar, alt text, label ARIA seperlunya.

**SEO & Discoverability**

- Metadata dinamis, sitemap XML, robots, data terstruktur (Person, Article, CreativeWork).
- URL bersih, kanonikal, hreflang untuk ID/EN.
- OG image dinamis per halaman.

**Keamanan**

- Header keamanan (CSP, HSTS, X-Frame-Options), HTTPS penuh.
- Rate limiting pada API publik (kontak, AI, guestbook).
- Validasi input di server (Zod), sanitasi konten pengguna.
- Autentikasi admin dengan 2FA/passkey.
- Secret disimpan di environment, tidak pernah di klien.

**Privasi**

- Analitik tanpa cookie pelacak (Plausible/Umami), tanpa data pribadi berlebih.
- Kebijakan privasi singkat; guestbook hanya menyimpan data minimal.

**Keandalan & Pemeliharaan**

- Uptime target 99,9%; pemantauan dan alert.
- Backup database otomatis.
- Dokumentasi README, ADR (Architecture Decision Records), dan panduan internal.

**Responsif**

- Mobile-first; diuji pada layar 320px sampai 2560px. Pengalaman mobile dirancang khusus (gestur, bottom nav opsional), bukan versi "dikurangi".

---

## 11. Rekomendasi Tech Stack

| Lapisan | Pilihan | Alasan |
|---|---|---|
| Framework | **Next.js (App Router) + TypeScript** | SSG/ISR/Edge, ekosistem matang, bukti kompetensi |
| Styling | **Tailwind CSS** + CSS variables untuk token desain | Konsisten dan cepat |
| UI primitives | **Radix UI / shadcn/ui** (dikustomisasi penuh) | Aksesibel; tampilan dibuat unik |
| Animasi | **Framer Motion** + **GSAP** (scroll) + **Lenis** (smooth scroll) | Kontrol penuh atas motion |
| 3D | **Three.js / React Three Fiber + drei** | Hero 3D dan eksperimen Lab |
| Konten | **MDX** + **Sanity** atau **Payload CMS** (atau CMS custom) | Konten terstruktur, pratinjau draft |
| Database | **PostgreSQL** (Neon/Supabase) + **Prisma/Drizzle** | Guestbook, estimator, analitik internal |
| Auth | **Auth.js** (GitHub/Google) + passkey untuk admin | Aman dan ringan |
| AI | **Claude API** + **pgvector** untuk RAG | Asisten "Tanya Saya" berbasis konten sendiri |
| Real-time | **Partykit / Ably / Pusher** | Demo kolaboratif di Lab |
| Email | **Resend** | Notifikasi kontak dan brief estimator |
| Anti-spam | **Cloudflare Turnstile** | Tanpa CAPTCHA mengganggu |
| Analitik | **Plausible / Umami** | Privasi-first |
| Hosting | **Vercel** (atau Cloudflare) + CDN | Deploy cepat, edge global |
| CI/CD | **GitHub Actions** + Lighthouse CI + Playwright | Kualitas terjaga tiap perubahan |
| Monitoring | **Sentry** + uptime monitor | Deteksi masalah dini |
| Testing | **Vitest**, **Playwright**, **axe-core** | Unit, E2E, aksesibilitas |

Catatan: rekomendasi ini dapat disesuaikan dengan stack yang paling Anda kuasai agar pemeliharaan jangka panjang tetap nyaman.

---

## 12. Arsitektur Tingkat Tinggi

```
[Pengunjung]
     |
     v
[CDN / Edge (Vercel/Cloudflare)]
     |
     +-- Halaman statis/ISR (Next.js) <-- [CMS / MDX Content]
     |
     +-- API Routes / Server Actions
     |      +-- Kontak, Estimator --> [Resend, Telegram]
     |      +-- Guestbook ----------> [PostgreSQL]
     |      +-- AI Assistant -------> [Claude API + pgvector]
     |      +-- Live Stats ---------> [GitHub, Spotify, WakaTime] (cache)
     |
     +-- Admin Dashboard (terproteksi) --> [CMS, PostgreSQL]
```

Prinsip: konten statis secepat mungkin, fitur dinamis dipisahkan dan dimuat malas, semua integrasi eksternal punya cache dan fallback agar situs tidak rusak karena layanan pihak ketiga.

---

## 13. Model Data Utama

- **Project**: slug, judul, ringkasan, peran, tahun, stack[], metrik[], sampul, galeri[], video loop, konten MDX, arsitektur (JSON diagram), unggulan (bool), status, bahasa.
- **Article**: slug, judul, ringkasan, MDX, tag[], tanggal, waktu baca, bahasa, status.
- **Experience**: perusahaan, peran, periode, deskripsi, pencapaian[], teknologi[].
- **Skill**: nama, kategori, level, proyek terkait[].
- **Testimonial**: nama, peran, perusahaan, kutipan, foto.
- **GuestbookEntry**: pengguna, pesan, tanda tangan (path SVG), status moderasi, waktu.
- **EstimatorSubmission**: jenis proyek, fitur[], timeline, anggaran, kontak, waktu.
- **SiteSettings**: status ketersediaan, tautan sosial, CV, metadata SEO.
- **EmbeddingChunk**: sumber, teks, vektor (untuk RAG).

---

## 14. Alur Pengguna Utama

1. **Rekruter**: Beranda → hero & karya pilihan → "Unduh CV" atau `Cmd/Ctrl+K` → Contact. Target: keputusan dalam < 1 menit.
2. **CTO**: Beranda → Work → Case study → diagram arsitektur → GitHub → Tanya Saya → kontak.
3. **Klien**: Beranda → testimoni → Estimator → Booking call.
4. **Developer**: Writing/Lab → baca/coba demo → bagikan → guestbook/newsletter.

---

## 15. Strategi Konten

- **Awal rilis (minimum)**: 4 sampai 5 case study kuat (kualitas di atas kuantitas) dengan mockup dan video loop seragam, 3 artikel, 2 sampai 3 eksperimen Lab, testimoni nyata.
- **Rutinitas jangka panjang**: 1 artikel/bulan, 1 eksperimen/kuartal, pembaruan case study setiap proyek besar selesai, review desain tahunan.
- **Gaya penulisan**: singkat, percaya diri, jujur, kalimat aktif. Hindari klise ("passionate developer") dan gunakan bukti konkret. Detail panjang hanya di halaman case study.
- **Aset visual**: produksi set mockup perangkat dengan pencahayaan dan sudut konsisten, foto profil profesional, set ikon teknologi monokrom seragam.

---

## 16. Roadmap Pengembangan

| Fase | Durasi (perkiraan) | Cakupan | Hasil |
|---|---|---|---|
| **0. Discovery & Branding** | 1–2 minggu | Moodboard, monogram, konten inti, produksi aset awal | Brief visual & kerangka konten |
| **1. Desain** | 2–3 minggu | Design system (`design.md`), wireframe, desain high-fidelity (Figma), prototipe motion | Desain tersetujui |
| **2. MVP (Fondasi)** | 3–4 minggu | Beranda, Work + case study, About, Contact, tema, dwibahasa, CMS, SEO dasar, deploy | Situs live pertama |
| **3. Interaktif Inti** | 3–4 minggu | Command palette, hero 3D, transisi halaman, estimator, analitik | Pengalaman interaktif terwujud |
| **4. Ekspansi** | 3–4 minggu | Writing/MDX, Lab, AI assistant, guestbook, live stats, resume builder | Fitur pembeda lengkap |
| **5. Polish & Optimasi** | 2 minggu | Audit performa, aksesibilitas, keamanan, pengujian lintas perangkat | Kualitas rilis publik |
| **6. Evolusi Berkelanjutan** | Berjalan | Konten rutin, eksperimen baru, tinjauan tahunan | Aset jangka panjang |

Total ke versi lengkap: kira-kira 3 sampai 4 bulan paruh waktu. **Saran strategis:** rilis MVP lebih dulu (Fase 2) agar portofolio sudah bisa dipakai melamar atau menawarkan jasa, lalu tambahkan fitur secara bertahap.

---

## 17. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Over-engineering, tidak selesai-selesai | Portofolio tak pernah rilis | Rilis MVP dulu; fitur P2/P3 sebagai iterasi |
| Blur kaca, animasi, dan 3D memperlambat situs | Pengalaman buruk, SEO turun | Budget performa, lazy load, fallback, batas elemen blur, Lighthouse CI |
| Konten dan aset visual kurang kuat | Desain bagus tapi isi kosong | Prioritaskan kualitas case study dan mockup sejak awal |
| Biaya API (AI, hosting) membengkak | Beban finansial | Rate limit, cache, batas harian, model hemat biaya |
| Penyalahgunaan guestbook/AI | Spam, konten tak pantas | Moderasi, OAuth, Turnstile, filter |
| Ketergantungan layanan pihak ketiga | Fitur live rusak | Cache + fallback; fitur terdegradasi dengan anggun |
| Kontras teks rendah di atas kaca | Sulit dibaca | Scrim gelap, uji kontras AA di setiap rilis |
| Tren desain cepat usang | Terlihat ketinggalan zaman | Design system berbasis token; review tahunan |

---

## 18. Metrik Keberhasilan & Evaluasi

- **Teknis**: skor Lighthouse, Core Web Vitals (CrUX), jumlah error (Sentry), uptime.
- **Engagement**: waktu di situs, scroll depth, pemakaian command palette/AI/estimator, jumlah entri guestbook.
- **Konversi**: jumlah pesan kontak, booking call, unduhan CV, brief estimator.
- **Pertumbuhan**: trafik organik, backlink, pengunjung kembali, pelanggan newsletter.
- **Hasil akhir**: jumlah wawancara/tawaran/proyek yang berasal dari portofolio.

Tinjau metrik setiap bulan; lakukan audit desain dan konten besar setiap tahun.

---

## 19. Di Luar Cakupan (Versi 1)

- Marketplace/penjualan produk digital.
- Sistem komentar kompleks bergaya forum.
- Aplikasi mobile native.
- Multi-user/multi-penulis.

---

## 20. Pertanyaan Terbuka

1. Nama/brand yang dipakai: nama asli, alias, atau studio personal?
2. Target utama: lebih condong ke **mencari kerja** atau **mendapat klien freelance**? (menentukan penekanan CTA dan estimator)
3. Memakai CMS siap pakai (Sanity/Payload) atau membangun CMS sendiri sebagai bukti kemampuan?
4. Seberapa dominan elemen 3D: hanya di hero, atau juga di beberapa section?
5. Bahasa utama konten: Indonesia, Inggris, atau keduanya sejak awal?
6. Anggaran bulanan untuk hosting, domain, dan API (terutama AI assistant)?
7. Proyek apa saja yang layak dijadikan case study unggulan dan boleh dipublikasikan (cek NDA)?
8. Apakah sudah ada aset visual (mockup, rekaman layar, foto profil), atau perlu diproduksi dari awal?

---

*Dokumen ini hidup: perbarui setiap akhir fase dan catat keputusan penting sebagai ADR.*
