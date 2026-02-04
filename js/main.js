// ===== BURGER MENU =====

const burgerBtn = document.getElementById('burgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const headerLeft = document.querySelector('.header-left');

if (burgerBtn && mobileMenu) {

  burgerBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('active');
  });

  document.addEventListener('click', (e) => {
    if (
      !mobileMenu.contains(e.target) &&
      !headerLeft.contains(e.target)
    ) {
      mobileMenu.classList.remove('active');
    }
  });

}


// ===== FADE-IN ANIMATION =====

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, 150);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll('.fade-in').forEach((el) => {
  fadeObserver.observe(el);
});
