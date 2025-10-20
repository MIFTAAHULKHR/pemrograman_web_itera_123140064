# Manajemen Tugas Mahasiswa

<br>

### Deskripsi

Aplikasi Web Manajemen Tugas Mahasiswa yang modern dan responsif untuk mengelola semua tugas akademik dengan fitur lengkap dan penyimpanan lokal menggunakan localStorage.

![Aplikasi Manajemen Tugas](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=Manajemen+Tugas+Mahasiswa)

### ✨ Fitur Utama:

✅ Tambah Tugas - Input tugas baru via modal form dengan validasi  
👀 Lihat Tugas - Dua mode tampilan (Grid dan List) yang responsif  
✏️ Edit Tugas - Update data tugas yang sudah ada dengan mudah  
🗑️ Hapus Tugas - Hapus tugas dengan konfirmasi dialog  
🔍 Filter & Pencarian - Filter berdasarkan status, mata kuliah, dan pencarian real-time  
📊 Statistik - Dashboard statistik tugas (total, selesai, pending, urgent)  
🎯 Prioritas - Sistem prioritas tugas (Tinggi, Sedang, Rendah)  
⚠️ Notifikasi Deadline - Peringatan otomatis untuk deadline mendatang  
💾 Penyimpanan Lokal - Data tersimpan permanen di browser menggunakan localStorage  
📱 Responsif - Tampilan optimal di desktop, tablet, dan mobile  

### 🚀 Cara Menggunakan:

#### 1. Menambah Tugas Baru
   - Klik tombol "+ Tugas Baru" di header
   - Isi form yang muncul di modal:
     - Nama Tugas (wajib)
     - Mata Kuliah (wajib)
     - Prioritas (Rendah, Sedang, Tinggi)
     - Deadline (wajib, tidak boleh tanggal lampau)
   - Klik "Simpan Tugas"

#### 2. Mengelola Tugas
   - Toggle Status: Klik ikon ⭕/✅ untuk menandai selesai/belum selesai
   - Edit: Klik ikon ✏️ untuk mengubah data tugas
   - Hapus: Klik ikon 🗑️ untuk menghapus tugas (dengan konfirmasi)

#### 3. Filter & Pencarian
   - Pencarian: Ketik di kolom search untuk mencari berdasarkan nama atau mata kuliah
   - Filter Status: Pilih "Semua Status", "Belum Selesai", atau "Selesai"
   - Filter Mata Kuliah: Pilih mata kuliah tertentu atau "Semua Mata Kuliah"
   - Sorting: Urutkan berdasarkan Deadline, Prioritas, Tanggal Dibuat, atau Nama

#### 4. Toggle Tampilan
   - Klik tombol "Tampilan Daftar/Grid" untuk berganti antara tampilan list dan grid

### 📊 Fitur Khusus:

#### Sistem Prioritas
- 🟥 Tinggi: Border merah, untuk tugas mendesak
- 🟨 Sedang: Border oranye, untuk tugas normal  
- 🟩 Rendah: Border hijau, untuk tugas tidak mendesak

#### Notifikasi Deadline
- ⚠️ Peringatan: Tampil jika deadline dalam 3 hari
- ❌ Terlambat: Tampil jika deadline sudah lewat

#### Statistik Real-time
- 📈 Total Tugas: Jumlah semua tugas
- ✅ Selesai: Tugas yang sudah dikompleti
- ⏳ Belum Selesai: Tugas yang masih pending
- 🔴 Tugas Mendesak: Tugas prioritas tinggi atau deadline dekat

### 📁 Struktur File

```
project-folder/
│
├── index.html          # Struktur utama aplikasi
├── styles.css          # Custom styles dan animasi
└── script.js           # Logika aplikasi dan functionality
```



