(function () {
    "use strict";

    // ========================================
    // DOM READY
    // ========================================

    document.addEventListener("DOMContentLoaded", function () {

        initThemeSwitcher();

        initMobileNavigation();
        initBackToTop();
        initScrollReveal();
        initActiveNavigation();
        initNoticeBoard();
        initResearchEventLinks();
        initGalleryLinks();
        initExternalLinks();
        initCurrentYear();
        initImageLoading();
        initLabVideo();

    });


    // ========================================
    // CESRG THEME SWITCHER
    // ========================================

    function initThemeSwitcher() {

        const themes = [
            "margalla-mist",
            "institutional-blue",
            "ivory-press",
            "sage-calm",
            "indigo-night",
            "graphite"
        ];

        // Load saved theme
        let savedTheme =
            localStorage.getItem("cesrg-theme") || "margalla-mist";

        // Check saved theme
        if (!themes.includes(savedTheme)) {
            savedTheme = "margalla-mist";
        }

        // Apply saved theme
        setTheme(savedTheme);

        // Get theme buttons
        const themeButtons =
            document.querySelectorAll(".theme-btn");

        themeButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const themeName =
                    button.getAttribute("data-theme");

                if (themes.includes(themeName)) {
                    setTheme(themeName);
                }

            });

        });

    }


    // ========================================
    // APPLY THEME
    // ========================================

    function setTheme(themeName) {

        document.documentElement.setAttribute(
            "data-theme",
            themeName
        );

        localStorage.setItem(
            "cesrg-theme",
            themeName
        );

        // Active button
        const themeButtons =
            document.querySelectorAll(".theme-btn");

        themeButtons.forEach(function (button) {

            button.classList.remove("active");

            if (
                button.getAttribute("data-theme") ===
                themeName
            ) {
                button.classList.add("active");
            }

        });

    }


    // ========================================
    // MOBILE NAVIGATION
    // ========================================

    function initMobileNavigation() {

        const masthead = document.querySelector(".masthead");
        const nav = document.querySelector(".nav");
        const container =
            document.querySelector(".navbar-inner .container");

        if (!masthead || !nav || !container) {
            return;
        }

        // Avoid duplicate button
        if (
            document.querySelector(".cesrg-mobile-toggle")
        ) {
            return;
        }

        const toggle = document.createElement("button");

        toggle.className = "cesrg-mobile-toggle";
        toggle.type = "button";
        toggle.setAttribute(
            "aria-label",
            "Toggle navigation"
        );
        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

        toggle.innerHTML = "☰";

        container.insertBefore(toggle, nav);

        toggle.addEventListener("click", function () {

            const isOpen =
                masthead.classList.toggle(
                    "cesrg-mobile-open"
                );

            toggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });

        // Close menu after clicking a link
        nav.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                masthead.classList.remove(
                    "cesrg-mobile-open"
                );

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    // ========================================
    // BACK TO TOP
    // ========================================

    function initBackToTop() {

        const button = document.createElement("button");

        button.id = "cesrg-back-top";
        button.type = "button";
        button.setAttribute(
            "aria-label",
            "Back to top"
        );

        button.innerHTML = "↑";

        document.body.appendChild(button);

        function updateButton() {

            if (window.scrollY > 450) {
                button.classList.add("show");
            } else {
                button.classList.remove("show");
            }

        }

        window.addEventListener(
            "scroll",
            updateButton,
            { passive: true }
        );

        button.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

        updateButton();

    }


    // ========================================
    // SCROLL REVEAL
    // ========================================

    function initScrollReveal() {

        const elements =
            document.querySelectorAll(".cesrg-reveal");

        if (!elements.length) {
            return;
        }

        // Fallback
        if (!("IntersectionObserver" in window)) {

            elements.forEach(function (element) {
                element.classList.add(
                    "cesrg-visible"
                );
            });

            return;
        }

        const observer =
            new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "cesrg-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );

        elements.forEach(function (element) {
            observer.observe(element);
        });

    }


    // ========================================
    // ACTIVE NAVIGATION
    // ========================================

    function initActiveNavigation() {

        const currentPath =
            window.location.pathname
                .split("/")
                .pop()
                .toLowerCase();

        const currentPage =
            currentPath || "index.html";

        document
            .querySelectorAll(".nav a")
            .forEach(function (link) {

                const href =
                    link.getAttribute("href");

                if (!href) {
                    return;
                }

                const linkPage =
                    href.split("/")
                        .pop()
                        .split("#")[0]
                        .toLowerCase();

                if (
                    linkPage === currentPage ||
                    (
                        currentPage === "" &&
                        linkPage === "index.html"
                    )
                ) {

                    link.classList.add("active");

                }

            });

    }


    // ========================================
    // NOTICE BOARD
    // ========================================

    function initNoticeBoard() {

        const boards =
            document.querySelectorAll(
                ".cesrg-notice-board"
            );

        boards.forEach(function (board) {

            const track =
                board.querySelector(
                    ".cesrg-notice-track"
                );

            if (!track) {
                return;
            }

            // Duplicate content for continuous movement
            if (!track.dataset.duplicated) {

                track.innerHTML =
                    track.innerHTML +
                    track.innerHTML;

                track.dataset.duplicated = "true";

            }

            // Pause when focused
            board.addEventListener(
                "focusin",
                function () {
                    track.style.animationPlayState =
                        "paused";
                }
            );

            board.addEventListener(
                "focusout",
                function () {
                    track.style.animationPlayState =
                        "running";
                }
            );

        });

    }


    // ========================================
    // RESEARCH EVENT LINKS
    // ========================================

    function initResearchEventLinks() {

        document
            .querySelectorAll("[data-gallery]")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const target =
                            link.getAttribute(
                                "data-gallery"
                            );

                        if (!target) {
                            return;
                        }

                        const galleryElement =
                            document.getElementById(
                                target
                            );

                        if (galleryElement) {

                            event.preventDefault();

                            galleryElement.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        } else {

                            const isGalleryPage =
                                window.location.pathname
                                    .toLowerCase()
                                    .includes(
                                        "gallery.html"
                                    );

                            if (!isGalleryPage) {

                                event.preventDefault();

                                window.location.href =
                                    "gallery.html#" +
                                    target;

                            }

                        }

                    }
                );

            });

    }


    // ========================================
    // GALLERY HASH
    // ========================================

    function initGalleryLinks() {

        function scrollToHash() {

            const hash =
                window.location.hash;

            if (!hash) {
                return;
            }

            const id =
                decodeURIComponent(
                    hash.substring(1)
                );

            const element =
                document.getElementById(id);

            if (!element) {
                return;
            }

            setTimeout(function () {

                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }, 200);

        }

        scrollToHash();

        window.addEventListener(
            "hashchange",
            scrollToHash
        );

    }


    // ========================================
    // EXTERNAL LINKS
    // ========================================

    function initExternalLinks() {

        document
            .querySelectorAll("a[href]")
            .forEach(function (link) {

                const href =
                    link.getAttribute("href");

                if (!href) {
                    return;
                }

                const isExternal =
                    href.startsWith("http://") ||
                    href.startsWith("https://");

                if (isExternal) {

                    link.setAttribute(
                        "target",
                        "_blank"
                    );

                    link.setAttribute(
                        "rel",
                        "noopener noreferrer"
                    );

                }

            });

    }


    // ========================================
    // CURRENT YEAR
    // ========================================

    function initCurrentYear() {

        const year =
            new Date().getFullYear();

        document
            .querySelectorAll(
                "[data-current-year]"
            )
            .forEach(function (element) {

                element.textContent = year;

            });

    }


    // ========================================
    // IMAGE LAZY LOADING
    // ========================================

    function initImageLoading() {

        document
            .querySelectorAll("img")
            .forEach(function (image) {

                if (
                    !image.hasAttribute("loading")
                ) {

                    image.setAttribute(
                        "loading",
                        "lazy"
                    );

                }

            });

    }


    // ========================================
    // LAB VIDEO
    // ========================================

    function initLabVideo() {

        const labSection =
            document.getElementById("lab");

        const video =
            document.getElementById(
                "cesrgLabVideo"
            );

        if (!labSection || !video) {
            return;
        }

        if (
            !("IntersectionObserver" in window)
        ) {
            return;
        }

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            video.play().catch(
                                function () {}
                            );

                        } else {

                            video.pause();

                        }

                    });

                },
                {
                    threshold: 0.25
                }
            );

        observer.observe(labSection);

    }


    // ========================================
    // SMOOTH INTERNAL LINKS
    // ========================================

    document.addEventListener(
        "click",
        function (event) {

            const link =
                event.target.closest(
                    'a[href^="#"]'
                );

            if (!link) {
                return;
            }

            const href =
                link.getAttribute("href");

            if (
                !href ||
                href === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(href);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }
    );

})();
