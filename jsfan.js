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
