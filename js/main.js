document.addEventListener("DOMContentLoaded", () => {

  // ===== BURGER =====

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


  // INIT

  if (document.querySelector(".products")) {
    loadProducts();
  }

  if (document.querySelector(".product-page")) {
    loadSingleProduct();
  }

});


// ================= FADE =================

function initFadeIn() {

  const items = document.querySelectorAll(".fade-in");

  if (!items.length) return;

  const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });

  }, { threshold: 0.2 });

  items.forEach(el => observer.observe(el));
}


// ================= LOAD ALL =================

async function loadProducts() {

  const url =
    "https://opensheet.elk.sh/1pDcBBezffry2rLCK6JcfCjsa1Ixoc-cimv-KiO8WAYM/products1";

  try {

    const res = await fetch(url);
    const data = await res.json();

    const container = document.querySelector(".products");

    if (!container) return;

    container.innerHTML = "";

    data.forEach(p => {

      const card = document.createElement("div");
      card.className = "product-card fade-in";

      card.innerHTML = `
        <div class="product-image">
          <img src="${p.image}" alt="${p.name}">
        </div>

        <div class="product-title">${p.name}</div>

        <div class="product-price">${p.price} ₴</div>

        <a href="product.html?id=${p.id}" class="ui-yellow">
          Переглянути товар
        </a>
      `;

      container.appendChild(card);

    });

    initFadeIn();

  } catch (e) {
    console.error(e);
  }
}


// ================= LOAD ONE =================

async function loadSingleProduct() {

  const url =
    "https://opensheet.elk.sh/1pDcBBezffry2rLCK6JcfCjsa1Ixoc-cimv-KiO8WAYM/products1";

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) return;

  try {

    const res = await fetch(url);
    const data = await res.json();

    const product = data.find(p => p.id === id);

    if (!product) return;

    const page = document.querySelector(".product-page");

    page.innerHTML = `
      <div class="product-layout">

        <div class="product-photo">
          <div class="product-image big">
            <img src="${product.image}" alt="${product.name}">
          </div>
        </div>

        <div class="product-info fade-in">

          <h1>${product.name}</h1>

          <div class="product-price big-price">
            ${product.price} ₴
          </div>

          <p class="product-desc">
            ${product.description || "Опис скоро буде"}
          </p>

          <a href="#" class="installment-btn">
            Покупка частинами
          </a>

          <a href="#" class="ui-yellow buy-btn">
            Купити
          </a>

        </div>

      </div>
    `;

    initFadeIn();

  } catch (e) {
    console.error(e);
  }
}
