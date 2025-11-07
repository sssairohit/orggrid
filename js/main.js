// Smooth scroll for anchor links
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

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.value-card, .feature-row, .metric-card, .testimonial-card, .integration-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add stagger effect to grid items
document.querySelectorAll('.value-grid .value-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.testimonial-grid .testimonial-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

document.querySelectorAll('.integration-grid .integration-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`;
});

// Animate numbers when in view
const animateNumber = (element, start, end, duration) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber) {
                const text = statNumber.textContent;
                const match = text.match(/\d+/);
                if (match) {
                    const number = parseInt(match[0]);
                    statNumber.textContent = '0';
                    setTimeout(() => {
                        animateNumber(statNumber, 0, number, 2000);
                    }, 200);
                }
                entry.target.dataset.animated = 'true';
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Mobile menu toggle (placeholder for future implementation)
const createMobileMenu = () => {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-toggle';
    mobileMenuButton.innerHTML = '☰';
    mobileMenuButton.style.display = 'none';
    
    if (window.innerWidth <= 768) {
        mobileMenuButton.style.display = 'block';
    }
    
    document.querySelector('.nav-actions').prepend(mobileMenuButton);
    
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
};

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Responsive adjustments
    }, 250);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Log page load
    console.log('Orggrid website loaded successfully');
});
