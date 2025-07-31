document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Product 1', price: 10.00 },
        { id: 2, name: 'Product 2', price: 15.50 },
        { id: 3, name: 'Product 3', price: 7.25 },
        { id: 4, name: 'Product 4', price: 12.00 }
    ];

    const productListEl = document.getElementById('product-list');
    const cartItemsEl = document.getElementById('cart-items');
    const emptyCartEl = document.getElementById('empty-cart');
    const cartTotalEl = document.getElementById('cart-total');
    const totalPriceEl = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');

    let cart = [];

    function renderProducts() {
        products.forEach(product => {
            const productEl = document.createElement('div');
            productEl.className = 'product-item';
            productEl.innerHTML = `
                <span class="product-name">${product.name}</span>
                <span class="product-price">$${product.price.toFixed(2)}</span>
                <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            `;
            productListEl.appendChild(productEl);
        });
    }


    function renderCart() {
        cartItemsEl.innerHTML = '';
        if (cart.length === 0) {
            emptyCartEl.textContent = 'Your cart is empty!';
            emptyCartEl.style.display = 'block';
            cartTotalEl.classList.add('hidden');
            cartItemsEl.style.display = 'none';
            return;
        }
        emptyCartEl.style.display = 'none';
        cartTotalEl.classList.remove('hidden');
        cartItemsEl.style.display = 'flex';

        cart.forEach(item => {
            const cartItemEl = document.createElement('div');
            cartItemEl.className = 'cart-item';
            const quantityText = item.quantity > 1 ? ` x${item.quantity}` : '';
            cartItemEl.innerHTML = `
            <span class ="cart-item-name">${item.name}${quantityText} - $${(item.price * item.quantity).toFixed(2)}</span>
            <button class ="remove-btn" data-id="${item.id}">Remove</button>
            `;

            cartItemEl.querySelector('.remove-btn')
            .addEventListener('click', () => {
                cart = cart.filter(cartItem => cartItem.id !== item.id);
                renderCart();
            });
    
            cartItemsEl.appendChild(cartItemEl);
        });

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceEl.textContent = ` $${total.toFixed(2)}`;
    }

    function addToCart(productId) {
        const product = products.find(p => p.id === productId);
        if (product) {
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({...product, quantity: 1});
            }
            renderCart();
        }
    }

    productListEl.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-btn')) {
            const id = parseInt(e.target.getAttribute('data-id'));
            addToCart(id);
        }
    });

    

    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert('Checkout successful');
        cart = [];
        renderCart();
    });

    renderProducts();
    renderCart();
});
