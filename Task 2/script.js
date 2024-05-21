// Smooth scrolling navigation
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        targetElement.scrollIntoView({
            behavior: 'smooth'
        });
    });
});