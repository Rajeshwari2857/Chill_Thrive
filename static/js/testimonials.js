const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

const container = document.querySelector('.testimonials-container');
const cards = document.querySelectorAll('.testimonial-card');

observer.observe(container);
cards.forEach(card => observer.observe(card));