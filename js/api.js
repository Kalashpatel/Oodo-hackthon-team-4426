// API interactions for Skill Swap Platform

// Mock API functions for demonstration purposes
// In a real application, these would connect to a backend server

// User authentication
const api = {
    // User authentication
    login: function(email, password) {
        return new Promise((resolve, reject) => {
            // Simulate API call
            setTimeout(() => {
                // For demo purposes, accept any email with a valid format and password length > 5
                if (validateEmail(email) && password.length > 5) {
                    resolve({
                        success: true,
                        user: {
                            id: 'user123',
                            name: email.split('@')[0],
                            email: email,
                            skills_offered: ['Web Development', 'JavaScript'],
                            skills_wanted: ['Photography', 'Graphic Design'],
                            rating: 4.8
                        }
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Invalid email or password'
                    });
                }
            }, 1000);
        });
    },
    
    register: function(name, email, password) {
        return new Promise((resolve, reject) => {
            // Simulate API call
            setTimeout(() => {
                if (validateEmail(email) && password.length > 5 && name.length > 0) {
                    resolve({
                        success: true,
                        user: {
                            id: 'user' + Math.floor(Math.random() * 1000),
                            name: name,
                            email: email,
                            skills_offered: [],
                            skills_wanted: [],
                            rating: 0
                        }
                    });
                } else {
                    reject({
                        success: false,
                        message: 'Invalid registration information'
                    });
                }
            }, 1000);
        });
    },
    
    // Skills related functions
    getSkillCategories: function() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    'Technology', 'Arts & Crafts', 'Music', 'Cooking', 
                    'Languages', 'Fitness', 'Business', 'Academic', 
                    'DIY & Home', 'Personal Development'
                ]);
            }, 500);
        });
    },
    
    getPopularSkills: function() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: 'Web Development', category: 'Technology', users: 1240 },
                    { id: 2, name: 'Photography', category: 'Arts & Crafts', users: 980 },
                    { id: 3, name: 'Graphic Design', category: 'Arts & Crafts', users: 1120 },
                    { id: 4, name: 'Digital Marketing', category: 'Business', users: 890 },
                    { id: 5, name: 'Spanish', category: 'Languages', users: 1350 },
                    { id: 6, name: 'Music Production', category: 'Music', users: 760 },
                    { id: 7, name: 'Baking', category: 'Cooking', users: 1050 },
                    { id: 8, name: 'Yoga', category: 'Fitness', users: 920 }
                ]);
            }, 500);
        });
    },
    
    // Swap requests
    sendSwapRequest: function(receiverId, offeredSkills, requestedSkills, message) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    request_id: 'req' + Math.floor(Math.random() * 10000),
                    created_at: new Date().toISOString()
                });
            }, 800);
        });
    },
    
    // Reviews
    submitReview: function(userId, rating, comment) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: true,
                    review_id: 'rev' + Math.floor(Math.random() * 10000)
                });
            }, 600);
        });
    }
};

// Helper function to validate email format
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Export the API object for use in other scripts
window.api = api;