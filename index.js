document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Hamburger Menu & Mobile Navigation ---
    const hamburger = document.getElementById('hamburger');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
        hamburger.querySelector('i').classList.toggle('fa-bars');
        hamburger.querySelector('i').classList.toggle('fa-times'); // Change icon to 'X'
    });

    // Close menu when a link is clicked (for single-page navigation)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            }
        });
    });


    // --- 2. Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Prevent default hash change action
            e.preventDefault(); 
            
            const targetId = this.getAttribute('href');
            // Check if it's the download resume button
            if (targetId === 'images/MIRZA_ALTAMASH_resume.pdf') {
                return; 
            }
            
            // Get the target element, or scroll to the top if not found (e.g., #hero)
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Scroll to the element with an offset for the fixed header
                const headerHeight = document.querySelector('.header').offsetHeight;
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight - 10, 
                    behavior: 'smooth'
                });
            } else if (targetId === '#hero') {
                 window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            
            // Highlight the active link (optional, done via Intersection Observer below)
            // Optional: You could add a check here for the current section to toggle the 'active' class
        });
    });


    // --- 3. Scroll-based Animations (Intersection Observer) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Optional: remove 'visible' class if you want the animation to repeat on scroll up
                // entry.target.classList.remove('visible'); 
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the item is visible
        rootMargin: '0px 0px -50px 0px' // Start slightly before the bottom
    });

    // Apply observer to all content sections (excluding hero)
    document.querySelectorAll('.content-section').forEach(section => {
        observer.observe(section);
    });
    
    // --- 4. Testimonials Carousel Functionality ---
    const carousel = document.querySelector('.testimonial-carousel');
    const items = carousel.querySelectorAll('.testimonial-item');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    let currentIndex = 0;

    function showTestimonial(index) {
        items.forEach((item, i) => {
            // Remove 'active' class from all items
            item.classList.remove('active'); 
            // Reset animation to allow it to run again
            item.style.animation = 'none'; 
            item.offsetHeight; // Trigger reflow
            item.style.animation = null; 

            if (i === index) {
                // Add 'active' class to the current item
                item.classList.add('active'); 
            }
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
        showTestimonial(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
        showTestimonial(currentIndex);
    });

    // Initialize carousel on load
    showTestimonial(currentIndex);

    // Auto-advance carousel (optional, 5 seconds)
    setInterval(() => {
        currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
        showTestimonial(currentIndex);
    }, 5000);

    
    // --- 5. Active Link Highlighting on Scroll (Advanced UX) ---
    const sections = document.querySelectorAll('main section');
    const highlightNav = () => {
        let current = '';
        const headerHeight = document.querySelector('.header').offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 20; // Adjusted offset
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', highlightNav);
    highlightNav(); // Run on load to set initial active link
});