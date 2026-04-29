document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav
  const toggleBtn = document.getElementById("mobileToggle");
  const mobileNav = document.getElementById("mobileNav");
  const closeBtn = document.getElementById("closeMenu");

  if (toggleBtn && mobileNav && closeBtn) {
    const mobileLinks = mobileNav.querySelectorAll("a");

    closeBtn.addEventListener("click", () => {
      mobileNav.classList.remove("open");
    });

    toggleBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });

    mobileLinks.forEach(link => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
      });
    });
  }

  // Fade-in animations
  const fadeElements = document.querySelectorAll(".fade-in");

  if (fadeElements.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    fadeElements.forEach(el => observer.observe(el));
  }

  // Reveal animations
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    reveals.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("active");
      }
    });
  }

  if (reveals.length) {
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
  }

  // Typewriter effect
  const typewriters = document.querySelectorAll(".typewriter");

  typewriters.forEach(element => {
    const text = element.getAttribute("data-text");
    let index = 0;
    let started = false;

    function typeWriter() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 40);
      }
    }

    function startTypewriter() {
      const top = element.getBoundingClientRect().top;

      if (top < window.innerHeight - 100 && !started) {
        started = true;
        typeWriter();
      }
    }

    window.addEventListener("scroll", startTypewriter);
    startTypewriter();
  });

  // Media tabs
  const mediaTabs = document.querySelectorAll(".media-tab");
  const mediaPanels = document.querySelectorAll(".media-panel");

  function activateTab(tab) {
    mediaTabs.forEach(button => {
      button.classList.remove("active");
      button.setAttribute("aria-selected", "false");
    });

    mediaPanels.forEach(panel => panel.classList.remove("active"));

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    const panel = document.getElementById(tab.dataset.tab);
    if (panel) panel.classList.add("active");
  }

  mediaTabs.forEach(tab => {
    tab.addEventListener("click", () => activateTab(tab));

    tab.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        activateTab(tab);
      }
    });
  });

  // Resource cards
  const resourceCards = document.querySelectorAll(".resource-card");

  resourceCards.forEach(card => {
    card.addEventListener("click", () => {
      card.classList.toggle("active");
    });
  });

  // Gallery filter + lightbox
    const filterButtons = document.querySelectorAll(".filters button");
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const closeLightbox = document.querySelector(".close");

    filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        galleryItems.forEach(item => {
        if (filter === "all" || item.dataset.category === filter) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
        });
    });
    });

    if (lightbox && lightboxImg && closeLightbox) {
    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
        const img = item.querySelector("img");

        lightbox.style.display = "flex";
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        });
    });

    closeLightbox.addEventListener("click", () => {
        lightbox.style.display = "none";
    });

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
        lightbox.style.display = "none";
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
        lightbox.style.display = "none";
        }
    });
    }
});