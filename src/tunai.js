function simpan() {
  const konfirmasiBtn = document.querySelector('button[type="submit"]');
  const inputMasuk = document.getElementById("inputMasuk");
  const inputKeluar = document.getElementById("inputKeluar");
  const inputKet = document.getElementById("inputKet");

  // Fungsi format Rupiah
  function formatRupiah(angka) {
    const numberString = angka.replace(/[^,\d]/g, "").toString();
    const split = numberString.split(",");
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? "." : "";
      rupiah += separator + ribuan.join(".");
    }

    rupiah = split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
    return rupiah ? "Rp " + rupiah : "";
  }

  // Fungsi untuk membersihkan form
  function resetForm() {
    inputMasuk.value = "";
    inputKeluar.value = "";
    inputKet.value = "";
  }

  // Batasi hanya angka dan format saat diketik
  [inputMasuk, inputKeluar].forEach((input) => {
    input.addEventListener("input", function () {
      const rawValue = this.value.replace(/[^0-9]/g, "");
      this.value = formatRupiah(rawValue);
    });
  });

  konfirmasiBtn.addEventListener("click", async function (e) {
    e.preventDefault();

    const pemasukan = parseInt(inputMasuk.value.replace(/[^0-9]/g, "")) || 0;
    const pengeluaran = parseInt(inputKeluar.value.replace(/[^0-9]/g, "")) || 0;
    const keterangan = inputKet.value.trim();

    const payload = {
      Pemasukan: pemasukan,
      Pengeluaran: pengeluaran,
      Keterangan: keterangan,
    };

    try {
      const response = await fetch("https://ee13baa78912.ngrok-free.app/tunai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("data saved success: " + result.message);

        // SweetAlert2 Berhasil
        Swal.fire({
          title: "Berhasil!",
          text: "Data telah disimpan.",
          icon: "success",
          confirmButtonText: "Oke",
        });

        resetForm();
      } else {
        console.log("failed: " + (result.message || "Tidak diketahui"));

        // SweetAlert2 Gagal (dari backend)
        Swal.fire({
          title: "Gagal!",
          text: result.message || "Data gagal disimpan.",
          icon: "error",
          confirmButtonText: "Tutup",
        });
      }
    } catch (err) {
      console.error("Error:", err);
      console.log("error: " + err.message);

      // SweetAlert2 Error jaringan atau server
      Swal.fire({
        title: "500!",
        text: "Server unreachable",
        icon: "error",
        confirmButtonText: "Tutup",
      });
    }
  });
}

// Pastikan DOM sudah siap sebelum memanggil simpan()
document.addEventListener("DOMContentLoaded", simpan);
