document.addEventListener('DOMContentLoaded', () => {
    initializeSections();
    initializeCards();
    initializeParticleEffects();
    initializeStatusEffects();
    initializeTouchEvents();
});

// Sections initialization
function initializeSections() {
    const sections = document.querySelectorAll('.section');
    
    sections.forEach(section => {
        const header = section.querySelector('.section-header');
        const category = header.getAttribute('data-category');
        
        // Aggiunge effetti hover alla sezione
        addSectionHoverEffects(header, category);
        
        // Gestisce il click per espandere/collassare
        header.addEventListener('click', () => {
            const isActive = section.classList.contains('active');
            
            // Chiude tutte le sezioni
            sections.forEach(s => s.classList.remove('active'));
            
            // Apre la sezione cliccata se non era già aperta
            if (!isActive) {
                section.classList.add('active');
                
                // Scroll smooth alla sezione
                section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Cards initialization and effects
function initializeCards() {
    const cards = document.querySelectorAll('.cyber-card');

    cards.forEach(card => {
        if (!card.classList.contains('offline')) {
            // 3D Tilt Effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const angleX = (y - centerY) / 15;
                const angleY = (centerX - x) / 15;

                card.style.transform = `
                    perspective(1000px) 
                    rotateX(${angleX}deg) 
                    rotateY(${angleY}deg) 
                    translateZ(10px)
                `;

                updateGlowPosition(card, x, y);
            });

            // Reset card position
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
                resetGlowEffect(card);
            });

            // Click effect
            card.addEventListener('click', createRippleEffect);
        }

        // Category-specific highlighting
        const category = card.dataset.category;
        addCategoryHighlight(card, category);
    });
}

// Section hover effects
function addSectionHoverEffects(header, category) {
    const colors = {
        'bots': 'rgba(0, 255, 255, ',
        'channels': 'rgba(255, 0, 255, ',
        'groups': 'rgba(255, 255, 0, '
    };

    header.addEventListener('mousemove', (e) => {
        const rect = header.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        header.style.background = `
            radial-gradient(
                circle at ${x}px ${y}px,
                ${colors[category]}0.2),
                var(--card-bg)
            )
        `;
    });

    header.addEventListener('mouseleave', () => {
        header.style.background = 'var(--card-bg)';
    });
}

// Particle effects system
function initializeParticleEffects() {
    const cards = document.querySelectorAll('.cyber-card:not(.offline)');
    
    cards.forEach(card => {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        card.appendChild(particleContainer);

        card.addEventListener('mouseover', () => {
            createParticles(particleContainer, card.dataset.category);
        });
    });
}

function createParticles(container, category) {
    const colors = {
        'bots': '#00ffff',
        'channels': '#ff00ff',
        'groups': '#ffff00'
    };

    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'cyber-particle';
        particle.style.backgroundColor = colors[category];
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 1 + 0.5) + 's';
        container.appendChild(particle);

        particle.addEventListener('animationend', () => {
            particle.remove();
        });
    }
}

// Status effects and animations
function initializeStatusEffects() {
    const statusIndicators = document.querySelectorAll('.status-indicator');

    statusIndicators.forEach(indicator => {
        if (indicator.classList.contains('active')) {
            createPulsingEffect(indicator);
        }
    });
}

function createPulsingEffect(element) {
    const pulse = document.createElement('div');
    pulse.className = 'status-pulse';
    element.appendChild(pulse);

    setInterval(() => {
        pulse.classList.add('pulse');
        setTimeout(() => pulse.classList.remove('pulse'), 1000);
    }, 2000);
}

// Touch events for mobile
function initializeTouchEvents() {
    const cards = document.querySelectorAll('.cyber-card:not(.offline)');

    cards.forEach(card => {
        card.addEventListener('touchstart', handleTouchStart, false);
        card.addEventListener('touchmove', handleTouchMove, false);
        card.addEventListener('touchend', handleTouchEnd, false);
    });
}

// Utility functions
function updateGlowPosition(card, x, y) {
    const glow = card.querySelector('.card-glow');
    const category = card.dataset.category;
    const colors = {
        'bots': 'rgba(0, 255, 255, ',
        'channels': 'rgba(255, 0, 255, ',
        'groups': 'rgba(255, 255, 0, '
    };

    glow.style.background = `
        radial-gradient(
            circle at ${x}px ${y}px,
            ${colors[category]}0.3) 0%,
            ${colors[category]}0.1) 30%,
            transparent 70%
        )
    `;
}

function resetGlowEffect(card) {
    const glow = card.querySelector('.card-glow');
    glow.style.background = '';
    glow.style.opacity = '0';
}

function createRippleEffect(event) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    this.appendChild(ripple);

    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    setTimeout(() => ripple.remove(), 1000);
}

function addCategoryHighlight(card, category) {
    const highlight = document.createElement('div');
    highlight.className = `category-highlight ${category}`;
    card.appendChild(highlight);
}

// Touch handlers
let touchStartX, touchStartY;

function handleTouchStart(evt) {
    touchStartX = evt.touches[0].clientX;
    touchStartY = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
    if (!touchStartX || !touchStartY) return;

    const touchEndX = evt.touches[0].clientX;
    const touchEndY = evt.touches[0].clientY;

    const deltaX = touchStartX - touchEndX;
    const deltaY = touchStartY - touchEndY;

    // Calculate tilt based on touch movement
    const tiltX = deltaY / 5;
    const tiltY = -deltaX / 5;

    this.style.transform = `
        perspective(1000px) 
        rotateX(${tiltX}deg) 
        rotateY(${tiltY}deg)
        translateZ(10px)
    `;

    updateGlowPosition(this, touchEndX - this.offsetLeft, touchEndY - this.offsetTop);
}

function handleTouchEnd() {
    touchStartX = touchStartY = null;
    this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    resetGlowEffect(this);
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize RAF for smooth animations
let rafId = null;

function animate() {
    rafId = requestAnimationFrame(animate);
    // Add any continuous animations here
}

animate();

// Cleanup
window.addEventListener('unload', () => {
    if (rafId) {
        cancelAnimationFrame(rafId);
    }
});

