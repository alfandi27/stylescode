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

function copyIn() {
    var id = "total-bayar";
    document.getElementById(id).select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    
    // Animasi feedback pada tombol copy
    const copyButton = document.querySelector('.copy-button');
    const originalText = copyButton.innerHTML;
    copyButton.innerHTML = `<i class="fas fa-check"></i> Tersalin!`;
    copyButton.style.backgroundColor = '#e8f5e9';
    copyButton.style.color = '#2e7d32';
    
    setTimeout(() => {
        copyButton.innerHTML = originalText;
        copyButton.style.backgroundColor = '';
        copyButton.style.color = '';
    }, 2000);
}

function handleExpired() {
    const paySection = document.getElementById('pay');
    const alertSection = document.getElementById('alertz');
    const expElement = document.getElementById("exp");
    
    paySection.style.opacity = '0';
    setTimeout(() => {
        paySection.classList.add('d-none');
        alertSection.classList.remove('d-none');
        alertSection.classList.add('animate__animated', 'animate__fadeIn');
        expElement.innerHTML = "EXPIRED";
        expElement.style.color = '#dc3545';
    }, 300);
}
