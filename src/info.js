//const token = 'Z3T4WA1FUKU' // Token 
//        function thisTunai() {
//            const apiUrl = 'https://c495b80dcbe5.ngrok-free.app/geting-total'
//
//            fetch(apiUrl, {
//                method: 'GET',
//                headers: {
//                    'Authorization': 'Bearer ' + token
//                }
//            })
//                .then(res => {
//                    if (!res.ok) throw new Error("HTTP error " + res.status)
//                    return res.json()
//                })
//                .then(data => {
//                    console.log("Data fetched:", data)
//                    if (data.status === 200) {
//                        const [row] = data.data
//                        const totalMasuk = row[0]
//                        const totalKeluar = row[1]
//
//                        const formatIDR = n => (n || 0).toLocaleString('id-ID')
//
//                        document.getElementById('totalMasuk').innerHTML = `: <q>${formatIDR(totalMasuk)}</q>`
//                        document.getElementById('totalKeluar').innerHTML = `: <q>${formatIDR(totalKeluar)}</q>`
//                        document.getElementById('status').textContent = "Data berhasil dimuat"
//                        document.getElementById('status').classList.remove("text-blue-600")
//                        document.getElementById('status').classList.add("text-green-600")
//                    } else {
//                        throw new Error("Status data bukan 200")
//                    }
//                })
//                .catch(err => {
//                    console.error("Fetch error:", err)
//                    document.getElementById('status').textContent = "Gagal memuat data"
//                    document.getElementById('status').classList.remove("text-blue-600")
//                    document.getElementById('status').classList.add("text-red-600")
//                })
//        }
//
//        function getDebit() {
//            const apiUrl = 'https://c495b80dcbe5.ngrok-free.app/get-debit'
//
//            fetch(apiUrl, {
//                method: 'GET',
//                headers: {
//                    'Authorization': 'Bearer ' + token
//                }
//            })
//                .then(res => {
//                    if (!res.ok) throw new Error("HTTP error " + res.status)
//                    return res.json()
//                })
//                .then(data => {
//                    if (data.status === 200) {
//                        const formatIDR = n => (n || 0).toLocaleString('id-ID')
//                        document.getElementById('totalDebit').innerHTML = `: <q>${formatIDR(data.message)}</q>`
//                        document.getElementById('statusDebit').textContent = "Data debit berhasil dimuat"
//                        document.getElementById('statusDebit').classList.replace("text-blue-600", "text-green-600")
//                    } else {
//                        throw new Error("Status bukan 200")
//                    }
//                })
//                .catch(err => {
//                    console.error("Fetch error:", err)
//                    document.getElementById('statusDebit').textContent = "Gagal memuat data debit"
//                    document.getElementById('statusDebit').classList.replace("text-blue-600", "text-red-600")
//                })
//        }
//
//        thisTunai()
//        getDebit()

//========================================================================================================
// Redirct kalo terjadi token accpetment (di bawah) //koment aja jangan dihapus 
const token = 'TOKEN_YANG_SALAH'; // sengaja salah untuk test

function handleFetch(url, onSuccess, statusElementId) {
    fetch(url, {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => {
            if (res.status === 401 || res.status === 403) {
                window.location.href = "redirect401.html";
                return;
            }
            return res.json();
        })
        .then(data => {
            if (!data) return;
            onSuccess(data);
        })
        .catch(err => {
            console.error("Fetch gagal:", err);
            const statusEl = document.getElementById(statusElementId);
            if (statusEl) {
                statusEl.textContent = "Gagal memuat data";
                statusEl.classList.remove("text-blue-600");
                statusEl.classList.add("text-red-600");
            }
        });
}

function thisTunai() {
    handleFetch('https://ee13baa78912.ngrok-free.app/geting-total', data => {
        const [row] = data.data;
        const totalMasuk = row[0];
        const totalKeluar = row[1];
        const formatIDR = n => (n || 0).toLocaleString('id-ID');

        document.getElementById('totalMasuk').innerHTML = `: <q>${formatIDR(totalMasuk)}</q>`;
        document.getElementById('totalKeluar').innerHTML = `: <q>${formatIDR(totalKeluar)}</q>`;
        const status = document.getElementById('status');
        status.textContent = "Data berhasil dimuat";
        status.classList.replace("text-blue-600", "text-green-600");
    },{headers: {
        "ngrok-skip-browser-warning": "true",
    }}, 'status');
}

function getDebit() {
    handleFetch('https://c495b80dcbe5.ngrok-free.app/get-debit', data => {
        const formatIDR = n => (n || 0).toLocaleString('id-ID');
        document.getElementById('totalDebit').innerHTML = `: <q>${formatIDR(data.message)}</q>`;
        const status = document.getElementById('statusDebit');
        status.textContent = "Data debit berhasil dimuat";
        status.classList.replace("text-blue-600", "text-green-600");
    }, 'statusDebit');
}

thisTunai();
getDebit();
