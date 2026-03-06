const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
});

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