# API Manajemen Matakuliah dengan Pyramid

## 📋 Deskripsi Proyek
**API Manajemen Matakuliah** adalah aplikasi backend RESTful yang dibangun menggunakan framework Pyramid untuk mengelola data mata kuliah. Aplikasi ini menyediakan operasi CRUD (Create, Read, Update, Delete) lengkap dengan validasi data dan error handling yang baik. API ini menggunakan PostgreSQL sebagai database dan SQLAlchemy sebagai ORM.

**Fitur Utama:**
- ✅ Operasi CRUD lengkap untuk data matakuliah
- ✅ Validasi input data (kode unik, tipe data)
- ✅ Error handling dengan response JSON yang konsisten
- ✅ Konfigurasi database fleksibel (PostgreSQL/SQLite)
- ✅ Debug toolbar untuk pengembangan

## 🚀 Cara Instalasi

### **1. Persiapan Lingkungan**
Pastikan Python 3.8+ terinstal di sistem Anda.

### **2. Clone Repository**
```bash
git clone <repository-url>
cd pyramid-matakuliah-api
```

### **3. Buat Virtual Environment**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### **4. Instalasi Dependensi**
```bash
pip install -r requirements.txt
```

**Daftar dependensi utama:**
- `pyramid` - Web framework
- `waitress` - WSGI server
- `sqlalchemy` - ORM database
- `psycopg2-binary` - Driver PostgreSQL
- `alembic` - Migrasi database
- `zope.sqlalchemy` - Integrasi SQLAlchemy dengan Pyramid
- `pyramid_debugtoolbar` - Toolbar debugging (development only)

### **5. Konfigurasi Database**
#### **Option A: PostgreSQL (Direkomendasikan untuk Production)**
1. Install PostgreSQL dan buat database:
```sql
CREATE DATABASE matakuliah_db;
CREATE USER api_user WITH PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE matakuliah_db TO api_user;
```

2. Konfigurasi di `development.ini`:
```ini
sqlalchemy.url = postgresql://api_user:password123@localhost/matakuliah_db
```

#### **Option B: SQLite (Untuk Development)**
Ubah konfigurasi di `development.ini`:
```ini
sqlalchemy.url = sqlite:///matakuliah.db
```

## 💻 Cara Menjalankan

### **1. Menjalankan Migrasi Database**
```bash
# Buat migrasi (jika menggunakan Alembic)
alembic revision --autogenerate -m "create matakuliah table"

# Jalankan migrasi
alembic upgrade head

# Atau buat tabel langsung (jika tidak pakai migrasi)
python -c "
from app.models import Base, DBSession
from sqlalchemy import create_engine

engine = create_engine('postgresql://postgres:password@localhost/matakuliah_db')
Base.metadata.create_all(engine)
print('Tabel berhasil dibuat!')
"
```

### **2. Tambah Data Awal (Opsional)**
```bash
# Tambah 3 data contoh
python -c "
from app.models import DBSession, Matakuliah
from app.database import initialize_db
import sys

# Setup database
engine = initialize_db({'sqlalchemy.url': 'postgresql://postgres:password@localhost/matakuliah_db'})

# Data contoh
data_matakuliah = [
    {'kode_mk': 'MK001', 'nama_mk': 'Algoritma dan Pemrograman', 'sks': 3, 'semester': 1},
    {'kode_mk': 'MK002', 'nama_mk': 'Struktur Data', 'sks': 3, 'semester': 2},
    {'kode_mk': 'MK003', 'nama_mk': 'Basis Data', 'sks': 3, 'semester': 3},
]

for data in data_matakuliah:
    mk = Matakuliah(**data)
    DBSession.add(mk)

DBSession.commit()
print('3 data matakuliah berhasil ditambahkan!')
"
```

### **3. Menjalankan Server**
```bash
# Mode development dengan auto-reload
pserve development.ini --reload

# Server akan berjalan di: http://localhost:6543
```
## 🖼️ Screenshot Aplikasi

### **1. Status Server**
![Home Page](screenshot/localhost.png)
*Halaman utama API - menampilkan status aplikasi*

### **2. Pengujian Read, Create, dan Update**
![Database Schema](screenshot/pengujian1.png)
*Gabungan GET All, GET by ID, POST, dan PUT*

### **3. Pengujian Error Handling dan Delete**
![API Testing](screenshot/pengujian.png)
*engujian ini menunjukkan keberhasilan Update data matakuliah ID 1, penanganan error saat POST kode duplikat (MK001), dan keberhasilan menghapus data ID 3.*

## 🌐 API Endpoints

### **Base URL:** `http://localhost:6543`

### **1. GET `/` - Home Page**
**Deskripsi:** Halaman utama untuk mengecek status API.

**Request:**
```bash
curl http://localhost:6543/
```

**Response:**
```html
API Matakuliah is running!
```

### **2. GET `/api/matakuliah` - Get All Matakuliah**
**Deskripsi:** Mendapatkan semua data matakuliah.

**Request:**
```bash
curl http://localhost:6543/api/matakuliah
```

**Response Sukses (200):**
```json
{
  "data": [
    {
      "id": 1,
      "kode_mk": "MK001",
      "nama_mk": "Algoritma dan Pemrograman",
      "sks": 3,
      "semester": 1
    },
    {
      "id": 2,
      "kode_mk": "MK002",
      "nama_mk": "Struktur Data",
      "sks": 3,
      "semester": 2
    }
  ],
  "status": "success",
  "count": 2
}
```

### **3. GET `/api/matakuliah/{id}` - Get Matakuliah by ID**
**Deskripsi:** Mendapatkan data matakuliah berdasarkan ID.

**Request:**
```bash
curl http://localhost:6543/api/matakuliah/1
```

**Response Sukses (200):**
```json
{
  "data": {
    "id": 1,
    "kode_mk": "MK001",
    "nama_mk": "Algoritma dan Pemrograman",
    "sks": 3,
    "semester": 1
  },
  "status": "success"
}
```

**Response Error (404):**
```json
{
  "error": "Matakuliah tidak ditemukan"
}
```

### **4. POST `/api/matakuliah` - Create New Matakuliah**
**Deskripsi:** Menambahkan data matakuliah baru.

**Request:**
```bash
curl -X POST http://localhost:6543/api/matakuliah \
  -H "Content-Type: application/json" \
  -d '{
    "kode_mk": "MK004",
    "nama_mk": "Jaringan Komputer",
    "sks": 3,
    "semester": 4
  }'
```

**Response Sukses (201):**
```json
{
  "data": {
    "id": 4,
    "kode_mk": "MK004",
    "nama_mk": "Jaringan Komputer",
    "sks": 3,
    "semester": 4
  },
  "status": "success",
  "message": "Matakuliah berhasil ditambahkan"
}
```

**Response Error (400) - Kode duplikat:**
```json
{
  "error": "Kode MK sudah ada"
}
```

**Response Error (400) - Field required:**
```json
{
  "error": "Field kode_mk diperlukan"
}
```

### **5. PUT `/api/matakuliah/{id}` - Update Matakuliah**
**Deskripsi:** Mengupdate data matakuliah berdasarkan ID.

**Request:**
```bash
curl -X PUT http://localhost:6543/api/matakuliah/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nama_mk": "Algoritma Pemrograman Dasar",
    "sks": 4
  }'
```

**Response Sukses (200):**
```json
{
  "data": {
    "id": 1,
    "kode_mk": "MK001",
    "nama_mk": "Algoritma Pemrograman Dasar",
    "sks": 4,
    "semester": 1
  },
  "status": "success",
  "message": "Matakuliah berhasil diupdate"
}
```

### **6. DELETE `/api/matakuliah/{id}` - Delete Matakuliah**
**Deskripsi:** Menghapus data matakuliah berdasarkan ID.

**Request:**
```bash
curl -X DELETE http://localhost:6543/api/matakuliah/4
```

**Response Sukses (200):**
```json
{
  "status": "success",
  "message": "Matakuliah dengan ID 4 berhasil dihapus"
}
```

## 🔧 Testing

### **Test Semua Endpoint Sekaligus**
Buat file `test_api.sh` (Linux/Mac) atau `test_api.bat` (Windows):

**Windows (test_api.bat):**
```batch
@echo off
echo === TEST API MANAJEMEN MATAKULIAH ===
echo.

echo 1. GET Semua Matakuliah:
curl.exe http://localhost:6543/api/matakuliah
echo.

echo 2. GET Matakuliah by ID (ID=1):
curl.exe http://localhost:6543/api/matakuliah/1
echo.

echo 3. POST Tambah Matakuliah Baru:
curl.exe -X POST http://localhost:6543/api/matakuliah -H "Content-Type: application/json" -d "{\"kode_mk\":\"MK006\",\"nama_mk\":\"Sistem Operasi\",\"sks\":3,\"semester\":3}"
echo.

echo 4. PUT Update Matakuliah (ID=2):
curl.exe -X PUT http://localhost:6543/api/matakuliah/2 -H "Content-Type: application/json" -d "{\"nama_mk\":\"Struktur Data Lanjut\",\"sks\":4}"
echo.

echo 5. DELETE Matakuliah (ID=6):
curl.exe -X DELETE http://localhost:6543/api/matakuliah/6
echo.

echo === TEST SELESAI ===
```

### **Test Manual dengan PowerShell**
```powershell
# Test 1: GET semua
curl.exe http://localhost:6543/api/matakuliah

# Test 2: Error case - POST dengan data tidak lengkap
curl.exe -X POST http://localhost:6543/api/matakuliah -H "Content-Type: application/json" -d "{\"kode_mk\":\"MK007\"}"

# Test 3: Error case - GET dengan ID tidak ada
curl.exe http://localhost:6543/api/matakuliah/999
```

### **Test dengan Python Script**
Buat file `test_api.py`:
```python
import requests
import json

BASE_URL = "http://localhost:6543/api/matakuliah"

def test_all_endpoints():
    print("=== TESTING API ENDPOINTS ===\n")
    
    # 1. Test GET semua
    print("1. GET Semua Matakuliah:")
    response = requests.get(BASE_URL)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")
    
    # 2. Test POST
    print("2. POST Matakuliah Baru:")
    new_data = {
        "kode_mk": "MK010",
        "nama_mk": "Pemrograman Web",
        "sks": 3,
        "semester": 5
    }
    response = requests.post(BASE_URL, json=new_data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")
    
    # 3. Test PUT
    print("3. PUT Update Matakuliah:")
    update_data = {"sks": 4, "semester": 6}
    response = requests.put(f"{BASE_URL}/1", json=update_data)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")
    
    # 4. Test DELETE
    print("4. DELETE Matakuliah:")
    response = requests.delete(f"{BASE_URL}/10")
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}\n")

if __name__ == "__main__":
    test_all_endpoints()
```

## 📁 Struktur Proyek
```
pyramid-matakuliah-api/
├── app/
│   ├── __init__.py      # Konfigurasi aplikasi Pyramid
│   ├── models.py        # Model database Matakuliah
│   ├── views.py         # View functions untuk API endpoints
│   └── database.py      # Konfigurasi koneksi database
├── alembic/             # Direktori migrasi database
├── development.ini      # Konfigurasi development
├── production.ini       # Konfigurasi production (opsional)
├── requirements.txt     # Daftar dependensi
├── setup.py            # Konfigurasi package Python
└── README.md           # Dokumentasi ini
```

## ⚠️ Troubleshooting

### **Error: "Can't load plugin: sqlalchemy.dialects:driver"**
**Solusi:** Pastikan URL database di `development.ini` benar:
```ini
# PostgreSQL
sqlalchemy.url = postgresql://user:password@localhost/dbname

# SQLite
sqlalchemy.url = sqlite:///matakuliah.db
```

### **Error: "No module named 'pyramid_debugtoolbar'"**
**Solusi:** Install debug toolbar:
```bash
pip install pyramid_debugtoolbar
```

### **Error: "predicate mismatch for view"**
**Solusi:** Pastikan route names di `__init__.py` dan `views.py` konsisten.

### **Server tidak bisa start**
**Solusi:** Cek apakah port 6543 sedang digunakan:
```bash
# Windows
netstat -ano | findstr :6543

# Linux/Mac
lsof -i :6543
```

## 📄 Lisensi
Proyek ini dibuat untuk keperluan pembelajaran dan tugas praktikum.

## 👥 Kontribusi
Untuk pertanyaan atau masalah, silakan buat issue di repository atau hubungi pengembang.

---
**🔥 API siap digunakan!** Akses `http://localhost:6543/` untuk memulai.
