document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Optional: Animate hamburger lines
        mobileMenu.classList.toggle('is-active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // 3. Contact Form Submission (Simulated Backend using LocalStorage)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const toast = document.getElementById('toast');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect Data
            const formData = new FormData(contactForm);
            const messageData = {
                id: Date.now().toString(),
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                message: formData.get('message'),
                createdAt: new Date().toISOString()
            };

            try {
                // Fetch existing messages
                const existing = JSON.parse(localStorage.getItem('landingMessages')) || [];
                // Save new message
                existing.push(messageData);
                localStorage.setItem('landingMessages', JSON.stringify(existing));

                // Show Success
                showToast('Message sent successfully!');
                contactForm.reset();
                formStatus.textContent = '';
                
            } catch (error) {
                console.error("Storage Error", error);
                formStatus.textContent = "Failed to send message.";
                formStatus.className = "form-status error";
            }
        });
    }

    // Toast helper
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }
});
