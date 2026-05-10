document.addEventListener("DOMContentLoaded", () => {
  /* 
  MOBILE NAVIGATION
  This section opens and closes the mobile menu when visitors click the hamburger
  or close button. It supports both the regular CSS mobile menu and the Services
  page Tailwind menu by handling the "open" class and the translate classes.
  This keeps navigation working consistently across all pages.
  */

  // MOBILE MENU
  // Works for both the regular site pages and the Tailwind-based Services page.
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileNav = document.getElementById("mobileNav");
  const closeMenu = document.getElementById("closeMenu");

  if (mobileToggle && mobileNav && closeMenu) {
    const navLinks = mobileNav.querySelectorAll("a");

    function openMobileMenu() {
      // Regular pages
      mobileNav.classList.add("open");

      // Services page Tailwind menu
      mobileNav.classList.remove("translate-x-full");
      mobileNav.classList.add("translate-x-0");

      mobileToggle.setAttribute("aria-expanded", "true");
      mobileNav.setAttribute("aria-hidden", "false");

      closeMenu.focus();
    }

    function closeMobileMenu() {
      // Regular pages
      mobileNav.classList.remove("open");

      // Services page Tailwind menu
      mobileNav.classList.add("translate-x-full");
      mobileNav.classList.remove("translate-x-0");

      mobileToggle.setAttribute("aria-expanded", "false");
      mobileNav.setAttribute("aria-hidden", "true");

      mobileToggle.focus();
    }

    mobileToggle.addEventListener("click", openMobileMenu);
    closeMenu.addEventListener("click", closeMobileMenu);

    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && mobileToggle.getAttribute("aria-expanded") === "true") {
        closeMobileMenu();
      }
    });
  }

  // BACK TO TOP BUTTON
  const backToTopBtn = document.getElementById("backToTop");

  // Show button when user scrolls down
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  // Scroll smoothly to top when clicked
  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  /* 
  SCROLL REVEAL ANIMATION
  This section watches for elements with the .fade-in class and adds .visible
  when they enter the screen. This creates gentle motion as the visitor scrolls
  and helps the page feel more like a guided story instead of a static page.
  */
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

    fadeElements.forEach(element => observer.observe(element));
  }

  /* 
  REVEAL ANIMATION
  This section adds the .active class to elements with .reveal when they move
  into view. It supports the visual storytelling sections on the Media page.
  */
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    reveals.forEach(element => {
      const top = element.getBoundingClientRect().top;

      if (top < window.innerHeight - 100) {
        element.classList.add("active");
      }
    });
  }

  if (reveals.length) {
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();
  }

  // Keyboard support for resource cards
  document.querySelectorAll(".resource-card").forEach((card) => {
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        card.click();
      }
    });
  });

  // Keyboard support for gallery lightbox
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        item.click();
      }
    });
  });

  // Close lightbox with Escape key
  document.addEventListener("keydown", (event) => {
    const lightbox = document.getElementById("lightbox");

    if (event.key === "Escape" && lightbox && lightbox.style.display === "flex") {
      lightbox.style.display = "none";
    }
  });

  /* 
  TYPEWRITER STORY EFFECT
  This section types out selected text one character at a time.
  The effect adds emotion and pacing to the Media page while supporting the story
  of breaking cycles and choosing a new path.
  */
  const typewriters = document.querySelectorAll(".typewriter");

  typewriters.forEach(element => {
    const text = element.getAttribute("data-text") || "";
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

  /* 
  MEDIA PAGE TABS
  This section switches between video, audio, and transcript panels.
  Tabs give users control over how they experience the story, which improves
  both accessibility and engagement.
  */
  const mediaTabs = document.querySelectorAll(".media-tab");
  const mediaPanels = document.querySelectorAll(".media-panel");

  function activateTab(tab) {
    mediaTabs.forEach(button => {
      button.classList.remove("active");
      button.setAttribute("aria-selected", "false");
    });

    mediaPanels.forEach(panel => {
      panel.classList.remove("active");
    });

    tab.classList.add("active");
    tab.setAttribute("aria-selected", "true");

    const panel = document.getElementById(tab.dataset.tab);

    if (panel) {
      panel.classList.add("active");
    }
  }

  if (mediaTabs.length && mediaPanels.length) {
    mediaTabs.forEach(tab => {
      tab.addEventListener("click", () => activateTab(tab));

      tab.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activateTab(tab);
        }
      });
    });
  }

  /* 
  RESOURCE CARD TOGGLE
  This section lets visitors click a resource card to reveal more details.
  The toggle makes the Resources page more interactive and keeps the layout clean.
  */
  const resourceCards = document.querySelectorAll(".resource-card");

  resourceCards.forEach(card => {
    function toggleResourceCard() {
      const isOpen = card.classList.toggle("active");
      card.setAttribute("aria-expanded", String(isOpen));
    }

    card.addEventListener("click", toggleResourceCard);

    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleResourceCard();
      }
    });
  });

  /* 
  GALLERY FILTER BUTTONS
  This section lets users filter gallery images by category.
  It improves interactivity because visitors can choose what type of impact story
  they want to view.
  */
  const filterButtons = document.querySelectorAll(".filters button");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (filterButtons.length && galleryItems.length) {
    filterButtons.forEach(button => {
      button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(btn => {
          btn.classList.remove("active");
        });

        button.classList.add("active");

        galleryItems.forEach(item => {
          if (filter === "all" || item.dataset.category === filter) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  /* 
  GALLERY LIGHTBOX
  This section opens a larger version of a gallery image when a visitor clicks it.
  The close button, outside click, and Escape key support make the image viewer
  easier and more accessible to use.
  */
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const closeLightbox = document.querySelector(".close");

  if (lightbox && lightboxImg && closeLightbox && galleryItems.length) {
    galleryItems.forEach(item => {
      item.addEventListener("click", () => {
        const img = item.querySelector("img");

        if (img) {
          lightbox.style.display = "flex";
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
        }
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

  /* 
  CONTACT PAGE FAQ ACCORDION
  This section opens and closes FAQ answers when a question is clicked.
  The accordion keeps the Contact page organized while still giving visitors
  quick answers before they submit the form.
  */
  const faqButtons = document.querySelectorAll(".faq-q");

  faqButtons.forEach(button => {
    button.addEventListener("click", () => {
      const faqItem = button.closest(".faq-item");

      if (!faqItem) return;

      const isOpen = faqItem.classList.contains("open");

      faqItem.classList.toggle("open");
      button.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  /* 
  CONTACT FORM VALIDATION + SUCCESS CARD
  This block validates the contact form before it submits to Formspree.
  It also shows the success card if Formspree redirects back with ?success=true.
  Inline errors help visitors understand exactly what needs to be fixed.
  */
  const contactForm = document.getElementById("contactForm");
  const messageField = document.getElementById("message");
  const messageCounter = document.getElementById("messageCounter");
  const formStatus = document.getElementById("formStatus");
  const successCard = document.getElementById("successCard");

  if (contactForm) {
    /* 
    FORMSPREE SUCCESS REDIRECT
    After Formspree receives the form, it sends the visitor back to
    contact.html?success=true. This code checks the URL for that success message,
    hides the form, and shows the thank-you card.
    */
    const urlParams = new URLSearchParams(window.location.search);
    const formWasSubmitted = urlParams.get("success") === "true";

    if (formWasSubmitted && successCard) {
      contactForm.hidden = true;
      successCard.hidden = false;
      successCard.scrollIntoView({ behavior: "smooth", block: "center" });
    }

      // Checks if the email has a basic valid email format before Formspree receives it.
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

      /* 
      MESSAGE CHARACTER COUNTER
      This section updates the message count as the user types.
      It helps visitors know when their message is long enough to submit and
      supports the minimum message length requirement.
      */
      if (messageField && messageCounter) {
        messageField.addEventListener("input", () => {
          const count = messageField.value.trim().length;
          messageCounter.textContent = `${count} / 20 minimum characters`;
        });
      }

      /* 
      CONTACT FORM SUBMIT VALIDATION
      This section checks the form before sending it to Formspree.
      It verifies that required fields are filled in, the email format is valid,
      and the message has enough detail. Formspree is only blocked when the form
      has errors.
      */
      contactForm.addEventListener("submit", async event => {
      event.preventDefault();
      clearErrors();

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const subject = document.getElementById("subject");
      const message = document.getElementById("message");

      let isValid = true;

      if (!name || !name.value.trim()) {
        showError("name", "Please enter your name.");
        isValid = false;
      }

      if (!email || !email.value.trim()) {
        showError("email", "Please enter your email address.");
        isValid = false;
      } else if (!isValidEmail(email.value.trim())) {
        showError("email", "Please enter a valid email address.");
        isValid = false;
      }

      if (!subject || !subject.value) {
        showError("subject", "Please choose a subject.");
        isValid = false;
      }

      if (!message || !message.value.trim()) {
        showError("message", "Please enter a message.");
        isValid = false;
      } else if (message.value.trim().length < 20) {
        showError("message", "Please write at least 20 characters.");
        isValid = false;
      }

      if (!isValid) {
        if (formStatus) {
          formStatus.textContent = "Please fix the errors above before sending.";
        }

        return;
      }

      try {
        if (formStatus) {
          formStatus.textContent = "Sending your message...";
        }

        const formData = new FormData(contactForm);

        const response = await fetch(contactForm.action, {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json"
          }
        });

        if (response.ok) {
          contactForm.reset();

          if (messageCounter) {
            messageCounter.textContent = "0 / 20 minimum characters";
          }

          contactForm.hidden = true;

          if (successCard) {
            successCard.hidden = false;
            successCard.scrollIntoView({ behavior: "smooth", block: "center" });
          }

          if (formStatus) {
            formStatus.textContent = "";
          }
        } else {
          if (formStatus) {
            formStatus.textContent = "Something went wrong. Please try again.";
          }
        }
      } catch (error) {
        if (formStatus) {
          formStatus.textContent = "There was a connection problem. Please try again.";
        }
      }
    });
  }
});