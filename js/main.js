document.addEventListener("DOMContentLoaded", () => {

  initBurger();

  // Pages
  if (document.querySelector(".products")) {
    loadProducts();
  }

  if (document.querySelector(".product-page")) {
    loadSingleProduct();
  }

});


// ================= CONFIG =================

const SHEET_URL =
  "https://opensheet.elk.sh/1pDcBBezffry2rLCK6JcfCjsa1Ixoc-cimv-KiO8WAYM/products1";


// ================= BURGER =================

function initBurger() {

  const burger = document.getElementById("burgerBtn");
  const menu = document.getElementById("mobileMenu");
  const left = document.querySelector(".header-left");

  if (!burger || !menu) return;

  burger.addEventListener("click", e => {
    e.stopPropagation();
    menu.classList.toggle("active");
  });

  document.addEventListener("click", e => {

    if (!menu.contains(e.target) && !left.contains(e.target)) {
      menu.classList.remove("active");
    }

  });

}


// ================= FADE =================

function initFade() {

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


// ================= LOAD PRODUCTS =================

async function loadProducts() {

  const container = document.querySelector(".products");

  if (!container) return;

  const page = location.pathname.split("/").pop();

  let category = null;

  if (page === "cases.html") category = "cases";
  if (page === "cables.html") category = "cables";
  if (page === "chargers.html") category = "chargers";

  try {

    const res = await fetch(SHEET_URL);
    const data = await res.json();

    let products = data;


    // ===== ONLY POPULAR ON HOME =====
    if (page === "" || page === "index.html") {
      products = products.filter(p => p.popular === "1");
    }


    // ===== FILTER BY CATEGORY =====
    if (category) {
      products = products.filter(p => p.category === category);
    }


    // ===== RENDER =====

    container.innerHTML = "";

    products.forEach(p => {

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

    initFade();

  } catch (e) {
    console.error("Load products error:", e);
  }

}


// ================= SINGLE PRODUCT =================

async function loadSingleProduct() {

  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  if (!id) return;

  try {

    const res = await fetch(SHEET_URL);
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

          <button class="ui-yellow buy-btn"
            onclick="addToCart('${product.id}')">
            Купити
          </button>

        </div>

      </div>
    `;

    initFade();

  } catch (e) {
    console.error("Load product error:", e);
  }

}


// ================= CART =================

function addToCart(id) {

  fetch(SHEET_URL)
    .then(r => r.json())
    .then(data => {

      const product = data.find(p => p.id === id);

      if (!product) return;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      showMiniMessage("Товар додано в кошик");

    })
    .catch(e => console.error("Cart error:", e));
}
      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Додано в кошик ✅");

    })
    .catch(e => console.error("Cart error:", e));

}
function showMiniMessage(text) {

  let msg = document.createElement("div");

  msg.className = "cart-message";
  msg.innerText = text;

  document.body.appendChild(msg);

  setTimeout(() => {
    msg.classList.add("show");
  }, 50);

  setTimeout(() => {
    msg.classList.remove("show");
    setTimeout(()=>msg.remove(),300);
  }, 2000);

}
