# TaskMaster Pro - Manajemen Tugas Mahasiswa

<br>

### Deskripsi

Aplikasi Web Manajemen Tugas Mahasiswa dengan tema **Dark Mode & Neon** yang modern dan responsif untuk mengelola semua tugas akademik dengan fitur lengkap dan penyimpanan lokal menggunakan localStorage.

(https://github.com/MIFTAAHULKHR/pemrograman_web_itera_123140064/tree/main/Miftahul%20Khoiriyah_123140064_Pertemuan1)

### ✨ Fitur Utama:

✅ **Tambah Tugas** - Input tugas baru via modal form dengan validasi  
👀 **Lihat Tugas** - Dua mode tampilan (Grid dan List) dengan animasi smooth  
✏️ **Edit Tugas** - Update data tugas yang sudah ada dengan mudah  
🗑️ **Hapus Tugas** - Hapus tugas dengan konfirmasi dialog  
🔍 **Filter & Pencarian** - Filter berdasarkan status, mata kuliah, dan pencarian real-time  
📊 **Statistik Neon** - Dashboard statistik dengan tema dark mode dan glow effect  
🎯 **Sistem Prioritas** - Prioritas tugas dengan icon dan warna berbeda  
⚠️ **Notifikasi Deadline** - Peringatan visual untuk deadline mendatang  
💾 **Penyimpanan Lokal** - Data tersimpan aman di browser  
📱 **Responsif** - Tampilan optimal di semua device  
🎨 **Dark Theme** - Tema gelap yang nyaman di mata  

### 🚀 Cara Menggunakan:

#### 1. Menambah Tugas Baru
   - Klik tombol **"Tambah Tugas Baru"** di header
   - Isi form modal dengan data:
     - **Nama Tugas** (wajib)
     - **Mata Kuliah** (wajib) 
     - **Prioritas** (Rendah, Sedang, Tinggi)
     - **Deadline** (wajib, tidak boleh tanggal lampau)
   - Klik **"Simpan Tugas"**

#### 2. Mengelola Tugas
   - **Toggle Status**: Klik icon lingkaran untuk menandai selesai/belum selesai
   - **Edit**: Klik icon edit (✏️) untuk mengubah data tugas
   - **Hapus**: Klik icon trash (🗑️) untuk menghapus tugas

#### 3. Filter & Pencarian
   - **Pencarian**: Ketik di kolom search untuk mencari tugas
   - **Filter Status**: Pilih status tugas (Semua/Belum Selesai/Selesai)
   - **Filter Mata Kuliah**: Pilih mata kuliah tertentu
   - **Sorting**: Urutkan berdasarkan Deadline, Prioritas, atau lainnya

#### 4. Toggle Tampilan
   - Klik tombol **"Tampilan Daftar/Grid"** untuk berganti mode tampilan

### 📊 Fitur Khusus:

#### 🎯 Sistem Prioritas
- 🔥 **Tinggi**: Border merah dengan icon api, untuk tugas mendesak
- ⚠️ **Sedang**: Border oranye dengan icon peringatan, untuk tugas normal  
- 🌿 **Rendah**: Border hijau dengan icon daun, untuk tugas tidak mendesak

#### ⚠️ Notifikasi Deadline
- 🔔 **Peringatan**: Tampil jika deadline dalam 3 hari (animasi pulse)
- ❌ **Terlambat**: Tampil jika deadline sudah lewat

#### 📈 Statistik Real-time
- 🔵 **Total Tugas**: Jumlah semua tugas (biru neon)
- 🟢 **Selesai**: Tugas completed (hijau neon)
- 🟠 **Belum Selesai**: Tugas pending (oranye neon)  
- 🟣 **Tugas Mendesak**: Tugas prioritas tinggi/deadline dekat (ungu neon)

### 📁 Struktur File

```
taskmaster-pro/
│
├── index.html          # Struktur utama aplikasi
├── styles.css          # Custom styles, animasi, dan dark theme
└── script.js           # Logika aplikasi dan functionality
```



