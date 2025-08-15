// Gallery Modal Implementation
class GalleryModal {
    constructor() {
        this.currentIndex = 0;
        this.images = [];
        this.modal = null;
        this.modalImage = null;
        this.pageIndicator = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.closeBtn = null;
        
        this.init();
    }

    init() {
        this.collectImages();
        this.setupElements();
        this.setupEventListeners();
    }

    collectImages() {
        // Collect all gallery images
        const galleryItems = document.querySelectorAll('.gallery-item img');
        this.images = Array.from(galleryItems).map(img => ({
            src: img.src,
            alt: img.alt
        }));
    }

    setupElements() {
        this.modal = document.getElementById('gallery-modal');
        this.modalImage = document.getElementById('gallery-modal-image');
        this.pageIndicator = document.getElementById('gallery-page-indicator');
        this.prevBtn = document.getElementById('gallery-prev-btn');
        this.nextBtn = document.getElementById('gallery-next-btn');
        this.closeBtn = document.getElementById('gallery-modal-close');
    }

    setupEventListeners() {
        // Add click listeners to gallery images
        document.querySelectorAll('.gallery-item img').forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', () => {
                this.openModal(index);
            });
        });

        // Modal navigation
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.previousImage());
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextImage());
        }

        // Close modal
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.closeModal());
        }

        // Close on background click
        if (this.modal) {
            this.modal.addEventListener('click', (e) => {
                if (e.target === this.modal) {
                    this.closeModal();
                }
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal && this.modal.style.display === 'block') {
                switch(e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.previousImage();
                        break;
                    case 'ArrowRight':
                        this.nextImage();
                        break;
                }
            }
        });
    }

    openModal(index) {
        this.currentIndex = index;
        this.updateModal();
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }

    nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateModal();
    }

    previousImage() {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateModal();
    }

    updateModal() {
        if (!this.modalImage || !this.pageIndicator) return;

        const currentImage = this.images[this.currentIndex];
        this.modalImage.src = currentImage.src;
        this.modalImage.alt = currentImage.alt;
        
        this.pageIndicator.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
        
        // Update navigation buttons
        if (this.prevBtn) {
            this.prevBtn.disabled = false;
        }
        if (this.nextBtn) {
            this.nextBtn.disabled = false;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize if we're on the gallery page
    if (document.querySelector('.instagram-gallery')) {
        new GalleryModal();
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GalleryModal;
}