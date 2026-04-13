/* ============================================
JAVASCRIPT GENERAL - Utilidades globales
============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    
    /* ============================================
    CURSOR PERSONALIZADO - Solo Desktop
    ============================================ */
    if (!isTouchDevice) {
        const cursorDot = document.querySelector('.cursor-dot');
        const cursorRing = document.querySelector('.cursor-ring');
        
        if (cursorDot && cursorRing) {
            let mouseX = 0, mouseY = 0;
            let ringX = 0, ringY = 0;
            
            document.addEventListener('mousemove', (e) => {
                mouseX = e.clientX;
                mouseY = e.clientY;
                cursorDot.style.left = mouseX + 'px';
                cursorDot.style.top = mouseY + 'px';
            });
            
            function animateRing() {
                ringX += (mouseX - ringX) * 0.15;
                ringY += (mouseY - ringY) * 0.15;
                cursorRing.style.left = ringX + 'px';
                cursorRing.style.top = ringY + 'px';
                requestAnimationFrame(animateRing);
            }
            animateRing();
            
            const interactiveElements = document.querySelectorAll('a, button, .slider-arrow, .indicator, .menu-toggle');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursorRing.classList.add('hover');
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
                });
                el.addEventListener('mouseleave', () => {
                    cursorRing.classList.remove('hover');
                    cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                });
            });
        }
    }
    
    /* ============================================
    NAVBAR - Efectos de scroll y comportamiento
    ============================================ */
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    if (navbar) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.05)';
            } else {
                navbar.style.boxShadow = 'none';
            }
            
            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            lastScroll = currentScroll;
        }, { passive: true });
    }
    
    /* ============================================
    MENÚ MÓVIL - Toggle y Dropdowns
    ============================================ */
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.dropbtn');
        if (link) {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    });
    
    /* ============================================
    INDEX - Hero Slider
    ============================================ */
    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.slider-arrow.prev');
    const nextBtn = document.querySelector('.slider-arrow.next');
    const currentEl = document.querySelector('.slide-counter .current');
    
    if (slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;
        let autoPlayInterval;
        
        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            if (indicators[currentSlide]) indicators[currentSlide].classList.remove('active');
            
            currentSlide = (index + totalSlides) % totalSlides;
            
            slides[currentSlide].classList.add('active');
            if (indicators[currentSlide]) indicators[currentSlide].classList.add('active');
            if (currentEl) currentEl.textContent = String(currentSlide + 1).padStart(2, '0');
        }
        
        function nextSlide() { goToSlide(currentSlide + 1); }
        function prevSlide() { goToSlide(currentSlide - 1); }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                resetAutoPlay();
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                resetAutoPlay();
            });
        }
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                goToSlide(index);
                resetAutoPlay();
            });
        });
        
        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(nextSlide, 5000);
        }
        
        function stopAutoPlay() {
            if (autoPlayInterval) clearInterval(autoPlayInterval);
        }
        
        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }
        
        startAutoPlay();
        
        const sliderContainer = document.querySelector('.hero-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopAutoPlay);
            sliderContainer.addEventListener('mouseleave', startAutoPlay);
        }
    }
    
    /* ============================================
    UTILIDADES GLOBALES - Scroll Progress y Back to Top
    ============================================ */
    const scrollProgress = document.querySelector('.scroll-progress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = scrollPercent + '%';
        }, { passive: true });
    }
    
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    /* ============================================
    NAVEGACIÓN SUAVE - Smooth Scroll para anclas
    ============================================ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            }
        });
    });
});