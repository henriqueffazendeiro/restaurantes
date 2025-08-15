// Page Loader
function hideLoader() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

// Hide loader when page is fully loaded
window.addEventListener('load', hideLoader);

// Hide loader after 3 seconds as fallback
setTimeout(hideLoader, 3000);

document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileMenuClose = document.getElementById('mobile-menu-close');

    // Header scroll functionality
    const desktopLogo = document.querySelector('.desktop-logo');
    const mobileLogo = document.querySelector('.mobile-logo');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
            if (desktopLogo) desktopLogo.src = 'logomb.png';
            if (mobileLogo) mobileLogo.src = 'logomb.png';
        } else {
            header.classList.remove('scrolled');
            if (desktopLogo) desktopLogo.src = 'logopc.png';
            if (mobileLogo) mobileLogo.src = 'logo.png';
        }
    });

    // Mobile menu toggle
    let isMenuOpen = false;
    
    mobileMenuToggle.addEventListener('click', function() {
        isMenuOpen = !isMenuOpen;
        
        if (isMenuOpen) {
            mobileMenuOverlay.classList.add('active');
            document.body.classList.add('menu-open');
        } else {
            mobileMenuOverlay.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
        
        // Animate hamburger menu
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (isMenuOpen) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when X is clicked
    mobileMenuClose.addEventListener('click', function() {
        if (isMenuOpen) {
            mobileMenuToggle.click(); // Trigger the same logic
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (isMenuOpen && window.innerWidth <= 768) {
                    mobileMenuToggle.click();
                }
            }
        });
    });

    // Reserve button functionality
    const reserveBtn = document.querySelector('.reserve-btn');
    reserveBtn.addEventListener('click', function() {
        // Here you would typically integrate with TheFork API or redirect to booking page
        alert('Redirecionando para reserva...\n\nEm um site real, isto levaria para a página de reservas do TheFork.');
    });


    // Initialize mobile menu state
    function initializeMobileMenu() {
        if (window.innerWidth <= 768) {
            navbar.style.display = 'none';
            navbar.style.maxHeight = '0';
            navbar.style.opacity = '0';
            navbar.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
        } else {
            navbar.style.display = 'block';
            navbar.style.maxHeight = 'none';
            navbar.style.opacity = '1';
            isMenuOpen = false;
            
            // Reset hamburger menu
            const spans = mobileMenuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    // Initialize on load
    initializeMobileMenu();

    // Reinitialize on window resize
    window.addEventListener('resize', function() {
        initializeMobileMenu();
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
});