document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for scroll-triggered animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Get delay from data-delay attribute or use a small default
                const delayAttr = entry.target.getAttribute('data-delay');
                const delay = delayAttr ? parseFloat(delayAttr) * 0.3 : 0;
                
                setTimeout(() => {
                    entry.target.classList.add('fade-in');
                }, delay * 1000);
            } else {
                // Remove fade-in class when element leaves viewport
                // This allows animation to trigger again when scrolling back
                entry.target.classList.remove('fade-in');
            }
        });
    }, observerOptions);

    // Observe timeline items (scoped to lando-section if it exists, otherwise global)
    const landoSection = document.querySelector('.lando-section');
    const timelineItems = landoSection 
        ? landoSection.querySelectorAll('.timeline-item')
        : document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        // Make sure items start hidden
        item.style.opacity = '0';
        observer.observe(item);
    });

    // Parallax effect for background lines
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const lines = document.querySelectorAll('.line-path');
        
        lines.forEach((line, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = -(scrolled * speed);
            line.style.transform = `translateY(${yPos}px)`;
        });
        
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });

    // Image hover effects with magnetic effect
    timelineItems.forEach(item => {
        const img = item.querySelector('.timeline-image');
        
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x * 0.05;
            const moveY = y * 0.05;
            
            img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        });
        
        item.addEventListener('mouseleave', () => {
            img.style.transform = 'translate(0, 0) scale(1)';
        });
    });

    // Quote text animation on scroll
    const quoteSection = document.querySelector('.quote-section');
    const quoteObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const quoteText = entry.target.querySelector('.quote-text');
                const words = quoteText.textContent.split(' ');
                quoteText.innerHTML = words.map((word, index) => {
                    const delay = index * 0.05;
                    return `<span style="opacity: 0; animation: wordFadeIn 0.5s ease-out ${delay}s forwards">${word}</span>`;
                }).join(' ');
                
                // Re-add strong tags
                const strongWords = quoteText.querySelectorAll('span');
                strongWords.forEach(span => {
                    if (span.textContent === 'where' || span.textContent === 'how') {
                        const strong = document.createElement('strong');
                        strong.textContent = span.textContent;
                        span.replaceWith(strong);
                        strong.style.opacity = '0';
                        strong.style.animation = `wordFadeIn 0.5s ease-out ${Array.from(strongWords).indexOf(span) * 0.05}s forwards`;
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    if (quoteSection) {
        quoteObserver.observe(quoteSection);
    }

    // Pagination interaction
    const pageIndicator = document.querySelector('.page-indicator');
    const pageFlag = document.querySelector('.page-flag');
    
    if (pageFlag) {
        pageFlag.addEventListener('click', () => {
            // Add pulsing animation
            pageFlag.style.animation = 'pulse 0.3s ease';
            setTimeout(() => {
                pageFlag.style.animation = '';
            }, 300);
        });
    }

    // Background lines glow animation
    const animateLines = () => {
        const lines = document.querySelectorAll('.line-path');
        lines.forEach((line, index) => {
            setInterval(() => {
                line.style.opacity = '0.3';
                setTimeout(() => {
                    line.style.opacity = '0.5';
                    setTimeout(() => {
                        line.style.opacity = '0.3';
                    }, 1000);
                }, 500);
            }, 3000 + (index * 1000));
        });
    };
    
    animateLines();

    // Smooth scroll for pagination
    window.addEventListener('wheel', (e) => {
        const delta = e.deltaY;
        if (Math.abs(delta) > 50) {
            // Could implement smooth scrolling between sections here
        }
    });

    // Add CSS for word fade animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes wordFadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.15);
            }
        }
        
    `;
    document.head.appendChild(style);
});

// Add floating animation to signature
document.addEventListener('DOMContentLoaded', function() {
    const signature = document.querySelector('.signature');
    if (signature) {
        setInterval(() => {
            signature.style.animation = 'float 3s ease-in-out infinite';
        }, 1000);
    }
    
    const floatStyle = document.createElement('style');
    floatStyle.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-5px);
            }
        }
    `;
    document.head.appendChild(floatStyle);
});