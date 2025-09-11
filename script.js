document.addEventListener("DOMContentLoaded", () => {

    var products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 20.00 },
        { id: 3, name: "Product 3", price: 29.00 }
    ]
    var cart = JSON.parse(localStorage.getItem('cart-item')) || [];
    var productList = document.getElementById("product-list");
    var cartItems = document.getElementById("cart-items");
    var emptyCart = document.getElementById("empty-cart");
    var cartTotal = document.getElementById("cart-total");
    var totalPrice = document.getElementById("total-price");
    var checkoutBtn = document.getElementById("checkout-btn");

    if (cart.length) {
        renderCart(cart);
    }

    products.forEach(product => {
        var productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
        <span>${product.name} - ${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>`;
        productList.appendChild(productDiv)
    })

    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const productId = parseInt(e.target.getAttribute('data-id'));
            const product = products.find(p => p.id === productId);
            addToCart(product)
        }
    })

    function addToCart(product) {
        cart.push(product);
        localStorage.setItem("cart-item", JSON.stringify(cart))
        renderCart(cart);
    }

    function renderCart(cart) {
        priceTotal = 0;
        cartItems.innerHTML = "";
        if (cart.length) {
            emptyCart.classList.add("hidden");
            cartTotal.classList.remove("hidden");
            cart.forEach((item, index) => {
                priceTotal += item.price;
                const cartItem = document.createElement('div');
                cartItem.classList.add("single-product")
                cartItem.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                <button data-id="${item.id}">Delete Product</button>`
                cartItems.appendChild(cartItem)
                totalPrice.textContent = `$${priceTotal.toFixed(2)}`;
            })

        } else {
            emptyCart.classList.remove("hidden")
            cartTotal.classList.remove("hidden");
            totalPrice.textContent = `$0.00`;
        }

    }

    checkoutBtn.addEventListener("click", () => {
        if (cart.length)
            alert("Checkout Successfully");
        cart.length = 0;
        renderCart(cart);
    })

    cartItems.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const deleteProductId = parseInt(e.target.getAttribute("data-id"));
            cart = cart.filter(item => item.id !== deleteProductId)
            localStorage.setItem("cart-item", JSON.stringify(cart))
            e.target.closest(".single-product").remove()
            priceTotal = 0;
            if (cart.length) {
                cart.forEach((item, index) => {
                    priceTotal += item.price;
                    totalPrice.textContent = `$${priceTotal.toFixed(2)}`;
                })
            }
        }
    })
})