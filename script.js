const cart = document.getElementById("cart");
const openCartBtn = document.getElementById("openCart");
const closeCartBtn = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById("checkoutBtn");

let items = [];
let total = 0;

// Ouvrir / fermer le panier
openCartBtn.addEventListener("click", () => {
  cart.classList.add("open");
});
closeCartBtn.addEventListener("click", () => {
  cart.classList.remove("open");
});

// Ajouter au panier
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const name = btn.getAttribute("data-name");
    const price = parseFloat(btn.getAttribute("data-price"));

    items.push({name, price});
    total += price;

    renderCart();
  });
});

// Affichage du panier
function renderCart() {
  cartItems.innerHTML = "";
  items.forEach((item, index) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <span>${item.name} - ${item.price.toFixed(2)} FCFA</span>
      <button onclick="removeItem(${index})">❌</button>
    `;
    cartItems.appendChild(div);
  });
  cartTotal.textContent = total.toFixed(2);
}

// Supprimer un article
function removeItem(index) {
  total -= items[index].price;
  items.splice(index, 1);
  renderCart();
}

// Simuler une commande
checkoutBtn.addEventListener("click", () => {
  if (items.length === 0) {
    alert("Votre panier est vide !");
  } else {
    alert("Merci pour votre commande ! ✅");
    items = [];
    total = 0;
    renderCart();
    cart.classList.remove("open");
  }
});

// Rendre accessible la fonction à window
window.removeItem = removeItem;