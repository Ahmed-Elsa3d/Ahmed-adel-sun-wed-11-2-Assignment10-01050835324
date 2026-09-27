const navLinks = document.querySelectorAll(".nav-links a");
const themeToggleButton = document.getElementById("theme-toggle-button");
const filterBtns = document.querySelectorAll("#portfolio-filters button");
const portfolioGrid = document.querySelector("#portfolio-grid");
const portfolioItems = document.querySelectorAll("#portfolio-grid > div");
const testimonialsCarousel = document.getElementById("testimonials-carousel");
const nextTestimonialBtn = document.getElementById("next-testimonial");
const prevTestimonialBtn = document.getElementById("prev-testimonial");
const carouselIndicator = document.querySelectorAll(".carousel-indicator");

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

let translate = 0;
let carouselIndex = 0;
testimonialsCarousel.style.translate = "0%";

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

document.addEventListener("scroll", updateActiveNav);
themeToggleButton.addEventListener("click", toggleTheme);

filterBtns.forEach((btn) => {
  btn.addEventListener("click", filterProjects);
});

nextTestimonialBtn.addEventListener("click", handleNextTestimonial);
prevTestimonialBtn.addEventListener("click", handlePrevTestimonial);
carouselIndicator.forEach((btn) => {
  btn.addEventListener("click", handleCarouselIndicator);
});

updateActiveNav();
