document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('section');

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Function to show only the active link on mobile
    function showActiveLinkOnMobile() {
        let currentSection = '';

        // Only apply this on screens smaller than 768px
        if (window.innerWidth < 768) {
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 120;
                const sectionHeight = section.clientHeight;
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                    link.style.display = 'inline-block'; // Show the active link
                } else {
                    link.classList.remove('active');
                    link.style.display = 'none'; // Hide non-active links
                }
            });
        } else {
            // On larger screens, show all links
            navLinks.forEach(link => {
                link.style.display = 'inline-block';
            });
        }
    }

    // Call the function on scroll
    window.addEventListener('scroll', showActiveLinkOnMobile);

    // Call the function on page load in case user reloads on a scrolled position
    showActiveLinkOnMobile();

    // Adjust link visibility on window resize
    window.addEventListener('resize', showActiveLinkOnMobile);
});

// Lightbox for Media Gallery
document.querySelectorAll('.media-item img').forEach(img => {
    img.addEventListener('click', function() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        lightboxImg.src = this.src;
        lightbox.style.display = "block";
    });
});

document.querySelector('.lightbox .close').addEventListener('click', function() {
    document.getElementById('lightbox').style.display = "none";
});

document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById("progress-bar");
    const backToTopButton = document.getElementById("back-to-top");
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('nav ul li a');
    const notification = document.getElementById('section-notification');

    function scrollProgress() {
        const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (document.documentElement.scrollTop / totalHeight) * 100;
        progressBar.style.width = progress + "%";
        progressBar.classList.add('active');
    }

    function toggleBackToTopButton() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    }

    function updateProgressBarAndNotification() {
        let currentIndex = -1;
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const topDistance = window.pageYOffset + rect.top;
            if (window.pageYOffset >= topDistance - 100) {
                currentIndex = index;
            }
        });

        if (currentIndex >= 0) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[currentIndex].classList.add('active');

            // Update progress bar width and add glow effect
            const progress = ((currentIndex + 1) / sections.length) * 100;
            progressBar.style.width = progress + '%';
            progressBar.classList.add('active');

            // Show notification with section name
            const sectionName = sections[currentIndex].getAttribute('data-section-name');
            notification.innerHTML = `You're now viewing: ${sectionName}`;
            notification.setAttribute('aria-live', 'polite');
            notification.classList.add('show');

            // Hide notification after 2 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 2000);
        }
    }

    // Update on scroll
    window.addEventListener('scroll', () => {
        scrollProgress();
        toggleBackToTopButton();
        updateProgressBarAndNotification();
    });

    // Update on page load in case user reloads on a scrolled position
    scrollProgress();
    updateProgressBarAndNotification();

    // Back to Top Button Click Event
    backToTopButton.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});