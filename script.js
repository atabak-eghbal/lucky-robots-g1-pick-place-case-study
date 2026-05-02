const toc = document.querySelector(".toc");
const tocToggle = document.querySelector(".toc-toggle");
const tocLinks = Array.from(document.querySelectorAll(".toc-list a"));
const sections = tocLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (tocToggle && toc) {
  tocToggle.addEventListener("click", () => {
    const isOpen = toc.classList.toggle("open");
    tocToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

if (sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          tocLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    {
      rootMargin: "-30% 0px -60% 0px",
      threshold: 0.1,
    }
  );

  sections.forEach((section) => observer.observe(section));
}
