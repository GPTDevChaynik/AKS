let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartBox = document.getElementById("cartItems");
const totalBox = document.getElementById("cartTotal");

renderCart();


// ================= RENDER =================

function renderCart() {

  cartBox.innerHTML = "";

  if (cart.length === 0) {
    cartBox.innerHTML = "<p>Кошик порожній</p>";
    totalBox.innerHTML = "";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {

    total += item.price;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `

      <div>
        <strong>${item.name}</strong><br>
        ${item.price} ₴
      </div>

      <button onclick="removeItem(${index})">
        ❌
      </button>

    `;

    cartBox.appendChild(div);

  });

  totalBox.innerHTML = `
    <h3>Разом: ${total} ₴</h3>
  `;
}


// ================= REMOVE =================

function removeItem(index) {

  cart.splice(index,1);

  saveCart();

  renderCart();

}


// ================= SAVE =================

function saveCart() {

  localStorage.setItem("cart", JSON.stringify(cart));

}


// ================= CHECKOUT =================

document.getElementById("checkoutBtn")
  .addEventListener("click", ()=>{

    if(cart.length===0){
      alert("Кошик порожній");
      return;
    }

    alert("Замовлення оформлено (поки демо)");

    localStorage.removeItem("cart");

    location.reload();

  });
