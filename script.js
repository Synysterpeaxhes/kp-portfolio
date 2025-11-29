document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. SCROLL ANIMATIONS & PARALLAX (ORIGINAL)
    // ==========================================

    // Smooth fade-in scroll animations
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        }, {
            threshold: 0.1
        }
    );

    // Apply animation to sections and cards
    document.querySelectorAll("section, .work-card, .project-card").forEach((el) => {
        el.classList.add("hidden");
        observer.observe(el);
    });

    // Smooth scroll for internal links
    const links = document.querySelectorAll("a[href^='#']");
    links.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                });
            }
        });
    });

    // Parallax effect for hero video (only if it exists)
    window.addEventListener("scroll", () => {
        const video = document.querySelector(".bg-video");
        if (video) {
            const speed = 0.25;
            video.style.transform = `translateY(${window.scrollY * speed}px)`;
        }
    });


    // ==========================================
    // 2. CATEGORY FILTER (WITH FADE EFFECT)
    // ==========================================
    const filterButtons = document.querySelectorAll(".filter-btn, .category-filter button");
    const workCards = document.querySelectorAll(".work-card");
    const grid = document.querySelector(".works-grid");

    if (filterButtons.length > 0) {
        filterButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const category = btn.getAttribute('data-category');

                // Fade out grid logic
                if (grid) grid.classList.add("fade-out");

                setTimeout(() => {
                    workCards.forEach(card => {
                        const cardCat = card.getAttribute('data-category');
                        if (category === 'all' || cardCat === category) {
                            card.style.display = 'block'; // or 'flex' depending on your card style
                        } else {
                            card.style.display = 'none';
                        }
                    });

                    // Fade grid back in
                    if (grid) grid.classList.remove("fade-out");
                }, 300); // 300ms matches CSS transition
            });
        });
    }


    // ==========================================
    // 3. VIDEO MODAL LOGIC (FIXED FOR TIKTOK)
    // ==========================================
    const modal = document.getElementById('videoModal');
    const modalContainer = document.getElementById('modal-video-container');
    const closeModal = document.querySelector('.close-modal');

    // Only run if modal exists on the current page
    if (modal && modalContainer) {

        workCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const type = card.getAttribute('data-type');
                const id = card.getAttribute('data-id');
                let embedHTML = '';

                // --- GENERATE EMBED CODE BASED ON TYPE ---

                if (type === 'youtube') {
                    embedHTML = `<iframe width="100%" height="500" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                } 
                else if (type === 'drive') {
                    embedHTML = `<iframe src="https://drive.google.com/file/d/${id}/preview" width="100%" height="500" allow="autoplay"></iframe>`;
                } 
                else if (type === 'tiktok') {
                    // Generic blockquote wrapper for TikTok
                    embedHTML = `
                    <blockquote class="tiktok-embed" cite="https://www.tiktok.com/@tiktok/video/${id}" data-video-id="${id}" style="max-width: 605px;min-width: 325px;">
                        <section><a target="_blank" href="https://www.tiktok.com/@tiktok/video/${id}">Watch on TikTok</a></section>
                    </blockquote>`;
                } 
                else if (type === 'instagram') {
                    embedHTML = `<blockquote class="instagram-media" data-instgrm-permalink="https://www.instagram.com/reel/${id}/" data-instgrm-version="14" style="background:#FFF; border:0; margin: 1px; max-width:540px; min-width:326px; width:99.375%;"></blockquote>`;
                }

                // Insert HTML and Show Modal
                modalContainer.innerHTML = embedHTML;
                modal.style.display = 'flex';

                // --- RELOAD SOCIAL SCRIPTS ---
                
                // 1. TikTok Reload
                if (type === 'tiktok') {
                    if (window.tiktok && window.tiktok.embed) {
                        window.tiktok.embed.load(); // Force TikTok to scan the new HTML
                    } else {
                        // Fallback if script wasn't in head
                        const script = document.createElement('script');
                        script.src = 'https://www.tiktok.com/embed.js';
                        script.async = true;
                        document.body.appendChild(script);
                    }
                }

                // 2. Instagram Reload
                if (type === 'instagram' && window.instgrm) {
                    window.instgrm.Embeds.process(); // Force Instagram to scan
                }
            });
        });

        // --- CLOSE MODAL FUNCTIONS ---

        const closeVideo = () => {
            modal.style.display = 'none';
            modalContainer.innerHTML = ''; // Clears iframe to stop audio/video
        };

        if (closeModal) closeModal.addEventListener('click', closeVideo);

        // Close when clicking on the dark background overlay
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeVideo();
            }
        });
    }
});