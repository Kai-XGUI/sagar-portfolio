```javascript
// ==========================================
// SAGAR PORTFOLIO - JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. TYPING ANIMATION FOR ABOUT HEADING
    // ==========================================

    const aboutHeading = document.querySelector("#about h2");

    if (aboutHeading) {
        const originalText = aboutHeading.textContent.trim();

        aboutHeading.textContent = "";
        aboutHeading.setAttribute("aria-label", originalText);

        const cursor = document.createElement("span");
        cursor.className = "typing-cursor";
        cursor.setAttribute("aria-hidden", "true");

        aboutHeading.appendChild(cursor);

        let index = 0;

        function typeText() {
            if (index < originalText.length) {
                cursor.before(
                    document.createTextNode(originalText.charAt(index))
                );

                index++;

                setTimeout(typeText, 75);
            } else {
                cursor.classList.add("cursor-finished");
            }
        }

        typeText();
    }


    // ==========================================
    // 2. SCROLL REVEAL ANIMATION
    // ==========================================

    const revealElements = document.querySelectorAll(
        "#skills li, #projects .project"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {
                        entry.target.classList.add("revealed");

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach(function (element, index) {

            element.classList.add("reveal-on-scroll");

            element.style.setProperty(
                "--reveal-delay",
                (index % 6) * 100 + "ms"
            );

            revealObserver.observe(element);

        });

    }


    // ==========================================
    // 3. SKILLS INTERACTION
    // ==========================================

    const skills = document.querySelectorAll("#skills li");

    skills.forEach(function (skill) {

        skill.setAttribute("tabindex", "0");

        skill.setAttribute("role", "button");

        skill.setAttribute("aria-pressed", "false");

        function toggleSkill() {

            const isActive = skill.classList.toggle("skill-active");

            skill.setAttribute("aria-pressed", String(isActive));

        }

        skill.addEventListener("click", toggleSkill);

        skill.addEventListener("keydown", function (event) {

            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleSkill();
            }

        });

    });


    // ==========================================
    // 4. ACTIVE NAVIGATION LINK
    // ==========================================

    const navLinks = document.querySelectorAll("nav a");

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(function (section) {

            const sectionTop = section.getBoundingClientRect().top;

            if (sectionTop <= 180) {
                currentSection = section.id;
            }

        });

        navLinks.forEach(function (link) {

            const target = link.getAttribute("href");

            if (target === "#" + currentSection) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }

        });

    }

    window.addEventListener("scroll", updateActiveNavigation);

    updateActiveNavigation();


    // ==========================================
    // 5. BACK-TO-TOP BUTTON
    // ==========================================

    const backToTop = document.createElement("button");

    backToTop.type = "button";
    backToTop.className = "back-to-top";
    backToTop.textContent = "↑";
    backToTop.setAttribute("aria-label", "Back to top");

    document.body.appendChild(backToTop);

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }

    });

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // ==========================================
    // 6. PROJECT LINK PLACEHOLDER CHECK
    // ==========================================

    const projectLinks = document.querySelectorAll(
        "#projects .project a"
    );

    projectLinks.forEach(function (link) {

        const projectURL = link.getAttribute("href");

        if (
            !projectURL ||
            projectURL.includes("PLACEHOLDER")
        ) {

            link.addEventListener("click", function (event) {

                event.preventDefault();

                showToast(
                    "Add your actual GitHub project link first!"
                );

            });

        } else {

            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");

        }

    });


    // ==========================================
    // 7. TOAST NOTIFICATION
    // ==========================================

    function showToast(message) {

        let toast = document.querySelector(".portfolio-toast");

        if (!toast) {

            toast = document.createElement("div");

            toast.className = "portfolio-toast";

            toast.setAttribute("role", "status");

            toast.setAttribute("aria-live", "polite");

            document.body.appendChild(toast);

        }

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(toast.hideTimer);

        toast.hideTimer = setTimeout(function () {

            toast.classList.remove("show");

        }, 3000);

    }


    // ==========================================
    // 8. AUTOMATIC FOOTER YEAR
    // ==========================================

    const footerText = document.querySelector("footer p");

    if (footerText) {

        footerText.textContent =
            "© " + new Date().getFullYear() +
            " Sagar. Built with HTML, CSS & JavaScript.";

    }


    // ==========================================
    // 9. CONSOLE MESSAGE
    // ==========================================

    console.log("Welcome to Sagar's Portfolio!");

});
```
