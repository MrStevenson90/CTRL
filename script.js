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
        element.style.transform = 'translateY(20px)';
        observer.observe(element);
    });

    // Feature navigation functionality
    const featureNav = document.querySelector('.feature-nav');
    const featureBtn = document.querySelector('.feature-btn');
    const featureOptions = document.querySelector('.feature-options');
    
    if (featureNav && featureBtn && featureOptions) {
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
    }

    // Roles animation
    const roles = [
        "Camera Operator",
        "Overlay Controller",
        "Replay Operator",
        "Social Media Team",
        "Match Report Writer",
        "Multilingual Commentator",
        "Video Review Staff",
        "Stats Collector",
        "Referee Review Staff",
        "Live Data Team",
        "Scoring Attendant",
        "Highlight Editor"
    ];
    
    const changingText = document.getElementById('changingRole');
    console.log('changingText element:', changingText); // Debug line
    let currentIndex = 0;
    
    if (changingText) {
        function updateRole() {
            console.log('Updating role to:', roles[currentIndex]); // Debug line
            
            // Reset animation
            changingText.style.animation = 'none';
            changingText.offsetHeight; // Trigger reflow
            changingText.style.animation = 'fadeInOut 2s ease-in-out';
            
            // Update text content
            changingText.textContent = roles[currentIndex];
            
            // Move to next role
            currentIndex = (currentIndex + 1) % roles.length;
        }
        
        // Initial text
        updateRole();
        
        // Update text every 2 seconds (matches CSS animation duration)
        const interval = setInterval(updateRole, 2000);
        
        // Clear interval if the element is removed
        window.addEventListener('unload', () => clearInterval(interval));
    } else {
        console.error('Could not find element with id "changingRole"'); // Debug line
    }

    // Smooth scroll for anchor links
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