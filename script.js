// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Tab navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const tabContents = document.querySelectorAll('.tab-content');
    const footerLinks = document.querySelectorAll('footer a[data-tab]');
    const ctaButtons = document.querySelectorAll('[data-tab]');

    function showTab(targetTab) {
        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Remove active class from all nav links
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        // Show target tab content
        const targetContent = document.getElementById(targetTab);
        if (targetContent) {
            targetContent.classList.add('active');
        }

        // Add active class to corresponding nav link
        const targetNavLink = document.querySelector(`.nav-link[data-tab="${targetTab}"]`);
        if (targetNavLink) {
            targetNavLink.classList.add('active');
        }

        // Close mobile menu
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');

        // Scroll to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            showTab(targetTab);
        });
    });

    // Add click event listeners to footer links
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            showTab(targetTab);
        });
    });

    // Add click event listeners to CTA buttons
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const targetTab = this.getAttribute('data-tab');
            if (targetTab) {
                e.preventDefault();
                showTab(targetTab);
            }
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');

            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! I\'ll get back to you soon.');
                this.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.startsWith('#/')) return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Fade in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements that should animate
    const animateElements = document.querySelectorAll('.info-card, .project-card, .hobby-item, .contact-item');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Header scroll effect
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Hobby grid hover effects
    const hobbyItems = document.querySelectorAll('.hobby-item');
    hobbyItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const overlay = this.querySelector('.hobby-overlay');
            overlay.style.transform = 'translateY(0)';
        });

        item.addEventListener('mouseleave', function() {
            const overlay = this.querySelector('.hobby-overlay');
            overlay.style.transform = 'translateY(100%)';
        });
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Get the text content without HTML tags for typing effect
        const nameSpan = heroTitle.querySelector('.highlight-name');
        const nameText = nameSpan ? nameSpan.textContent : 'Spring';
        
        // Create the typing effect for just the text, preserving HTML structure
        const baseText = "Hi, I'm ";
        let currentText = "";
        let i = 0;
        const typingSpeed = 100;
        
        // Clear and start typing
        heroTitle.innerHTML = baseText + '<span class="highlight-name"></span>';
        const nameElement = heroTitle.querySelector('.highlight-name');
        
        function typeWriter() {
            if (i < nameText.length) {
                currentText += nameText.charAt(i);
                nameElement.textContent = currentText;
                i++;
                setTimeout(typeWriter, typingSpeed);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    });

    // Dynamic gradient background
    const hero = document.querySelector('.hero');
    if (hero) {
        let gradientAngle = 135;
        
        setInterval(function() {
            gradientAngle += 0.5;
            hero.style.background = `linear-gradient(${gradientAngle}deg, #667eea 0%, #764ba2 100%)`;
        }, 50);
    }

    // Add loading state to external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 1000);
        });
    });

    // Initialize tooltips for social links
    const socialLinks = document.querySelectorAll('.social-link, .footer-social a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const platform = this.href.includes('github') ? 'GitHub' :
                            this.href.includes('linkedin') ? 'LinkedIn' :
                            this.href.includes('twitter') ? 'Twitter' :
                            this.href.includes('instagram') ? 'Instagram' : 'Social';
            
            this.setAttribute('title', `Visit my ${platform} profile`);
        });
    });

    // Form input animations
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    // Add particles effect to hero section
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = 'rgba(255, 255, 255, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = '100%';
        particle.style.animation = 'float-up 8s linear infinite';
        
        return particle;
    }

    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-up {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Create particles periodically
    if (hero) {
        hero.style.position = 'relative';
        hero.style.overflow = 'hidden';
        
        setInterval(() => {
            const particle = createParticle();
            hero.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 8000);
        }, 300);
    }
});

// Add some utility functions
function smoothScrollTo(target) {
    document.querySelector(target).scrollIntoView({
        behavior: 'smooth'
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'error' ? '#ef4444' : '#10b981'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add slideIn animation
const slideInStyle = document.createElement('style');
slideInStyle.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(slideInStyle);
