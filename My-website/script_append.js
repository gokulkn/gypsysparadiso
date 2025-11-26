
// 7. Mobile Auto-Scroll (Marquee Effect)
const initMobileMarquee = () => {
    if (window.innerWidth > 900) return; // Only on mobile

    const containers = [
        document.querySelector('.review-scroller'),
        document.querySelector('.bento-grid'),
        document.querySelector('.journey-timeline')
    ];

    containers.forEach(container => {
        if (!container || container.dataset.marqueeInitialized) return;

        // Clone items to ensure seamless loop
        const items = Array.from(container.children);
        items.forEach(item => {
            const clone = item.cloneNode(true);
            container.appendChild(clone);
        });

        // Add marquee class
        container.classList.add('mobile-marquee');
        container.dataset.marqueeInitialized = 'true';
    });
};

// Initialize on load and resize
initMobileMarquee();
window.addEventListener('resize', () => {
    // Debounce or simple check
    initMobileMarquee();
});
