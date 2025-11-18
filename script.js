// CINEMATIC PORTFOLIO SCRIPT.JS
// Smooth fade-in scroll animations

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

// Attach animation to all sections
document.querySelectorAll("section, .project-card").forEach((el) => {
  el.classList.add("hidden");
  observer.observe(el);
});

// Smooth scroll for internal links
const links = document.querySelectorAll("a[href^='#']");
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(link.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Optional cinematic parallax effect for hero video
window.addEventListener("scroll", () => {
  const video = document.querySelector(".bg-video");
  const speed = 0.25;
  video.style.transform = `translateY(${window.scrollY * speed}px)`;
});
