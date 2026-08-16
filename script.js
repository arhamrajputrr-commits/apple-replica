/* =========================
   1. DOM INITIALIZATION
   ========================= */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
});

/* =========================
   2. ELEMENT REFERENCES
   3. NAVIGATION
   ========================= */

function initMobileMenu() {
  const menuToggle = document.querySelector(".nav-menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  // Skip entirely if the expected markup isn't present.
  if (!menuToggle || !mobileNav) {
    return;
  }

  const body = document.body;
  const DESKTOP_BREAKPOINT = 834; // matches the CSS nav breakpoint (max-width: 833px)

  let isOpen = false;

  const openMenu = () => {
    isOpen = true;
    mobileNav.hidden = false;
    menuToggle.setAttribute("aria-expanded", "true");
    body.classList.add("mobile-nav-open");
    lockBodyScroll();
  };

  const closeMenu = () => {
    isOpen = false;
    mobileNav.hidden = true;
    menuToggle.setAttribute("aria-expanded", "false");
    body.classList.remove("mobile-nav-open");
    unlockBodyScroll();
  };

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  menuToggle.addEventListener("click", toggleMenu);

  // Close the menu after a mobile nav link is chosen.
  mobileNav.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (link) {
      closeMenu();
    }
  });

  // Close on Escape, return focus to the toggle button.
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen) {
      closeMenu();
      menuToggle.focus();
    }
  });

  // Close on outside click/tap.
  document.addEventListener("click", (event) => {
    if (!isOpen) return;

    const clickedInsideNav = mobileNav.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle) {
      closeMenu();
    }
  });

  // If the viewport is resized past the mobile breakpoint while the
  // menu is open, close it so it doesn't stay stuck open under the
  // desktop nav layout.
  let resizeTimeout;
  window.addEventListener("resize", () => {
    if (!isOpen) return;

    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (window.innerWidth >= DESKTOP_BREAKPOINT) {
        closeMenu();
      }
    }, 150);
  });

  /* =========================
     BODY SCROLL LOCK
     ========================= */

  let savedScrollY = 0;

  function lockBodyScroll() {
    savedScrollY = window.scrollY;
    body.style.position = "fixed";
    body.style.top = `-${savedScrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
  }

  function unlockBodyScroll() {
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.width = "";
    window.scrollTo(0, savedScrollY);
  }
}
