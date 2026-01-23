/// ==================== SCROLL ANIMATION SYSTEM ====================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Uncomment line below if you want animation to play only once
            // observer.unobserve(entry.target);
        } else {
            entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// Observe all elements with animation classes
document.addEventListener('DOMContentLoaded', () => {
    // Get all elements that should animate on scroll
    const elementsToAnimate = document.querySelectorAll(
        '.scroll-fade-in, .scroll-slide-left, .scroll-slide-right, .scroll-scale-in'
    );
    
    // Also animate common page elements
    const pageElements = document.querySelectorAll(
        'section, .card, .testimonial-card, .discover-card, .glass-card, h1, h2, h3, p'
    );
    
    // Animate testimonials container and cards
    const testimonialContainer = document.querySelector('.testimonials-container');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    // Observe all elements
    elementsToAnimate.forEach(el => observer.observe(el));
    
    // Add animation class to sections and cards if not already present
    pageElements.forEach(el => {
        if (!el.classList.contains('scroll-fade-in') && 
            !el.classList.contains('scroll-slide-left') && 
            !el.classList.contains('scroll-slide-right') &&
            !el.classList.contains('scroll-scale-in')) {
            
            // Add default fade-in animation to all sections and major elements
            if (el.tagName === 'SECTION' || el.classList.contains('card') || 
                el.classList.contains('testimonial-card') || 
                el.classList.contains('discover-card') ||
                el.classList.contains('glass-card')) {
                el.classList.add('scroll-fade-in');
                observer.observe(el);
            }
        }
    });
    
    // ==================== TESTIMONIALS SECTION ANIMATION ====================
    if (testimonialContainer) {
        testimonialContainer.classList.add('scroll-fade-in');
        observer.observe(testimonialContainer);
    }
    
    // Animate each testimonial card with stagger effect
    testimonialCards.forEach((card, index) => {
        card.classList.add('scroll-fade-in', `delay-${index + 1}`);
        observer.observe(card);
    });
    
    // ==================== DISCOVER SECTION ANIMATION ====================
    const discoverCards = document.querySelectorAll('.discover-card');
    const discoverTitle = document.querySelector('.discover-title');
    const discoverLine = document.querySelector('.discover-line');
    
    if (discoverTitle) {
        discoverTitle.classList.add('scroll-fade-in');
        observer.observe(discoverTitle);
    }
    
    if (discoverLine) {
        discoverLine.classList.add('scroll-slide-right');
        observer.observe(discoverLine);
    }
    
    discoverCards.forEach((card, index) => {
        card.classList.add('scroll-fade-in', `delay-${index + 1}`);
        observer.observe(card);
    });
    
    // ==================== SERVICES SECTION ANIMATION ====================
    const servicesContent = document.querySelector('.services-content');
    const serviceCards = document.querySelectorAll('.card');
    
    if (servicesContent) {
        servicesContent.classList.add('scroll-fade-in');
        observer.observe(servicesContent);
    }
    
    serviceCards.forEach((card, index) => {
        card.classList.add('scroll-slide-left', `delay-${index + 1}`);
        observer.observe(card);
    });
    
    // ==================== BOOKING SECTION ANIMATION ====================
    const bookingWrapper = document.querySelector('.booking-wrapper');
    const stepBar = document.querySelector('.step-bar');
    const formSteps = document.querySelectorAll('.form-step');
    
    if (bookingWrapper) {
        bookingWrapper.classList.add('scroll-fade-in');
        observer.observe(bookingWrapper);
    }
    
    if (stepBar) {
        stepBar.classList.add('scroll-slide-left');
        observer.observe(stepBar);
    }
    
    formSteps.forEach((step, index) => {
        step.classList.add('scroll-fade-in', `delay-${index + 1}`);
        observer.observe(step);
    });
    
    // ==================== EVENTS SECTION ANIMATION ====================
    const quoteSection = document.querySelector('.quote-section');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const eventLines = document.querySelectorAll('.line-path');
    
    if (quoteSection) {
        quoteSection.classList.add('scroll-fade-in');
        observer.observe(quoteSection);
    }
    
    eventLines.forEach((line, index) => {
        line.classList.add('scroll-fade-in', `delay-${index + 1}`);
        observer.observe(line);
    });
    
    timelineItems.forEach((item, index) => {
        if (index % 2 === 0) {
            item.classList.add('scroll-slide-left', `delay-${(index % 5) + 1}`);
        } else {
            item.classList.add('scroll-slide-right', `delay-${(index % 5) + 1}`);
        }
        observer.observe(item);
    });
    
    // ==================== WHY US SECTION ANIMATION ====================
    const sectionHeader = document.querySelector('.section-header');
    const headerLine = document.querySelector('.header-line');
    const glassCards = document.querySelectorAll('.glass-card');
    
    if (sectionHeader) {
        sectionHeader.classList.add('scroll-fade-in');
        observer.observe(sectionHeader);
    }
    
    if (headerLine) {
        headerLine.classList.add('scroll-slide-right');
        observer.observe(headerLine);
    }
    
    glassCards.forEach((card, index) => {
        card.classList.add('scroll-scale-in', `delay-${index + 1}`);
        observer.observe(card);
    });
    
    // ==================== HERO SECTION ANIMATION ====================
    const heroContent = document.querySelector('.hero-content');
    const heroBtns = document.querySelector('.hero-btns');
    const scrollDown = document.querySelector('.scroll-down');
    
    if (heroContent) {
        heroContent.classList.add('scroll-fade-in');
        observer.observe(heroContent);
    }
    
    if (heroBtns) {
        heroBtns.classList.add('scroll-fade-in', 'delay-2');
        observer.observe(heroBtns);
    }
    
    if (scrollDown) {
        scrollDown.classList.add('scroll-fade-in', 'delay-3');
        observer.observe(scrollDown);
    }
});