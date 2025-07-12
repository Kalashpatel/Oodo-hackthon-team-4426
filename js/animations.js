// Animations JavaScript for Skill Swap Platform

document.addEventListener('DOMContentLoaded', function() {
    // Apply animations to elements with animate-on-load class
    const animateOnLoadElements = document.querySelectorAll('.animate-on-load');
    
    animateOnLoadElements.forEach((element, index) => {
        // Add different animation classes with staggered delays
        setTimeout(() => {
            if (element.closest('.hero-content')) {
                element.style.animation = 'fadeIn 0.8s forwards, slideUp 0.8s forwards';
            } else if (element.closest('.hero-image')) {
                element.style.animation = 'fadeIn 0.8s forwards, slideInRight 0.8s forwards';
            } else {
                element.style.animation = 'fadeIn 0.8s forwards';
            }
            element.style.opacity = '1';
        }, 100 * index);
    });
    
    // Scroll animations
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    
    // Initial check for elements in viewport on page load
    checkElementsInViewport(animateOnScrollElements);
    
    // Check for elements in viewport on scroll
    window.addEventListener('scroll', function() {
        checkElementsInViewport(animateOnScrollElements);
    });
});

// Function to check if elements are in viewport
function checkElementsInViewport(elements) {
    elements.forEach((element, index) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
        
        if (isVisible) {
            // Apply different animations based on element type or position
            setTimeout(() => {
                if (element.closest('.step')) {
                    const stepIndex = Array.from(element.parentNode.children).indexOf(element);
                    if (stepIndex % 2 === 0) {
                        element.style.animation = 'fadeIn 0.8s forwards, slideInLeft 0.8s forwards';
                    } else {
                        element.style.animation = 'fadeIn 0.8s forwards, slideInRight 0.8s forwards';
                    }
                } else if (element.closest('.skill-card')) {
                    element.style.animation = 'fadeIn 0.8s forwards, scaleIn 0.8s forwards';
                } else if (element.closest('.testimonial')) {
                    element.style.animation = 'fadeIn 0.8s forwards, slideUp 0.8s forwards';
                } else if (element.closest('.cta-content')) {
                    element.style.animation = 'fadeIn 0.8s forwards, pulse 2s infinite';
                } else {
                    element.style.animation = 'fadeIn 0.8s forwards, slideUp 0.8s forwards';
                }
                element.style.opacity = '1';
            }, 50 * index);
        }
    });
}