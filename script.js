const navLinks = Array.from(document.querySelectorAll(".nav-links a"));

if (navLinks.length) {
  const currentUrl = new URL(window.location.href);

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) {
      return;
    }

    const linkUrl = new URL(href, currentUrl);
    if (linkUrl.pathname === currentUrl.pathname) {
      link.classList.add("active");
    }
  });
}
