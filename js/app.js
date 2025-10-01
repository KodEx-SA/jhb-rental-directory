// Navigation toggle handling
const navToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('#navbarNav');
const navLinks = document.querySelectorAll('.nav-link');
const ctaButton = document.querySelector('.cta-btn');

// Function to collapse the navbar
function collapseNavbar() {
    if (navbarCollapse.classList.contains('show')) {
        navToggler.click(); // Trigger the toggler to collapse
    }
}

// Close navbar when clicking a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        collapseNavbar();
        removeActiveClasses();
        link.classList.add('active');
    });
});

// Close navbar when clicking the CTA button
ctaButton.addEventListener('click', () => {
    collapseNavbar();
});

// Close navbar when clicking anywhere outside the navbar
document.addEventListener('click', (event) => {
    const isClickInsideNavbar = navbarCollapse.contains(event.target);
    const isClickOnToggler = navToggler.contains(event.target);
    if (!isClickInsideNavbar && !isClickOnToggler && navbarCollapse.classList.contains('show')) {
        collapseNavbar();
    }
});

// Active navigation tab handling
const sections = document.querySelectorAll('section[id], footer[id]');

// Function to remove active class from all nav links
function removeActiveClasses() {
    navLinks.forEach(link => link.classList.remove('active'));
}

// Handle scroll-based active tab
function updateActiveNav() {
    let currentSection = '';
    const scrollPosition = window.scrollY + window.innerHeight / 2;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = sectionId;
        }
    });

    // Handle footer as a special case
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
        currentSection = 'contact';
    }

    removeActiveClasses();
    const activeLink = document.querySelector(`.nav-link[href="#${currentSection}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Debounce scroll event for performance
let isScrolling;
window.addEventListener('scroll', () => {
    clearTimeout(isScrolling);
    isScrolling = setTimeout(updateActiveNav, 100);
});

// Initial call to set active tab on page load
updateActiveNav();