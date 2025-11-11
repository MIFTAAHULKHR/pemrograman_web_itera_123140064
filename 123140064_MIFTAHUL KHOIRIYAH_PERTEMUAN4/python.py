mahasiswa_list = [
    {"nama": "Lisa", "nim": "12340061", "nilai_uts": 89, "nilai_uas": 78, "nilai_tugas": 79},
    {"nama": "Gita", "nim": "12340047", "nilai_uts": 75, "nilai_uas": 88, "nilai_tugas": 80},
    {"nama": "Sasya", "nim": "12340026", "nilai_uts": 55, "nilai_uas": 95, "nilai_tugas": 90},
    {"nama": "Michael", "nim": "12340099", "nilai_uts": 63, "nilai_uas": 70, "nilai_tugas": 85},
    {"nama": "Rudi", "nim": "12340122", "nilai_uts": 37, "nilai_uas": 40, "nilai_tugas": 50},
]

def hitung_nilai_akhir(m):
    """
    Fungsi untuk menghitung nilai akhir.
    Bobot: 30% UTS + 40% UAS + 30% Tugas
    """
    return round(m["nilai_uts"] * 0.3 + m["nilai_uas"] * 0.4 + m["nilai_tugas"] * 0.3, 2)

def tentukan_grade(nilai_akhir):
    """
    Fungsi untuk menentukan grade berdasarkan nilai akhir.
    A: >=80, B: >=70, C: >=60, D: >=50, E: <50
    """
    if nilai_akhir >= 80:
        return "A"
    elif nilai_akhir >= 70:
        return "B"
    elif nilai_akhir >= 60:
        return "C"
    elif nilai_akhir >= 50:
        return "D"
    else:
        return "E"

def tampilkan_data(mahasiswa):
    """Fungsi untuk menampilkan data dalam format tabel."""
    print("=" * 70)
    print(f"{'NIM':<10} {'Nama':<15} {'UTS':<8} {'UAS':<8} {'Tugas':<8} {'Akhir':<8} {'Grade':<5}")
    print("-" * 70)

    if not mahasiswa:
        print(f"{'Tidak ada data untuk ditampilkan':^70}")
    
    for m in mahasiswa:
        nilai_akhir = hitung_nilai_akhir(m)
        grade = tentukan_grade(nilai_akhir)
        print(f"{m['nim']:<10} {m['nama']:<15} {m['nilai_uts']:<8} {m['nilai_uas']:<8} {m['nilai_tugas']:<8} {nilai_akhir:<8} {grade:<5}")
    print("=" * 70)

def cari_nilai_tertinggi(mahasiswa):
    """Fungsi untuk mencari mahasiswa dengan nilai akhir tertinggi."""
    if not mahasiswa:
        return None
    return max(mahasiswa, key=lambda m: hitung_nilai_akhir(m))

def cari_nilai_terendah(mahasiswa):
    """Fungsi untuk mencari mahasiswa dengan nilai akhir terendah."""
    if not mahasiswa:
        return None
    return min(mahasiswa, key=lambda m: hitung_nilai_akhir(m))
def tambah_mahasiswa():
    """Fungsi untuk input data mahasiswa baru."""
    print("\n--- Input Data Mahasiswa Baru ---")
    try:
        nama = input("Masukkan nama mahasiswa: ")
        nim = input("Masukkan NIM: ")
        uts = float(input("Masukkan nilai UTS: "))
        uas = float(input("Masukkan nilai UAS: "))
        tugas = float(input("Masukkan nilai Tugas: "))
        
        mahasiswa_list.append({
            "nama": nama,
            "nim": nim,
            "nilai_uts": uts,
            "nilai_uas": uas,
            "nilai_tugas": tugas
        })
        print("Data mahasiswa berhasil ditambahkan!\n")
    except ValueError:
        print("Error: Input nilai harus berupa angka. Data gagal ditambahkan.")

def filter_berdasarkan_grade(grade):
    """Fungsi untuk filter mahasiswa berdasarkan grade."""
    hasil = []
    for m in mahasiswa_list:
        nilai_akhir = hitung_nilai_akhir(m)
        if tentukan_grade(nilai_akhir) == grade.upper():
            hasil.append(m)
    return hasil

def rata_rata_kelas():
    """Fungsi untuk hitung rata-rata nilai akhir kelas."""
    if not mahasiswa_list:
        return 0
    total = sum(hitung_nilai_akhir(m) for m in mahasiswa_list)
    return round(total / len(mahasiswa_list), 2)
while True:
    print("\n=== PROGRAM PENGELOLAAN DATA NILAI MAHASISWA ===")
    print("1. Tampilkan Semua Data")
    print("2. Input Data Mahasiswa Baru")
    print("3. Cari Mahasiswa Nilai Tertinggi")
    print("4. Cari Mahasiswa Nilai Terendah")
    print("5. Filter Mahasiswa Berdasarkan Grade")
    print("6. Hitung Rata-rata Nilai Kelas")
    print("0. Keluar")

    pilihan = input("Pilih menu: ")

    if pilihan == "1":
        print("\n--- Data Lengkap Mahasiswa ---")
        tampilkan_data(mahasiswa_list)
    
    elif pilihan == "2":
        tambah_mahasiswa()
    
    elif pilihan == "3":
        tertinggi = cari_nilai_tertinggi(mahasiswa_list)
        if tertinggi:
            print("\nMahasiswa dengan nilai tertinggi:")
            print(f"{tertinggi['nama']} ({tertinggi['nim']}) - Nilai Akhir: {hitung_nilai_akhir(tertinggi)}")
        else:
            print("Data masih kosong.")
            
    elif pilihan == "4":
        terendah = cari_nilai_terendah(mahasiswa_list)
        if terendah:
            print("\nMahasiswa dengan nilai terendah:")
            print(f"{terendah['nama']} ({terendah['nim']}) - Nilai Akhir: {hitung_nilai_akhir(terendah)}")
        else:
            print("Data masih kosong.")
            
    elif pilihan == "5":
        g = input("Masukkan grade yang ingin difilter (A/B/C/D/E): ")
        hasil = filter_berdasarkan_grade(g)
        if hasil:
            print(f"\nDaftar Mahasiswa dengan grade {g.upper()}:")
            tampilkan_data(hasil)
        else:
            print(f"Tidak ada mahasiswa dengan grade {g.upper()}.")
            
    elif pilihan == "6":
        rata_rata = rata_rata_kelas()
        if rata_rata > 0:
            print(f"Rata-rata nilai akhir kelas: {rata_rata}")
        else:
            print("Data masih kosong.")
            
    elif pilihan == "0":
        print("Terima kasih telah menggunakan program ini!")
        break
        
    else:
        print("Pilihan tidak valid, silakan coba lagi.")
