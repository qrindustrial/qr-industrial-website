"use strict";

document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-button");
    const navigation = document.querySelector(".main-navigation");
    const navigationLinks = document.querySelectorAll(".main-navigation a");
    const currentYear = document.querySelector("#currentYear");
    const revealElements = document.querySelectorAll(".reveal");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear().toString();
    }

    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });

        navigationLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navigation.classList.remove("open");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach((element) => {
            element.classList.add("visible");
        });
    }
});