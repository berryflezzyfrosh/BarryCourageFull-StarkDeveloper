// SUPABASE CONFIG
const SUPABASE_URL = 'https://wltjyjtcgmwjbcexihgf.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_Nh8H0KVoBJ5x4XqALrUz-w_w2ew8plJ';

// ELEMENTS (SAFE CHECKS)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const scrollTopBtn = document.querySelector('.scroll-top');

// MOBILE MENU
if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// SCROLL BUTTON
if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('show', window.scrollY > 300);
    });

    scrollTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// PROJECT HOVER EFFECT
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateX = (y - rect.height / 2) / 10;
        const rotateY = (rect.width / 2 - x) / 10;

        card.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// CONTACT FORM (FIXED SUPABASE CALL)
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('.submit-btn');
        const formMessage = document.querySelector('.form-message');

        const firstName = document.getElementById('firstName')?.value.trim();
        const lastName = document.getElementById('lastName')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const subject = document.getElementById('subject')?.value.trim();
        const message = document.getElementById('message')?.value.trim();

        if (!firstName || !lastName || !email || !subject) {
            return showMessage('Please fill required fields', 'error', formMessage);
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        try {
            const response = await fetch(
                `${SUPABASE_URL}/rest/v1/contact_form`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'apikey': SUPABASE_ANON_KEY,
                        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                        'Prefer': 'return=representation'
                    },
                    body: JSON.stringify({
                        first_name: firstName,
                        last_name: lastName,
                        email,
                        subject,
                        message
                    })
                }
            );

            const result = await response.json();

            if (response.ok) {
                showMessage('Message sent successfully!', 'success', formMessage);
                contactForm.reset();
            } else {
                showMessage('Failed to send message', 'error', formMessage);
            }

        } catch (err) {
            showMessage('Network error. Try again.', 'error', formMessage);
        }

        submitBtn.disabled = false;
        submitBtn.textContent = 'Send';
    });
}

// MESSAGE FUNCTION
function showMessage(message, type, element) {
    if (!element) return;

    element.textContent = message;
    element.className = `form-message ${type}`;
    element.style.display = 'flex';

    setTimeout(() => {
        element.style.display = 'none';
    }, 3000);
}

// ANIMATION OBSERVER
function observeElements() {
    const elements = document.querySelectorAll(
        '.image, .about, .contact-info, .contact-form-wrapper, .service-card, .project-card, .skill-bar'
    );

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', observeElements);

// AUDIO PLAYER
const playlist = [
    { src: 'audio/Barry_Courage_Website_Audio.MP3', title: 'BC_Audio' }
];

let currentTrack = 0;
const audio = new Audio();
const titleBox = document.getElementById('music-title');

function playTrack(index) {
    audio.src = playlist[index].src;

    audio.play().catch(err => {
        console.log('Autoplay blocked:', err);
    });

    if (titleBox) {
        titleBox.textContent = playlist[index].title;
    }
}

audio.addEventListener('ended', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    playTrack(currentTrack);
});

// ONLY plays after user interaction (fix autoplay issue)
window.addEventListener('click', () => {
    audio.volume = 0.5;
    playTrack(currentTrack);
}, { once: true });

// CUSTOM CURSOR SAFE
const cursor = document.querySelector('.custom-cursor');

if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// EASTER EGG SAFE
const home = document.querySelector('.home');

if (home) {
    let clickCount = 0;

    home.addEventListener('click', () => {
        clickCount++;

        if (clickCount === 7) {
            alert('High Consumption Of Data Turned Off!');
            document.body.style.filter = 'none';
            clickCount = 0;
        }
    });
}

// SOUND FUNCTION
function playSound(type) {
    console.log(`Playing ${type} sound effect`);
            }
