const navLinks = document.querySelectorAll(".nav-links a");
const themeToggleButton = document.getElementById("theme-toggle-button");
const filterBtns = document.querySelectorAll("#portfolio-filters button");
const portfolioGrid = document.querySelector("#portfolio-grid");
const portfolioItems = document.querySelectorAll("#portfolio-grid > div");
const testimonialsCarousel = document.getElementById("testimonials-carousel");
const nextTestimonialBtn = document.getElementById("next-testimonial");
const prevTestimonialBtn = document.getElementById("prev-testimonial");
const carouselIndicator = document.querySelectorAll(".carousel-indicator");
const scrollToTop = document.getElementById("scroll-to-top");
const settingsOpenBtn = document.getElementById("settings-toggle");
const settingsCloseBtn = document.getElementById("close-settings");
const settingsSidebar = document.getElementById("settings-sidebar");
const fontBtns = document.querySelectorAll(".font-option");
const themeColorsGrid = document.getElementById("theme-colors-grid");
const resetSettingsBtn = document.getElementById("reset-settings");
const root = document.documentElement;

const fonts = {
  alexandria: "Alexandria, sans-serif",
  tajawal: "Tajawal, sans-serif",
  cairo: "Cairo, sans-serif",
};
const primaryColors = [
  { color: "#6366f1", secondary: "#8b5cf6", accent: "#a855f7" },
  { color: "#2563eb", secondary: "#0891b2", accent: "#38bdf8" },
  { color: "#9333ea", secondary: "#7c3aed", accent: "#d946ef" },
  { color: "#db2777", secondary: "#e11d48", accent: "#f472b6" },
  { color: "#dc2626", secondary: "#ea580c", accent: "#f59e0b" },
  { color: "#ea580c", secondary: "#d97706", accent: "#facc15" },
  { color: "#16a34a", secondary: "#059669", accent: "#84cc16" },
  { color: "#0d9488", secondary: "#0891b2", accent: "#2dd4bf" },
];

let translate = 0;
let carouselIndex = 0;
testimonialsCarousel.style.translate = "0%";

function changeColorHandle(color, secondary, accent) {
  root.style.setProperty("--color-primary", color);
  root.style.setProperty("--color-secondary", secondary);
  root.style.setProperty("--color-accent", accent);

  themeColorsGrid.querySelectorAll("button").forEach((btn) => {
    btn.classList.toggle("active", color === btn.dataset.color);
  });
}

function changeFontHandle(fontFamily) {
  root.style.setProperty("--font-primary", fontFamily);

  fontBtns.forEach((btn) => {
    btn.classList.toggle("active", fontFamily === btn.dataset.font);
  });
}

function resetSettingsHandle() {
  root.style.setProperty("--font-primary", fonts["tajawal"]);
  root.style.setProperty("--color-primary", primaryColors[0].color);
  root.style.setProperty("--color-secondary", primaryColors[0].secondary);
  root.style.setProperty("--color-accent", primaryColors[0].accent);

  fontBtns.forEach((btn) => {
    btn.classList.toggle("active", "tajawal" === btn.dataset.font);
  });
  themeColorsGrid.querySelectorAll("button").forEach((btn) => {
    btn.classList.toggle("active", "#6366f1" === btn.dataset.color);
  });
}

function updateActiveNav() {
  let activeIndex;

  if (window.scrollY < 700) {
    activeIndex = 0;
  } else if (window.scrollY < 2800) {
    activeIndex = 1;
  } else if (window.scrollY < 5000) {
    activeIndex = 2;
  } else if (window.scrollY < 7100) {
    activeIndex = 3;
  } else if (window.scrollY < 8200) {
    activeIndex = 4;
  } else {
    activeIndex = 5;
  }

  navLinks.forEach((link, index) => {
    link.classList.toggle("active", index === activeIndex);
  });
}
function toggleTheme() {
  document.documentElement.classList.toggle("dark");
}
function filterProjects(e) {
  filterBtns.forEach((btn) => {
    btn.classList.remove(
      "active",
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "hover:shadow-lg",
      "hover:shadow-primary/50",
    );
    btn.classList.add(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "hover:bg-slate-100",
      "dark:hover:bg-slate-700",
      "border",
      "border-slate-300",
      "dark:border-slate-700",
    );
  });
  e.target.classList.remove(
    "bg-white",
    "dark:bg-slate-800",
    "text-slate-600",
    "dark:text-slate-300",
    "hover:bg-slate-100",
    "dark:hover:bg-slate-700",
    "border",
    "border-slate-300",
    "dark:border-slate-700",
  );
  e.target.classList.add(
    "active",
    "bg-linear-to-r",
    "from-primary",
    "to-secondary",
    "hover:shadow-lg",
    "hover:shadow-primary/50",
  );
  const filter = e.target.dataset.filter;

  portfolioItems.forEach((item) => {
    const matches = filter === "all" || item.dataset.category === filter;

    item.style.transition = "none";
    item.style.opacity = "0";
    item.style.transform = "scale(0.8)";
    item.style.display = matches ? "block" : "none";

    if (matches) {
      requestAnimationFrame(() => {
        item.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        item.style.opacity = "1";
        item.style.transform = "scale(1)";
      });
    }
  });
}

function handleNextTestimonial() {
  if (testimonialsCarousel.style.translate !== "99.99%") {
    translate += 33.33;
    carouselIndex++;
    testimonialsCarousel.style.translate = translate + "%";
  } else {
    testimonialsCarousel.style.translate = "0%";
    carouselIndex = 0;
    translate = 0;
  }
  handleCarouselIndicator();
}
function handlePrevTestimonial() {
  if (testimonialsCarousel.style.translate !== "0%") {
    translate -= 33.33;
    carouselIndex--;
    testimonialsCarousel.style.translate = translate + "%";
  } else {
    testimonialsCarousel.style.translate = "99.99%";
    carouselIndex = 3;
    translate = 99.99;
  }
  handleCarouselIndicator();
}

function handleCarouselIndicator(e) {
  if (e) {
    const index = e.target.dataset.index;
    translate = index * 33.33;
    carouselIndex = index;
    testimonialsCarousel.style.translate = translate + "%";
  }

  carouselIndicator.forEach((btn) => {
    btn.classList.remove(
      "bg-linear-to-r",
      "from-primary",
      "to-secondary",
      "hover:shadow-lg",
      "hover:shadow-primary/50",
      "border",
      "border-slate-300",
      "dark:border-slate-700",
    );
    btn.classList.add(
      "bg-white",
      "dark:bg-slate-800",
      "text-slate-600",
      "dark:text-slate-300",
      "hover:bg-slate-100",
      "dark:hover:bg-slate-700",
      "border",
      "border-slate-300",
      "dark:border-slate-700",
    );
  });
  carouselIndicator[carouselIndex].classList.remove(
    "bg-white",
    "dark:bg-slate-800",
    "text-slate-600",
    "dark:text-slate-300",
    "hover:bg-slate-100",
    "dark:hover:bg-slate-700",
    "border",
    "border-slate-300",
    "dark:border-slate-700",
  );
  carouselIndicator[carouselIndex].classList.add(
    "active",
    "bg-linear-to-r",
    "from-primary",
    "to-secondary",
    "hover:shadow-lg",
    "hover:shadow-primary/50",
  );
}

function handleGoUpShow() {
  if (window.scrollY >= 400) {
    scrollToTop.classList.replace("opacity-0", "opacity-100");
    scrollToTop.classList.replace("invisible", "visible");
  } else {
    scrollToTop.classList.replace("opacity-100", "opacity-0");
    scrollToTop.classList.replace("visible", "invisible");
  }
}
function handleGoUp() {
  document.documentElement.scrollTop = 0;
}
function handleSettingsOpen() {
  settingsSidebar.classList.add("translate-x-0");
  settingsSidebar.classList.remove("translate-x-full");
  settingsOpenBtn.style.right = "20rem";
}
function handleSettingsClose() {
  settingsSidebar.classList.remove("translate-x-0");
  settingsSidebar.classList.add("translate-x-full");
  settingsOpenBtn.style.right = "0";
}
document.addEventListener("click", (e) => {
  if (
    !settingsSidebar.contains(e.target) &&
    !settingsOpenBtn.contains(e.target)
  ) {
    handleSettingsClose();
  }
});
document.addEventListener("scroll", updateActiveNav);
document.addEventListener("scroll", handleGoUpShow);
settingsOpenBtn.addEventListener("click", handleSettingsOpen);
settingsCloseBtn.addEventListener("click", handleSettingsClose);

scrollToTop.addEventListener("click", handleGoUp);
themeToggleButton.addEventListener("click", toggleTheme);

filterBtns.forEach((btn) => {
  btn.addEventListener("click", filterProjects);
});
fontBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    changeFontHandle(e.currentTarget.dataset.font);
  });
});
nextTestimonialBtn.addEventListener("click", handleNextTestimonial);
prevTestimonialBtn.addEventListener("click", handlePrevTestimonial);
carouselIndicator.forEach((btn) => {
  btn.addEventListener("click", handleCarouselIndicator);
});
primaryColors.forEach(({ color, secondary, accent }) => {
  const btn = document.createElement("button");
  btn.className = "theme-color-option";
  btn.dataset.color = color;
  btn.style.backgroundColor = color;
  btn.addEventListener("click", () => {
    changeColorHandle(color, secondary, accent);
  });
  themeColorsGrid.appendChild(btn);
});
fontBtns.forEach((btn) => {
  btn.classList.toggle("active", "tajawal" === btn.dataset.font);
});
themeColorsGrid.querySelectorAll("button").forEach((btn) => {
  btn.classList.toggle("active", "#6366f1" === btn.dataset.color);
});
resetSettingsBtn.addEventListener("click", resetSettingsHandle);
updateActiveNav();
