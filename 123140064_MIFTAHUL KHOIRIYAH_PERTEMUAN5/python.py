from abc import ABC, abstractmethod
from typing import List, Optional
class KoleksiPerpustakaan(ABC):
    """Kelas abstrak dasar untuk semua jenis koleksi perpustakaan."""

    def __init__(self, kode: str, judul: str, tahun: int):
        self.__kode = kode            
        self._judul = judul             
        self._tahun_terbit = tahun    
        self._dipinjam = False         

    @property
    def kode_item(self):
        return self.__kode

    @property
    def judul(self):
        return self._judul

    @property
    def status(self):
        return "Tersedia" if not self._dipinjam else "Dipinjam"

    def pinjam(self):
        if not self._dipinjam:
            self._dipinjam = True
            print(f"📕 Koleksi '{self.judul}' berhasil dipinjam.")
        else:
            print(f"⚠️  Koleksi '{self.judul}' sedang tidak tersedia.")

    def kembalikan(self):
        if self._dipinjam:
            self._dipinjam = False
            print(f"📗 Koleksi '{self.judul}' telah dikembalikan.")
        else:
            print(f"⚠️  Koleksi '{self.judul}' memang sudah tersedia.")

    @abstractmethod
    def tampilkan_informasi(self):
        """Harus diimplementasikan di setiap subclass."""
        pass

class BukuFiksi(KoleksiPerpustakaan):
    """Koleksi buku fiksi seperti novel, cerita, dll."""

    def __init__(self, kode: str, judul: str, penulis: str, genre: str, tahun: int):
        super().__init__(kode, judul, tahun)
        self._penulis = penulis
        self._genre = genre

    def tampilkan_informasi(self):
        print(f"\n✨ Buku Fiksi")
        print(f"Kode   : {self.kode_item}")
        print(f"Judul  : {self.judul}")
        print(f"Penulis: {self._penulis}")
        print(f"Genre  : {self._genre}")
        print(f"Tahun  : {self._tahun_terbit}")
        print(f"Status : {self.status}")


class BukuNonFiksi(KoleksiPerpustakaan):
    """Koleksi buku non-fiksi seperti buku pelajaran atau referensi."""

    def __init__(self, kode: str, judul: str, bidang: str, penerbit: str, tahun: int):
        super().__init__(kode, judul, tahun)
        self._bidang = bidang
        self._penerbit = penerbit

    def tampilkan_informasi(self):
        print(f"\n📘 Buku Non-Fiksi")
        print(f"Kode     : {self.kode_item}")
        print(f"Judul    : {self.judul}")
        print(f"Bidang   : {self._bidang}")
        print(f"Penerbit : {self._penerbit}")
        print(f"Tahun    : {self._tahun_terbit}")
        print(f"Status   : {self.status}")


class MajalahIlmiah(KoleksiPerpustakaan):
    """Koleksi majalah ilmiah atau jurnal edukatif."""

    def __init__(self, kode: str, judul: str, edisi: str, lembaga: str, tahun: int):
        super().__init__(kode, judul, tahun)
        self._edisi = edisi
        self._lembaga = lembaga

    def tampilkan_informasi(self):
        print(f"\n📰 Majalah Ilmiah")
        print(f"Kode     : {self.kode_item}")
        print(f"Judul    : {self.judul}")
        print(f"Edisi    : {self._edisi}")
        print(f"Lembaga  : {self._lembaga}")
        print(f"Tahun    : {self._tahun_terbit}")
        print(f"Status   : {self.status}")

class PerpustakaanDigital:
    """Menyimpan dan mengelola seluruh koleksi perpustakaan."""

    def __init__(self, nama: str):
        self._nama = nama
        self.__daftar_koleksi: List[KoleksiPerpustakaan] = []

    def tambah_koleksi(self, item: KoleksiPerpustakaan):
        self.__daftar_koleksi.append(item)
        print(f"✅ Koleksi '{item.judul}' berhasil ditambahkan ke {self._nama}.")

    def tampilkan_koleksi(self):
        print(f"\n📚 Daftar Koleksi di {self._nama}")
        print("=" * 40)
        if not self.__daftar_koleksi:
            print("Tidak ada koleksi saat ini.")
            return
        for item in self.__daftar_koleksi:
            item.tampilkan_informasi()

    def cari_koleksi(self, kata_kunci: str) -> Optional[KoleksiPerpustakaan]:
        kata_kunci = kata_kunci.lower()
        for item in self.__daftar_koleksi:
            if kata_kunci in item.kode_item.lower() or kata_kunci in item.judul.lower():
                return item
        return None

def tampilkan_menu():
    print("\n========= MENU PERPUSTAKAAN =========")
    print("1. Tambah Koleksi Baru")
    print("2. Lihat Semua Koleksi")
    print("3. Cari Koleksi")
    print("4. Pinjam Koleksi")
    print("5. Kembalikan Koleksi")
    print("0. Keluar")
    print("=====================================")


def menu_tambah(perpus: PerpustakaanDigital):
    print("\nPilih jenis koleksi:")
    print("1. Buku Fiksi")
    print("2. Buku Non-Fiksi")
    print("3. Majalah Ilmiah")

    pilihan = input("Masukkan pilihan (1/2/3): ").strip()
    kode = input("Kode Item: ").strip()
    judul = input("Judul: ").strip()
    tahun = int(input("Tahun Terbit: "))

    if pilihan == "1":
        penulis = input("Penulis: ").strip()
        genre = input("Genre: ").strip()
        perpus.tambah_koleksi(BukuFiksi(kode, judul, penulis, genre, tahun))
    elif pilihan == "2":
        bidang = input("Bidang: ").strip()
        penerbit = input("Penerbit: ").strip()
        perpus.tambah_koleksi(BukuNonFiksi(kode, judul, bidang, penerbit, tahun))
    elif pilihan == "3":
        edisi = input("Edisi: ").strip()
        lembaga = input("Lembaga: ").strip()
        perpus.tambah_koleksi(MajalahIlmiah(kode, judul, edisi, lembaga, tahun))
    else:
        print("Pilihan tidak valid!")


def menu_cari(perpus: PerpustakaanDigital):
    kata = input("\nMasukkan kode atau judul koleksi: ").strip()
    hasil = perpus.cari_koleksi(kata)
    if hasil:
        hasil.tampilkan_informasi()
    else:
        print("❌ Koleksi tidak ditemukan.")


def menu_pinjam(perpus: PerpustakaanDigital):
    kata = input("\nMasukkan kode atau judul yang ingin dipinjam: ").strip()
    hasil = perpus.cari_koleksi(kata)
    if hasil:
        hasil.pinjam()
    else:
        print("❌ Koleksi tidak ditemukan.")


def menu_kembalikan(perpus: PerpustakaanDigital):
    kata = input("\nMasukkan kode atau judul yang ingin dikembalikan: ").strip()
    hasil = perpus.cari_koleksi(kata)
    if hasil:
        hasil.kembalikan()
    else:
        print("❌ Koleksi tidak ditemukan.")

def main():
    perpus = PerpustakaanDigital("Perpustakaan Cakrawala")

    perpus.tambah_koleksi(BukuFiksi("F001", "Laut Bercerita", "Leila S. Chudori", "Drama Sosial", 2017))
    perpus.tambah_koleksi(BukuNonFiksi("N001", "AI dalam Dunia Modern", "Teknologi", "Informatika Press", 2023))
    perpus.tambah_koleksi(MajalahIlmiah("M001", "Sains & Inovasi", "Edisi 09", "LIPI", 2025))

    while True:
        tampilkan_menu()
        pilihan = input("Masukkan pilihan: ").strip()

        if pilihan == "1":
            menu_tambah(perpus)
        elif pilihan == "2":
            perpus.tampilkan_koleksi()
        elif pilihan == "3":
            menu_cari(perpus)
        elif pilihan == "4":
            menu_pinjam(perpus)
        elif pilihan == "5":
            menu_kembalikan(perpus)
        elif pilihan == "0":
            print("\nTerima kasih telah menggunakan sistem! 👋")
            break
        else:
            print("⚠️  Pilihan tidak dikenali.")

        input("\nTekan Enter untuk melanjutkan...")


if __name__ == "__main__":
    main()
