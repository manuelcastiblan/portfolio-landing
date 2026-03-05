const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");
const yearEl = document.querySelector("#year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navAnchors.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item, idx) => {
    item.style.transitionDelay = `${Math.min(idx * 40, 220)}ms`;
    observer.observe(item);
  });
}

if (sections.length > 0) {
  const highlightObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navAnchors.forEach((anchor) => {
            anchor.classList.toggle(
              "active",
              anchor.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => highlightObserver.observe(section));
}
