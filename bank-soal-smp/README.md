# Bank Soal Kelas 3 SMP

Aplikasi berbasis web untuk manajemen bank soal kelas 3 SMP (Kelas 9) yang lengkap dengan berbagai fitur.

## ✅ Fitur Utama

### Jenis Soal yang Didukung:
1. **Pilihan Ganda** - Soal dengan 4 atau lebih pilihan jawaban
2. **Pilihan Ganda Kompleks** - Soal dengan lebih dari satu jawaban benar
3. **Benar-Salah** - Soal dengan dua opsi: Benar atau Salah
4. **Menjodohkan** - Soal mencocokkan pernyataan dengan jawaban
5. **Isian** - Soal dengan jawaban singkat
6. **Uraian** - Soal esai dengan rubrik penilaian

### Level Kognitif:
- **HOTS** (Higher Order Thinking Skills) - Soal berpikir tingkat tinggi
- **AKM** (Asesmen Kompetensi Minimum) - Soal standar asesmen nasional
- Mudah, Sedang, Sukar

### Fitur Lengkap:
- ✅ **Kisi-Kisi** - Pembuatan dan preview kisi-kisi soal
- ✅ **Kunci Jawaban** - Daftar kunci jawaban terintegrasi
- ✅ **Rubrik Penilaian** - Rubrik detail untuk soal uraian
- ✅ **Pembahasan** - Penjelasan lengkap untuk setiap soal
- ✅ **Filter & Pencarian** - Filter berdasarkan jenis, mata pelajaran, dan level
- ✅ **Dashboard Statistik** - Visualisasi distribusi soal
- ✅ **Cetak/Export** - Fitur print untuk kisi-kisi dan kunci jawaban

## 🚀 Cara Menjalankan

### Development Mode:
```bash
cd bank-soal-smp
npm run dev
```

### Build Production:
```bash
npm run build
```

Hasil build akan tersimpan di folder `dist/`

## 📁 Struktur Proyek

```
bank-soal-smp/
├── src/
│   ├── App.jsx          # Komponen utama aplikasi
│   ├── main.jsx         # Entry point React
│   └── index.css        # Styling aplikasi
├── public/              # File statis
├── index.html           # HTML template
├── package.json         # Dependencies
└── vite.config.js       # Konfigurasi Vite
```

## 🛠️ Teknologi

- **React 18** - Framework UI
- **Vite** - Build tool modern
- **CSS3** - Styling dengan gradient dan responsive design

## 📊 Mata Pelajaran yang Tersedia

- Matematika
- IPA (Ilmu Pengetahuan Alam)
- Bahasa Indonesia
- Bahasa Inggris
- IPS (Ilmu Pengetahuan Sosial)

## 💡 Contoh Data

Aplikasi sudah dilengkapi dengan 7 contoh soal dari berbagai jenis dan mata pelajaran untuk demonstrasi fitur.

## 🎨 Tampilan

Aplikasi memiliki 5 tab utama:
1. **Dashboard** - Statistik dan overview soal
2. **Tambah Soal** - Form input soal baru
3. **Daftar Soal** - List semua soal dengan filter
4. **Kisi-Kisi** - Manajemen kisi-kisi soal
5. **Kunci Jawaban** - Tabel kunci jawaban lengkap

---

Dibuat untuk mendukung pembelajaran Kurikulum Merdeka di SMP.
