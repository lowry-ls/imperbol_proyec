// ─── HEADER SCROLL ─────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── HAMBURGER ─────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('open');
});
navList.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navList.classList.remove('open');
}));

// ─── CAROUSEL ──────────────────────────────────────────
let currentSlide = 1;
const totalSlides = 4;
let autoTimer;

function goToSlide(n) {
    document.querySelector('.hero-slide.active')?.classList.remove('active');
    document.querySelector('.dot.active')?.classList.remove('active');
    currentSlide = ((n - 1 + totalSlides) % totalSlides) + 1;
    document.getElementById('slide-' + currentSlide).classList.add('active');
    document.querySelectorAll('.dot')[currentSlide - 1].classList.add('active');
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goToSlide(currentSlide + 1), 7000);
}
autoTimer = setInterval(() => goToSlide(currentSlide + 1), 7000);

// ─── SCROLL REVEAL ─────────────────────────────────────
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || 0;
            setTimeout(() => el.classList.add('visible'), delay);
            observer.unobserve(el);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .service-card, .project-card, .g-item').forEach((el) => {
    observer.observe(el);
});

// stagger siblings
document.querySelectorAll('.services-grid .service-card').forEach((el, i) => { el.dataset.delay = i * 120; });
document.querySelectorAll('.projects-grid .project-card').forEach((el, i) => { el.dataset.delay = i * 120; });
document.querySelectorAll('.gallery-grid .g-item').forEach((el, i) => { el.dataset.delay = i * 80; });
document.querySelectorAll('.stats .reveal').forEach((el, i) => { el.dataset.delay = i * 100; });

// ─── COUNTER ANIMATION ─────────────────────────────────
const counters = [
    { id: 's1', target: 350 },
    { id: 's2', target: 98 },
    { id: 's3', target: 15 },
    { id: 's4', target: 12 },
];
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            counters.forEach(({ id, target }) => {
                const el = document.getElementById(id);
                let count = 0;
                const step = Math.ceil(target / 60);
                const timer = setInterval(() => {
                    count = Math.min(count + step, target);
                    el.textContent = count;
                    if (count >= target) clearInterval(timer);
                }, 24);
            });
            statsObserver.disconnect();
        }
    });
}, { threshold: .4 });
statsObserver.observe(document.querySelector('.stats'));

// ─── FORM ───────────────────────────────────────────────
document.getElementById('contact-form').addEventListener('submit', e => {
    e.preventDefault();
    const name  = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const date  = document.getElementById('date').value;
    const time  = document.getElementById('time').value;
    const resp  = document.getElementById('form-response');

    if (!name || !email || !date || !time) {
        resp.textContent = 'Por favor completa todos los campos.';
        resp.className = 'error';
        return;
    }
    resp.textContent = '¡Diagnóstico solicitado! Te contactaremos pronto para confirmar tu visita.';
    resp.className = 'success';
    e.target.reset();
});

// ─── HUMIDITY CALCULATOR ───────────────────────────────
document.getElementById('calc-humidity').addEventListener('click', () => {
    const t   = parseFloat(document.getElementById('temp').value);
    const dew = parseFloat(document.getElementById('dew').value);
    const res = document.getElementById('humidity-result');
    if (isNaN(t) || isNaN(dew)) {
        res.style.color = '#e07070';
        res.textContent = 'Ingresa valores válidos.';
        return;
    }
    const a = 17.625, b = 243.04;
    const rh = Math.exp((a * dew / (b + dew)) - (a * t / (b + t))) * 100;
    if (rh > 60) {
        res.style.color = '#f0a020';
        res.textContent = `Humedad: ${rh.toFixed(1)}% — Recomendamos un diagnóstico profesional.`;
    } else {
        res.style.color = '#8fd8cc';
        res.textContent = `Humedad: ${rh.toFixed(1)}% — Nivel normal de humedad.`;
    }
});

// ─── IMAGE FALLBACK (ERROR) ───────────────────────────────
// Reemplaza cualquier imagen remota con una imagen local de error.
const ERROR_IMG = 'imgs/error.png';

document.querySelectorAll('img').forEach(img => {
    const srcAttr = img.getAttribute('src') || '';
    img.loading = 'lazy';

    if (/^https?:\/\//i.test(srcAttr)) {
        img.src = ERROR_IMG;
    }

    img.addEventListener('error', () => {
        if (img.src !== ERROR_IMG) {
            img.src = ERROR_IMG;
        }
    }, { once: true });
});