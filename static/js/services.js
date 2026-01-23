// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Card hover effects with enhanced interaction
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Pause other cards' animations when hovering one
            cards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset all cards
            cards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = this.style.transform + ' scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });
    
    // Social links interaction
    const socialLinks = document.querySelectorAll('.social-link');
    
    socialLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.getAttribute('data-platform');
            
            // Add a visual feedback
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // You can add actual social media URLs here
            console.log(`Navigating to ${platform}`);
            
            // Example: Uncomment and add real URLs
            // const socialUrls = {
            //     tiktok: 'https://tiktok.com/@lando',
            //     instagram: 'https://instagram.com/lando',
            //     youtube: 'https://youtube.com/@lando',
            //     twitch: 'https://twitch.tv/lando'
            // };
            // window.open(socialUrls[platform], '_blank');
        });
    });
    
    // Store badge interaction
    const storeBadge = document.querySelector('.store-badge');
    
    storeBadge.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Store clicked');
        // Add your store URL here
        // window.location.href = 'your-store-url';
    });
    
    // Add subtle parallax effect to cards on mouse move
    const container = document.querySelector('.container');
    
    container.addEventListener('mousemove', function(e) {
        const { left, top, width, height } = container.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        
        cards.forEach((card, index) => {
            const intensity = (index + 1) * 5;
            const moveX = (x - 0.5) * intensity;
            const moveY = (y - 0.5) * intensity;
            
            if (!card.matches(':hover')) {
                const originalTransform = card.classList.contains('card-1') 
                    ? 'rotate(-8deg)' 
                    : card.classList.contains('card-2') 
                    ? 'translateX(-50%) rotate(2deg)' 
                    : 'rotate(8deg)';
                
                card.style.transform = `${originalTransform} translate(${moveX}px, ${moveY}px)`;
            }
        });
    });
    
    container.addEventListener('mouseleave', function() {
        cards.forEach((card) => {
            card.style.transform = '';
        });
    });
    
    // Add animation on page load
    setTimeout(() => {
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(50px) rotate(0deg)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                card.style.opacity = '1';
                card.style.transform = '';
            }, index * 150);
        });
    }, 100);
    
});
