// Food Carousel Implementation
class FoodCarousel {
    constructor() {
        this.currentSlide = 0;
        this.itemsPerPage = this.getItemsPerPage();
        this.autoSlideInterval = null;
        this.direction = 1; // 1 for forward, -1 for backward
        this.foodItems = [
            { name: 'Ravioli de abóbora', price: '21 €', description: 'Massa fresca, abóbora assada, nóz, queijo cabra caramelizado, molho cítrico de queijo', image: 'raviolideabobora.avif' },
            { name: 'Arroz de robalo', price: '28 €', description: 'Robalo, arroz carolino, coentros, algas e salicórnia', image: 'arrozderobalo.avif' },
            { name: 'Polvo', price: '22 €', description: 'Patanisca de polvo, arroz de tomate e maionese de tinta de choco', image: 'polvo.webp' },
            { name: 'Lombo de atum', price: '22 €', description: 'Atum braseado, legumes salteados, molho verde e crocante de limão', image: 'lombodeatum.avif' },
            { name: 'Peixe galo', price: '23,5 €', description: 'Filete de peixe galo frito, salada russa, molho de manteiga e alcaparras', image: 'peixegalo.jpg' },
            { name: '"Wellington" de leitão', price: '24 €', description: 'Massa quebrada, leitão, duxelles, salada de espinafre baby e mix de tomate cereja', image: 'wellington.webp' },
            { name: 'Entrecôte (250gr)', price: '27 €', description: 'Novilho, batata frita e molho "marrare"', image: 'entrecote.webp' }
        ];
        
        this.init();
        this.handleResize();
    }

    getItemsPerPage() {
        return window.innerWidth <= 768 ? 2 : 4;
    }

    init() {
        this.createCarousel();
        this.startAutoSlide();
    }

    createCarousel() {
        const track = document.getElementById('food-carousel-track');
        if (!track) return;

        track.innerHTML = '';

        this.foodItems.forEach((item, index) => {
            const foodElement = this.createFoodItem(item, index);
            track.appendChild(foodElement);
        });
    }

    createFoodItem(item, index) {
        const foodItem = document.createElement('div');
        foodItem.className = 'food-item';
        
        foodItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="food-image" loading="lazy">
        `;

        // Add click animation
        foodItem.addEventListener('click', () => {
            this.animateItemClick(foodItem);
        });

        return foodItem;
    }

    animateItemClick(item) {
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
            item.style.transform = '';
        }, 150);
    }

    setupControls() {
        // Auto-slide carousel - no manual controls
    }

    updateCarousel() {
        const track = document.getElementById('food-carousel-track');
        if (!track) return;

        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Mobile: 2 items per page, accounting for gap
            const slideIndex = Math.floor(this.currentSlide / 2);
            // Each pair needs to move: 100% width + gap between pairs
            // With gap: 10px, we need to move slightly more than 100%
            const containerWidth = track.parentElement.offsetWidth;
            const gapInPercent = (10 / containerWidth) * 100; // Convert 10px gap to percentage
            const moveDistance = 100 + gapInPercent; // 100% + gap
            const translateX = -slideIndex * moveDistance;
            track.style.transform = `translateX(${translateX}%)`;
        } else {
            // Desktop: original logic
            const itemWidth = 100 / this.itemsPerPage; // Each item takes 25% width (for 4 items)
            const offset = this.currentSlide === 3 ? 1 : 0; // Add 1% extra offset for better framing
            const translateX = -this.currentSlide * itemWidth - offset;
            track.style.transform = `translateX(${translateX}%)`;
        }
    }

    nextSlide() {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // Mobile: move 2 items at a time
            this.currentSlide += 2;
            if (this.currentSlide >= this.foodItems.length - 1) {
                this.currentSlide = 0;
            }
        } else {
            // Desktop: original logic
            if (this.direction === 1) {
                // Move 3 forward: from slide 0 to slide 3
                this.currentSlide = 3;
                this.direction = -1; // Change to backward
            } else {
                // Move 3 backward: from slide 3 to slide 0
                this.currentSlide = 0;
                this.direction = 1; // Change to forward
            }
        }
        
        this.updateCarousel();
    }

    startAutoSlide() {
        // Clear any existing interval
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }

        // Start auto-sliding every 5 seconds
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }

    handleResize() {
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                const newItemsPerPage = this.getItemsPerPage();
                if (newItemsPerPage !== this.itemsPerPage) {
                    this.itemsPerPage = newItemsPerPage;
                    this.currentSlide = 0;
                    this.updateCarousel();
                    // Restart auto-slide after resize
                    this.startAutoSlide();
                }
            }, 250);
        });

        // Pause auto-slide when page is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.stopAutoSlide();
            } else {
                this.startAutoSlide();
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FoodCarousel();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FoodCarousel;
}