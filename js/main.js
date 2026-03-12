// ===== ATTENTE CHARGEMENT DOM =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CURSEUR PERSONNALISÉ =====
    const cursor = document.querySelector('.cursor');
    const isMobile = window.innerWidth <= 768;
    
    if (cursor && !isMobile) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .service-card, .service-option, .btn, .pillar-card, .service-detail-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // ===== HEADER SCROLL =====
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ===== MENU MOBILE =====
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }

    // ===== ANIMATIONS AU SCROLL =====
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('revealed');
            }
        });
    }

    window.addEventListener('scroll', initScrollReveal);
    initScrollReveal();

    // ===== TIMELINE ANIMATION =====
    function initTimelineReveal() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        const windowHeight = window.innerHeight;
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < windowHeight - 80) {
                item.classList.add('revealed');
            }
        });
    }
    
    window.addEventListener('scroll', initTimelineReveal);
    initTimelineReveal();

    // ===== TÉMOIGNAGES SLIDER =====
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        setInterval(() => {
            if (slides.length > 0) {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }
        }, 5000);
    }

    // ===== CARROUSEL VIDÉO =====
    const videoSlides = document.querySelectorAll('.video-slide');
    if (videoSlides.length > 0) {
        let currentVideo = 0;
        
        function nextVideo() {
            videoSlides[currentVideo].classList.remove('active');
            currentVideo = (currentVideo + 1) % videoSlides.length;
            videoSlides[currentVideo].classList.add('active');
        }
        
        setInterval(nextVideo, 8000);
    }

    // ===== VIDÉO AUTO PAUSE =====
    const video = document.querySelector('video');
    if (video) {
        window.addEventListener('scroll', () => {
            const rect = video.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (!isVisible && !video.paused) {
                video.pause();
            } else if (isVisible && video.paused) {
                video.play();
            }
        });
    }

    // ===== EFFET DE SURVOL CARTES =====
    const cards = document.querySelectorAll('.service-card, .service-detail-card, .pillar-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleX = (y - centerY) / 20;
            const angleY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
});