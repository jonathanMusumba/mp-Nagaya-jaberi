// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('scrolled', window.scrollY > 50);
});

// Section Fade-in on Scroll
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');

    function handleScroll() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.9) {
                section.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
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

// Scroll Progress Bar
window.addEventListener('scroll', function() {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.scrollY / scrollTotal) * 100;
    document.getElementById('progress-bar').style.width = scrollProgress + '%';
});