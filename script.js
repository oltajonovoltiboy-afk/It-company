// BOLD PARTICLE SYSTEM WITH STAR EFFECTS
const particlesContainer = document.getElementById("particles");
let particles = [];
const particleCount = 60; // Zarrachalar soni kamaytirildi (optimallashtirish)

class BoldParticle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 2 + 1; // Kichikroq o'lcham - yulduzdek
        this.speedX = (Math.random() - 0.5) * 0.5; // Sekinroq harakat
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.color =
            Math.random() > 0.5
                ? "#00e5ff"
                : Math.random() > 0.5
                  ? "#a855f7"
                  : "#ff00aa";
        this.pulseSpeed = Math.random() * 0.03 + 0.01;
        this.pulseOffset = Math.random() * Math.PI * 2;
    }

    draw() {
        const particle = document.createElement("div");
        particle.style.cssText = `
            position: absolute;
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.size}px;
            height: ${this.size}px;
            background: ${this.color};
            border-radius: 50%;
            opacity: ${this.opacity};
            box-shadow: 0 0 ${this.size * 2}px ${this.color};
            pointer-events: none;
        `;
        particlesContainer.appendChild(particle);
        this.element = particle;
    }

    updateElement(time) {
        if (this.element) {
            this.x += this.speedX;
            this.y += this.speedY;
            const currentSize = Math.max(
                1,
                this.size +
                    Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.5,
            );

            if (
                this.x < 0 ||
                this.x > window.innerWidth ||
                this.y < 0 ||
                this.y > window.innerHeight
            ) {
                this.reset();
            }

            this.element.style.left = this.x + "px";
            this.element.style.top = this.y + "px";
            this.element.style.width = currentSize + "px";
            this.element.style.height = currentSize + "px";
        }
    }
}

function initParticles() {
    if (!particlesContainer) return;
    particlesContainer.innerHTML = "";
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        const particle = new BoldParticle();
        particle.draw();
        particles.push(particle);
    }
}

function animateParticles() {
    const time = Date.now() * 0.001;
    particles.forEach((particle) => {
        particle.updateElement(time);
    });
    requestAnimationFrame(animateParticles);
}

// METEOR SYSTEM
const meteorsContainer = document.getElementById("meteors"); // Get the new container from HTML
let meteors = [];
const meteorCount = 6; // Meteorlar soni keskin kamaytirildi
let meteorAnimationId = null; // requestAnimationFrame ID ni saqlash uchun

class Meteor {
    constructor() {
        this.reset();
    }

    reset() {
        // Start from top or left edge
        if (Math.random() < 0.5) {
            // Start from top
            this.x = Math.random() * window.innerWidth;
            this.y = -Math.random() * 200; // Start slightly above screen
        } else {
            // Start from left
            this.x = -Math.random() * 200; // Start slightly left of screen
            this.y = Math.random() * window.innerHeight;
        }

        this.length = Math.random() * 80 + 40; // Length of the meteor tail
        this.width = Math.random() * 3 + 1; // Width of the meteor
        this.speed = Math.random() * 8 + 5; // Tezligini oshirdik
        this.angle = Math.PI / 4 + ((Math.random() - 0.5) * Math.PI) / 8; // Roughly 45 degrees downwards
        this.opacity = Math.random() * 0.8 + 0.2;
        this.color =
            Math.random() > 0.5 ? "var(--cyan-bright)" : "var(--purple-bright)";
        this.trailColor = this.color.replace("bright", "glow"); // Use glow color for trail
    }

    draw() {
        const meteorElement = document.createElement("div");
        meteorElement.className = "meteor";
        meteorElement.style.cssText = `
            position: absolute;
            background: linear-gradient(to right, transparent, ${this.color}, transparent);
            border-radius: 50%;
            pointer-events: none;
            opacity: ${this.opacity};
            will-change: left, top;
            transform-origin: center left;
            left: ${this.x}px;
            top: ${this.y}px;
            width: ${this.length}px;
            height: ${this.width}px;
            transform: rotate(${(this.angle * 180) / Math.PI}deg);
        `;
        meteorsContainer.appendChild(meteorElement);
        this.element = meteorElement;
    }

    update() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);

        if (this.element) {
            this.element.style.left = this.x + "px";
            this.element.style.top = this.y + "px";
        }

        // Reset if off-screen
        if (
            this.x > window.innerWidth + this.length ||
            this.y > window.innerHeight + this.length ||
            this.x < -this.length ||
            this.y < -this.length
        ) {
            if (this.element) {
                this.element.remove(); // Remove old element
            }
            this.reset(); // Reset properties
            this.draw(); // Draw new element with new properties
        }
    }
}

function initMeteors() {
    if (meteorsContainer) {
        meteorsContainer.innerHTML = ""; // Clear existing meteors
        meteors = [];
        for (let i = 0; i < meteorCount; i++) {
            const meteor = new Meteor();
            meteor.draw();
            meteors.push(meteor);
        }
    }
}

function animateMeteors() {
    meteors.forEach((meteor) => {
        meteor.update();
    });
    meteorAnimationId = requestAnimationFrame(animateMeteors);
}

// MOBILE MENU TOGGLE
const mobileMenuButton = document.getElementById("mobile-menu-button");
const navLinks = document.getElementById("nav-links");
const hamburgerIcon = document.getElementById("hamburger-icon");
const closeIcon = document.getElementById("close-icon");

if (mobileMenuButton && navLinks) {
    mobileMenuButton.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("flex"); // Toggle flex to show/hide (CSS handles hidden/flex and transform)
        // Prevent scrolling of the body when mobile menu is open
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        if (hamburgerIcon && closeIcon) {
            hamburgerIcon.classList.toggle("hidden", isOpen);
            closeIcon.classList.toggle("hidden", !isOpen);
        }
    });

    // Close mobile menu when a nav link is clicked
    navLinks.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", () => {
            if (navLinks.classList.contains("flex")) {
                // Only close if it's open
                navLinks.classList.remove("flex");
                document.body.style.overflow = ""; // Restore body scrolling

                if (hamburgerIcon && closeIcon) {
                    hamburgerIcon.classList.remove("hidden");
                    closeIcon.classList.add("hidden");
                }
            }
        });
    });
}

// PRELOADER
const preloader = document.getElementById("preloader");
const preloaderBar = document.getElementById("preloaderBar");

function hidePreloader() {
    preloader.classList.add("hidden");
}

function simulateLoading() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(hidePreloader, 400);
        }
        preloaderBar.style.width = progress + "%";
    }, 80);
}

// SCROLL REVEAL
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, observerOptions);

// BOLD BUTTON RIPPLE EFFECT
document
    .querySelectorAll(".btn-bold-primary, .btn-bold-secondary")
    .forEach((button) => {
        button.addEventListener("click", function (e) {
            const ripple = document.createElement("span");
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            transform: scale(0);
            animation: rippleBold 0.5s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
        `;

            this.style.position = "relative";
            this.style.overflow = "hidden";
            this.appendChild(ripple);

            setTimeout(() => ripple.remove(), 500);
        });
    });

// COUNTER ANIMATION
function animateCounters() {
    const counters = document.querySelectorAll(".stat-value, .stat-number");
    counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute("data-target"));
        const duration = 2500;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                const suffix = target === 5 ? "+" : target === 98 ? "%" : "";
                counter.textContent = target.toLocaleString() + suffix;
            }
        };

        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    updateCounter();
                    statObserver.disconnect();
                }
            });
        });

        statObserver.observe(counter);
    });
}

// TESTIMONIAL SLIDER
let currentTestimonial = 0;
const slider = document.getElementById("testimonialsSlider");
const dots = document.querySelectorAll(".testimonial-dot");

function goToSlide(index) {
    currentTestimonial = index;
    slider.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToSlide(index));
});

setInterval(() => {
    if (dots.length > 0) {
        const next = (currentTestimonial + 1) % dots.length;
        goToSlide(next);
    }
}, 3500);

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            document
                .querySelectorAll(".nav-link")
                .forEach((link) => link.classList.remove("active"));
            this.classList.add("active");
        }
    });
});

// NAVBAR SCROLL
const navbar = document.getElementById("navbar"); // Navigatsiya konteyneri
const navLinksElements = document.querySelectorAll(".nav-link"); // Navigatsiya linklari
const rgbTextBoldElement = document.querySelector(".rgb-text-bold"); // Logotip

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add("scrolled");
        // Skroll qilinganda linklarga va logotipga ham 'scrolled' klassini qo'shamiz
        navLinksElements.forEach((link) => link.classList.add("scrolled"));
        if (rgbTextBoldElement) {
            rgbTextBoldElement.classList.add("scrolled");
        }
    } else {
        navbar.classList.remove("scrolled");
        // Skroll qilinmaganda 'scrolled' klassini olib tashlaymiz
        navLinksElements.forEach((link) => link.classList.remove("scrolled"));
        if (rgbTextBoldElement) {
            rgbTextBoldElement.classList.remove("scrolled");
        }
    }
});

// INITIALIZE
window.addEventListener("DOMContentLoaded", () => {
    initParticles();
    animateParticles();
    simulateLoading();
    animateCounters();
    initMeteors();
    animateMeteors();

    // Start observing sections for animation
    document
        .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
        .forEach((el) => {
            observer.observe(el);
        });
});

window.addEventListener("resize", () => {
    initParticles();
});

// REDUCED MOTION
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document
        .querySelectorAll(".fade-in, .slide-in-left, .slide-in-right")
        .forEach((el) => el.classList.add("visible"));
    if (meteorAnimationId) {
        cancelAnimationFrame(meteorAnimationId); // Stop meteor animation for reduced motion
    }
}
