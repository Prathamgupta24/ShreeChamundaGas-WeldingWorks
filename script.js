// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');
const heroScroll = document.querySelector('.hero-scroll');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Hero scroll button
if (heroScroll) {
    heroScroll.addEventListener('click', () => {
        const aboutSection = document.querySelector('#about');
        if (aboutSection) {
            const offsetTop = aboutSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Apply fade-in animation to elements
const fadeElements = document.querySelectorAll('.service-card, .feature, .gallery-item, .contact-item');
fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Contact form handling
if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (validateForm(data)) {
        // Simulate form submission
        showFormSuccess();
        contactForm.reset();
    }
}

function validateForm(data) {
    let isValid = true;
    
    // Clear previous errors
    clearFormErrors();
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showFieldError('name', 'Please enter a valid name');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Service validation
    if (!data.service) {
        showFieldError('service', 'Please select a service');
        isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'Please enter a detailed message (minimum 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    
    field.classList.add('error');
    
    let errorElement = formGroup.querySelector('.error-message');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        formGroup.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function clearFormErrors() {
    const errorFields = document.querySelectorAll('.form-group input.error, .form-group select.error, .form-group textarea.error');
    const errorMessages = document.querySelectorAll('.error-message');
    
    errorFields.forEach(field => field.classList.remove('error'));
    errorMessages.forEach(message => {
        message.classList.remove('show');
        setTimeout(() => message.remove(), 300);
    });
}

function showFormSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="background: #27ae60; color: white; padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center;">
            <i class="fas fa-check-circle" style="margin-right: 10px;"></i>
            Thank you! Your message has been sent successfully. We'll get back to you soon.
        </div>
    `;
    
    const form = document.querySelector('.contact-form');
    form.insertBefore(successMessage, contactForm);
    
    // Remove success message after 5 seconds
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Gallery lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        // In a real implementation, you would show a lightbox modal here
        // For now, we'll just add a simple feedback
        const placeholder = item.querySelector('.gallery-placeholder');
        const originalText = placeholder.querySelector('p').textContent;
        placeholder.querySelector('p').textContent = 'Click to view full image';
        
        setTimeout(() => {
            placeholder.querySelector('p').textContent = originalText;
        }, 1500);
    });
});

// Service cards hover effect enhancement
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Stats animation
function animateStats() {
    const stats = document.querySelectorAll('.stat h3');
    
    stats.forEach(stat => {
        const finalValue = parseInt(stat.textContent);
        const isPercentage = stat.textContent.includes('%');
        const suffix = isPercentage ? '%' : '+';
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                currentValue = finalValue;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(currentValue) + suffix;
        }, 30);
    });
}

// Trigger stats animation when about section is visible
const aboutSection = document.querySelector('#about');
if (aboutSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(aboutSection);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < hero.offsetHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Smooth reveal animation for sections - DISABLED for initial load
/*
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});
*/

// Button click effects
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
    updateActiveNavLink();
}, 10);

window.removeEventListener('scroll', updateActiveNavLink);
window.addEventListener('scroll', debouncedScrollHandler);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Set initial active nav link
    updateActiveNavLink();
    
    // Preload images
    const imagesToPreload = [
        'upload/profilphoto.png',
        'upload/qrscan.png'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
    
    console.log('Shri Chamunda Website Loaded Successfully!');
});

// Error handling for missing images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('error', function() {
            // Create a placeholder div if image fails to load
            const placeholder = document.createElement('div');
            placeholder.style.cssText = `
                width: ${this.offsetWidth || '200'}px;
                height: ${this.offsetHeight || '200'}px;
                background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #666;
                font-size: 14px;
                text-align: center;
                border-radius: 8px;
                border: 2px dashed #ccc;
            `;
            placeholder.textContent = 'Image not available';
            
            this.parentNode.replaceChild(placeholder, this);
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Enter key on focused buttons
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
});

// Focus management for accessibility
const focusableElements = document.querySelectorAll('a, button, input, textarea, select');
focusableElements.forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #ff6b35';
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = '';
        this.style.outlineOffset = '';
    });
});
