// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const body = document.body;

function openMenu() {
    menuToggle.classList.add('active');
    navMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    body.classList.add('menu-open');
}

function closeMenu() {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    body.classList.remove('menu-open');
}

// Toggle on click
menuToggle.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Close on overlay click
mobileOverlay.addEventListener('click', closeMenu);

// Close on nav link click (mobile only)
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) closeMenu();
    });
});

// Header Scroll
window.addEventListener('scroll', () => {
    document.getElementById('header').classList.toggle('scrolled', window.scrollY > 50);
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const offset = 80;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        history.pushState(null, null, href);
    });
});

// Active Nav
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const top = section.offsetTop - 120;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) link.classList.add('active');
            });
        }
    });
});

// Hero Carousel
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
let currentSlide = 0;

function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

// Auto-slide every 6 seconds
setInterval(() => showSlide(currentSlide + 1), 6000);

// Search Filter
document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const location = document.getElementById('location').value.toLowerCase();
    const type = document.getElementById('propertyType').value.toLowerCase();
    const price = document.getElementById('priceRange').value;

    document.querySelectorAll('.property-card:not(.contact-card)').forEach(card => {
        const matchLoc = !location || card.dataset.location === location;
        const matchType = !type || card.dataset.type === type;
        const cardPrice = parseInt(card.dataset.price);
        const matchPrice = !price || (
            (price === '0-5000' && cardPrice <= 5000) ||
            (price === '5000-10000' && cardPrice > 5000 && cardPrice <= 10000) ||
            (price === '10000-15000' && cardPrice > 10000 && cardPrice <= 15000) ||
            (price === '15000+' && cardPrice > 15000)
        );
        card.style.display = matchLoc && matchType && matchPrice ? 'block' : 'none';
    });
});

// Newsletter
document.getElementById('newsletterForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    if (email && email.includes('@')) {
        alert('Thank you for subscribing!');
        e.target.reset();
    } else {
        alert('Please enter a valid email.');
    }
});

// ESC to close menu
document.addEventListener('keydown', e => e.key === 'Escape' && closeMenu());