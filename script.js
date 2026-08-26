/* =========================================
   1. TEXTE ANIMÉ — TYPED.JS
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    if (typeof Typed !== "undefined") {

        new Typed("#typing", {
            strings: [
                "Développeur Web",
                "Créateur de Sites Web",
                "Développeur JavaScript",
                "UI/UX Designer"
            ],
            typeSpeed: 70,
            backSpeed: 40,
            backDelay: 1500,
            loop: true,
            cursorChar: "|"
        });

    }


    /* =========================================
       2. ANIMATIONS AOS
    ========================================= */

    if (typeof AOS !== "undefined") {

        AOS.init({
            duration: 1000,
            easing: "ease-out-cubic",
            once: true,
            offset: 100
        });

    }


    /* =========================================
       3. DÉFILEMENT FLUIDE
    ========================================= */

    document.querySelectorAll(".navbar a").forEach(function (ancre) {

        ancre.addEventListener("click", function (e) {

            const cible = document.querySelector(
                this.getAttribute("href")
            );

            if (cible) {

                e.preventDefault();

                cible.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =========================================
       4. APPARITION DES SECTIONS
    ========================================= */

    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },
        {
            threshold: 0.15
        }
    );

    sections.forEach(function (section) {
        observer.observe(section);
    });


    /* =========================================
       5. BOUTON RETOUR EN HAUT
    ========================================= */

    const retourHaut = document.createElement("button");

    retourHaut.id = "retourHaut";
    retourHaut.innerHTML = "↑";
    retourHaut.setAttribute("aria-label", "Retour en haut");

    document.body.appendChild(retourHaut);

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {

            retourHaut.style.display = "block";

        } else {

            retourHaut.style.display = "none";

        }

    });

    retourHaut.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    /* =========================================
       6. EFFET SUR LA NAVIGATION
    ========================================= */

    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", function () {

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.classList.add("scrolled");

        } else {

            navbar.classList.remove("scrolled");

        }

    });

});
/* =================================
   PARTICULES ANIMÉES
================================= */

if (typeof particlesJS !== "undefined") {

    particlesJS("particles-js", {

        particles: {

            number: {
                value: 70,
                density: {
                    enable: true,
                    value_area: 900
                }
            },

            color: {
                value: "#38bdf8"
            },

            shape: {
                type: "circle"
            },

            opacity: {
                value: 0.5,
                random: true
            },

            size: {
                value: 3,
                random: true
            },

            line_linked: {
                enable: true,
                distance: 150,
                color: "#38bdf8",
                opacity: 0.25,
                width: 1
            },

            move: {
                enable: true,
                speed: 2,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                bounce: false
            }

        },

        interactivity: {

            detect_on: "canvas",

            events: {

                onhover: {
                    enable: true,
                    mode: "grab"
                },

                onclick: {
                    enable: true,
                    mode: "push"
                },

                resize: true

            },

            modes: {

                grab: {
                    distance: 180,
                    line_linked: {
                        opacity: 0.5
                    }
                },

                push: {
                    particles_nb: 4
                }

            }

        },

        retina_detect: true

    });

}
/* =====================================
   BARRES DE COMPÉTENCES ANIMÉES
===================================== */

const skillsSection = document.querySelector("#skills");

const skillsObserver = new IntersectionObserver(
    function(entries) {

        if (entries[0].isIntersecting) {

            const progressBars =
                document.querySelectorAll(".skill-progress");

            progressBars.forEach(function(bar) {

                const progress =
                    bar.getAttribute("data-progress");

                bar.style.width = progress + "%";

            });

            skillsObserver.unobserve(skillsSection);
        }

    },
    {
        threshold: 0.3
    }
);

if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

/* =====================================
   FORMULAIRE EMAILJS
===================================== */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {

    emailjs.init({
        publicKey: "TON_PUBLIC_KEY"
    });

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const button = contactForm.querySelector("button");

        button.disabled = true;
        button.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Envoi...';

        emailjs.sendForm(
            "TON_SERVICE_ID",
            "TON_TEMPLATE_ID",
            contactForm
        )
        .then(function () {

            formStatus.textContent =
                "✅ Votre message a bien été envoyé !";

            formStatus.className = "success";

            contactForm.reset();

            button.disabled = false;
            button.innerHTML =
                '<i class="fa-solid fa-paper-plane"></i> Envoyer le message';

        })
        .catch(function (error) {

            console.error("Erreur EmailJS :", error);

            formStatus.textContent =
                "❌ Une erreur est survenue. Veuillez réessayer.";

            formStatus.className = "error";

            button.disabled = false;
            button.innerHTML =
                '<i class="fa-solid fa-paper-plane"></i> Envoyer le message';

        });

    });

}