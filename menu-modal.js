// Menu Modal Implementation
class MenuModal {
    constructor() {
        this.currentPage = 0;
        this.totalPages = 5;
        this.isZoomed = false;
        this.menuImages = [
            'menu1.avif',
            'menu2.avif', 
            'menu3.avif',
            'menu4.avif',
            'menu5.avif'
        ];
        
        this.modal = document.getElementById('menu-modal');
        this.menuImage = document.getElementById('menu-image');
        this.pageIndicator = document.getElementById('page-indicator');
        this.prevBtn = document.getElementById('prev-page');
        this.nextBtn = document.getElementById('next-page');
        this.closeBtn = document.querySelector('.menu-close');
        
        this.init();
    }

    init() {
        // Add click event to "Ver Menu" buttons
        const menuButtons = document.querySelectorAll('.menu-btn');
        menuButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal();
            });
        });

        // Modal controls
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.prevBtn.addEventListener('click', () => this.prevPage());
        this.nextBtn.addEventListener('click', () => this.nextPage());
        this.menuImage.addEventListener('click', () => this.toggleZoom());
        
        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.style.display === 'block') {
                switch(e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.prevPage();
                        break;
                    case 'ArrowRight':
                        this.nextPage();
                        break;
                }
            }
        });
    }

    openModal() {
        this.currentPage = 0;
        this.isZoomed = false;
        this.updatePage();
        this.modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    closeModal() {
        this.modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    prevPage() {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.isZoomed = false;
            this.updatePage();
        }
    }

    nextPage() {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.isZoomed = false;
            this.updatePage();
        }
    }

    updatePage() {
        // Update image
        this.menuImage.src = this.menuImages[this.currentPage];
        
        // Update page indicator
        this.pageIndicator.textContent = `${this.currentPage + 1} / ${this.totalPages}`;
        
        // Update navigation buttons
        this.prevBtn.disabled = this.currentPage === 0;
        this.nextBtn.disabled = this.currentPage === this.totalPages - 1;

        // Reset zoom state
        this.menuImage.classList.remove('zoomed');

        // Add page flip animation
        this.menuImage.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.menuImage.style.transform = this.isZoomed ? 'scale(2)' : 'scale(1)';
            if (this.isZoomed) {
                this.menuImage.classList.add('zoomed');
            }
        }, 150);
    }

    toggleZoom() {
        this.isZoomed = !this.isZoomed;
        
        const navigation = document.querySelector('.menu-navigation');
        const pageIndicator = document.querySelector('.menu-page-indicator');
        const closeBtn = document.querySelector('.menu-close');
        const menuPage = document.querySelector('.menu-page');
        
        if (this.isZoomed) {
            this.menuImage.classList.add('zoomed');
            this.menuImage.style.position = 'fixed';
            this.menuImage.style.top = '50%';
            this.menuImage.style.left = '50%';
            this.menuImage.style.transform = 'translate(-50%, -50%)';
            this.menuImage.style.width = '70vw';
            this.menuImage.style.height = '70vh';
            this.menuImage.style.maxWidth = 'none';
            this.menuImage.style.maxHeight = 'none';
            this.menuImage.style.objectFit = 'contain';
            this.menuImage.style.zIndex = '10000';
            navigation.style.display = 'none';
            pageIndicator.style.display = 'none';
            closeBtn.style.display = 'none';
        } else {
            this.menuImage.classList.remove('zoomed');
            this.menuImage.style.position = '';
            this.menuImage.style.top = '';
            this.menuImage.style.left = '';
            this.menuImage.style.transform = '';
            this.menuImage.style.width = '';
            this.menuImage.style.height = '';
            this.menuImage.style.maxWidth = '';
            this.menuImage.style.maxHeight = '';
            this.menuImage.style.objectFit = '';
            this.menuImage.style.zIndex = '';
            navigation.style.display = 'flex';
            pageIndicator.style.display = 'block';
            closeBtn.style.display = 'block';
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MenuModal();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MenuModal;
}