if (document.body) {
  document.body.classList.add("js-enabled");
}

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

document.querySelectorAll(".file-tabs").forEach((tabs) => {
  const buttons = tabs.querySelectorAll("[data-tab-target]");
  const panels = tabs.querySelectorAll("[data-tab-panel]");
  if (!buttons.length || !panels.length) {
    return;
  }

  const hasActiveButton = tabs.querySelector(".file-tab-button.active");

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      const target = button.dataset.tabTarget;
      buttons.forEach((btn) => btn.classList.toggle("active", btn === button));
      panels.forEach((panel) => {
        panel.classList.toggle("active", panel.dataset.tabPanel === target);
      });
    });

    if (index === 0 && !hasActiveButton) {
      button.classList.add("active");
    }
  });

  if (!tabs.querySelector(".file-tab-panel.active") && panels.length) {
    panels[0].classList.add("active");
  }
});
