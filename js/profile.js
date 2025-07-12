document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    
    // If no user is logged in, redirect to login
    if (!user) {
        // For demo purposes, we'll just populate with sample data
        // In a real app, you might redirect to login page
        populateWithSampleData();
    } else {
        // Populate form with user data
        populateUserProfile(user);
    }
    
    // Setup event listeners
    setupEventListeners();
});

// Function to populate with sample data for demonstration
function populateWithSampleData() {
    document.getElementById('profile-name').value = 'John Doe';
    document.getElementById('profile-location').value = 'New York, USA';
    
    // Sample skills are already in the HTML
}

// Function to populate user profile with actual user data
function populateUserProfile(user) {
    document.getElementById('profile-name').value = user.name || '';
    document.getElementById('profile-location').value = user.location || '';
    
    // Clear existing skills
    const skillsOfferedContainer = document.getElementById('skills-offered');
    const skillsWantedContainer = document.getElementById('skills-wanted');
    
    // Keep only the add button
    skillsOfferedContainer.innerHTML = '<button id="add-offered-skill" class="btn btn-small">+ Add</button>';
    skillsWantedContainer.innerHTML = '<button id="add-wanted-skill" class="btn btn-small">+ Add</button>';
    
    // Add user's offered skills
    if (user.skills_offered && user.skills_offered.length > 0) {
        user.skills_offered.forEach(skill => {
            addSkillTag(skill, 'offered');
        });
    }
    
    // Add user's wanted skills
    if (user.skills_wanted && user.skills_wanted.length > 0) {
        user.skills_wanted.forEach(skill => {
            addSkillTag(skill, 'wanted');
        });
    }
    
    // Set availability and visibility if available
    if (user.availability) {
        document.getElementById('profile-availability').value = user.availability;
    }
    
    if (user.visibility) {
        document.getElementById('profile-visibility').value = user.visibility;
    }
    
    // Set profile image if available
    if (user.profile_image) {
        document.getElementById('profile-image').src = user.profile_image;
    }
}

// Function to setup all event listeners
function setupEventListeners() {
    // Save profile button
    const saveButton = document.getElementById('save-profile');
    if (saveButton) {
        saveButton.addEventListener('click', saveProfile);
    }
    
    // Discard changes button
    const discardButton = document.getElementById('discard-changes');
    if (discardButton) {
        discardButton.addEventListener('click', function() {
            if (confirm('Are you sure you want to discard all changes?')) {
                location.reload();
            }
        });
    }
    
    // Add offered skill button
    const addOfferedSkillBtn = document.getElementById('add-offered-skill');
    if (addOfferedSkillBtn) {
        addOfferedSkillBtn.addEventListener('click', function() {
            openAddSkillModal('offered');
        });
    }
    
    // Add wanted skill button
    const addWantedSkillBtn = document.getElementById('add-wanted-skill');
    if (addWantedSkillBtn) {
        addWantedSkillBtn.addEventListener('click', function() {
            openAddSkillModal('wanted');
        });
    }
    
    // Close modal button
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            document.getElementById('add-skill-modal').style.display = 'none';
        });
    }
    
    // Confirm add skill button
    const confirmAddSkillBtn = document.getElementById('confirm-add-skill');
    if (confirmAddSkillBtn) {
        confirmAddSkillBtn.addEventListener('click', addSkill);
    }
    
    // Add/Edit photo button
    const addEditPhotoBtn = document.getElementById('add-edit-photo');
    if (addEditPhotoBtn) {
        addEditPhotoBtn.addEventListener('click', function() {
            // In a real app, this would open a file picker
            alert('In a real app, this would open a file picker to upload a new profile photo.');
        });
    }
    
    // Remove photo button
    const removePhotoBtn = document.getElementById('remove-photo');
    if (removePhotoBtn) {
        removePhotoBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to remove your profile photo?')) {
                document.getElementById('profile-image').src = 'https://placehold.co/300x300';
            }
        });
    }
    
    // Setup event delegation for removing skill tags
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-times')) {
            const skillTag = e.target.parentElement;
            skillTag.remove();
        }
    });
}

// Function to save profile
function saveProfile() {
    const name = document.getElementById('profile-name').value;
    const location = document.getElementById('profile-location').value;
    const availability = document.getElementById('profile-availability').value;
    const visibility = document.getElementById('profile-visibility').value;
    
    // Get all offered skills
    const offeredSkills = [];
    document.querySelectorAll('#skills-offered .skill-tag').forEach(tag => {
        // Extract just the text without the X icon
        const skillText = tag.textContent.trim().replace('×', '').trim();
        if (skillText) offeredSkills.push(skillText);
    });
    
    // Get all wanted skills
    const wantedSkills = [];
    document.querySelectorAll('#skills-wanted .skill-tag').forEach(tag => {
        // Extract just the text without the X icon
        const skillText = tag.textContent.trim().replace('×', '').trim();
        if (skillText) wantedSkills.push(skillText);
    });
    
    // Create user object
    const user = {
        name: name,
        location: location,
        skills_offered: offeredSkills,
        skills_wanted: wantedSkills,
        availability: availability,
        visibility: visibility,
        profile_image: document.getElementById('profile-image').src
    };
    
    // In a real app, this would be sent to the server
    // For demo, we'll just save to localStorage
    localStorage.setItem('user', JSON.stringify(user));
    
    alert('Profile saved successfully!');
}

// Function to open add skill modal
function openAddSkillModal(skillType) {
    // Store the skill type (offered or wanted) in a data attribute
    document.getElementById('add-skill-modal').dataset.skillType = skillType;
    document.getElementById('add-skill-modal').style.display = 'flex';
    document.getElementById('skill-name').value = '';
    document.getElementById('skill-category').value = '';
    document.getElementById('skill-name').focus();
}

// Function to add a new skill
function addSkill() {
    const skillName = document.getElementById('skill-name').value.trim();
    const skillCategory = document.getElementById('skill-category').value;
    
    if (!skillName) {
        alert('Please enter a skill name');
        return;
    }
    
    const skillType = document.getElementById('add-skill-modal').dataset.skillType;
    
    // Add the skill tag to the appropriate container
    addSkillTag(skillName, skillType);
    
    // Close the modal
    document.getElementById('add-skill-modal').style.display = 'none';
}

// Function to add a skill tag to the container
function addSkillTag(skillName, skillType) {
    const container = document.getElementById(`skills-${skillType}`);
    const addButton = document.getElementById(`add-${skillType}-skill`);
    
    // Create the skill tag
    const skillTag = createSkillTag(skillName);
    skillTag.innerHTML = `${skillName} <i class="fas fa-times"></i>`;
    
    // Insert before the add button
    container.insertBefore(skillTag, addButton);
}

function createSkillTag(text) {
  const tag = document.createElement('span');
  tag.className = 'skill-tag hover:scale-105 hover:bg-indigo-600 transition-transform';
  tag.textContent = text;
  tag.addEventListener('click', () => {
    tag.classList.add('animate-pulse');
    setTimeout(() => tag.classList.remove('animate-pulse'), 500);
  });
  return tag;
}