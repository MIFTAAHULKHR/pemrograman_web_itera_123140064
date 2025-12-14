# 📚 Sistem Manajemen Perpustakaan "Cakrawala"

Sistem ini adalah **program manajemen perpustakaan sederhana** berbasis Python, dibuat untuk menerapkan konsep **Object-Oriented Programming (OOP)** seperti:

- Abstraction (class abstrak)
- Inheritance (pewarisan class)
- Encapsulation (atribut private & protected)
- Polymorphism (method overriding)

Program berjalan dalam mode **interaktif di terminal (CLI)** dan memungkinkan pengguna untuk menambah, menampilkan, mencari, meminjam, dan mengembalikan koleksi perpustakaan.

---

## 🧩 Fitur Utama

✅ Menambahkan koleksi baru (buku fiksi, buku non-fiksi, majalah ilmiah)  
✅ Menampilkan semua koleksi yang tersedia  
✅ Mencari koleksi berdasarkan judul atau kode  
✅ Meminjam dan mengembalikan koleksi  
✅ Menerapkan prinsip OOP secara lengkap

---

## 🏗️ Struktur Kelas

```plaintext
KoleksiPerpustakaan (abstract)
├── BukuFiksi
├── BukuNonFiksi
└── MajalahIlmiah
PerpustakaanDigital
