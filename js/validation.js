// Form validation for Skill Swap Platform

document.addEventListener('DOMContentLoaded', function() {
    // Login form validation
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (!validateEmail(email)) {
                showError('login-email', 'Please enter a valid email address');
                return;
            }
            
            if (password.length < 6) {
                showError('login-password', 'Password must be at least 6 characters');
                return;
            }
            
            // If validation passes, attempt login
            attemptLogin(email, password);
        });
    }
    
    // Signup form validation
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirm-password').value;
            
            if (name.trim() === '') {
                showError('signup-name', 'Please enter your name');
                return;
            }
            
            if (!validateEmail(email)) {
                showError('signup-email', 'Please enter a valid email address');
                return;
            }
            
            if (password.length < 6) {
                showError('signup-password', 'Password must be at least 6 characters');
                return;
            }
            
            if (password !== confirmPassword) {
                showError('signup-confirm-password', 'Passwords do not match');
                return;
            }
            
            // If validation passes, attempt registration
            attemptRegistration(name, email, password);
        });
    }
    
    // Newsletter form validation
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (!validateEmail(email)) {
                // Show error inline or as a notification
                alert('Please enter a valid email address');
                return;
            }
            
            // If validation passes, subscribe to newsletter
            // This would typically call an API endpoint
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        });
    }
});

// Helper function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Helper function to show error messages
function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    
    // Remove any existing error messages
    const existingError = inputElement.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add the new error message
    inputElement.parentNode.appendChild(errorElement);
    
    // Highlight the input field
    inputElement.classList.add('error');
    
    // Remove error after 3 seconds
    setTimeout(() => {
        errorElement.remove();
        inputElement.classList.remove('error');
    }, 3000);
}

// Function to attempt login
function attemptLogin(email, password) {
    // Show loading state
    const loginButton = document.querySelector('#login-form .btn');
    const originalText = loginButton.textContent;
    loginButton.textContent = 'Logging in...';
    loginButton.disabled = true;
    
    // Call the API login function
    window.api.login(email, password)
        .then(response => {
            // Login successful
            console.log('Login successful', response);
            
            // Store user data in localStorage or sessionStorage
            localStorage.setItem('user', JSON.stringify(response.user));
            
            // Close the modal
            document.getElementById('login-modal').style.display = 'none';
            
            // Update UI to reflect logged in state
            updateUIForLoggedInUser(response.user);
            
            // Redirect to profile page or refresh the current page
            // window.location.href = 'profile.html';
        })
        .catch(error => {
            // Login failed
            console.error('Login failed', error);
            showError('login-email', error.message || 'Login failed. Please check your credentials.');
        })
        .finally(() => {
            // Reset button state
            loginButton.textContent = originalText;
            loginButton.disabled = false;
        });
}

// Function to attempt registration
function attemptRegistration(name, email, password) {
    // Show loading state
    const signupButton = document.querySelector('#signup-form .btn');
    const originalText = signupButton.textContent;
    signupButton.textContent = 'Creating Account...';
    signupButton.disabled = true;
    
    // Call the API register function
    window.api.register(name, email, password)
        .then(response => {
            // Registration successful
            console.log('Registration successful', response);
            
            // Store user data in localStorage or sessionStorage
            localStorage.setItem('user', JSON.stringify(response.user));
            
            // Close the modal
            document.getElementById('signup-modal').style.display = 'none';
            
            // Update UI to reflect logged in state
            updateUIForLoggedInUser(response.user);
            
            // Show welcome message
            alert(`Welcome to SkillSwap, ${name}! Your account has been created successfully.`);
            
            // Redirect to profile setup page or refresh the current page
            // window.location.href = 'profile-setup.html';
        })
        .catch(error => {
            // Registration failed
            console.error('Registration failed', error);
            showError('signup-email', error.message || 'Registration failed. Please try again.');
        })
        .finally(() => {
            // Reset button state
            signupButton.textContent = originalText;
            signupButton.disabled = false;
        });
}

// Function to update UI for logged in user
function updateUIForLoggedInUser(user) {
    // Hide login/signup buttons
    const authButtons = document.querySelector('.auth-buttons');
    if (authButtons) {
        authButtons.innerHTML = `
            <div class="user-menu">
                <span>Welcome, ${user.name}</span>
                <button class="btn btn-small" id="logout-btn">Logout</button>
            </div>
        `;
        
        // Add logout functionality
        document.getElementById('logout-btn').addEventListener('click', function() {
            localStorage.removeItem('user');
            window.location.reload();
        });
    }
}

// Check if user is already logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
        try {
            const user = JSON.parse(storedUser);
            updateUIForLoggedInUser(user);
        } catch (e) {
            console.error('Error parsing stored user data', e);
            localStorage.removeItem('user');
        }
    }
});