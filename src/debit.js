// Fungsi format ke Rupiah saat input
        function formatRupiah(angka) {
            const numberString = angka.replace(/[^,\d]/g, "").toString()
            const split = numberString.split(",")
            const sisa = split[0].length % 3
            let rupiah = split[0].substr(0, sisa)
            const ribuan = split[0].substr(sisa).match(/\d{3}/g)

            if (ribuan) {
                const separator = sisa ? "." : ""
                rupiah += separator + ribuan.join(".")
            }

            return rupiah
        }

        // Event listener untuk format saat user mengetik
        document.getElementById("inputUpdt").addEventListener("input", function (e) {
            let angkaHanya = e.target.value.replace(/\D/g, "")  // Buang semua non-digit
            e.target.value = formatRupiah(angkaHanya)
        })
        function apifetch() {
            document.getElementById("submit").addEventListener("click", async (event) => {
                event.preventDefault()

                const rawInput = document.getElementById("inputUpdt").value
                const statusEl = document.getElementById("statusMessage")

                if (!rawInput.trim()) {
                    statusEl.textContent = "Input tidak boleh kosong."
                    statusEl.className = "text-red-500 text-sm text-center mt-2"
                    return
                }

                // Hapus titik agar jadi angka asli sebelum dikirim
                const inputVal = rawInput.replace(/\./g, "")

                try {
                    const response = await fetch('https://c495b80dcbe5.ngrok-free.app/debit', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            UpdateDebit: inputVal
                        })
                    })

                    const result = await response.json()
                    console.log("Response:", result)

                    if (response.ok && result.status === 200) {
                        Swal.fire({
                            title: 'Berhasil!',
                            text: 'Data telah disimpan.',
                            icon: 'success',
                            confirmButtonText: 'Oke'
                        }).then(() => {
                            window.location.reload()
                        })

                        statusEl.textContent = ""
                        statusEl.className = ""
                    } else {
                        statusEl.textContent = result.message || "Gagal menyimpan!"
                        statusEl.className = "text-red-500 text-sm text-center mt-2"
                    }
                } catch (error) {
                    statusEl.textContent = "Terjadi kesalahan saat mengirim data."
                    statusEl.className = "text-red-500 text-sm text-center mt-2"
                    console.error("Error:", error)
                }
            })

        }

        apifetch()