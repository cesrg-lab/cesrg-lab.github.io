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

        initMobileNavigation();

        initBackToTop();

        initScrollReveal();

        initActiveNavigation();

        initNoticeBoard();

        initResearchEventLinks();

        initGalleryLinks();

        initExternalLinks();

        initCurrentYear();

    });


    /* =====================================================
       2. MOBILE NAVIGATION
       ===================================================== */

    function initMobileNavigation() {

        var masthead = document.querySelector(".masthead");

        if (!masthead) {
            return;
        }

        var nav = masthead.querySelector(".nav");

        var container = masthead.querySelector(
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


        var button = document.createElement("button");

        button.className = "cesrg-mobile-toggle";

        button.type = "button";

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
                    isOpen ? "true" : "false"
                );

                button.innerHTML =
                    isOpen ? "✕" : "☰";

            }
        );


        /*
         * Close mobile menu after clicking a link.
         */

        var links =
            nav.querySelectorAll("a");

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

                    button.innerHTML = "☰";

                }
            );

        });

    }


    /* =====================================================
       3. BACK TO TOP
       ===================================================== */

    function initBackToTop() {

        var button =
            document.createElement("button");

        button.id =
            "cesrg-back-top";

        button.type = "button";

        button.setAttribute(
            "aria-label",
            "Back to top"
        );

        button.innerHTML = "↑";

        document.body.appendChild(button);


        /*
         * Show button after scrolling.
         */

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 450) {

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
       4. SCROLL REVEAL
       ===================================================== */

    function initScrollReveal() {

        /*
         * Elements explicitly marked with
         * .cesrg-reveal will animate.
         */

        var elements =
            document.querySelectorAll(
                ".cesrg-reveal"
            );


        if (!elements.length) {
            return;
        }


        /*
         * IntersectionObserver is supported
         * by modern browsers.
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
       5. ACTIVE NAVIGATION
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
                link.getAttribute("href");

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
       6. NOTICE BOARD
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
            track.querySelectorAll("a");


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
       7. RESEARCH EVENT → GALLERY
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
                     * If a gallery ID exists on
                     * this page, scroll to it.
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
                     * Otherwise, go to gallery.html
                     * with the selected event.
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
       8. GALLERY HASH HANDLING
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
            document.getElementById(id);


        if (!target) {
            return;
        }


        /*
         * Small delay so the page finishes
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
       9. EXTERNAL LINKS
       ===================================================== */

    function initExternalLinks() {

        var links =
            document.querySelectorAll(
                'a[href^="http"]'
            );


        links.forEach(function (link) {

            /*
             * Don't modify links that
             * explicitly define target.
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
       10. AUTOMATIC YEAR
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
       11. IMAGE LOADING
       ===================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

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
    );


    /* =====================================================
       12. SMOOTH INTERNAL LINKS
       ===================================================== */

    document.addEventListener(
        "click",
        function (event) {

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


            var target =
                document.querySelector(
                    href
                );


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
