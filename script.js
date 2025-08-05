// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Project Filtering Functionality
    function filterProjects(category) {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            const techTags = card.querySelectorAll('.tech-tag');
            let shouldShow = false;
            
            if (category === 'all') {
                shouldShow = true;
            } else {
                techTags.forEach(tag => {
                    if (tag.textContent.toLowerCase().includes(category.toLowerCase())) {
                        shouldShow = true;
                    }
                });
            }
            
            if (shouldShow) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.3s ease-in';
            } else {
                card.style.display = 'none';
            }
        });
    }
    // Expose filterProjects to global scope for inline onclick handlers
    window.filterProjects = filterProjects;
    
    // Add filter buttons dynamically
    const projectsSection = document.querySelector('.projects-section');
    if (projectsSection) {
        const filterContainer = document.createElement('div');
        filterContainer.className = 'project-filters';
        filterContainer.innerHTML = `
            <button onclick="filterProjects('all')" class="filter-btn active">All</button>
            <button onclick="filterProjects('react')" class="filter-btn">React</button>
            <button onclick="filterProjects('javascript')" class="filter-btn">JavaScript</button>
            <button onclick="filterProjects('vuetify')" class="filter-btn">Vuetify</button>
        `;
        
        const projectsHeading = projectsSection.querySelector('h2');
        projectsHeading.insertAdjacentElement('afterend', filterContainer);

        // Add event listeners to filter buttons to update active class
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }
    
    // Form Validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        function validateField(field, errorId, validationFn) {
            const errorElement = document.getElementById(errorId);
            const isValid = validationFn(field.value);
            
            if (!isValid) {
                field.style.borderColor = '#e74c3c';
                errorElement.textContent = getErrorMessage(field.id);
                errorElement.style.display = 'block';
                return false;
            } else {
                field.style.borderColor = '#ddd';
                errorElement.textContent = '';
                errorElement.style.display = 'none';
                return true;
            }
        }
        
        function getErrorMessage(fieldId) {
            switch(fieldId) {
                case 'name':
                    return 'Please enter your name';
                case 'email':
                    return 'Please enter a valid email address';
                case 'message':
                    return 'Please enter a message';
                default:
                    return 'This field is required';
            }
        }
        
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Real-time validation
        nameInput?.addEventListener('blur', () => {
            validateField(nameInput, 'name-error', (value) => value.trim().length > 0);
        });
        
        emailInput?.addEventListener('blur', () => {
            validateField(emailInput, 'email-error', validateEmail);
        });
        
        messageInput?.addEventListener('blur', () => {
            validateField(messageInput, 'message-error', (value) => value.trim().length > 0);
        });
        
        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const isNameValid = validateField(nameInput, 'name-error', (value) => value.trim().length > 0);
            const isEmailValid = validateField(emailInput, 'email-error', validateEmail);
            const isMessageValid = validateField(messageInput, 'message-error', (value) => value.trim().length > 0);
            
            if (isNameValid && isEmailValid && isMessageValid) {
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            }
        });
    }
    
    // Lightbox functionality for project images
    function createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.style.cssText = `
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 1000;
            cursor: pointer;
        `;
        
        const lightboxImg = document.createElement('img');
        lightboxImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border-radius: 5px;
        `;
        
        lightbox.appendChild(lightboxImg);
        document.body.appendChild(lightbox);
        
        // Close lightbox when clicking outside
        lightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
        
        return lightbox;
    }
    
    const lightbox = createLightbox();
    
    // Add click handlers to project images
    const projectImages = document.querySelectorAll('.project-card img');
    projectImages.forEach(img => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', function() {
            const lightboxImg = document.querySelector('#lightbox img');
            lightboxImg.src = this.src;
            lightboxImg.alt = this.alt;
            document.getElementById('lightbox').style.display = 'block';
        });
    });
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .filter-btn {
            background: #3498db;
            color: white;
            border: none;
            padding: 8px 16px;
            margin: 0 5px;
            border-radius: 20px;
            cursor: pointer;
            transition: background 0.3s;
        }
        
        .filter-btn:hover {
            background: #2980b9;
        }
        
        .filter-btn.active {
            background: #2c3e50;
        }
        
        .project-filters {
            text-align: center;
            margin: 2rem 0;
        }
    `;
    document.head.appendChild(style);
});
