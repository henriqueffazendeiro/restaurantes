// Sauvage continuous scroll effect
class SauvageScroll {
    constructor() {
        this.initializeScroll();
    }

    initializeScroll() {
        // Create continuous scrolling for right-to-left
        this.createScrollingLine('sauvage-right-to-left', 'right-to-left', false);
        
        // Create continuous scrolling for left-to-right (upside down)
        this.createScrollingLine('sauvage-left-to-right', 'left-to-right', true);
    }

    createScrollingLine(containerId, direction, upsideDown) {
        const container = document.querySelector(`.${containerId}`);
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';
        
        // Calculate how many words we need based on screen width
        const wordWidth = 280; // Approximate width including margin
        const screenWidth = window.innerWidth;
        const wordsNeeded = Math.ceil(screenWidth / wordWidth) + 5; // Extra words for smooth transition

        // Create words
        for (let i = 0; i < wordsNeeded; i++) {
            const word = document.createElement('span');
            word.className = `sauvage-text${upsideDown ? ' upside-down' : ''}`;
            word.textContent = 'Sauvage';
            
            // Set initial position
            if (direction === 'right-to-left') {
                word.style.transform = `translateX(${i * wordWidth}px)`;
            } else {
                word.style.transform = `translateX(${-i * wordWidth}px)`;
            }
            
            container.appendChild(word);
            
            // Start animation for this word
            this.animateWord(word, direction, i, wordWidth, wordsNeeded);
        }
    }

    animateWord(word, direction, index, wordWidth, totalWords) {
        const speed = direction === 'right-to-left' ? 3000 : 3500; // Different speeds
        const totalDistance = totalWords * wordWidth;
        
        const animate = () => {
            if (direction === 'right-to-left') {
                // Move from right to left
                const currentX = parseFloat(word.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
                let newX = currentX - 2; // Speed of movement
                
                // If word goes too far left, reset to right
                if (newX < -wordWidth) {
                    newX = totalDistance;
                }
                
                word.style.transform = `translateX(${newX}px)`;
            } else {
                // Move from left to right
                const currentX = parseFloat(word.style.transform.replace('translateX(', '').replace('px)', '')) || 0;
                let newX = currentX + 1.5; // Slightly different speed
                
                // If word goes too far right, reset to left
                if (newX > totalDistance) {
                    newX = -wordWidth;
                }
                
                word.style.transform = `translateX(${newX}px)`;
            }
            
            requestAnimationFrame(animate);
        };
        
        // Start animation with slight delay based on index for staggered effect
        setTimeout(() => {
            animate();
        }, index * 100);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SauvageScroll();
});

// Reinitialize on window resize
window.addEventListener('resize', () => {
    new SauvageScroll();
});