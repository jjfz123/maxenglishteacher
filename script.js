// Language switching functionality
let currentLang = 'en'; // Default language is English

const languageToggle = document.getElementById('languageToggle');

// Initialize language from localStorage or default to English
function initLanguage() {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        currentLang = savedLang;
        updateLanguage(currentLang);
    }
}

// Toggle language
languageToggle.addEventListener('click', () => {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    updateLanguage(currentLang);
    localStorage.setItem('preferredLanguage', currentLang);
    
    // Show notification
    const message = currentLang === 'es' ? 'Idioma cambiado a Español' : 'Language changed to English';
    showNotification(message);
});

// Update all text based on selected language
function updateLanguage(lang) {
    // Update HTML lang attribute
    document.documentElement.lang = lang;
    
    // Update language toggle button
    const flag = languageToggle.querySelector('.flag');
    const langText = languageToggle.querySelector('.lang-text');
    
    if (lang === 'es') {
        flag.textContent = '🇪🇸';
        langText.textContent = 'ES';
    } else {
        flag.textContent = '🇬🇧';
        langText.textContent = 'EN';
    }
    
    // Update all elements with data-en and data-es attributes
    document.querySelectorAll('[data-en][data-es]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
}

// Initialize language on page load
initLanguage();

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
const animatedElements = document.querySelectorAll('.timeline-item, .education-card, .skill-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Animate progress bars when in view
const progressBars = document.querySelectorAll('.progress');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progress = entry.target;
            const width = progress.style.width;
            progress.style.width = '0';
            setTimeout(() => {
                progress.style.width = width;
            }, 100);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => {
    progressObserver.observe(bar);
});

// Download CV functionality
const downloadBtn = document.getElementById('downloadCV');
downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // You'll replace 'cv.pdf' with the actual path to your PDF file
    const link = document.createElement('a');
    link.href = 'cv.pdf'; // This should point to your actual CV PDF file
    link.download = 'Max_Aragon_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show a confirmation message
    showNotification('CV download started!');
});

// Notification function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #7c3aed 0%, #14b8a6 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 50px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// Add animations for notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Console message
console.log('%c👋 Hello! ', 'font-size: 20px; font-weight: bold; color: #7c3aed;');
console.log('%cThis portfolio was built with modern web technologies.', 'font-size: 14px; color: #64748b;');
console.log('%cInterested in working together? Let\'s connect!', 'font-size: 14px; color: #14b8a6;');
