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
});