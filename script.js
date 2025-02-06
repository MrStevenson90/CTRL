// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Configure the Intersection Observer
    const observerOptions = {
        root: null, // use viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of element is visible
    };

    // Callback for Intersection Observer
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // Once animation is triggered, we can stop observing this element
                observer.unobserve(entry.target);
            }
        });
    };

    // Create the observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Get all elements to animate
    const animateElements = document.querySelectorAll('.animate-on-scroll');

    // Start observing each element
    animateElements.forEach(element => {
        // Set initial state
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        observer.observe(element);
    });

    document.addEventListener('DOMContentLoaded', function() {
        const featureNav = document.querySelector('.feature-nav');
        const featureBtn = document.querySelector('.feature-btn');
        const featureOptions = document.querySelector('.feature-options');
        
        featureNav.addEventListener('mouseleave', function(e) {
            // Check if mouse is outside both the main button and options
            const rect = featureNav.getBoundingClientRect();
            if (e.clientY < rect.top || e.clientY > rect.bottom || 
                e.clientX < rect.left || e.clientX > rect.right) {
                featureBtn.style.opacity = '1';
                featureOptions.style.display = 'none';
            }
        });
        
        // Prevent options from hiding when hovering over them
        featureOptions.addEventListener('mouseenter', function() {
            featureBtn.style.opacity = '0';
            featureOptions.style.display = 'block';
        });
    });

    

    // Optional: Add smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Handle hero section separately for immediate animation
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.classList.add('animate-in');
        }, 300); // Small delay for better visual effect
    }
});