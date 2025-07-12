// Main JavaScript functionality for Skill Swap Platform

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Modal functionality
    const loginBtn = document.querySelector('.btn-login');
    const signupBtn = document.querySelector('.btn-signup');
    const getStartedBtn = document.querySelector('.hero-buttons .btn-primary');
    const ctaSignupBtn = document.querySelector('.cta .btn-primary');
    const loginModal = document.getElementById('login-modal');
    const signupModal = document.getElementById('signup-modal');
    const closeModalBtns = document.querySelectorAll('.close-modal');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');
    
    // Open login modal
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function() {
            loginModal.style.display = 'flex';
        });
    }
    
    // Open signup modal
    if (signupBtn && signupModal) {
        signupBtn.addEventListener('click', function() {
            signupModal.style.display = 'flex';
        });
    }
    
    // Get started button opens signup modal
    if (getStartedBtn && signupModal) {
        getStartedBtn.addEventListener('click', function() {
            signupModal.style.display = 'flex';
        });
    }
    
    // CTA signup button opens signup modal
    if (ctaSignupBtn && signupModal) {
        ctaSignupBtn.addEventListener('click', function() {
            signupModal.style.display = 'flex';
        });
    }
    
    // Close modals
    closeModalBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            loginModal.style.display = 'none';
            signupModal.style.display = 'none';
        });
    });
    
    // Switch between login and signup modals
    if (switchToSignup) {
        switchToSignup.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.style.display = 'none';
            signupModal.style.display = 'flex';
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', function(e) {
            e.preventDefault();
            signupModal.style.display = 'none';
            loginModal.style.display = 'flex';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === signupModal) {
            signupModal.style.display = 'none';
        }
    });
    
    // Populate skills grid
    populateSkillsGrid();
    
    // Populate testimonials
    populateTestimonials();
});

// Function to populate skills grid
function populateSkillsGrid() {
    const skillsGrid = document.querySelector('.skills-grid');
    
    if (!skillsGrid) return;
    
    const popularSkills = [
        { name: 'Web Development', icon: 'fa-code', users: 1240 },
        { name: 'Photography', icon: 'fa-camera', users: 980 },
        { name: 'Graphic Design', icon: 'fa-palette', users: 1120 },
        { name: 'Digital Marketing', icon: 'fa-bullhorn', users: 890 },
        { name: 'Language Learning', icon: 'fa-language', users: 1350 },
        { name: 'Music Production', icon: 'fa-music', users: 760 },
        { name: 'Cooking', icon: 'fa-utensils', users: 1050 },
        { name: 'Fitness Training', icon: 'fa-dumbbell', users: 920 }
    ];
    
    popularSkills.forEach(skill => {
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card animate-on-scroll';
        
        skillCard.innerHTML = `
            <div class="skill-icon">
                <i class="fas ${skill.icon}"></i>
            </div>
            <h3>${skill.name}</h3>
            <p>${skill.users} users</p>
            <a href="#" class="btn btn-small">Explore</a>
        `;
        
        skillsGrid.appendChild(skillCard);
    });
}

// Function to populate testimonials
function populateTestimonials() {
    const testimonialSlider = document.querySelector('.testimonial-slider');
    
    if (!testimonialSlider) return;
    
    const additionalTestimonials = [
        {
            content: "SkillSwap helped me learn guitar while teaching someone Spanish. The platform made it easy to find the perfect match!",
            name: "Michael Chen",
            title: "Language Enthusiast",
            image: "../assests/images/faces/Figure.png"
        },
        {
            content: "I've been able to expand my cooking skills by exchanging lessons with a professional chef. This platform is revolutionary!",
            name: "Emily Rodriguez",
            title: "Home Cook",
            image: "../assests/images/faces/team-image6.jpg.png"
        }
    ];
    
    additionalTestimonials.forEach(testimonial => {
        const testimonialElement = document.createElement('div');
        testimonialElement.className = 'testimonial animate-on-scroll';
        
        testimonialElement.innerHTML = `
            <div class="testimonial-content">
                <p>"${testimonial.content}"</p>
            </div>
            <div class="testimonial-author">
                <img src="${testimonial.image}" alt="User">
                <div>
                    <h4>${testimonial.name}</h4>
                    <p>${testimonial.title}</p>
                </div>
            </div>
        `;
        
        testimonialSlider.appendChild(testimonialElement);
    });
}