function formatCurrency(element) {
    const value = element.textContent;
    const formattedValue = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(value);
    
    element.style.opacity = '0';
    setTimeout(() => {
        element.textContent = formattedValue;
        element.style.opacity = '1';
    }, 200);
}

function convertCRC16(str) {
    let crc = 0xFFFF;
    const strlen = str.length;

    for (let c = 0; c < strlen; c++) {
        crc ^= str.charCodeAt(c) << 8;
        for (let i = 0; i < 8; i++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc = crc << 1;
            }
        }
    }

    let hex = crc & 0xFFFF;
    hex = ("000" + hex.toString(16).toUpperCase()).slice(-4);
    return hex;
}

function checkPaymentStatus() {
    const statusButton = document.getElementById("statusPembayaran");
    
    function updateStatus(text, isLoading = false) {
        statusButton.innerHTML = isLoading ? 
            `<div class="spinner-border spinner-border-sm me-2" role="status"></div>${text}` : 
            text;
    }
    
    function pollStatus() {
        updateStatus("Memeriksa Status...", true);
        
        $.ajax({
            url: "{{url_cek_status}}",
            method: "GET",
            success: function(response) {
                if (response.includes("Terimakasih")) {
                    updateStatus("Pembayaran Berhasil");
                    statusButton.classList.remove('btn-primary');
                    statusButton.classList.add('btn-success');
                    showSuccessAnimation();
                }
                else if (response.includes("Menunggu Pembayaran")) {
                    updateStatus("Menunggu Pembayaran");
                    setTimeout(pollStatus, 3000);
                }
                else if (response.includes("Sesi pembayaran telah berakhir")) {
                    updateStatus("Sesi Telah Berakhir");
                    statusButton.classList.add('btn-secondary');
                    handleExpired();
                }
            },
            error: function(error) {
                updateStatus("Gagal memeriksa status");
                statusButton.classList.add('btn-danger');
                setTimeout(pollStatus, 5000);
            }
        });
    }
    
    pollStatus();
}
