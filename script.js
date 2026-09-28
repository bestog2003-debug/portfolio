/* =====================================================
   AOS
===================================================== */

try {
    AOS.init({
        duration: 900,
        once: true,
        offset: 100
    });
} catch (err) {
    console.error("Erreur AOS :", err);
}


/* =====================================================
   TEXTE QUI S'ÉCRIT AUTOMATIQUEMENT
===================================================== */

try {

    const mots = [
        "Développeur Web",
        "Créateur de Sites",
        "JavaScript",
        "UI Designer"
    ];

    let mot = 0;
    let lettre = 0;
    let efface = false;

    const typing = document.getElementById("typing");

    function ecrire() {

        if (!typing) return;

        const texte = mots[mot];

        if (!efface) {

            typing.textContent = texte.substring(0, lettre);

            lettre++;

            if (lettre > texte.length) {

                efface = true;

                setTimeout(ecrire, 1500);

                return;
            }

        } else {

            typing.textContent = texte.substring(0, lettre);

            lettre--;

            if (lettre < 0) {

                efface = false;

                mot = (mot + 1) % mots.length;

                lettre = 0;
            }
        }

        setTimeout(
            ecrire,
            efface ? 50 : 100
        );
    }

    if (typing) ecrire();

} catch (err) {
    console.error("Erreur texte animé :", err);
}


/* =====================================================
   MENU MOBILE
===================================================== */

try {

    const menuBtn = document.getElementById("menu-btn");
    const navLinks = document.querySelector(".nav-links");

    if (menuBtn && navLinks) {

        const iconBars = menuBtn.querySelector(".icon-bars");
        const iconXmark = menuBtn.querySelector(".icon-xmark");

        function setMenuIcon(isOpen) {
            if (iconBars) iconBars.style.display = isOpen ? "none" : "";
            if (iconXmark) iconXmark.style.display = isOpen ? "" : "none";
        }

        menuBtn.addEventListener("click", () => {

            navLinks.classList.toggle("active");

            setMenuIcon(navLinks.classList.contains("active"));

        });

        /* Fermer le menu après clic sur un lien */

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("active");

                setMenuIcon(false);

            });

        });

    }

} catch (err) {
    console.error("Erreur menu mobile :", err);
}


/* =====================================================
   DÉFILEMENT FLUIDE
===================================================== */

try {

    document.querySelectorAll('a[href^="#"]').forEach(ancre => {

        ancre.addEventListener("click", function(e) {

            const cible = document.querySelector(
                this.getAttribute("href")
            );

            if (cible) {

                e.preventDefault();

                cible.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });

} catch (err) {
    console.error("Erreur défilement fluide :", err);
}


/* =====================================================
   MODE SOMBRE / CLAIR
===================================================== */

try {

    const themeToggle =
        document.getElementById("theme-toggle");

    if (themeToggle) {

        const iconMoon = themeToggle.querySelector(".icon-moon");
        const iconSun = themeToggle.querySelector(".icon-sun");

        function setThemeIcon(isLight) {
            if (iconMoon) iconMoon.style.display = isLight ? "none" : "";
            if (iconSun) iconSun.style.display = isLight ? "" : "none";
        }

        const savedTheme =
            localStorage.getItem("theme");

        if (savedTheme === "light") {

            document.body.classList.add("light");

            setThemeIcon(true);

        }

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("light");

            const isLight =
                document.body.classList.contains("light");

            localStorage.setItem(
                "theme",
                isLight ? "light" : "dark"
            );

            setThemeIcon(isLight);

        });

    }

} catch (err) {
    console.error("Erreur mode sombre/clair :", err);
}


/* =====================================================
   BARRES DE COMPÉTENCES
===================================================== */

try {

    const progressBars =
        document.querySelectorAll(".progress");

    if (progressBars.length && "IntersectionObserver" in window) {

        const skillObserver =
            new IntersectionObserver((entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const bar = entry.target;

                        const width =
                            bar.getAttribute("data-width");

                        bar.style.width = width;

                        skillObserver.unobserve(bar);
                    }

                });

            }, {
                threshold: 0.4
            });

        progressBars.forEach(bar => {

            skillObserver.observe(bar);

        });

    }

} catch (err) {
    console.error("Erreur barres de compétences :", err);
}


/* =====================================================
   COMPTEURS (STATISTIQUES)
===================================================== */

try {

    const counters =
        document.querySelectorAll(".counter");

    if (counters.length) {

        let counterStarted = false;

        function lancerCompteurs() {

            if (counterStarted) return;

            counterStarted = true;

            counters.forEach(counter => {

                const target =
                    Number(counter.dataset.target);

                if (!target || Number.isNaN(target)) {

                    console.warn(
                        "Compteur sans data-target valide :",
                        counter
                    );

                    return;
                }

                let count = 0;

                const duration = 1800;

                const increment =
                    target / (duration / 20);

                function updateCounter() {

                    count += increment;

                    if (count < target) {

                        counter.textContent =
                            Math.floor(count) + "+";

                        setTimeout(
                            updateCounter,
                            20
                        );

                    } else {

                        counter.textContent =
                            target + "+";

                    }

                }

                updateCounter();

            });

        }

        const statsSection =
            document.querySelector(".stats");

        if (statsSection && "IntersectionObserver" in window) {

            const counterObserver =
                new IntersectionObserver((entries) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            lancerCompteurs();

                        }

                    });

                }, {
                    // plusieurs seuils : se déclenche même si la
                    // section est plus haute ou plus basse que prévu
                    threshold: [0, 0.15, 0.3, 0.5]
                });

            counterObserver.observe(statsSection);

            // Filet de sécurité : si la section est déjà visible
            // au chargement (page rechargée en plein milieu, etc.)
            // certains navigateurs ne redéclenchent pas l'observer
            // à temps -> on vérifie une fois manuellement.
            const rect = statsSection.getBoundingClientRect();

            if (rect.top < window.innerHeight && rect.bottom > 0) {

                lancerCompteurs();

            }

        } else if (statsSection) {

            // Pas d'IntersectionObserver disponible : on lance direct
            lancerCompteurs();

        }

    }

} catch (err) {
    console.error("Erreur compteurs statistiques :", err);
}


/* =====================================================
   RETOUR EN HAUT
===================================================== */

try {

    const backToTop =
        document.getElementById("back-to-top");

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });

        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }

} catch (err) {
    console.error("Erreur bouton retour en haut :", err);
}


/* =====================================================
   PRELOADER
===================================================== */

try {

    window.addEventListener("load", () => {

        const preloader =
            document.getElementById("preloader");

        if (preloader) {

            setTimeout(() => {

                preloader.classList.add("hide");

            }, 700);

        }

    });

} catch (err) {
    console.error("Erreur preloader :", err);
}


/* =====================================================
   CURSEUR PERSONNALISÉ
===================================================== */

try {

    const cursor =
        document.querySelector(".cursor");

    const cursorDot =
        document.querySelector(".cursor-dot");

    if (cursor && cursorDot) {

        document.addEventListener("mousemove", (e) => {

            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";

            cursorDot.style.left = e.clientX + "px";
            cursorDot.style.top = e.clientY + "px";

        });

        document.querySelectorAll("a, button").forEach(element => {

            element.addEventListener("mouseenter", () => {

                cursor.classList.add("cursor-hover");

            });

            element.addEventListener("mouseleave", () => {

                cursor.classList.remove("cursor-hover");

            });

        });

    }

} catch (err) {
    console.error("Erreur curseur personnalisé :", err);
}


/* =====================================================
   PARTICULES
===================================================== */

try {

    const canvas =
        document.getElementById("particles");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        let particles = [];

        // Distance max (en pixels) en dessous de laquelle deux points
        // sont reliés par une ligne : c'est ça qui donne l'effet
        // "constellation".
        const DISTANCE_MAX = 140;

        function resizeCanvas() {

            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;

        }

        resizeCanvas();

        window.addEventListener(
            "resize",
            resizeCanvas
        );


        class Particle {

            constructor() {

                this.x =
                    Math.random() * canvas.width;

                this.y =
                    Math.random() * canvas.height;

                this.size =
                    Math.random() * 1.6 + 1;

                this.speedX =
                    (Math.random() - 0.5) * 0.4;

                this.speedY =
                    (Math.random() - 0.5) * 0.4;

            }


            update() {

                this.x += this.speedX;
                this.y += this.speedY;

                if (
                    this.x < 0 ||
                    this.x > canvas.width
                ) {

                    this.speedX *= -1;

                }

                if (
                    this.y < 0 ||
                    this.y > canvas.height
                ) {

                    this.speedY *= -1;

                }

            }


            draw() {

                ctx.fillStyle = "#00e5ff";

                ctx.beginPath();

                ctx.arc(
                    this.x,
                    this.y,
                    this.size,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }

        }


        function createParticles() {

            particles = [];

            const number =
                Math.min(
                    Math.floor((canvas.width * canvas.height) / 12000),
                    140
                );

            for (
                let i = 0;
                i < number;
                i++
            ) {

                particles.push(
                    new Particle()
                );

            }

        }


        function drawLinks() {

            for (let i = 0; i < particles.length; i++) {

                for (let j = i + 1; j < particles.length; j++) {

                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < DISTANCE_MAX) {

                        const opacity = 1 - dist / DISTANCE_MAX;

                        ctx.strokeStyle =
                            "rgba(0, 229, 255, " + (opacity * 0.35) + ")";

                        ctx.lineWidth = 1;

                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();

                    }

                }

            }

        }


        createParticles();


        function animateParticles() {

            ctx.clearRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            particles.forEach(particle => {

                particle.update();
                particle.draw();

            });

            drawLinks();

            requestAnimationFrame(
                animateParticles
            );

        }


        animateParticles();


        window.addEventListener(
            "resize",
            createParticles
        );

    }

} catch (err) {
    console.error("Erreur particules :", err);
}


/* =====================================================
   EMAILJS
===================================================== */

/*
   IMPORTANT :

   Avant d'utiliser le formulaire,
   remplace les 3 valeurs ci-dessous
   par celles de ton compte EmailJS
   (Account > General pour la clé publique,
   Email Services pour le service, Email Templates
   pour le modèle).
*/

try {

    const EMAILJS_PUBLIC_KEY = "CIUMjb_yh_WzuGOf";
const EMAILJS_SERVICE_ID = "service_j5siahp";
const EMAILJS_TEMPLATE_ID = "template_mczpcrj";
    const contactForm =
        document.getElementById("contact-form");

    const formMessage =
        document.getElementById("form-message");


    if (
        typeof emailjs !== "undefined" &&
        EMAILJS_PUBLIC_KEY !== "TON_PUBLIC_KEY"
    ) {

        emailjs.init({
            publicKey: EMAILJS_PUBLIC_KEY
        });

    }


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function(event) {

                event.preventDefault();


                if (typeof emailjs === "undefined") {

                    if (formMessage) {
                        formMessage.textContent =
                            "❌ La librairie EmailJS n'a pas pu se charger. Vérifie ta connexion.";
                    }

                    return;
                }


                if (
                    EMAILJS_PUBLIC_KEY === "TON_PUBLIC_KEY"
                ) {

                    if (formMessage) {
                        formMessage.textContent =
                            "⚠️ Configure d'abord EmailJS dans script.js.";
                    }

                    return;
                }


                if (formMessage) {
                    formMessage.textContent =
                        "Envoi en cours...";
                }


                emailjs.sendForm(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    this
                )

                .then(() => {

                    if (formMessage) {
                        formMessage.textContent =
                            "✅ Message envoyé avec succès !";
                    }

                    contactForm.reset();

                })

                .catch((error) => {

                    console.error(error);

                    if (formMessage) {
                        formMessage.textContent =
                            "❌ Une erreur est survenue. Réessayez.";
                    }

                });

            }
        );

    }

} catch (err) {
    console.error("Erreur formulaire de contact :", err);
}
