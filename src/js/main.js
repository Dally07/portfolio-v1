        // Theme Toggle
        function toggleTheme() {
            const body = document.body;
            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            body.setAttribute('data-theme', newTheme);
            
            const themeIcon = document.querySelector('.theme-toggle i');
            themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }

        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar Active Link & Scroll Effects
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            const scrolled = window.pageYOffset > 100;
            
            navbar.classList.toggle('scrolled', scrolled);
            
            // Update active navigation link
            const sections = document.querySelectorAll('.section, #hero');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Scroll Animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.section-title, .about-text, .about-visual, .project-card, .service-card').forEach(el => {
            observer.observe(el);
        });

        // Project Filtering
        function filterProjects(category) {
            const cards = document.querySelectorAll('.project-card');
            const buttons = document.querySelectorAll('.filter-btn');
            
            // Update active button
            buttons.forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');
            
            // Filter cards
            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(50px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        }

        // Skills Card Expansion
        let expandedCard = null;

        function expandSkill(card) {
            if (expandedCard && expandedCard !== card) {
                expandedCard.classList.remove('expanded');
            }
            
            if (expandedCard === card) {
                card.classList.remove('expanded');
                expandedCard = null;
                document.body.style.overflow = 'auto';
            } else {
                card.classList.add('expanded');
                expandedCard = card;
                document.body.style.overflow = 'hidden';
            }
        }

        // Close expanded skill card when clicking outside
        document.addEventListener('click', (e) => {
            if (expandedCard && !expandedCard.contains(e.target)) {
                expandedCard.classList.remove('expanded');
                expandedCard = null;
                document.body.style.overflow = 'auto';
            }
        });

        // Contact Form Handling
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    this.reset();
                }, 2000);
            }, 1500);
        });

        // Mobile Skills Touch Support
        if ('ontouchstart' in window) {
            document.querySelector('.skills-circle').style.animation = 'none';
            
            let startX, startY;
            const skillsContainer = document.querySelector('.skills-container');
            
            skillsContainer.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            });
            
            skillsContainer.addEventListener('touchmove', (e) => {
                e.preventDefault();
            });
            
            skillsContainer.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const endY = e.changedTouches[0].clientY;
                const diffX = startX - endX;
                const diffY = startY - endY;
                
                if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                    // Swipe detected - rotate skills circle
                    const circle = document.querySelector('.skills-circle');
                    const currentRotation = parseInt(circle.style.transform?.match(/rotate\((-?\d+)deg\)/)?.[1] || '0');
                    const newRotation = currentRotation + (diffX > 0 ? 45 : -45);
                    circle.style.transform = `rotate(${newRotation}deg)`;
                    circle.style.transition = 'transform 0.5s ease';
                    
                    setTimeout(() => {
                        circle.style.transition = '';
                    }, 500);
                }
            });
        }

        // Parallax Effect for Hero Section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            
            if (hero && scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Initialize animations on page load
        window.addEventListener('load', () => {
            // Stagger project card animations
            const projectCards = document.querySelectorAll('.project-card');
            projectCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 100);
            });
            
            // Stagger service card animations
            const serviceCards = document.querySelectorAll('.service-card');
            serviceCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate');
                }, index * 150);
            });
        });

        // Add floating particles effect
        function createParticle() {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: rgba(124, 58, 237, 0.3);
                border-radius: 50%;
                pointer-events: none;
                z-index: -1;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                animation: floatUp ${3 + Math.random() * 4}s linear forwards;
            `;
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 7000);
        }

        // Add CSS for floating particles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes floatUp {
                to {
                    transform: translateY(-100vh) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);

        // Create particles periodically
        setInterval(createParticle, 2000);