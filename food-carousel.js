// Food Carousel Implementation
class FoodCarousel {
    constructor() {
        this.currentSlide = 0;
        this.itemsPerPage = this.getItemsPerPage();
        this.autoSlideInterval = null;
        this.direction = 1; // 1 for forward, -1 for backward
        this.foodItems = [
            { 
                nameKey: 'ravioli-abobora', 
                descKey: 'ravioli-desc', 
                price: '21 €', 
                image: 'raviolideabobora.avif' 
            },
            { 
                nameKey: 'arroz-robalo', 
                descKey: 'arroz-robalo-desc', 
                price: '28 €', 
                image: 'arrozderobalo.avif' 
            },
            { 
                nameKey: 'polvo', 
                descKey: 'polvo-desc', 
                price: '22 €', 
                image: 'polvo.webp' 
            },
            { 
                nameKey: 'lombo-atum', 
                descKey: 'lombo-desc', 
                price: '22 €', 
                image: 'lombodeatum.avif' 
            },
            { 
                nameKey: 'peixe-galo', 
                descKey: 'peixe-desc', 
                price: '23,5 €', 
                image: 'peixegalo.jpg' 
            },
            { 
                nameKey: 'wellington-leitao', 
                descKey: 'wellington-leitao-desc', 
                price: '24 €', 
                image: 'wellington.webp' 
            },
            { 
                nameKey: 'entrecote-250', 
                descKey: 'entrecote-250-desc', 
                price: '27 €', 
                image: 'entrecote.webp' 
            }
        ];
        
        this.init();
        this.handleResize();
        
        // Expose instance globally for language switcher
        window.foodCarouselInstance = this;
        
        // Listen for language changes
        document.addEventListener('languageChanged', (event) => {
            this.createCarousel();
        });
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
        
        // Get translations from language switcher if available
        const currentLang = localStorage.getItem('language') || 'pt';
        const name = this.getTranslation(item.nameKey, currentLang);
        
        foodItem.innerHTML = `
            <img src="${item.image}" alt="${name}" class="food-image" loading="lazy">
        `;

        // Add click animation
        foodItem.addEventListener('click', () => {
            this.animateItemClick(foodItem);
        });

        return foodItem;
    }
    
    getTranslation(key, language) {
        // Access translations from the global language switcher
        if (window.languageSwitcherTranslations && window.languageSwitcherTranslations[language] && window.languageSwitcherTranslations[language][key]) {
            return window.languageSwitcherTranslations[language][key];
        }
        
        // Fallback translations for food items
        const fallbackTranslations = {
            pt: {
                'ravioli-abobora': 'Ravioli de abóbora',
                'arroz-robalo': 'Arroz de robalo',
                'polvo': 'Polvo',
                'lombo-atum': 'Lombo de atum',
                'peixe-galo': 'Peixe galo',
                'wellington-leitao': '"Wellington" de leitão',
                'entrecote-250': 'Entrecôte (250gr)'
            },
            en: {
                'ravioli-abobora': 'Pumpkin ravioli',
                'arroz-robalo': 'Sea bass rice',
                'polvo': 'Octopus',
                'lombo-atum': 'Tuna loin',
                'peixe-galo': 'John Dory',
                'wellington-leitao': 'Suckling pig "Wellington"',
                'entrecote-250': 'Ribeye (250gr)'
            }
        };
        
        return fallbackTranslations[language] && fallbackTranslations[language][key] 
            ? fallbackTranslations[language][key] 
            : key;
    }
    
    // Add method to refresh carousel when language changes
    refreshForLanguage() {
        this.createCarousel();
        this.updateCarousel();
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