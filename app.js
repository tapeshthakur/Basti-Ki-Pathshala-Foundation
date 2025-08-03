// Basti Ki Pathshala Foundation - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle for mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animate hamburger menu
        const spans = navToggle.querySelectorAll('span');
        spans.forEach((span, index) => {
            if (navLinks.classList.contains('active')) {
                if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) span.style.opacity = '0';
                if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                span.style.transform = 'none';
                span.style.opacity = '1';
            }
        });
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Volunteer form handling
    const volunteerForm = document.getElementById('volunteerForm');
    const successMessage = document.getElementById('successMessage');

    // Form validation
    function validateForm(formData) {
        const errors = [];
        
        // Required fields validation
        if (!formData.get('fullName').trim()) {
            errors.push('Full Name is required');
        }
        
        if (!formData.get('email').trim()) {
            errors.push('Email Address is required');
        } else if (!isValidEmail(formData.get('email'))) {
            errors.push('Please enter a valid email address');
        }
        
        if (!formData.get('phone').trim()) {
            errors.push('Phone Number is required');
        } else if (!isValidPhone(formData.get('phone'))) {
            errors.push('Please enter a valid phone number');
        }
        
        if (!formData.get('motivation').trim()) {
            errors.push('Please tell us why you want to volunteer');
        }
        
        // Check if at least one interest is selected
        const interests = formData.getAll('interests');
        if (interests.length === 0) {
            errors.push('Please select at least one area of interest');
        }
        
        return errors;
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s+/g, ''));
    }

    function showErrors(errors) {
        // Remove existing error messages
        document.querySelectorAll('.error-message').forEach(msg => msg.remove());
        
        errors.forEach(error => {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.style.color = 'var(--color-error)';
            errorDiv.style.fontSize = 'var(--font-size-sm)';
            errorDiv.style.marginTop = 'var(--space-8)';
            errorDiv.textContent = error;
            
            volunteerForm.insertBefore(errorDiv, volunteerForm.querySelector('button[type="submit"]'));
        });
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(msg => msg.remove());
    }

    // Form submission handler
    volunteerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitButton = volunteerForm.querySelector('button[type="submit"]');
        const formData = new FormData(volunteerForm);
        
        // Clear previous errors
        clearErrors();
        
        // Validate form
        const errors = validateForm(formData);
        
        if (errors.length > 0) {
            showErrors(errors);
            return;
        }
        
        // Show loading state
        submitButton.classList.add('loading');
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            // Hide form and show success message
            volunteerForm.classList.add('hidden');
            successMessage.classList.remove('hidden');
            
            // Scroll to success message
            successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Reset form for potential future use
            volunteerForm.reset();
            submitButton.classList.remove('loading');
            submitButton.textContent = 'Submit Application';
            submitButton.disabled = false;
            
            // Log form data (in real implementation, send to server)
            console.log('Volunteer application submitted:', Object.fromEntries(formData));
            
        }, 2000); // Simulate network delay
    });

    // Add interactive hover effects
    function addHoverEffects() {
        // Reason cards hover effect
        document.querySelectorAll('.reason-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Gallery images hover effect
        document.querySelectorAll('.gallery img').forEach(img => {
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        });
    }

    // Initialize hover effects
    addHoverEffects();

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                navbar.style.background = 'rgba(31, 33, 33, 0.98)';
            }
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                navbar.style.background = 'rgba(31, 33, 33, 0.95)';
            }
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.reason-card, .gallery img, .volunteer-form').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // Form field enhancements
    function enhanceFormFields() {
        // Add focus/blur effects to form controls
        document.querySelectorAll('.form-control').forEach(field => {
            field.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            field.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
                if (this.value.trim() !== '') {
                    this.parentElement.classList.add('filled');
                } else {
                    this.parentElement.classList.remove('filled');
                }
            });
        });

        // Phone number formatting
        const phoneField = document.getElementById('phone');
        phoneField.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            this.value = value;
        });

        // Age validation
        const ageField = document.getElementById('age');
        ageField.addEventListener('input', function() {
            const age = parseInt(this.value);
            if (age < 16) {
                this.setCustomValidity('Minimum age requirement is 16 years');
            } else if (age > 99) {
                this.setCustomValidity('Please enter a valid age');
            } else {
                this.setCustomValidity('');
            }
        });
    }

    // Initialize form enhancements
    enhanceFormFields();

    // Add success story counter animation (optional enhancement)
    function animateCounters() {
        const counters = [
            { element: null, target: 1000, suffix: '+ Children Helped' },
            { element: null, target: 50, suffix: '+ Volunteers' },
            { element: null, target: 25, suffix: '+ Communities Reached' }
        ];

        // This could be enhanced to show actual statistics if available
        console.log('Foundation has helped over 1000 children across 25+ communities with 50+ dedicated volunteers');
    }

    // Initialize counter animation
    animateCounters();

    // Handle external donation links
    document.querySelectorAll('a[href="#"]').forEach(link => {
        if (link.textContent.includes('Donate')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                alert('Thank you for your interest in donating! Please contact us at info@bastikipathshala.org for donation details.');
            });
        }
    });

    // Error handling for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.log('Image failed to load:', this.src);
        });
    });

    // Accessibility enhancements
    function enhanceAccessibility() {
        // Add keyboard navigation for custom elements
        document.querySelectorAll('.reason-card, .gallery img').forEach(element => {
            element.setAttribute('tabindex', '0');
            
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });

        // Announce form errors to screen readers
        const announceErrors = (errors) => {
            const announcement = errors.join('. ');
            const ariaLive = document.createElement('div');
            ariaLive.setAttribute('aria-live', 'polite');
            ariaLive.setAttribute('aria-atomic', 'true');
            ariaLive.style.position = 'absolute';
            ariaLive.style.left = '-10000px';
            ariaLive.textContent = `Form validation errors: ${announcement}`;
            document.body.appendChild(ariaLive);
            
            setTimeout(() => {
                document.body.removeChild(ariaLive);
            }, 1000);
        };
    }

    // Initialize accessibility enhancements
    enhanceAccessibility();

    console.log('Basti Ki Pathshala Foundation website initialized successfully!');
});