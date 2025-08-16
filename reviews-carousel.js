// Reviews Carousel Implementation
class ReviewsCarousel {
    constructor() {
        this.currentSlide = 0;
        this.autoSlideInterval = null;
        this.reviews = [
            {
                rating: 9,
                textKey: "review-1",
                author: "Maria Silva",
                date: "15 Nov 2024"
            },
            {
                rating: 10,
                textKey: "review-2", 
                author: "João Pedro",
                date: "12 Nov 2024"
            },
            {
                rating: 8,
                textKey: "review-3",
                author: "Ana Rodrigues", 
                date: "08 Nov 2024"
            },
            {
                rating: 9,
                textKey: "review-4",
                author: "Carlos Martins",
                date: "05 Nov 2024"
            },
            {
                rating: 9,
                textKey: "review-5",
                author: "Sofia Lima",
                date: "02 Nov 2024"
            },
            {
                rating: 8,
                textKey: "review-6",
                author: "Pedro Fernandes",
                date: "28 Out 2024"
            }
        ];
        
        this.init();
        
        // Expose instance globally for language switcher
        window.reviewsCarouselInstance = this;
        
        // Listen for language changes
        document.addEventListener('languageChanged', (event) => {
            this.createCarousel();
        });
    }

    init() {
        this.createCarousel();
        this.startAutoSlide();
    }

    createCarousel() {
        const track = document.getElementById('reviews-track');
        if (!track) return;

        track.innerHTML = '';

        // Create multiple sets for seamless loop
        for (let set = 0; set < 3; set++) {
            this.reviews.forEach((review, index) => {
                const reviewElement = this.createReviewItem(review, index);
                track.appendChild(reviewElement);
            });
        }
    }

    createReviewItem(review, index) {
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        
        // Get first letter of first name for avatar
        const firstLetter = review.author.charAt(0).toUpperCase();
        
        // Get translated review text
        const currentLang = localStorage.getItem('language') || 'pt';
        const reviewText = this.getTranslation(review.textKey, currentLang);
        
        reviewItem.innerHTML = `
            <div class="review-rating">${review.rating}<span style="font-size: 0.7rem">/10</span></div>
            <div class="review-header">
                <div class="review-avatar">${firstLetter}</div>
                <div class="review-info">
                    <div class="review-author">${review.author}</div>
                    <div class="review-date">${review.date}</div>
                </div>
            </div>
            <div class="review-text">${reviewText}</div>
        `;

        return reviewItem;
    }
    
    getTranslation(key, language) {
        // Access translations from the global language switcher
        if (window.languageSwitcherTranslations && window.languageSwitcherTranslations[language] && window.languageSwitcherTranslations[language][key]) {
            return window.languageSwitcherTranslations[language][key];
        }
        
        // Fallback translations for reviews
        const fallbackTranslations = {
            pt: {
                'review-1': 'Experiência gastronômica excepcional! Recomendo vivamente.',
                'review-2': 'Serviço impecável e pratos deliciosos. Voltaremos certamente!',
                'review-3': 'Atmosfera única e sabores autênticos. Muito bom!',
                'review-4': 'Experiência inesquecível! Tudo foi perfeito.',
                'review-5': 'Cozinha de excelência. Pratos são obras de arte.',
                'review-6': 'Ambiente sofisticado e carta de vinhos excelente.'
            },
            en: {
                'review-1': 'Exceptional gastronomic experience! Highly recommend.',
                'review-2': 'Impeccable service and delicious dishes. We will definitely return!',
                'review-3': 'Unique atmosphere and authentic flavors. Very good!',
                'review-4': 'Unforgettable experience! Everything was perfect.',
                'review-5': 'Cuisine of excellence. Dishes are works of art.',
                'review-6': 'Sophisticated ambiance and excellent wine list.'
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

    updateCarousel() {
        const track = document.getElementById('reviews-track');
        if (!track) return;

        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // On mobile, center each card perfectly
            const carousel = document.querySelector('.reviews-carousel');
            const containerWidth = carousel ? carousel.offsetWidth : window.innerWidth;
            const translateX = -this.currentSlide * containerWidth;
            track.style.transform = `translateX(${translateX}px)`;
        } else {
            // Desktop behavior
            const slideWidth = 380; // 350px + 30px gap
            const translateX = -this.currentSlide * slideWidth;
            track.style.transform = `translateX(${translateX}px)`;
        }
    }

    nextSlide() {
        this.currentSlide++;
        
        // Reset to beginning when reaching the end of first set
        if (this.currentSlide >= this.reviews.length) {
            this.currentSlide = 0;
        }
        
        this.updateCarousel();
    }

    startAutoSlide() {
        // Clear any existing interval
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }

        // Start auto-sliding every 4 seconds
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 4000);
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ReviewsCarousel();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ReviewsCarousel;
}