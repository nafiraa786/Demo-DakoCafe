/* ==========================================================================
   DAKO CAFE - Premium Main Interactivity Engine
   Designed by Award-winning UI/UX, Performance & Frontend Experts.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // DOM ELEMENTS INDEX
    // ==========================================
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    const hamburger = document.getElementById('hamburger');
    const mobileNavClose = document.getElementById('mobileNavClose');
    const navLinks = document.getElementById('navLinks');
    const navLinkItems = document.querySelectorAll('.nav-link');

    // Menu elements
    const menuSearch = document.getElementById('menuSearch');
    const clearSearch = document.getElementById('clearSearch');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuGrid = document.getElementById('menuGrid');
    const menuCards = document.querySelectorAll('.menu-card');
    const menuEmptyState = document.getElementById('menuEmptyState');
    const seeMoreContainer = document.getElementById('seeMoreContainer');
    const seeMoreBtn = document.getElementById('seeMoreBtn');

    // Cart elements
    const cartStickyBar = document.getElementById('cartStickyBar');
    const cartBarQty = document.getElementById('cartBarQty');
    const cartBarTotal = document.getElementById('cartBarTotal');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');

    // Location & Contact elements
    const mapOverlay = document.getElementById('mapOverlay');
    const clickToCopyPhone = document.getElementById('clickToCopyPhone');
    const copyFeedback = document.getElementById('copyFeedback');
    const contactForm = document.getElementById('contactForm');
    const formSuccessAlert = document.getElementById('formSuccessAlert');

    // Modals
    const privacyBtn = document.getElementById('privacyBtn');
    const termsBtn = document.getElementById('termsBtn');
    const legalModal = document.getElementById('legalModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');

    // ==========================================
    // STATE MANAGEMENT
    // ==========================================
   const state = {
    cart: {},
    activeFilter: "all",
    expandedMenu: false
};

const MENU_VISIBLE_LIMIT = 4;
const menuCardsArray = Array.from(menuCards);

function getCategoryCards(filter) {
    return menuCardsArray.filter(card => filter === "all" || card.dataset.category === filter);
}

function setActiveFilterButton(filter) {
    filterBtns.forEach(btn => {
        const isActive = btn.dataset.filter === filter;
        btn.classList.toggle('active', isActive);
        btn.setAttribute('aria-selected', String(isActive));
    });
}


    // ==========================================
    // MOBILE NAVIGATION & SCROLL TRACKING
    // ==========================================
    let navOverlay = null;

    function buildNavOverlay() {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
        navOverlay.addEventListener('click', closeMobileNav);
    }

    function openMobileNav() {
        hamburger.classList.add('active');
        hamburger.setAttribute('aria-expanded', 'true');
        navLinks.classList.add('open');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileNav() {
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('open');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function syncNavForViewport() {
        if (window.innerWidth > 1024) {
            closeMobileNav();
        }
    }

    buildNavOverlay();

    hamburger.addEventListener('click', () => {
        const isOpen = hamburger.classList.contains('active');
        if (isOpen) {
            closeMobileNav();
        } else {
            openMobileNav();
        }
    });

    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', closeMobileNav);
    }

    // Close links on select
    navLinkItems.forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });

    // ESC to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileNav();
    });

    window.addEventListener('resize', syncNavForViewport);

    // Scroll Progress Indicator & Sticky Navbar Glassmorphic styling
    function trackScroll() {
        const scrollPos = window.scrollY;
        const pageHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progressPercentage = (scrollPos / pageHeight) * 100;

        if (scrollProgress) {
            scrollProgress.style.width = `${progressPercentage}%`;
        }

        if (scrollPos > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', trackScroll, { passive: true });
    trackScroll(); // Immediate initial run

    // Active Section Link Tracker Spy
    const trackableSections = document.querySelectorAll('section[id], header[id]');

    function updateActiveNavSpy() {
        const currentScroll = window.scrollY + 120;

        trackableSections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            const id = sec.getAttribute('id');

            if (currentScroll >= top && currentScroll < top + height) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavSpy, { passive: true });


    // ==========================================
    // TIMEZONE OPERATIONAL AVAILABILITY ENGINE
    // ==========================================
    function checkOperationalStatus() {
        // Dukem is in East Africa Time (EAT - GMT+3)
        const d = new Date();
        const utcTime = d.getTime() + (d.getTimezoneOffset() * 60000);
        const dukemTime = new Date(utcTime + (3600000 * 3)); // UTC + 3 hours

        const hour = dukemTime.getHours();
        const minutes = dukemTime.getMinutes();
        const currentDecimalHour = hour + (minutes / 60);

        // Open daily: 8:00 AM to 10:00 PM (8.0 to 22.0)
        const isOpen = currentDecimalHour >= 8 && currentDecimalHour < 22;

        const bannerText = document.getElementById('availabilityText');
        const bannerPulse = document.querySelector('.availability-pulse');
        const statusLight = document.querySelector('.status-indicator-light');
        const statusTitle = document.getElementById('liveStatusTitle');
        const statusDesc = document.getElementById('liveStatusDesc');

        if (isOpen) {
            // Setup Open UI states
            if (bannerText) bannerText.textContent = "We are open! Drop by or place your WhatsApp order today.";
            if (bannerPulse) {
                bannerPulse.className = "availability-pulse open";
            }
            if (statusLight) {
                statusLight.className = "status-indicator-light open";
            }
            if (statusTitle) statusTitle.textContent = "Now Welcoming Guests";
            if (statusDesc) statusDesc.textContent = "Our espresso machines are hot and fresh! Come on in!";
        } else {
            // Setup Closed UI states
            if (bannerText) bannerText.textContent = "We are closed right now. Opening hours: 8:00 AM - 10:00 PM daily.";
            if (bannerPulse) {
                bannerPulse.className = "availability-pulse closed";
            }
            if (statusLight) {
                statusLight.className = "status-indicator-light closed";
            }
            if (statusTitle) statusTitle.textContent = "Closed Right Now";
            if (statusDesc) statusDesc.textContent = "We're closed. Visit us tomorrow from 8:00 AM onwards!";
        }
    }

    checkOperationalStatus();
    setInterval(checkOperationalStatus, 60000); // Check status every minute


    // ==========================================
    // INTERACTIVE SEARCH & CATEGORY FILTERS
    // ==========================================
    function processMenuDisplay() {
        const searchQuery = menuSearch.value.trim().toLowerCase();
        const currentFilter = state.activeFilter || 'all';
        const categoryCards = getCategoryCards(currentFilter);
        const visiblePreview = categoryCards.slice(0, MENU_VISIBLE_LIMIT);
        const visibleIds = new Set(visiblePreview.map(card => card.id));

        let visible = 0;

        menuCards.forEach(card => {
            const category = card.dataset.category;
            const title = card.querySelector('.menu-card-title').textContent.toLowerCase();
            const desc = card.querySelector('.menu-card-desc').textContent.toLowerCase();
            const matchesSearch = title.includes(searchQuery) || desc.includes(searchQuery);

            let shouldShow = false;

            if (searchQuery !== '') {
                shouldShow = matchesSearch && (currentFilter === 'all' || category === currentFilter);
            } else if (!state.expandedMenu) {
                shouldShow = visibleIds.has(card.id);
            } else {
                shouldShow = currentFilter === 'all' || category === currentFilter;
            }

            card.classList.toggle('hidden', !shouldShow);

            if (shouldShow) visible++;
        });

        menuEmptyState.style.display = visible === 0 ? 'block' : 'none';

        if (!state.expandedMenu) {
            seeMoreContainer.classList.remove('disabled');
            seeMoreBtn.innerHTML = `<i class="fa-solid fa-book-open"></i><span>View Full Menu</span>`;
        } else {
            seeMoreContainer.classList.add('disabled');
            seeMoreBtn.innerHTML = `<i class="fa-solid fa-check"></i><span>Full Menu Visible</span>`;
        }
    }

    // Input listening
    if (menuSearch) {
        menuSearch.addEventListener('input', () => {
            processMenuDisplay();
        });
    }

    if (clearSearch) {
        clearSearch.addEventListener('click', () => {
            menuSearch.value = '';
            state.expandedMenu = false;
            processMenuDisplay();
            menuSearch.focus();
        });
    }

    // Category filter tab select
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            state.activeFilter = btn.dataset.filter;
            state.expandedMenu = false;
            setActiveFilterButton(state.activeFilter);
            processMenuDisplay();
        });
    });

    if (seeMoreBtn) {
        seeMoreBtn.addEventListener('click', () => {
            state.activeFilter = 'all';
            state.expandedMenu = true;
            setActiveFilterButton(state.activeFilter);
            processMenuDisplay();

            menuGrid.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }

    processMenuDisplay();


    // ==========================================
    // INTERACTIVE WHATSAPP ORDER CART BUILDER
    // ==========================================
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');

    function updateCartStickyUI() {
        let totalQty = 0;
        let totalPrice = 0;

        Object.keys(state.cart).forEach(id => {
            totalQty += state.cart[id].qty;
            totalPrice += state.cart[id].qty * state.cart[id].price;
        });

        if (totalQty > 0) {
            cartStickyBar.classList.add('active');
            document.body.classList.add('cart-active');
            if (cartBarQty) cartBarQty.textContent = `${totalQty} item${totalQty > 1 ? 's' : ''}`;
            if (cartBarTotal) cartBarTotal.textContent = `${totalPrice} ETB`;
        } else {
            cartStickyBar.classList.remove('active');
            document.body.classList.remove('cart-active');
        }
    }

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.menu-card');
            const id = card.getAttribute('id');
            const title = card.querySelector('.menu-card-title').textContent;
            const price = parseInt(card.querySelector('.menu-card-price').dataset.price, 10);

            if (!state.cart[id]) {
                state.cart[id] = {
                    name: title,
                    price: price,
                    qty: 1
                };
            } else {
                state.cart[id].qty += 1;
            }

            // Simple active click bounce effect
            btn.style.transform = 'scale(0.85)';
            setTimeout(() => {
                btn.style.transform = '';
            }, 150);

            updateCartStickyUI();
        });
    });

    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', () => {
            state.cart = {};
            updateCartStickyUI();
        });
    }

    if (cartCheckoutBtn) {
        cartCheckoutBtn.addEventListener('click', () => {
            let total = 0;
            let message = "Hi Dako Cafe, I would like to place a fresh order!\n\nOrder Details:\n";

            Object.keys(state.cart).forEach(id => {
                const item = state.cart[id];
                const itemTotal = item.price * item.qty;
                message += `- ${item.qty}x *${item.name}* (${item.price} ETB each) - ${itemTotal} ETB\n`;
                total += itemTotal;
            });

            message += `\nGrand Total: *${total} ETB*\n`;
            message += `\nService Type: Dine-in / Takeaway / Delivery (Dukem)`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/251918106034?text=${encodedMessage}`;

            // Redirect smoothly
            window.open(whatsappURL, '_blank', 'noopener');
        });
    }


    // ==========================================
    // KEYBOARD-FRIENDLY LIGHTBOX GALLERY
    // ==========================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentLightboxIdx = -1;

    function displayLightbox(idx) {
        currentLightboxIdx = idx;
        const currentItem = galleryItems[idx];
        const img = currentItem.querySelector('img');
        if (!img) return;

        // Create accessible framing
        const frame = document.createElement('div');
        frame.className = 'lightbox-frame';
        frame.setAttribute('role', 'dialog');
        frame.setAttribute('aria-modal', 'true');
        frame.setAttribute('aria-label', 'Fullscreen image preview');

        const box = document.createElement('div');
        box.className = 'lightbox-content-box';

        const imgClone = document.createElement('img');
        imgClone.src = img.src;
        imgClone.alt = img.alt;
        imgClone.className = 'lightbox-img';

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.className = 'modal-close-btn';
        closeBtn.setAttribute('aria-label', 'Close gallery view');

        // Navigation controls
        const leftArrow = document.createElement('button');
        leftArrow.innerHTML = '<i class="fa-solid fa-chevron-left"></i>';
        leftArrow.setAttribute('aria-label', 'Previous image');
        leftArrow.style.cssText = `
            position: absolute;
            left: -60px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #fff;
            font-size: 2rem;
            cursor: pointer;
        `;

        const rightArrow = document.createElement('button');
        rightArrow.innerHTML = '<i class="fa-solid fa-chevron-right"></i>';
        rightArrow.setAttribute('aria-label', 'Next image');
        rightArrow.style.cssText = `
            position: absolute;
            right: -60px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #fff;
            font-size: 2rem;
            cursor: pointer;
        `;

        // Appending
        box.appendChild(imgClone);
        box.appendChild(closeBtn);
        if (galleryItems.length > 1) {
            box.appendChild(leftArrow);
            box.appendChild(rightArrow);
        }
        frame.appendChild(box);
        document.body.appendChild(frame);
        document.body.style.overflow = 'hidden';

        function removeLightbox() {
            frame.remove();
            document.body.style.overflow = '';
            currentItem.focus();
        }

        closeBtn.addEventListener('click', removeLightbox);
        frame.addEventListener('click', (e) => {
            if (e.target === frame) removeLightbox();
        });

        // Left/Right actions
        function navLeft(e) {
            e.stopPropagation();
            frame.remove();
            let prevIdx = currentLightboxIdx - 1;
            if (prevIdx < 0) prevIdx = galleryItems.length - 1;
            displayLightbox(prevIdx);
        }

        function navRight(e) {
            e.stopPropagation();
            frame.remove();
            let nextIdx = currentLightboxIdx + 1;
            if (nextIdx >= galleryItems.length) nextIdx = 0;
            displayLightbox(nextIdx);
        }

        leftArrow.addEventListener('click', navLeft);
        rightArrow.addEventListener('click', navRight);

        // Keyboard navigation
        function keyHandler(e) {
            if (e.key === 'Escape') {
                removeLightbox();
                document.removeEventListener('keydown', keyHandler);
            } else if (e.key === 'ArrowLeft') {
                navLeft(e);
                document.removeEventListener('keydown', keyHandler);
            } else if (e.key === 'ArrowRight') {
                navRight(e);
                document.removeEventListener('keydown', keyHandler);
            }
        }
        document.addEventListener('keydown', keyHandler);
    }

    galleryItems.forEach((item, idx) => {
        item.addEventListener('click', () => displayLightbox(idx));
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                displayLightbox(idx);
            }
        });
    });


    // ==========================================
    // MAP INTERACTION OVERLAY PROTECTOR
    // ==========================================
    if (mapOverlay) {
        mapOverlay.addEventListener('click', () => {
            mapOverlay.classList.add('inactive');
        });
    }

    // Leave map re-enables protection
    const locationSec = document.getElementById('location');
    if (locationSec) {
        locationSec.addEventListener('mouseleave', () => {
            if (mapOverlay) mapOverlay.classList.remove('inactive');
        });
    }


    // ==========================================
    // CLICK TO COPY PHONE UTILITY
    // ==========================================
    if (clickToCopyPhone) {
        clickToCopyPhone.addEventListener('click', () => {
            const num = "+251918106034";

            navigator.clipboard.writeText(num).then(() => {
                copyFeedback.textContent = "Copied!";
                copyFeedback.classList.add('copied');

                setTimeout(() => {
                    copyFeedback.textContent = "Copy";
                    copyFeedback.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error("Clipboard copy failed: ", err);
            });
        });
    }


    // ==========================================
    // CONTACT FORM VALIDATION & AJAX RESPONSE
    // ==========================================
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('formName');
            const phone = document.getElementById('formPhone');
            const message = document.getElementById('formMessage');

            let isValid = true;

            // Reset error states
            document.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('has-error'));
            name.classList.remove('invalid');
            phone.classList.remove('invalid');
            message.classList.remove('invalid');

            // Name
            if (name.value.trim().length < 2) {
                isValid = false;
                name.closest('.form-group').classList.add('has-error');
                name.classList.add('invalid');
            }

            // Phone (simple check)
            if (phone.value.trim().length < 6) {
                isValid = false;
                phone.closest('.form-group').classList.add('has-error');
                phone.classList.add('invalid');
            }

            // Message
            if (message.value.trim().length < 4) {
                isValid = false;
                message.closest('.form-group').classList.add('has-error');
                message.classList.add('invalid');
            }

            if (isValid) {
                const submitBtn = document.getElementById('formSubmitBtn');
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

                // Simulate high-grade AJAX transmission
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    formSuccessAlert.style.display = 'block';

                    // Reset form fields
                    contactForm.reset();
                }, 1500);
            }
        });
    }


    // ==========================================
    // ACCESSIBLE PRIVACY / TERMS MODALS
    // ==========================================
    const legalTexts = {
        privacy: `
            <h4>Dako Cafe Privacy Policy</h4>
            <br>
            <p>At Dako Cafe, we are fully committed to protecting the privacy of our web visitors and customers. Our policy explains how your information is safeguarded:</p>
            <br>
            <p><strong>1. Information Collection:</strong> Our website runs entirely statically. We do not use persistent tracker cookies or gather third-party analytical identities. If you send us inquiries using the Contact form, we collect your name, phone number, and message to process your request.</p>
            <br>
            <p><strong>2. WhatsApp Ordering:</strong> Any menu order cart compilation takes place entirely locally in your browser storage. Clicking checkout securely passes your basket to standard encrypted WhatsApp APIs without any backend interception.</p>
            <br>
            <p><strong>3. Third-Party maps:</strong> The location map utilizes standard Google Maps embeds. These embeds may gather anonymous telemetry in compliance with Google's distinct global policies.</p>
        `,
        terms: `
            <h4>Dako Cafe Terms of Service</h4>
            <br>
            <p>By browsing this platform, you agree to comply with standard service guidelines outlined below:</p>
            <br>
            <p><strong>1. Menu Pricing:</strong> All values listed represent current restaurant prices in Ethiopian Birr (ETB). Prices include applicable regional VAT and are subject to adjustment without online notice.</p>
            <br>
            <p><strong>2. Order Processing:</strong> WhatsApp selections generated via this web builder do not constitute automated payment transactions. Final orders are reviewed, approved, and prepared upon direct live WhatsApp messaging verification.</p>
            <br>
            <p><strong>3. Intellectual Content:</strong> All custom branding titles, structural code design combinations, local historical stories, and bespoke text compositions are fully copyrighted by Dako Cafe.</p>
        `
    };

    function showLegalModal(type) {
        modalTitle.textContent = type === 'privacy' ? 'Privacy Policy' : 'Terms of Service';
        modalBody.innerHTML = legalTexts[type];
        legalModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        modalCloseBtn.focus();
    }

    function closeLegalModal() {
        legalModal.style.display = 'none';
        document.body.style.overflow = '';
    }

    if (privacyBtn) {
        privacyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLegalModal('privacy');
        });
    }

    if (termsBtn) {
        termsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showLegalModal('terms');
        });
    }

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeLegalModal);
    }

    if (legalModal) {
        legalModal.addEventListener('click', (e) => {
            if (e.target === legalModal) closeLegalModal();
        });
    }


    // ==========================================
    // STATS ANIMATED COUNTERS ENGINE
    // ==========================================
    let statsRunFlag = false;
    const statCounters = document.querySelectorAll('.stat-number');

    function executeCounters() {
        if (statsRunFlag) return;
        statsRunFlag = true;

        statCounters.forEach(counter => {
            const target = parseInt(counter.dataset.count, 10);
            const duration = 2200;
            const startTimestamp = performance.now();

            function counterAnimation(now) {
                const elapsed = now - startTimestamp;
                const progress = Math.min(elapsed / duration, 1);

                // Ease-out cubic calculation
                const easeValue = 1 - Math.pow(1 - progress, 3);
                const currentCount = Math.round(easeValue * target);

                counter.textContent = currentCount.toLocaleString();

                if (progress < 1) {
                    requestAnimationFrame(counterAnimation);
                }
            }
            requestAnimationFrame(counterAnimation);
        });
    }

    const statsBlock = document.querySelector('.hero-stats');
    if (statsBlock) {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    executeCounters();
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        obs.observe(statsBlock);
    }


    // ==========================================
    // INTERSECTION SCROLL REVEAL OBSERVER
    // ==========================================
    const revealTargets = document.querySelectorAll('.reveal');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    revealTargets.forEach(el => scrollObserver.observe(el));


    // ==========================================
    // FINE-TUNED ACCESSIBLE NAV LINK CLICKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });



    // ==========================================
    // HERO ACCELERATED SUBTLE PARALLAX
    // ==========================================
    const heroImgElement = document.querySelector('.hero-bg img');
    const isDesktopViewport = window.matchMedia('(min-width: 769px)').matches;

    if (heroImgElement && isDesktopViewport) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            const heroHeight = document.querySelector('.hero').offsetHeight;

            if (scroll < heroHeight) {
                const shiftY = scroll * 0.28;
                heroImgElement.style.transform = `scale(1.04) translateY(${shiftY}px)`;
            }
        }, { passive: true });
    }


    // ==========================================
    // BACK-TO-TOP BUTTON
    // ==========================================
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // ==========================================
    // ==========================================
    // ==========================================
    const reviewsCarousel = document.querySelector('.reviews-carousel');
    const reviewCardsAll = document.querySelectorAll('.review-card');

    if (reviewsCarousel && reviewCardsAll.length > 0) {
        // Build dot navigation
        const dotsContainer = document.createElement('div');
        dotsContainer.className = 'review-dots';
        dotsContainer.setAttribute('role', 'tablist');
        dotsContainer.setAttribute('aria-label', 'Review navigation');

        reviewCardsAll.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = 'review-dot' + (idx === 0 ? ' active' : '');
            dot.setAttribute('role', 'tab');
            dot.setAttribute('aria-label', `Review ${idx + 1}`);
            dot.dataset.idx = idx;
            dotsContainer.appendChild(dot);
        });

        reviewsCarousel.parentNode.insertBefore(dotsContainer, reviewsCarousel.nextSibling);

        let currentReviewIdx = 0;
        let autoScrollTimer = null;
        let isPaused = false;

        function updateDots(idx) {
            dotsContainer.querySelectorAll('.review-dot').forEach((d, i) => {
                d.classList.toggle('active', i === idx);
            });
        }

        function scrollToReview(idx) {
            const card = reviewCardsAll[idx];
            if (!card) return;
            reviewsCarousel.scrollTo({
                left: card.offsetLeft - reviewsCarousel.offsetLeft,
                behavior: 'smooth'
            });
            currentReviewIdx = idx;
            updateDots(idx);
        }

        function nextReview() {
            const next = (currentReviewIdx + 1) % reviewCardsAll.length;
            scrollToReview(next);
        }

        function startAutoScroll() {
            autoScrollTimer = setInterval(() => {
                if (!isPaused) nextReview();
            }, 4500);
        }

        // Dot click
        dotsContainer.querySelectorAll('.review-dot').forEach(dot => {
            dot.addEventListener('click', () => {
                scrollToReview(parseInt(dot.dataset.idx));
            });
        });

        // Pause on hover
        reviewsCarousel.addEventListener('mouseenter', () => { isPaused = true; });
        reviewsCarousel.addEventListener('mouseleave', () => { isPaused = false; });

        // Track scroll position to update dots
        reviewsCarousel.addEventListener('scroll', () => {
            const scrollLeft = reviewsCarousel.scrollLeft;
            reviewCardsAll.forEach((card, idx) => {
                const cardLeft = card.offsetLeft - reviewsCarousel.offsetLeft;
                if (Math.abs(scrollLeft - cardLeft) < 40) {
                    currentReviewIdx = idx;
                    updateDots(idx);
                }
            });
        }, { passive: true });

        startAutoScroll();
    }


    // ==========================================
    // ==========================================
    // ==========================================
    const guestMinusBtn = document.getElementById('guestMinus');
    const guestPlusBtn = document.getElementById('guestPlus');
    const guestCountDisplay = document.getElementById('guestCount');
    const resGuestsInput = document.getElementById('resGuests');
    let guestCount = 2;

    if (guestMinusBtn && guestPlusBtn) {
        guestMinusBtn.addEventListener('click', () => {
            if (guestCount > 1) {
                guestCount--;
                guestCountDisplay.textContent = guestCount;
                resGuestsInput.value = guestCount;
                guestMinusBtn.style.transform = 'scale(0.85)';
                setTimeout(() => { guestMinusBtn.style.transform = ''; }, 120);
            }
        });

        guestPlusBtn.addEventListener('click', () => {
            if (guestCount < 30) {
                guestCount++;
                guestCountDisplay.textContent = guestCount;
                resGuestsInput.value = guestCount;
                guestPlusBtn.style.transform = 'scale(0.85)';
                setTimeout(() => { guestPlusBtn.style.transform = ''; }, 120);
            }
        });
    }

    const reservationForm = document.getElementById('reservationForm');

    if (reservationForm) {
        // Set minimum date to today
        const resDateInput = document.getElementById('resDate');
        if (resDateInput) {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            resDateInput.min = `${yyyy}-${mm}-${dd}`;
        }

        reservationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const resName = document.getElementById('resName');
            const resPhone = document.getElementById('resPhone');
            const resDate = document.getElementById('resDate');
            const resTime = document.getElementById('resTime');
            const resNote = document.getElementById('resNote');

            // Clear errors
            reservationForm.querySelectorAll('.form-group').forEach(g => g.classList.remove('has-error'));

            let valid = true;

            if (!resName || resName.value.trim().length < 2) {
                resName.closest('.form-group').classList.add('has-error');
                valid = false;
            }
            if (!resPhone || resPhone.value.trim().length < 6) {
                resPhone.closest('.form-group').classList.add('has-error');
                valid = false;
            }
            if (!resDate || !resDate.value) {
                resDate.closest('.form-group').classList.add('has-error');
                valid = false;
            }
            if (!resTime || !resTime.value) {
                resTime.closest('.form-group').classList.add('has-error');
                valid = false;
            }

            if (!valid) return;

            // Format date nicely
            const dateObj = new Date(resDate.value + 'T00:00:00');
            const dateFormatted = dateObj.toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
            });

            const notesText = resNote && resNote.value.trim() ? resNote.value.trim() : 'None';

            const message =
                `Table Reservation Request - Dako Cafe\n\n` +
                `Name: ${resName.value.trim()}\n` +
                `Phone: ${resPhone.value.trim()}\n` +
                `Date: ${dateFormatted}\n` +
                `Time: ${resTime.value}\n` +
                `Guests: ${guestCount}\n` +
                `Special Requests: ${notesText}\n\n` +
                `Please confirm my reservation. Thank you!`;

            const encoded = encodeURIComponent(message);
            const whatsappURL = `https://wa.me/251918106034?text=${encoded}`;

            // Button feedback
            const submitBtn = document.getElementById('reservationSubmitBtn');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Opening WhatsApp...';
                setTimeout(() => {
                    window.open(whatsappURL, '_blank', 'noopener');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = '<i class="fa-brands fa-whatsapp"></i> Confirm Reservation via WhatsApp';
                }, 800);
            } else {
                window.open(whatsappURL, '_blank', 'noopener');
            }
        });
    }

});


// ==========================================
// PWA OFFLINE SERVICE WORKER REGISTRATION
// ==========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => {
                console.log('PWA Service Worker registered successfully! Offline support enabled.', reg.scope);
            })
            .catch(err => {
                console.error('Service Worker registration failed: ', err);
            });
    });
}
