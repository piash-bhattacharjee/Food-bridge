/* ===========================================
   WEBSITE LOADER
=========================================== */

window.addEventListener("load", function () {

    const loader = document.getElementById("loader");

    if (loader) {

        setTimeout(() => {

            loader.style.opacity = "0";

            loader.style.visibility = "hidden";

        }, 1200);

    }

});


/* ===========================================
   SCROLL TO TOP BUTTON
=========================================== */

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {

        scrollTopBtn.style.display = "block";

    } else {

        scrollTopBtn.style.display = "none";

    }

});

scrollTopBtn.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ===========================================
   NAVBAR SCROLL EFFECT
=========================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(255,255,255,.95)";

        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.12)";

    }

    else {

        navbar.style.background = "rgba(255,255,255,.75)";

        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.08)";

    }

});


/* ===========================================
   SMOOTH NAVIGATION
=========================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});
/* ===========================================
   COUNTER ANIMATION
=========================================== */

const counters = document.querySelectorAll(".counter h3");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const target = parseInt(counter.innerText);

            let count = 0;

            const speed = target / 100;

            const updateCounter = () => {

                if (count < target) {

                    count += speed;

                    counter.innerText = Math.ceil(count) + "+";

                    requestAnimationFrame(updateCounter);

                } else {

                    counter.innerText = target + "+";

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

});

counters.forEach(counter => {

    counterObserver.observe(counter);

});




/* ===========================================
   NEWSLETTER FORM
=========================================== */

const newsletterForm = document.querySelector(".newsletter-form");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert("Thank you for subscribing to FoodBridge!");

        newsletterForm.reset();

    });

}


/* ===========================================
   DONATE BUTTON
=========================================== */

const donateButton = document.querySelector(".floating-donate a");

if (donateButton) {

    donateButton.addEventListener("click", function () {

        alert("Food Donation feature will be available in Update 2.");

    });

}


/* ===========================================
   HERO BUTTON EFFECT
=========================================== */

const heroButtons = document.querySelectorAll(".hero-buttons button");

heroButtons.forEach(button => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "scale(1.05)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "scale(1)";

    });

});


/* ===========================================
   CONSOLE MESSAGE
=========================================== */

console.log("FoodBridge Update 1 Loaded Successfully.");