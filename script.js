// Prevent the script from initializing multiple times
if (window.__limanx_initialized) return;
window.__limanx_initialized = true;

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
// TESTIMONIAL SLIDER
let currentTestimonial = 0;
const slider = document.getElementById("testimonialsSlider");
const dots = document.querySelectorAll(".testimonial-dot");
let testimonialInterval;

function goToSlide(index) {
    if (!slider) return;
    currentTestimonial = index;
    slider.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

function startAutoSlide() {
    stopAutoSlide();
    testimonialInterval = setInterval(() => {
        if (dots.length > 0) {
            const next = (currentTestimonial + 1) % dots.length;
            goToSlide(next);
        }
    }, 3500);
}

function stopAutoSlide() {
    if (testimonialInterval) clearInterval(testimonialInterval);
}

dots.forEach((dot, index) => {
    dot.addEventListener("click", () => goToSlide(index));
    dot.addEventListener("click", () => {
        goToSlide(index);
        startAutoSlide(); // Reset timer on manual interaction
    });
});

setInterval(() => {
    if (dots.length > 0) {
        const next = (currentTestimonial + 1) % dots.length;
        goToSlide(next);
    }
}, 3500);
if (dots.length > 0) startAutoSlide();

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

window.addEventListener("scroll", () => {
    if (window.pageYOffset > 50) {
    if (!navbar) return;
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 50) {
        navbar.classList.add("scrolled");
        navLinksElements.forEach((link) => link.classList.add("scrolled"));
    } else {
        navbar.classList.remove("scrolled");
        navLinksElements.forEach((link) => link.classList.remove("scrolled"));
    }
});

// INITIALIZE
window.addEventListener("DOMContentLoaded", () => {
    // Statistikani darhol to'ldirish
    document
        .querySelectorAll(".stat-value, .stat-number")
        .forEach((counter) => {
            const target = counter.getAttribute("data-target");
            if (target) {
                const suffix =
                    target === "5" ? "+" : target === "98" ? "%" : "";
                counter.textContent = target + suffix;
            }
        });
});
