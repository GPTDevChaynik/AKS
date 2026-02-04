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

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
});

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});
