// Perfect Sauvage Marquee Implementation
class SauvageMarquee {
    constructor() {
        this.initializeMarquees();
        this.handleResize();
        this.handleScroll();
        this.animationFrames = new Map();
        this.scrollDirection = 'down';
        this.startRandomHighlight();
    }

    initializeMarquees() {
        // Initialize top marquee (right to left)
        this.createMarquee('marquee-top', false);
        
        // Initialize bottom marquee (left to right, upside down)
        this.createMarquee('marquee-bottom', true);
    }

    createMarquee(containerId, isUpsideDown) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Clear existing content
        container.innerHTML = '';

        // Calculate how many words we need for seamless loop
        const wordText = 'SAUVAGE';
        const wordsNeeded = this.calculateWordsNeeded();

        // Create two identical sets for seamless looping
        for (let set = 0; set < 2; set++) {
            for (let i = 0; i < wordsNeeded; i++) {
                const word = document.createElement('span');
                word.className = 'sauvage-word';
                word.textContent = wordText;
                container.appendChild(word);
            }
        }

        // Start the animation
        this.startAnimation(container);
    }

    calculateWordsNeeded() {
        // Create temporary element to measure word width
        const temp = document.createElement('span');
        temp.className = 'sauvage-word';
        temp.textContent = 'SAUVAGE';
        temp.style.visibility = 'hidden';
        temp.style.position = 'absolute';
        document.body.appendChild(temp);

        const wordWidth = temp.offsetWidth;
        const marginRight = parseInt(getComputedStyle(temp).marginRight);
        const totalWordWidth = wordWidth + marginRight;
        
        document.body.removeChild(temp);

        // Calculate how many words fit on screen + buffer for full coverage
        const screenWidth = window.innerWidth;
        const wordsNeeded = Math.ceil((screenWidth * 3) / totalWordWidth);

        return wordsNeeded;
    }

    startAnimation(container) {
        // Animation is handled by CSS
        // The container already has the proper animation class
    }

    handleResize() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                this.initializeMarquees();
            }, 250);
        });
    }

    handleScroll() {
        let scrollTimer;
        let lastScrollY = window.scrollY;
        let currentDirection = null;
        const marqueeContents = document.querySelectorAll('.marquee-content');
        const marqueeSection = document.querySelector('.sauvage-marquee-section');
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
            
            // Update scroll direction
            if (scrollDirection !== currentDirection) {
                currentDirection = scrollDirection;
                this.scrollDirection = scrollDirection;
            }
            
            // Start smooth animation
            marqueeContents.forEach((content, index) => {
                const isTop = content.closest('.marquee-top');
                this.startSmoothAnimation(content, isTop, index);
            });
            
            // Update last scroll position
            lastScrollY = currentScrollY;
            
            // Clear previous timer
            clearTimeout(scrollTimer);
            
            // Stop animation after scroll stops
            scrollTimer = setTimeout(() => {
                marqueeContents.forEach((content, index) => {
                    this.stopAnimation(content, index);
                });
            }, 150);
        });
    }

    startSmoothAnimation(element, isTopStrip, index) {
        // Stop any existing animation for this element
        this.stopAnimation(element, index);
        
        // Determine direction based on scroll direction and strip position
        let direction;
        if (this.scrollDirection === 'down') {
            direction = isTopStrip ? 1 : -1; // Top: left to right, Bottom: right to left
        } else {
            direction = isTopStrip ? -1 : 1; // Top: right to left, Bottom: left to right
        }
        
        // Get current position or start from 0
        const currentTransform = window.getComputedStyle(element).transform;
        let currentX = 0;
        if (currentTransform && currentTransform !== 'none') {
            const matrix = new DOMMatrix(currentTransform);
            currentX = matrix.m41;
        }
        
        // Start animation
        const animate = () => {
            currentX += direction * 2; // Speed: 2px per frame
            
            // Continuous wrap around for infinite loop
            const elementWidth = element.scrollWidth; // Use scrollWidth for full content width
            const halfWidth = elementWidth / 2;
            
            if (currentX > 0) {
                currentX = -halfWidth;
            } else if (currentX < -elementWidth) {
                currentX = 0;
            }
            
            element.style.transform = `translateX(${currentX}px)`;
            
            // Continue animation
            const frameId = requestAnimationFrame(animate);
            this.animationFrames.set(index, frameId);
        };
        
        animate();
    }

    stopAnimation(element, index) {
        const frameId = this.animationFrames.get(index);
        if (frameId) {
            cancelAnimationFrame(frameId);
            this.animationFrames.delete(index);
        }
    }

    startRandomHighlight() {
        const highlightSingleWord = () => {
            const allWords = document.querySelectorAll('.sauvage-word');
            if (allWords.length === 0) return;
            
            // Filter only visible words
            const visibleWords = Array.from(allWords).filter(word => {
                const rect = word.getBoundingClientRect();
                const windowWidth = window.innerWidth;
                // Check if word is at least partially visible on screen
                return rect.right > 0 && rect.left < windowWidth;
            });
            
            if (visibleWords.length === 0) return;
            
            // Select one random visible word
            const randomIndex = Math.floor(Math.random() * visibleWords.length);
            const word = visibleWords[randomIndex];
            
            // Add highlight
            word.classList.add('random-highlight');
            
            // Remove highlight after 2 seconds
            setTimeout(() => {
                word.classList.remove('random-highlight');
            }, 2000);
        };
        
        // Start highlighting immediately
        highlightSingleWord();
        
        // Continue highlighting one word every 0.05-0.2 seconds for extreme overlap
        setInterval(() => {
            highlightSingleWord();
        }, Math.random() * 150 + 50); // 0.05-0.2 seconds
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SauvageMarquee();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SauvageMarquee;
}