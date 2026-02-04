// ===== BURGER MENU =====

document.addEventListener("DOMContentLoaded", () => {

  const burgerBtn = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const headerLeft = document.querySelector(".header-left");

  if (burgerBtn && mobileMenu) {

    burgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (
        !mobileMenu.contains(e.target) &&
        !headerLeft.contains(e.target)
      ) {
        mobileMenu.classList.remove("active");
      }
    });
  }

  // ===== FADE-IN ANIMATION =====

  const fadeItems = document.querySelectorAll(".fade-in");

  if (fadeItems.length > 0) {

    const fadeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.2,
      }
    );

    fadeItems.forEach((el) => {
      fadeObserver.observe(el);
    });
  }

});
