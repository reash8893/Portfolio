// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.replace('fa-times', 'fa-bars');
            }

            // Get current scroll position
            const currentPosition = window.pageYOffset;
            const targetPosition = targetElement.offsetTop - 70; // Account for navbar height
            const distance = targetPosition - currentPosition;
            const duration = 1000; // Duration in milliseconds
            let start = null;

            // Animation function
            const animation = (currentTime) => {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const progress = Math.min(timeElapsed / duration, 1);

                // Easing function for smooth animation
                const easeInOutCubic = progress => {
                    return progress < 0.5
                        ? 4 * progress * progress * progress
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
                };

                // Calculate current position
                const currentScroll = currentPosition + (distance * easeInOutCubic(progress));
                window.scrollTo(0, currentScroll);

                // Continue animation if not complete
                if (progress < 1) {
                    requestAnimationFrame(animation);
                }
            };

            // Start animation
            requestAnimationFrame(animation);
        }
    });
});

// Initialize EmailJS with your public key
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with your EmailJS public key
    emailjs.init("-x5SVLJQY3JW0Tb1W");
    console.log('EmailJS initialized');
});

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Set reply_to field to match the email
            document.getElementById('reply_to').value = email;
            
            // Show loading state
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            console.log('Attempting to send email with EmailJS');
            // Send email using EmailJS
            emailjs.sendForm('service_revfla2', 'template_dcii2rc', this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                // Show success message
                alert('Thank you for your message! I will get back to you soon.');
                // Reset form
                document.getElementById('contact-form').reset();
            })
            .catch(function(error) {
                // Show error message
                alert('Sorry, there was an error sending your message. Please try again later.');
                console.error('EmailJS Error:', error);
            })
            .finally(function() {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    }
    
    lastScroll = currentScroll;
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
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        
        // Toggle icon
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    }

    // Toggle menu on button click
    mobileMenuBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking overlay
    overlay.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Project details toggle
const initializeProjectDetails = () => {
    // ... existing project details code ...
};

// Initialize project details when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProjectDetails); 