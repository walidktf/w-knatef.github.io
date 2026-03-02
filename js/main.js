// ===== ATTENTE CHARGEMENT DOM =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CURSEUR PERSONNALISÉ =====
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Ajout de l'effet hover sur tous les éléments cliquables
        document.querySelectorAll('a, button, .service-card, .service-option, .btn, .pillar-card, .service-detail-card, .aid-card').forEach(el => {
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
            
            // Animation du bouton hamburger
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }

    // ===== ANIMATIONS AU SCROLL (REVEAL) =====
    function initScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150; // Seuil de déclenchement
            
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('revealed');
            }
        });
    }

    window.addEventListener('scroll', initScrollReveal);
    initScrollReveal(); // Lancement initial

    // ===== TIMELINE ANIMATION SPÉCIFIQUE =====
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

        // Auto-slide
        setInterval(() => {
            if (slides.length > 0) {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }
        }, 5000);
    }

    // ===== SÉLECTEUR DE SERVICES (contact) =====
    const serviceOptions = document.querySelectorAll('.service-option');
    serviceOptions.forEach(opt => {
        opt.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });

    // ===== COMPTEUR DE CARACTÈRES =====
    const textarea = document.getElementById('contactMessage');
    const counter = document.getElementById('charCounter');
    
    if (textarea && counter) {
        textarea.addEventListener('input', () => {
            const count = textarea.value.length;
            counter.textContent = `${count}/1000`;
            
            // Changement de couleur si proche de la limite
            if (count > 900) {
                counter.style.color = 'orange';
            } else {
                counter.style.color = 'var(--gray-600)';
            }
        });
    }

    // ===== BOUTON RAPPEL ACCUEIL =====
    const btnRappel = document.getElementById('btnRappelAccueil');
    if (btnRappel) {
        btnRappel.addEventListener('click', (e) => {
            e.preventDefault();
            const prenom = document.getElementById('prenomAccueil')?.value;
            const tel = document.getElementById('telAccueil')?.value;
            const cp = document.getElementById('cpAccueil')?.value;
            const rgpd = document.getElementById('rgpdAccueil')?.checked;
            
            if (!prenom || !tel || !cp) {
                alert('Veuillez remplir tous les champs obligatoires (Prénom, Téléphone, Code postal).');
            } else if (!rgpd) {
                alert('Veuillez accepter d\'être contacté.');
            } else {
                alert(`Merci ${prenom} ! Nous vous rappellerons au ${tel} sous 24h.`);
                // Ici vous pourriez envoyer les données à un serveur
                document.getElementById('prenomAccueil').value = '';
                document.getElementById('telAccueil').value = '';
                document.getElementById('cpAccueil').value = '';
                document.getElementById('rgpdAccueil').checked = false;
            }
        });
    }

    // ===== SOUMISSION FORMULAIRE CONTACT =====
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = document.getElementById('submitBtn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Animation du bouton
            if (submitBtn) {
                submitBtn.innerHTML = '⏳ Envoi en cours...';
                submitBtn.disabled = true;
            }
            
            // Simulation d'envoi
            setTimeout(() => {
                if (formSuccess) {
                    formSuccess.style.display = 'block';
                }
                
                if (submitBtn) {
                    submitBtn.innerHTML = '✓ Message envoyé !';
                }
                
                contactForm.reset();
                
                // Réinitialiser les sélections
                document.querySelectorAll('.service-option.selected').forEach(opt => {
                    opt.classList.remove('selected');
                });
                
                // Cacher le message après 5 secondes
                setTimeout(() => {
                    if (formSuccess) {
                        formSuccess.style.display = 'none';
                    }
                    if (submitBtn) {
                        submitBtn.innerHTML = 'Envoyer ma demande';
                        submitBtn.disabled = false;
                    }
                }, 5000);
                
            }, 1500);
        });
    }

    // ===== ACTIVE PAGE DANS LE MENU =====
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '/' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });

    // ===== VIDÉO AUTO PAUSE (performance) =====
    const video = document.querySelector('video');
    if (video) {
        // Pause vidéo quand hors écran
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
