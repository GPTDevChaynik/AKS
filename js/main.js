document.addEventListener("DOMContentLoaded", () => {

  initBurger();

  const productsBox = document.querySelector(".products");
  const productPage = document.querySelector(".product-page");

  if (productsBox) {
    loadProducts();
  }

  if (productPage) {
    loadSingleProduct();
  }

});


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

  const obs = new IntersectionObserver((entries)=>{

    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add("visible");
      }
    });

  },{threshold:0.2});

  items.forEach(i=>obs.observe(i));
}


// ================= LOAD PRODUCTS =================

async function loadProducts() {

  const url =
   "https://opensheet.elk.sh/1pDcBBezffry2rLCK6JcfCjsa1Ixoc-cimv-KiO8WAYM/products1";

  const container = document.querySelector(".products");

  if (!container) return;

  const page = location.pathname.split("/").pop();

  let currentCategory = null;

  if (page === "cases.html") currentCategory = "cases";
  if (page === "cables.html") currentCategory = "cables";
  if (page === "chargers.html") currentCategory = "chargers";

  try {

    const res = await fetch(url);
    const data = await res.json();

    container.innerHTML = "";

    let products = data;

    // Filter by category
    if (currentCategory) {
      products = data.filter(p => p.category === currentCategory);
    }

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

  } catch(e){
    console.error(e);
  }

}


// ================= SINGLE PRODUCT =================

async function loadSingleProduct() {

  const url =
   "https://opensheet.elk.sh/1pDcBBezffry2rLCK6JcfCjsa1Ixoc-cimv-KiO8WAYM/products1";

  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  if (!id) return;

  try {

    const res = await fetch(url);
    const data = await res.json();

    const product = data.find(p=>p.id===id);

    if(!product) return;

    const page = document.querySelector(".product-page");

    page.innerHTML = `

      <div class="product-layout">

        <div class="product-photo">
          <div class="product-image big">
            <img src="${product.image}">
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

          <button class="ui-yellow buy-btn" onclick="addToCart('${product.id}')">
  Купити
</button>

        </div>

      </div>

    `;

    initFade();

  } catch(e){
    console.error(e);
  }

}
function addToCart(id) {

  const url =
   "https://opensheet.elk.sh/1pDcBBezffry2rLCK6JcfCjsa1Ixoc-cimv-KiO8WAYM/products1";

  fetch(url)
    .then(r=>r.json())
    .then(data=>{

      const product = data.find(p=>p.id===id);

      if(!product) return;

      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        image: product.image
      });

      localStorage.setItem("cart", JSON.stringify(cart));

      alert("Додано в кошик ✅");

    });

}
