let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartDisplay() {
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function showToast(message) {
  const toast = document.getElementById("cart-toast");
  if (toast) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  }
}

// UPDATED FUNCTION: supports fly animation
function addToCart(name, price, sourceEl = null) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  updateCartDisplay();
  showToast("✔ Item added to cart!");

  // FLY-TO-CART ANIMATION
  if (sourceEl) {
    const flyItem = document.getElementById("flying-item");
    const cartIcon = document.querySelector(".cart-link");

    const start = sourceEl.getBoundingClientRect();
    const end = cartIcon.getBoundingClientRect();

    flyItem.style.left = `${start.left + start.width / 2}px`;
    flyItem.style.top = `${start.top + start.height / 2}px`;
    flyItem.style.opacity = "1";
    flyItem.classList.add("active");

    // Force reflow for animation to trigger properly
    void flyItem.offsetWidth;

    flyItem.style.left = `${end.left + end.width / 2}px`;
    flyItem.style.top = `${end.top + end.height / 2}px`;
    flyItem.style.transform = "scale(0.1)";

    setTimeout(() => {
      flyItem.classList.remove("active");
      flyItem.style.transform = "scale(0.5)";
      flyItem.style.opacity = "0";
    }, 800);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".add-to-cart");
  buttons.forEach(btn => {
    btn.addEventListener("click", function () {
      const name = this.getAttribute("data-name");
      const price = parseFloat(this.getAttribute("data-price"));
      addToCart(name, price, this); // Pass clicked button as animation source
    });
  });

  updateCartDisplay();
});
