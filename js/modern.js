/* =========================================================
   CESRG MODERN WEBSITE JAVASCRIPT
   Control & Energy Systems Research Group
   COMSATS University Islamabad
   ========================================================= */

(function () {

    "use strict";


    /* =====================================================
       1. PAGE READY
       ===================================================== */

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


    /* =====================================================
       2. THEME SWITCHER
       ===================================================== */

    function initThemeSwitcher() {

        var savedTheme =
            localStorage.getItem("cesrg-theme") ||
            "margalla-mist";

        /*
         * Allowed CESRG themes.
         * Prevent invalid values from being stored.
         */

        var allowedThemes = [
            "margalla-mist",
            "institutional-blue",
            "ivory-press",
            "sage-calm",
            "indigo-night",
            "graphite"
        ];

        if (
            allowedThemes.indexOf(savedTheme) === -1
        ) {

            savedTheme = "margalla-mist";

        }


        setTheme(savedTheme);


        /*
         * Theme buttons are already present
         * in the HTML pages.
         */

        var buttons =
            document.querySelectorAll(
                ".theme-btn"
            );


        buttons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    var themeName =
                        button.getAttribute(
                            "data-theme"
                        );


                    if (!themeName) {
                        return;
                    }


                    if (
                        allowedThemes.indexOf(
                            themeName
                        ) === -1
                    ) {

                        return;

                    }


                    setTheme(themeName);

                }
            );

        });

    }


    /*
     * Apply selected theme
     */

    function setTheme(themeName) {

        document.documentElement.setAttribute(
            "data-theme",
            themeName
        );


        localStorage.setItem(
            "cesrg-theme",
            themeName
        );


        /*
         * Highlight active theme button
         */

        var buttons =
            document.querySelectorAll(
                ".theme-btn"
            );


        buttons.forEach(function (button) {

            button.classList.remove(
                "active"
            );


            if (
                button.getAttribute(
                    "data-theme"
                ) === themeName
            ) {

                button.classList.add(
                    "active"
                );

            }

        });

    }


    /* =====================================================
       3. MOBILE NAVIGATION
       ===================================================== */

    function initMobileNavigation() {

        var masthead =
            document.querySelector(
                ".masthead"
            );


        if (!masthead) {
            return;
        }


        var nav =
            masthead.querySelector(
                ".nav"
            );


        var container =
            masthead.querySelector(
                ".navbar-inner .container"
            );


        if (!nav || !container) {
            return;
        }


        /*
         * Prevent creating the button twice.
         */

        if (
            document.querySelector(
                ".cesrg-mobile-toggle"
            )
        ) {

            return;

        }


        var button =
            document.createElement(
                "button"
            );


        button.className =
            "cesrg-mobile-toggle";


        button.type =
            "button";


        button.setAttribute(
            "aria-label",
            "Open navigation menu"
        );


        button.setAttribute(
            "aria-expanded",
            "false"
        );


        button.innerHTML = "☰";


        /*
         * Insert button before navigation.
         */

        container.insertBefore(
            button,
            nav
        );


        /*
         * Toggle navigation.
         */

        button.addEventListener(
            "click",
            function () {

                var isOpen =
                    nav.classList.toggle(
                        "cesrg-mobile-open"
                    );


                button.setAttribute(
                    "aria-expanded",
                    isOpen
                        ? "true"
                        : "false"
                );


                button.innerHTML =
                    isOpen
                        ? "✕"
                        : "☰";

            }
        );


        /*
         * Close mobile menu after
         * clicking a navigation link.
         */

        var links =
            nav.querySelectorAll(
                "a"
            );


        links.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    nav.classList.remove(
                        "cesrg-mobile-open"
                    );


                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    button.innerHTML =
                        "☰";

                }
            );

        });

    }


    /* =====================================================
       4. BACK TO TOP
       ===================================================== */

    function initBackToTop() {

        /*
         * Prevent duplicate button.
         */

        var existing =
            document.getElementById(
                "cesrg-back-top"
            );


        var button =
            existing ||
            document.createElement(
                "button"
            );


        if (!existing) {

            button.id =
                "cesrg-back-top";


            button.type =
                "button";


            button.setAttribute(
                "aria-label",
                "Back to top"
            );


            button.innerHTML =
                "↑";


            document.body.appendChild(
                button
            );

        }


        /*
         * Show button after scrolling.
         */

        window.addEventListener(
            "scroll",
            function () {

                if (
                    window.scrollY > 450
                ) {

                    button.classList.add(
                        "visible"
                    );

                } else {

                    button.classList.remove(
                        "visible"
                    );

                }

            },
            {
                passive: true
            }
        );


        /*
         * Smooth scroll to top.
         */

        button.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       5. SCROLL REVEAL
       ===================================================== */

    function initScrollReveal() {

        var elements =
            document.querySelectorAll(
                ".cesrg-reveal"
            );


        if (!elements.length) {
            return;
        }


        /*
         * Modern browser support.
         */

        if (
            "IntersectionObserver"
            in window
        ) {

            var observer =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "cesrg-visible"
                                    );


                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.12
                    }
                );


            elements.forEach(
                function (element) {

                    observer.observe(
                        element
                    );

                }
            );

        } else {

            /*
             * Fallback for older browsers.
             */

            elements.forEach(
                function (element) {

                    element.classList.add(
                        "cesrg-visible"
                    );

                }
            );

        }

    }


    /* =====================================================
       6. ACTIVE NAVIGATION
       ===================================================== */

    function initActiveNavigation() {

        var currentPage =
            window.location.pathname
                .split("/")
                .pop();


        /*
         * GitHub Pages root.
         */

        if (
            currentPage === "" ||
            currentPage === "/"
        ) {

            currentPage =
                "index.html";

        }


        var links =
            document.querySelectorAll(
                ".masthead .nav a"
            );


        links.forEach(function (link) {

            var href =
                link.getAttribute(
                    "href"
                );


            if (!href) {
                return;
            }


            /*
             * Ignore external URLs.
             */

            if (
                href.indexOf("http") === 0
            ) {

                return;

            }


            var cleanHref =
                href.split("#")[0]
                    .split("?")[0];


            if (
                cleanHref === currentPage
            ) {

                var parent =
                    link.parentElement;


                if (parent) {

                    parent.classList.add(
                        "active"
                    );

                }

            }

        });

    }


    /* =====================================================
       7. NOTICE BOARD
       ===================================================== */

    function initNoticeBoard() {

        var board =
            document.querySelector(
                ".cesrg-notice-board"
            );


        if (!board) {
            return;
        }


        var track =
            board.querySelector(
                ".cesrg-notice-track"
            );


        if (!track) {
            return;
        }


        /*
         * Duplicate items for seamless
         * continuous scrolling.
         */

        var original =
            track.innerHTML;


        if (
            !track.dataset.duplicated
        ) {

            track.innerHTML =
                original + original;


            track.dataset.duplicated =
                "true";

        }


        /*
         * Pause animation while keyboard
         * users focus on a notice.
         */

        var links =
            track.querySelectorAll(
                "a"
            );


        links.forEach(function (link) {

            link.addEventListener(
                "focus",
                function () {

                    track.style.animationPlayState =
                        "paused";

                }
            );


            link.addEventListener(
                "blur",
                function () {

                    track.style.animationPlayState =
                        "";

                }
            );

        });

    }


    /* =====================================================
       8. RESEARCH EVENT → GALLERY
       ===================================================== */

    function initResearchEventLinks() {

        var events =
            document.querySelectorAll(
                "[data-gallery]"
            );


        events.forEach(function (event) {

            event.addEventListener(
                "click",
                function () {

                    var gallery =
                        event.getAttribute(
                            "data-gallery"
                        );


                    if (!gallery) {
                        return;
                    }


                    /*
                     * If gallery ID exists on
                     * current page, scroll to it.
                     */

                    var target =
                        document.getElementById(
                            gallery
                        );


                    if (target) {

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });


                        return;

                    }


                    /*
                     * Otherwise go to gallery.html
                     */

                    window.location.href =
                        "gallery.html#" +
                        encodeURIComponent(
                            gallery
                        );

                }
            );

        });

    }


    /* =====================================================
       9. GALLERY HASH HANDLING
       ===================================================== */

    function initGalleryLinks() {

        var hash =
            window.location.hash;


        if (!hash) {
            return;
        }


        /*
         * Remove #.
         */

        var id =
            decodeURIComponent(
                hash.substring(1)
            );


        if (!id) {
            return;
        }


        var target =
            document.getElementById(
                id
            );


        if (!target) {
            return;
        }


        /*
         * Small delay so page finishes
         * rendering before scrolling.
         */

        setTimeout(
            function () {

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            },
            400
        );

    }


    /* =====================================================
       10. EXTERNAL LINKS
       ===================================================== */

    function initExternalLinks() {

        var links =
            document.querySelectorAll(
                'a[href^="http"]'
            );


        links.forEach(function (link) {

            /*
             * Don't modify links that
             * already define target.
             */

            if (
                !link.hasAttribute(
                    "target"
                )
            ) {

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


    /* =====================================================
       11. AUTOMATIC YEAR
       ===================================================== */

    function initCurrentYear() {

        var year =
            new Date().getFullYear();


        var elements =
            document.querySelectorAll(
                "[data-current-year]"
            );


        elements.forEach(
            function (element) {

                element.textContent =
                    year;

            }
        );

    }


    /* =====================================================
       12. IMAGE LOADING
       ===================================================== */

    function initImageLoading() {

        var images =
            document.querySelectorAll(
                "img"
            );


        images.forEach(
            function (image) {

                /*
                 * Don't override images
                 * that already have loading.
                 */

                if (
                    !image.hasAttribute(
                        "loading"
                    )
                ) {

                    image.setAttribute(
                        "loading",
                        "lazy"
                    );

                }

            }
        );

    }


    /* =====================================================
       13. LAB VIDEO — PLAY WHEN VISIBLE
       ===================================================== */

    function initLabVideo() {

        var labSection =
            document.getElementById(
                "lab"
            );


        var labVideo =
            document.getElementById(
                "cesrgLabVideo"
            );


        if (
            !labSection ||
            !labVideo
        ) {

            return;

        }


        /*
         * IntersectionObserver supported.
         */

        if (
            "IntersectionObserver"
            in window
        ) {

            var videoObserver =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    entry.isIntersecting
                                ) {

                                    labVideo
                                        .play()
                                        .catch(
                                            function () {
                                                /*
                                                 * Autoplay may be
                                                 * blocked by browser.
                                                 */
                                            }
                                        );

                                } else {

                                    labVideo.pause();

                                }

                            }
                        );

                    },
                    {
                        threshold: 0.35
                    }
                );


            videoObserver.observe(
                labSection
            );

        }

    }


    /* =====================================================
       14. SMOOTH INTERNAL LINKS
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

            /*
             * closest() may return null.
             */

            var link =
                event.target.closest(
                    'a[href^="#"]'
                );


            if (!link) {
                return;
            }


            var href =
                link.getAttribute(
                    "href"
                );


            if (
                !href ||
                href === "#"
            ) {

                return;

            }


            var target;


            try {

                target =
                    document.querySelector(
                        href
                    );

            } catch (error) {

                return;

            }


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
