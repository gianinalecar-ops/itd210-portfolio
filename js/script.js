document.addEventListener("DOMContentLoaded", () => {
  // Mobile nav
  // This section opens and closes the mobile menu when visitors click the hamburger or close button. The code supports both my regular CSS menu and my Services page
  //Tailwind menu by handling the "open" class and translate classes.
  //This keeps my navigation working consistently across all pages.
  const toggleBtn = document.getElementById("mobileToggle");
  const mobileNav = document.getElementById("mobileNav");
  const closeBtn = document.getElementById("closeMenu");

  if (toggleBtn && mobileNav && closeBtn) {
    const mobileLinks = mobileNav.querySelectorAll("a");

    // Opens the mobile menu so phone and tablet users can access all page links.
    function openMenu() {
      mobileNav.classList.remove("translate-x-full");
      mobileNav.classList.add("translate-x-0");
      mobileNav.classList.add("open");
    }

    // Closes the mobile menu after the user clicks the close button or selects a link.
    // This keeps the screen from staying covered after navigation.
    function closeMenu() {
      mobileNav.classList.add("translate-x-full");
      mobileNav.classList.remove("translate-x-0");
      mobileNav.classList.remove("open");
    }

    toggleBtn.addEventListener("click", () => {
      if (mobileNav.classList.contains("translate-x-full")) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    closeBtn.addEventListener("click", closeMenu);

    mobileLinks.forEach(link => {
      link.addEventListener("click", closeMenu);
    });
  }

  // SCROLL REVEAL ANIMATION
  //This section watches for elements with the fade-in or reveal class and adds a
  //visible class when they enter the screen. This creates motion as the visitor scrolls and helps the page feel more like a guided story instead of a static page.

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
  // This section types out selected text one character at a time.
  //The effect adds emotion and pacing to the Media page while supporting the story of breaking cycles and choosing a new path.

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
  // This section switches between video, audio, and transcript panels.
  //Tabs give users control over how they experience the story, which improves both accessibility and engagement.
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
  // GALLERY FILTER BUTTONS
  //This section lets users filter gallery images by category. It improves
  //interactivity because visitors can choose what type of impact story they want to view.
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

    // GALLERY LIGHTBOX
    //This section opens a larger version of a gallery image when a visitor clicks it.
    //The close button and keyboard support make the image viewer easier and more
    //accessible to use.
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

  // FAQ ACCORDION
  // This opens and closes each FAQ item by adding/removing the .open class.
  // The aria-expanded value also updates so screen readers know the answer is open or closed.
  const faqButtons = document.querySelectorAll(".faq-q");

  faqButtons.forEach(button => {
    button.addEventListener("click", () => {
      const faqItem = button.closest(".faq-item");
      const isOpen = faqItem.classList.contains("open");

      faqItem.classList.toggle("open");
      button.setAttribute("aria-expanded", String(!isOpen));
    });
  });


  // CONTACT FORM VALIDATION + SUCCESS CARD
  // This block validates the contact form before it submits to Formspree.
  // It also shows the success card if Formspree redirects back with ?success=true.

  const contactForm = document.getElementById("contactForm");
  const messageField = document.getElementById("message");
  const messageCounter = document.getElementById("messageCounter");
  const formStatus = document.getElementById("formStatus");
  const successCard = document.getElementById("successCard");
  const urlParams = new URLSearchParams(window.location.search);

  // Checks if the email has a basic valid email format.
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Shows an inline error message under the correct form field.
  function showError(fieldId, message) {
    const errorElement = document.getElementById(`${fieldId}Error`);
    const field = document.getElementById(fieldId);

    if (errorElement) {
      errorElement.textContent = message;
    }

    if (field) {
      field.classList.add("input-error");
      field.setAttribute("aria-invalid", "true");
    }
  }

  // Clears old error messages before checking the form again.
  function clearErrors() {
    const fields = ["name", "email", "subject", "message"];

    fields.forEach(fieldId => {
      const errorElement = document.getElementById(`${fieldId}Error`);
      const field = document.getElementById(fieldId);

      if (errorElement) {
        errorElement.textContent = "";
      }

      if (field) {
        field.classList.remove("input-error");
        field.setAttribute("aria-invalid", "false");
      }
    });

    if (formStatus) {
      formStatus.textContent = "";
    }
  }

  // Shows the success card after Formspree redirects back to contact.html?success=true.
  if (urlParams.get("success") === "true") {
    if (contactForm) {
      contactForm.hidden = true;
    }

    if (successCard) {
      successCard.hidden = false;
    }
  }

  // Live character counter for the message textarea.
  //This section updates the message count as the user types.
  //It helps visitors know when their message is long enough to submit and supports the minimum message length requirement.
  if (messageField && messageCounter) {
    messageField.addEventListener("input", () => {
      const count = messageField.value.trim().length;
      messageCounter.textContent = `${count} / 20 minimum characters`;
    });
  }

  // Validates the form before sending it to Formspree.
  //This section checks the form before sending it to Formspree.
  //It verifies that required fields are filled in, the email format is valid, and the message has enough detail. Inline errors are shown beside each field so users
  //know exactly what to fix without relying on browser alerts.
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      clearErrors();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const subject = document.getElementById("subject");
      const message = document.getElementById("message");

      let isValid = true;

      if (!name.value.trim()) {
        showError("name", "Please enter your name.");
        isValid = false;
      }

      if (!email.value.trim()) {
        showError("email", "Please enter your email address.");
        isValid = false;
      } else if (!isValidEmail(email.value.trim())) {
        showError("email", "Please enter a valid email address.");
        isValid = false;
      }

      if (!subject.value) {
        showError("subject", "Please choose a subject.");
        isValid = false;
      }

      if (!message.value.trim()) {
        showError("message", "Please enter a message.");
        isValid = false;
      } else if (message.value.trim().length < 20) {
        showError("message", "Please write at least 20 characters.");
        isValid = false;
      }

      // Stop Formspree only if the form is invalid.
      if (!isValid) {
        event.preventDefault();

        if (formStatus) {
          formStatus.textContent = "Please fix the errors above before sending.";
        }
      }
    });
  }
});