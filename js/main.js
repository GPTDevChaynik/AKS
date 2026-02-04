document.addEventListener("DOMContentLoaded", () => {

  // ===== BURGER MENU =====

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

  // LOAD PRODUCTS
  loadProducts();

});


// ===== FADE-IN INIT =====

function initFadeIn() {

  const fadeItems = document.querySelectorAll(".fade-in");

  if (!fadeItems.length) return;

  const observer = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }

    });

  }, {
    threshold: 0.2
  });

  fadeItems.forEach(el => observer.observe(el));
}



// ===== PRODUCTS LOADER =====

async function loadProducts() {

  const url = "https://opensheet.elk.sh/1pDcBBezffry2rLCK6JcfCjsa1Ixoc-cimv-KiO8WAYM/products1";

  try {

    const res = await fetch(url);
    const data = await res.json();

    const container = document.querySelector(".products");

    if (!container) return;

    container.innerHTML = "";

    data.forEach(product => {

      const card = document.createElement("div");
      card.className = "product-card fade-in";

      card.innerHTML = `
        <div class="product-image">
          <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="product-title">
          ${product.name}
        </div>

        <div class="product-price">
          ${product.price} ₴
        </div>

        <a href="product.html?id=${product.id}" class="ui-yellow">
          Переглянути товар
        </a>
      `;

      container.appendChild(card);

    });

    // IMPORTANT: enable animation AFTER load
    initFadeIn();

  } catch (e) {
    console.error("Products load error:", e);
  }

}
