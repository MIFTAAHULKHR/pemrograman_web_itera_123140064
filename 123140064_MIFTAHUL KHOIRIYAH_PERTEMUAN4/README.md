# PROGRAM PENGELOLAAN DATA NILAI MAHASISWA

## 📋 Deskripsi Program
Program ini adalah sistem manajemen data nilai mahasiswa yang dibuat dengan Python. Program memungkinkan pengguna untuk mengelola, menganalisis, dan menampilkan data nilai mahasiswa dengan berbagai fitur yang berguna untuk evaluasi akademik.

## ✨ Fitur Utama

### 1. **Menampilkan Data Mahasiswa**
- Menampilkan semua data mahasiswa dalam format tabel yang rapi
- Menghitung nilai akhir secara otomatis
- Menentukan grade berdasarkan nilai akhir

### 2. **Input Data Mahasiswa Baru**
- Menambahkan data mahasiswa baru ke dalam sistem
- Validasi input untuk memastikan data nilai berupa angka

### 3. **Pencarian Nilai Ekstrem**
- Mencari mahasiswa dengan nilai akhir tertinggi
- Mencari mahasiswa dengan nilai akhir terendah

### 4. **Filter Berdasarkan Grade**
- Memfilter mahasiswa berdasarkan grade (A, B, C, D, E)
- Menampilkan daftar mahasiswa dengan grade tertentu

### 5. **Analisis Statistik**
- Menghitung rata-rata nilai akhir seluruh kelas
- Memberikan gambaran umum performa akademik

## 🎯 Sistem Penilaian

### Bobot Penilaian:
- **UTS**: 30%
- **UAS**: 40% 
- **Tugas**: 30%

### Kriteria Grade:
| Grade | Range Nilai Akhir |
|-------|-------------------|
| A     | ≥ 80              |
| B     | 70 - 79           |
| C     | 60 - 69           |
| D     | 50 - 59           |
| E     | < 50              |

## 🖼️ Screenshot Program

![Tampilan Program](D:\TUGAS KULIAH\Semester 5\PRAKTIKUM PENGWEB\123140064_MIFTAHUL KHOIRIYAH_PERTEMUAN4/Tampilan.png)

*Gambar 1: Tampilan menu utama dan fitur-fitur program*

## 🚀 Cara Menjalankan Program

### Persyaratan:
- Python 3.x

### Langkah-langkah:
1. **Simpan kode** dalam file `program_nilai_mahasiswa.py`
2. **Jalankan program** melalui terminal/command prompt:
   ```bash
   python program_nilai_mahasiswa.py
   ```
3. **Ikuti menu** yang tersedia untuk menggunakan berbagai fitur

## 📊 Data Sample Awal
Program sudah dilengkapi dengan data sample 5 mahasiswa:
- Lisa (12340061) - UTS: 89, UAS: 78, Tugas: 79
- Gita (12340047) - UTS: 75, UAS: 88, Tugas: 80  
- Sasya (12340026) - UTS: 55, UAS: 95, Tugas: 90
- Michael (12340099) - UTS: 63, UAS: 70, Tugas: 85
- Rudi (12340122) - UTS: 37, UAS: 40, Tugas: 50

## 🎮 Menu Program

### 1. Tampilkan Semua Data
Menampilkan seluruh data mahasiswa dalam format tabel dengan kolom:
- NIM, Nama, UTS, UAS, Tugas, Nilai Akhir, Grade

### 2. Input Data Mahasiswa Baru
Fitur untuk menambahkan data mahasiswa baru dengan input:
- Nama, NIM, Nilai UTS, Nilai UAS, Nilai Tugas

### 3. Cari Mahasiswa Nilai Tertinggi
Menampilkan mahasiswa dengan nilai akhir tertinggi

### 4. Cari Mahasiswa Nilai Terendah  
Menampilkan mahasiswa dengan nilai akhir terendah

### 5. Filter Mahasiswa Berdasarkan Grade
Memfilter dan menampilkan mahasiswa berdasarkan grade tertentu

### 6. Hitung Rata-rata Nilai Kelas
Menghitung dan menampilkan rata-rata nilai akhir seluruh kelas

### 0. Keluar
Keluar dari program

## 💻 Contoh Penggunaan

```python
# Contoh output tampilan data
======================================
NIM        Nama            UTS      UAS      Tugas    Akhir   Grade
----------------------------------------------------------------------
12340061   Lisa            89       78       79       80.9    A    
12340047   Gita            75       88       80       81.7    A    
12340026   Sasya           55       95       90       82.0    A    
12340099   Michael         63       70       85       71.8    B    
12340122   Rudi            37       40       50       41.9    E    
======================================
```

## 🛠️ Fungsi yang Tersedia

### `hitung_nilai_akhir(m)`
Menghitung nilai akhir berdasarkan bobot: 30% UTS + 40% UAS + 30% Tugas

### `tentukan_grade(nilai_akhir)`
Menentukan grade berdasarkan nilai akhir dengan kriteria A-E

### `tampilkan_data(mahasiswa)`
Menampilkan data mahasiswa dalam format tabel yang rapi

### `cari_nilai_tertinggi(mahasiswa)`
Mencari mahasiswa dengan nilai akhir tertinggi

### `cari_nilai_terendah(mahasiswa)`
Mencari mahasiswa dengan nilai akhir terendah

### `tambah_mahasiswa()`
Fungsi untuk input data mahasiswa baru

### `filter_berdasarkan_grade(grade)`
Memfilter mahasiswa berdasarkan grade tertentu

### `rata_rata_kelas()`
Menghitung rata-rata nilai akhir seluruh kelas

## 📝 Catatan Pengembangan
- Program menggunakan list of dictionaries untuk menyimpan data
- Dilengkapi dengan error handling untuk input yang tidak valid
- Interface yang user-friendly dengan menu interaktif
- Kode terstruktur dengan fungsi-fungsi modular

## 🔧 Potensi Pengembangan
- [ ] Penyimpanan data ke file (JSON/CSV)
- [ ] Fitur edit dan hapus data mahasiswa
- [ ] Ekspor data ke format laporan
- [ ] Grafik statistik nilai
- [ ] Autentikasi pengguna

---
**Dibuat untuk keperluan akademik dan pembelajaran pemrograman Python**