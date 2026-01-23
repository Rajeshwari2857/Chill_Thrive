// Loading Screen Handler - wpp.html content
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    const scrollText = document.querySelector('.scroll-text-loading');
    
    // Show loading screen and prevent body scroll
    body.classList.add('loading');
    
    // Control animation speed with scroll wheel during loading
    if (scrollText) {
        let scrollSpeed = 30; // seconds
        let isHovering = false;
        
        const heroSection = document.querySelector('.hero-section-loading');
        if (heroSection) {
            heroSection.addEventListener('mouseenter', function() {
                isHovering = true;
            });
            
            heroSection.addEventListener('mouseleave', function() {
                isHovering = false;
            });
            
            document.addEventListener('wheel', function(e) {
                if (isHovering && scrollText && !loadingScreen.classList.contains('hidden')) {
                    if (e.deltaY > 0 && scrollSpeed > 5) {
                        scrollSpeed -= 0.5;
                    } else if (e.deltaY < 0 && scrollSpeed < 40) {
                        scrollSpeed += 0.5;
                    }
                    scrollText.style.animationDuration = `${scrollSpeed}s`;
                }
            }, { passive: true });
        }
    }
});

// Hide loading screen after page loads
window.addEventListener('load', function() {
    const loadingScreen = document.getElementById('loading-screen');
    const body = document.body;
    
    // Show loading screen for at least 4 seconds
    setTimeout(function() {
        // Remove loading class from body
        body.classList.remove('loading');
        
        // Hide loading screen with fade out
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            
            // Remove from DOM after animation completes
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 800);
        }
    }, 4000); // Show loading screen for at least 4 seconds
});