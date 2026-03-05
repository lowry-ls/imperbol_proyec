let currentSlideIndex = 1;
let autoSlideTimer;
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const responseDiv = document.getElementById('form-response');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    prevBtn.addEventListener('click', () => {
        changeSlide(-1);
        resetAutoSlide();
    });
    nextBtn.addEventListener('click', () => {
        changeSlide(1);
        resetAutoSlide();
    });
    startAutoSlide();
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        if (!name || !email || !date || !time) {
            responseDiv.textContent = 'Por favor completa todos los campos para solicitar tu diagnóstico.';
            responseDiv.style.color = 'red';
            return;
        }
        responseDiv.textContent = '¡Diagnóstico solicitado! Nos pondremos en contacto contigo pronto para confirmar tu visita.';
        responseDiv.style.color = 'green';
        form.reset();
    });
    const calcBtn = document.getElementById('calc-humidity');
    const resultP = document.getElementById('humidity-result');

    calcBtn.addEventListener('click', () => {
        const t = parseFloat(document.getElementById('temp').value);
        const dew = parseFloat(document.getElementById('dew').value);
        if (isNaN(t) || isNaN(dew)) {
            resultP.textContent = 'Ingresa temperatura y punto de rocío válidos para evaluar la humedad.';
            resultP.style.color = 'red';
            return;
        }
        const a = 17.625, b = 243.04;
        const gammaT = (a * t) / (b + t);
        const gammaD = (a * dew) / (b + dew);
        const rh = Math.exp(gammaD - gammaT) * 100;
        resultP.textContent = 'Humedad relativa estimada: ' + rh.toFixed(1) + '%. ' + (rh > 60 ? 'Recomendamos realizar un diagnóstico profesional.' : 'Nivel normal de humedad.');
        resultP.style.color = rh > 60 ? 'orange' : 'green';
    });
});
function changeSlide(n) {
    showSlide(currentSlideIndex += n);
}
function currentSlide(n) {
    showSlide(currentSlideIndex = n);
}
function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-img');
    const dots = document.querySelectorAll('.dot');

    if (n > slides.length) {
        currentSlideIndex = 1;
    } else if (n < 1) {
        currentSlideIndex = slides.length;
    }

    slides.forEach((slide) => slide.classList.remove('active'));
    dots.forEach((dot) => dot.classList.remove('active'));

    slides[currentSlideIndex - 1].classList.add('active');
    dots[currentSlideIndex - 1].classList.add('active');
}

function startAutoSlide() {
    // interval aumentado a 7 segundos para una transición más lenta
    autoSlideTimer = setInterval(() => {
        changeSlide(1);
    }, 7000);
}

function resetAutoSlide() {
    clearInterval(autoSlideTimer);
    startAutoSlide();
}

showSlide(currentSlideIndex);