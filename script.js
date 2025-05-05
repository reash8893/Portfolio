// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const overlay = document.querySelector('.nav-overlay');
            
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
                document.querySelector('.mobile-menu-btn i').classList.replace('fa-times', 'fa-bars');
            }

            // Smooth scroll to target
            const offset = 70; // Account for navbar height
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize EmailJS and handle form submission
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS
    emailjs.init("-x5SVLJQY3JW0Tb1W");
    
    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Set reply_to field to match the email
            document.getElementById('reply_to').value = document.getElementById('email').value;
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Send email using EmailJS
            emailjs.sendForm('service_revfla2', 'template_dcii2rc', this)
                .then(function() {
                    alert('Thank you for your message! I will get back to you soon.');
                    contactForm.reset();
                })
                .catch(function(error) {
                    alert('Sorry, there was an error sending your message. Please try again later.');
                    console.error('EmailJS Error:', error);
                })
                .finally(function() {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        });
    }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.pageYOffset <= 0 ? 
        '0 2px 10px rgba(0, 0, 0, 0.1)' : 
        '0 2px 10px rgba(0, 0, 0, 0.2)';
});

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Function to set theme
    function setTheme(theme) {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }
    
    // Check for saved theme preference or use device preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // If no saved preference, use device preference
        setTheme(prefersDarkScheme.matches ? 'dark-theme' : 'light-theme');
    }
    
    // Toggle theme when button is clicked
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.className;
            const newTheme = currentTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';
            setTheme(newTheme);
        });
    }
    
    // Listen for changes in device theme preference
    prefersDarkScheme.addEventListener('change', (e) => {
        // Only update if user hasn't manually set a preference
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark-theme' : 'light-theme');
        }
    });
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    body.appendChild(overlay);

    function toggleMenu() {
        const isMenuActive = navLinks.classList.contains('active');
        
        // Toggle menu state
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Handle body scroll based on viewport width
        body.style.overflow = (!isMenuActive && window.innerWidth <= 768) ? 'hidden' : '';
        
        // Toggle icon
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
    }

    // Event listeners
    mobileMenuBtn.addEventListener('click', e => {
        e.preventDefault();
        toggleMenu();
    });
    
    overlay.addEventListener('click', toggleMenu);
    
    // Close menu on escape key
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) toggleMenu();
    });
    
    // Handle menu links
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) toggleMenu();
            body.style.overflow = ''; // Ensure scrolling is always enabled after navigation
        });
    });
});

// Project details toggle
const initializeProjectDetails = () => {
    // Implementation will go here when needed
};

// Initialize project details when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProjectDetails);