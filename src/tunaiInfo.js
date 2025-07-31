function formatRupiah(angka) {
      const numberString = angka.toString().replace(/[^,\d]/g, '');
      const split = numberString.split(',');
      const sisa = split[0].length % 3;
      let rupiah = split[0].substr(0, sisa);
      const ribuan = split[0].substr(sisa).match(/\d{3}/gi);
      if (ribuan) {
        const separator = sisa ? '.' : '';
        rupiah += separator + ribuan.join('.');
      }
      rupiah = split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
      return rupiah ? 'Rp ' + rupiah : '';
    }

    // Untuk menyimpan jumlah data terakhir yang ditampilkan
    let lastDataLength = 0;

    async function loadTransaksi() {
      try {
        const response = await fetch('https://d76793f3f181.ngrok-free.app/tunai');
        const result = await response.json();
        const data = result.data || [];

        const tbody = document.querySelector('#pemasukan tbody');

        // Tambahkan hanya data baru (berdasarkan panjang array)
        for (let i = lastDataLength; i < data.length; i++) {
          const item = data[i];
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td class="px-4 py-2 border">${formatRupiah(item[0])}</td>
            <td class="px-4 py-2 border">${formatRupiah(item[1])}</td>
            <td class="px-4 py-2 border">${item[2] || '-'}</td>
          `;
          tbody.appendChild(tr);
        }

        lastDataLength = data.length;

      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    }

    document.addEventListener('DOMContentLoaded', () => {
      loadTransaksi(); // load pertama
      setInterval(loadTransaksi, 5000); // update setiap 5 detik
    });
