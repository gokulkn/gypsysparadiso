// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

document.addEventListener('DOMContentLoaded', () => {

  // 1. Navbar State
  const nav = document.querySelector('.nav-bar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // 2. Reveal Animations
  // 2. Reveal Animations (Safety Check)
  // --- CLICK TRACKING SYSTEM ---
  const TRACKING_URL = "https://script.google.com/macros/s/AKfycbySWjGsWwr1uviYmLf52u36V2Hl4RaOY0PW9aXZH9uW5J3xaqt7N4mZ02mVK1NcQbh0HA/exec";

  function trackClick(platform) {
    // 1. Detect Device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? "Mobile" : "Desktop";

    // 2. Prepare Data
    const data = {
      platform: platform,
      device: isMobile,
      page: window.location.pathname
    };

    // 3. Send to Google Sheet (Fire and Forget)
    if (TRACKING_URL && TRACKING_URL !== "YOUR_GOOGLE_SCRIPT_URL_HERE") {
      fetch(TRACKING_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      }).catch(err => console.log("Tracking Error:", err));
    } else {
      console.log("Tracking Simulation:", data);
    }
  }

  // Attach Listeners Immediately
  const waLinks = document.querySelectorAll('a[href*="wa.me"]');
  waLinks.forEach(link => {
    link.addEventListener('click', () => trackClick('WhatsApp'));
  });

  const instaLinks = document.querySelectorAll('a[href*="instagram.com"]');
  instaLinks.forEach(link => {
    link.addEventListener('click', () => trackClick('Instagram'));
  });

  // 2. Reveal Animations (Safety Check)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');

          // Trigger Journey Line Animation
          if (entry.target.classList.contains('journey-timeline')) {
            // Optional: Add specific logic if needed, but CSS transition handles it via .active
          }
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal-text, .reveal-img, .reveal-up, .reveal-block, .journey-timeline').forEach(el => {
      observer.observe(el);
    });
  } else {
    // Fallback for older browsers or failures
    document.querySelectorAll('.reveal-text, .reveal-img, .reveal-up, .reveal-block').forEach(el => {
      el.classList.add('active');
    });
  }

  // Force visibility fallback
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 100);

  // 3. Parallax Effects
  const heroImg = document.querySelector('.parallax-img');
  const stayImg = document.querySelector('.parallax-bg');

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;

    // Hero Parallax
    if (heroImg && scroll < window.innerHeight) {
      heroImg.style.transform = `scale(1.1) translateY(${scroll * 0.2}px)`;
    }

    // Panoramic Stay Parallax
    if (stayImg) {
      const stayRect = stayImg.parentElement.getBoundingClientRect();
      if (stayRect.top < window.innerHeight && stayRect.bottom > 0) {
        const speed = 0.1;
        stayImg.style.transform = `scale(1.1) translateY(${(scroll - stayRect.top) * speed}px)`;
      }
    }
  });


  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      // Close other open items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      // Toggle current
      item.classList.toggle('active');
    });
  });

  // 5. Lightbox
  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox-close">&times;</button>
    <img src="" alt="Gallery Preview" class="lightbox-img">
  `;
  document.body.appendChild(lightbox);

  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  // Open Lightbox
  document.querySelectorAll('.stream-item img').forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('active');

    });
  });

  lightboxClose.addEventListener('click', () => {
    lightbox.classList.remove('active');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
    }
  });

  // 6. Map Loading (Standard)
  const mapContainer = document.querySelector('.map-container');
  if (mapContainer) {
    mapContainer.classList.add('loaded');
  }
  // 8. Desktop Review Navigation (Handled via inline onclick in HTML for robustness)
  // Logic removed to prevent conflicts

  // 9. Adventure Warning Modal
  const modal = document.getElementById('adventure-modal');
  const confirmBtn = document.getElementById('modal-confirm');
  const cancelBtn = document.getElementById('modal-cancel');
  let pendingUrl = '';

  if (modal && confirmBtn && cancelBtn) {
    // Intercept all Booking Links
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        pendingUrl = link.href;
        modal.classList.add('active');
      });
    });

    // Confirm Action
    confirmBtn.addEventListener('click', () => {
      if (pendingUrl) {
        window.open(pendingUrl, '_blank');
        modal.classList.remove('active');
        pendingUrl = '';
      }
    });

    // Cancel Action
    cancelBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      pendingUrl = '';
    });

    // Close on Outside Click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }
});