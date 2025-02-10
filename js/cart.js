let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalElement = document.getElementById("subtotal");
    
    cartItemsContainer.innerHTML = "";
    let subtotal = 0;

    cart.forEach((item, index) => {
        subtotal += item.price * item.quantity;
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} x${item.quantity} - ${item.price * item.quantity} EGP
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(li);
    });

    subtotalElement.textContent = subtotal;
    updateTotal();
}

function updateTotal() {
    const deliveryFee = document.querySelector('input[name="delivery"]:checked').value;
    document.getElementById("total").textContent = parseInt(document.getElementById("subtotal").textContent) + parseInt(deliveryFee);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

document.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener("change", updateTotal);
});

renderCart();
