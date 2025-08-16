// Language Switcher Implementation
class LanguageSwitcher {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'pt';
        // Expose translations globally for other components
        window.languageSwitcherTranslations = this.translations = {
            pt: {
                // Navigation
                'nav-about': 'Sobre',
                'nav-menu': 'Menu',
                'nav-gallery': 'Galeria',
                'nav-contact': 'Contacto',
                
                // Hero Section
                'hero-title': "There's a new sauvage in town",
                'hero-subtitle': 'A melhor vista e a melhor comida estão à sua espera!',
                'hero-reserve': 'Reservar Mesa',
                'hero-gallery': 'Ver Galeria',
                
                // About Section
                'about-subtitle': 'A NOSSA HISTÓRIA',
                'about-title': 'Sobre Nós . . .',
                'about-text-1': 'No coração de Belém, o Sauvage CCB oferece uma experiência gastronómica única onde cada prato conta uma história e cada momento se torna memória.',
                'about-text-2': 'Combinamos sabores autênticos com uma atmosfera sofisticada, proporcionando momentos inesquecíveis com vista privilegiada para o Tejo.',
                
                // Menu Section
                'menu-subtitle': 'Experimente o nosso sabor',
                'menu-title': 'O nosso menu',
                'menu-description': 'Descubra a nossa seleção de pratos cuidadosamente elaborados pelos nossos chefs.',
                'menu-btn': 'Ver Menu Completo',
                
                // Gallery Section
                'gallery-subtitle': 'FOTOS',
                'gallery-title': 'Galeria',
                'gallery-description': 'Fique a conhecer-nos um pouco melhor',
                'gallery-btn': 'Ver Galeria',
                'gallery-page-title': 'Galeria',
                
                // Reviews Section
                'reviews-subtitle': 'Avaliações reais de quem já viveu a experiência.',
                'reviews-title': 'O que dizem os nossos clientes',
                
                // Reserve Section
                'reserve-title': 'A melhor vista e a melhor comida estão à sua espera!',
                'reserve-subtitle': 'Não perca mais tempo, reserve connosco!',
                'reserve-btn': 'Reservar mesa',
                
                // Contact Section
                'contact-title': 'Visite-nos',
                'contact-address': 'Centro Cultural de Belém, Praça do Império, 1449-003 Lisboa',
                
                // Footer
                'footer-contact': 'Contacto',
                'footer-hours': 'Horários',
                'footer-links': 'Links',
                'footer-follow': 'Siga-nos',
                'footer-rights': 'Todos os direitos reservados.',
                'footer-hours-weekday': 'Segunda - Sexta: 12:00 - 24:00',
                'footer-hours-weekend': 'Sábado - Domingo: 12:00 - 01:00',
                'footer-location': 'Centro Cultural de Belém, Lisboa',
                
                // Mobile Menu
                'mobile-menu-title': 'Menu',
                'mobile-reserve-btn': 'Reservar Mesa',
                
                // Breadcrumbs
                'breadcrumb-home': 'Início',
                'breadcrumb-gallery': 'Galeria',
                'breadcrumb-menu': 'Menu',
                
                // Menu Categories
                'menu-starters': 'PARA COMEÇAR',
                'menu-mains': 'PRINCIPAIS',
                'menu-sides': 'GUARNIÇÕES',
                'menu-desserts': 'SOBREMESAS',
                'menu-champagne': 'CHAMPAGNE E ESPUMANTE (GARRAFA)',
                'menu-white-wine': 'BRANCO (GARRAFA)',
                'menu-red-wine': 'TINTO (GARRAFA)',
                'menu-beer': 'CERVEJA',
                'menu-coffee': 'CAFETARIA',
                'menu-gin': 'GIN',
                'menu-whisky': 'WHISKY',
                'menu-vodka': 'VODKA',
                'menu-spirits': 'GENEROSOS / LICOROSOS',
                'menu-mule': 'MULE SAUVAGE',
                
                // Menu Items - Starters
                'couvert': 'Couvert',
                'couvert-desc': 'Pão 100% trigo, manteiga trufada e azeite extra virgem',
                'creme': 'Creme',
                'creme-desc': 'Creme de legumes, croutons e azeite de salsa',
                'croquetes-pato': 'Croquetes de pato (3 uni.)',
                'croquetes-desc': 'Croquete, compota de marmelo caramelizado e pickles de mostarda',
                'nigiri-pato': 'Nigiri de pato',
                'nigiri-desc': 'Arroz de sushi, magret de pato e teryaki de laranja',
                'guioza': 'Guioza de legumes',
                'guioza-desc': 'Ponzu e sementes de sésamo',
                'tartaro-atum': 'Tártaro de atum',
                'tartaro-desc': 'Picado de atum, amendoim frito envolto em algas, molho oriental, caviar de yuzo e palha de alho francês',
                'tempura-camarao': 'Tempura de camarão',
                'tempura-desc': 'Camarão frito em tempura, maionese de coentros e lima',
                'ceviche-robalo': 'Ceviche robalo',
                'ceviche-desc': 'Robalo, leite tigre, algas e óleo coentros',
                'katsu-sando': 'Katsu sando',
                'katsu-desc': 'Pão brioche, frango panado, legumes, ponzu e mizo',
                'burrata': 'Burrata',
                'burrata-desc': 'Burrata, molho manjericão, mix de tomate cereja e fruta',
                
                // Menu Items - Mains
                'linguine-trufado': 'Linguine trufado',
                'linguine-desc': 'Massa linguine, molho trufado com queijo creme, gema de ovo, lascas de trufa, cebola crocante e molho holandês',
                'risotto-cogumelos': 'Risotto de cogumelos',
                'risotto-desc': 'Arroz arbóreo, cogumelos ostra, paris, marron e queijo parmesão',
                'atum-fresco': 'Atum fresco',
                'atum-desc': 'Tataki de atum envolto em tajin e nori, legumes salteados e molho verde',
                'pad-thai': 'Pad thai camarão',
                'pad-thai-desc': 'Massa de arroz, legumes salteados, camarão, ovo, amendoim, rebentos de feijão mungo, tamarindo e teriaky',
                'nasi-goreng': 'Nasi goreng de polvo',
                'nasi-desc': 'Arroz basmati, ovo, legumes salteados, polvo e aioli de mostarda',
                'wellington-pato': '"Wellington" de pato',
                'wellington-desc': 'Massa quebrada, panqueca de espinafre, duxelle, pato desfiado e salada de espinafre',
                'entrecote': 'Entrecôte (250gr)',
                'entrecote-desc': 'Batata frita e molho "marrare"',
                
                // Menu Items - Sides
                'arroz': 'Arroz',
                'batata-frita': 'Batata frita',
                'legumes-salteados': 'Legumes salteados',
                
                // Menu Items - Desserts
                'tarte-lima': 'Tarte de lima',
                'tarte-desc': 'Base bolacha e creme de lima caramelizado',
                'caminho-salomao': 'Caminho de salomão',
                'caminho-desc': 'Bolacha, natas, doce de ovo, caramelo salgado e suspiro',
                'mousse-chocolate': 'Mousse de chocolate',
                'mousse-desc': 'Chocolate negro, flat bread de cacau e pérolas de azeite',
                
                // Contact & Map
                'contact-title': 'Visite-nos',
                'contact-address': 'Av. António Serpa 9, 1050-053 Lisboa',
                
                // Food Items (from carousel)
                'ravioli-abobora': 'Ravioli de abóbora',
                'ravioli-desc': 'Massa fresca, abóbora assada, nóz, queijo cabra caramelizado, molho cítrico de queijo',
                'arroz-robalo': 'Arroz de robalo',
                'arroz-robalo-desc': 'Robalo, arroz carolino, coentros, algas e salicórnia',
                'polvo': 'Polvo',
                'polvo-desc': 'Patanisca de polvo, arroz de tomate e maionese de tinta de choco',
                'lombo-atum': 'Lombo de atum',
                'lombo-desc': 'Atum braseado, legumes salteados, molho verde e crocante de limão',
                'peixe-galo': 'Peixe galo',
                'peixe-desc': 'Filete de peixe galo frito, salada russa, molho de manteiga e alcaparras',
                'wellington-leitao': '"Wellington" de leitão',
                'wellington-leitao-desc': 'Massa quebrada, leitão, duxelles, salada de espinafre baby e mix de tomate cereja',
                'entrecote-250': 'Entrecôte (250gr)',
                'entrecote-250-desc': 'Novilho, batata frita e molho "marrare"',
                
                // Reviews
                'review-1': 'Experiência gastronômica excepcional! Recomendo vivamente.',
                'review-2': 'Serviço impecável e pratos deliciosos. Voltaremos certamente!',
                'review-3': 'Atmosfera única e sabores autênticos. Muito bom!',
                'review-4': 'Experiência inesquecível! Tudo foi perfeito.',
                'review-5': 'Cozinha de excelência. Pratos são obras de arte.',
                'review-6': 'Ambiente sofisticado e carta de vinhos excelente.',
                
                // Dish Cards Tags
                'chef-special': "⭐ Chef's Special",
                'tag-vegetarian': 'Vegetariano',
                'tag-fish': 'Peixe',
                'tag-meat': 'Carne'
            },
            en: {
                // Navigation
                'nav-about': 'About',
                'nav-menu': 'Menu',
                'nav-gallery': 'Gallery',
                'nav-contact': 'Contact',
                
                // Hero Section
                'hero-title': "There's a new sauvage in town",
                'hero-subtitle': 'The best view and the best food await you!',
                'hero-reserve': 'Book Table',
                'hero-gallery': 'View Gallery',
                
                // About Section
                'about-subtitle': 'OUR STORY',
                'about-title': 'About Us . . .',
                'about-text-1': 'In the heart of Belém, Sauvage CCB offers a unique gastronomic experience where each dish tells a story and every moment becomes memory.',
                'about-text-2': 'We combine authentic flavors with a sophisticated atmosphere, providing unforgettable moments with privileged views over the Tagus.',
                
                // Menu Section
                'menu-subtitle': 'Experience our flavor',
                'menu-title': 'Our menu',
                'menu-description': 'Discover our selection of dishes carefully crafted by our chefs.',
                'menu-btn': 'View Full Menu',
                
                // Gallery Section
                'gallery-subtitle': 'PHOTOS',
                'gallery-title': 'Gallery',
                'gallery-description': 'Get to know us a little better',
                'gallery-btn': 'View Gallery',
                'gallery-page-title': 'Gallery',
                
                // Reviews Section
                'reviews-subtitle': 'Real reviews from those who have lived the experience.',
                'reviews-title': 'What our customers say',
                
                // Reserve Section
                'reserve-title': 'The best view and the best food await you!',
                'reserve-subtitle': "Don't waste any more time, book with us!",
                'reserve-btn': 'Book table',
                
                // Contact Section
                'contact-title': 'Visit us',
                'contact-address': 'Belém Cultural Center, Praça do Império, 1449-003 Lisbon',
                
                // Footer
                'footer-contact': 'Contact',
                'footer-hours': 'Hours',
                'footer-links': 'Links',
                'footer-follow': 'Follow us',
                'footer-rights': 'All rights reserved.',
                'footer-hours-weekday': 'Monday - Friday: 12:00 - 24:00',
                'footer-hours-weekend': 'Saturday - Sunday: 12:00 - 01:00',
                'footer-location': 'Belém Cultural Center, Lisbon',
                
                // Mobile Menu
                'mobile-menu-title': 'Menu',
                'mobile-reserve-btn': 'Book Table',
                
                // Breadcrumbs
                'breadcrumb-home': 'Home',
                'breadcrumb-gallery': 'Gallery',
                'breadcrumb-menu': 'Menu',
                
                // Menu Categories
                'menu-starters': 'STARTERS',
                'menu-mains': 'MAIN COURSES',
                'menu-sides': 'SIDES',
                'menu-desserts': 'DESSERTS',
                'menu-champagne': 'CHAMPAGNE & SPARKLING (BOTTLE)',
                'menu-white-wine': 'WHITE WINE (BOTTLE)',
                'menu-red-wine': 'RED WINE (BOTTLE)',
                'menu-beer': 'BEER',
                'menu-coffee': 'COFFEE & TEA',
                'menu-gin': 'GIN',
                'menu-whisky': 'WHISKY',
                'menu-vodka': 'VODKA',
                'menu-spirits': 'SPIRITS & LIQUEURS',
                'menu-mule': 'SAUVAGE MULE',
                
                // Menu Items - Starters
                'couvert': 'Bread & Appetizers',
                'couvert-desc': '100% wheat bread, truffle butter and extra virgin olive oil',
                'creme': 'Cream Soup',
                'creme-desc': 'Vegetable cream, croutons and parsley oil',
                'croquetes-pato': 'Duck croquettes (3 pcs.)',
                'croquetes-desc': 'Croquette, caramelized quince compote and mustard pickles',
                'nigiri-pato': 'Duck nigiri',
                'nigiri-desc': 'Sushi rice, duck breast and orange teriyaki',
                'guioza': 'Vegetable gyoza',
                'guioza-desc': 'Ponzu and sesame seeds',
                'tartaro-atum': 'Tuna tartare',
                'tartaro-desc': 'Chopped tuna, fried peanuts wrapped in seaweed, oriental sauce, yuzu caviar and french garlic straw',
                'tempura-camarao': 'Shrimp tempura',
                'tempura-desc': 'Tempura fried shrimp, cilantro and lime mayonnaise',
                'ceviche-robalo': 'Sea bass ceviche',
                'ceviche-desc': 'Sea bass, tiger milk, seaweed and cilantro oil',
                'katsu-sando': 'Katsu sando',
                'katsu-desc': 'Brioche bread, breaded chicken, vegetables, ponzu and miso',
                'burrata': 'Burrata',
                'burrata-desc': 'Burrata, basil sauce, cherry tomato and fruit mix',
                
                // Menu Items - Mains
                'linguine-trufado': 'Truffle linguine',
                'linguine-desc': 'Linguine pasta, truffle sauce with cream cheese, egg yolk, truffle shavings, crispy onion and hollandaise sauce',
                'risotto-cogumelos': 'Mushroom risotto',
                'risotto-desc': 'Arborio rice, oyster, paris, marron mushrooms and parmesan cheese',
                'atum-fresco': 'Fresh tuna',
                'atum-desc': 'Tuna tataki wrapped in tajin and nori, sautéed vegetables and green sauce',
                'pad-thai': 'Shrimp pad thai',
                'pad-thai-desc': 'Rice noodles, sautéed vegetables, shrimp, egg, peanuts, mung bean sprouts, tamarind and teriyaki',
                'nasi-goreng': 'Octopus nasi goreng',
                'nasi-desc': 'Basmati rice, egg, sautéed vegetables, octopus and mustard aioli',
                'wellington-pato': 'Duck "Wellington"',
                'wellington-desc': 'Shortcrust pastry, spinach pancake, duxelle, shredded duck and spinach salad',
                'entrecote': 'Ribeye (250gr)',
                'entrecote-desc': 'French fries and "marrare" sauce',
                
                // Menu Items - Sides
                'arroz': 'Rice',
                'batata-frita': 'French fries',
                'legumes-salteados': 'Sautéed vegetables',
                
                // Menu Items - Desserts
                'tarte-lima': 'Lime tart',
                'tarte-desc': 'Cookie base and caramelized lime cream',
                'caminho-salomao': "Solomon's path",
                'caminho-desc': 'Cookie, cream, egg sweet, salted caramel and meringue',
                'mousse-chocolate': 'Chocolate mousse',
                'mousse-desc': 'Dark chocolate, cocoa flat bread and olive oil pearls',
                
                // Contact & Map
                'contact-title': 'Visit us',
                'contact-address': 'Av. António Serpa 9, 1050-053 Lisbon',
                
                // Food Items (from carousel)
                'ravioli-abobora': 'Pumpkin ravioli',
                'ravioli-desc': 'Fresh pasta, roasted pumpkin, walnut, caramelized goat cheese, citrus cheese sauce',
                'arroz-robalo': 'Sea bass rice',
                'arroz-robalo-desc': 'Sea bass, carolino rice, cilantro, seaweed and salicornia',
                'polvo': 'Octopus',
                'polvo-desc': 'Octopus fritter, tomato rice and squid ink mayonnaise',
                'lombo-atum': 'Tuna loin',
                'lombo-desc': 'Braised tuna, sautéed vegetables, green sauce and lemon crisp',
                'peixe-galo': 'John Dory',
                'peixe-desc': 'Fried john dory fillet, russian salad, butter and caper sauce',
                'wellington-leitao': 'Suckling pig "Wellington"',
                'wellington-leitao-desc': 'Shortcrust pastry, suckling pig, duxelles, baby spinach salad and cherry tomato mix',
                'entrecote-250': 'Ribeye (250gr)',
                'entrecote-250-desc': 'Young bull, french fries and "marrare" sauce',
                
                // Reviews
                'review-1': 'Exceptional gastronomic experience! Highly recommend.',
                'review-2': 'Impeccable service and delicious dishes. We will definitely return!',
                'review-3': 'Unique atmosphere and authentic flavors. Very good!',
                'review-4': 'Unforgettable experience! Everything was perfect.',
                'review-5': 'Cuisine of excellence. Dishes are works of art.',
                'review-6': 'Sophisticated ambiance and excellent wine list.',
                
                // Dish Cards Tags
                'chef-special': "⭐ Chef's Special",
                'tag-vegetarian': 'Vegetarian',
                'tag-fish': 'Fish',
                'tag-meat': 'Meat'
            }
        };
        
        this.init();
    }
    
    init() {
        this.setupLanguageButtons();
        this.setLanguage(this.currentLanguage);
    }
    
    setupLanguageButtons() {
        const langButtons = document.querySelectorAll('.lang-btn');
        
        langButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const selectedLang = e.currentTarget.dataset.lang;
                this.setLanguage(selectedLang);
            });
        });
    }
    
    setLanguage(language) {
        this.currentLanguage = language;
        localStorage.setItem('language', language);
        
        // Update active button
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === language) {
                btn.classList.add('active');
            }
        });
        
        // Update translations
        this.updateTranslations();
        
        // Update automatic translations (for elements without data-translate)
        this.updateAutomaticTranslations();
        
        // Update dynamic components (carousels, etc.)
        this.updateDynamicComponents();
        
        // Update HTML lang attribute
        document.documentElement.lang = language === 'pt' ? 'pt-PT' : 'en-US';
    }
    
    updateTranslations() {
        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.dataset.translate;
            const translation = this.translations[this.currentLanguage][key];
            
            if (translation) {
                // Handle different element types
                if (element.tagName === 'INPUT' && element.type === 'submit') {
                    element.value = translation;
                } else if (element.hasAttribute('placeholder')) {
                    element.placeholder = translation;
                } else if (element.hasAttribute('alt')) {
                    element.alt = translation;
                } else if (element.hasAttribute('title')) {
                    element.title = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update page title and meta descriptions
        this.updatePageTitle();
        this.updateMetaDescriptions();
    }
    
    updatePageTitle() {
        const currentTitle = document.title;
        
        if (this.currentLanguage === 'en') {
            if (currentTitle.includes('Menu Completo')) {
                document.title = 'Full Menu - Sauvage CCB | Gourmet Restaurant Lisbon';
            } else if (currentTitle.includes('Galeria')) {
                document.title = 'Photo Gallery - Sauvage CCB | Restaurant Lisbon';
            } else if (currentTitle.includes('Sauvage CCB')) {
                document.title = 'Sauvage CCB - Gourmet Restaurant at Belém Cultural Center | Lisbon';
            }
        } else {
            if (currentTitle.includes('Full Menu')) {
                document.title = 'Menu Completo - Sauvage CCB | Restaurante Lisboa';
            } else if (currentTitle.includes('Photo Gallery')) {
                document.title = 'Galeria de Fotos - Sauvage CCB | Restaurante Lisboa';
            } else if (currentTitle.includes('Gourmet Restaurant at Belém')) {
                document.title = 'Sauvage CCB - Restaurante Gourmet no Centro Cultural de Belém | Lisboa';
            }
        }
    }
    
    updateMetaDescriptions() {
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            if (this.currentLanguage === 'en') {
                if (window.location.pathname.includes('menu.html')) {
                    metaDesc.content = 'Explore the complete menu of Sauvage CCB. Discover our gourmet dishes, chef specialties and unique gastronomic experiences in Lisbon.';
                } else if (window.location.pathname.includes('galeria.html')) {
                    metaDesc.content = 'Explore the photo gallery of Sauvage CCB. See the unique atmosphere of our restaurant at Belém Cultural Center, gourmet dishes and gastronomic experiences.';
                } else {
                    metaDesc.content = 'Discover Sauvage CCB, gourmet restaurant at Belém Cultural Center, Lisbon. Excellence in gastronomy with unique view. Book through TheFork.';
                }
            } else {
                if (window.location.pathname.includes('menu.html')) {
                    metaDesc.content = 'Explore o menu completo do Sauvage CCB. Descobrira a nossa carta de pratos gourmet, especialidades do chef e experiências gastronómicas únicas em Lisboa.';
                } else if (window.location.pathname.includes('galeria.html')) {
                    metaDesc.content = 'Explore a galeria de fotos do Sauvage CCB. Veja o ambiente único do nosso restaurante no Centro Cultural de Belém, pratos gourmet e experiências gastronómicas.';
                } else {
                    metaDesc.content = 'Descubra o Sauvage CCB, restaurante gourmet no Centro Cultural de Belém, Lisboa. Gastronomia de excelência com vista única. Reservas através do TheFork.';
                }
            }
        }
    }
    
    updateAutomaticTranslations() {
        // Auto-translate common patterns without data-translate attributes
        const autoTranslations = {
            pt: {
                'Lisboa': 'Lisboa',
                'Centro Cultural de Belém': 'Centro Cultural de Belém',
                'Sauvage CCB': 'Sauvage CCB'
            },
            en: {
                'Lisboa': 'Lisbon',
                'Centro Cultural de Belém': 'Belém Cultural Center',
                'Sauvage CCB': 'Sauvage CCB'
            }
        };
        
        // Get all text nodes and replace common patterns
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );
        
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeValue.trim() && 
                !node.parentElement.hasAttribute('data-translate') &&
                !node.parentElement.closest('script')) {
                textNodes.push(node);
            }
        }
        
        textNodes.forEach(textNode => {
            let content = textNode.nodeValue;
            const translations = autoTranslations[this.currentLanguage];
            
            Object.keys(translations).forEach(key => {
                const regex = new RegExp(key, 'gi');
                content = content.replace(regex, translations[key]);
            });
            
            if (content !== textNode.nodeValue) {
                textNode.nodeValue = content;
            }
        });
    }
    
    updateDynamicComponents() {
        // Update food carousel if it exists
        if (window.foodCarouselInstance) {
            window.foodCarouselInstance.refreshForLanguage();
        }
        
        // Update reviews carousel if it exists
        if (window.reviewsCarouselInstance) {
            window.reviewsCarouselInstance.refreshForLanguage();
        }
        
        // Trigger a custom event for other components to listen
        const languageChangeEvent = new CustomEvent('languageChanged', {
            detail: { language: this.currentLanguage }
        });
        document.dispatchEvent(languageChangeEvent);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LanguageSwitcher();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LanguageSwitcher;
}