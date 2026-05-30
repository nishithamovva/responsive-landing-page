/**
 * App initialization and UI interactions
 */
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
});

/**
 * Initializes navigation bar behaviors (scroll effect and active state)
 */
function initNavigation() {
    const navbar = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // 1. Interactive Navigation: Change style when scrolled
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. View switching (scaffolding for expense tracker)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Only handle internal '#' links
            if(targetId.startsWith('#')) {
                e.preventDefault();
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                // Update active view
                document.querySelectorAll('.view').forEach(view => {
                    view.classList.remove('active');
                });
                
                const targetView = document.querySelector(targetId);
                if (targetView) {
                    targetView.classList.add('active');
                }
            }
        });
    });
}
