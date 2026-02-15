const cartItemsContainer = document.getElementById('cart-items');
const checkoutBtn = document.getElementById('checkout-btn');
const clearCartBtn = document.getElementById('clear-cart-btn');

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <p class="text-center">
                Your cart is empty. Add some books from the <a href="books.html" class="text-warning">Books</a> page.
            </p>
        `;
        if (checkoutBtn) checkoutBtn.disabled = true;
        if (clearCartBtn) clearCartBtn.disabled = true;
        return;
    }

    if (checkoutBtn) checkoutBtn.disabled = false;
    if (clearCartBtn) clearCartBtn.disabled = false;

    cart.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('col-md-3', 'book-card', 'mb-3');
        bookCard.innerHTML = `
            <img src="${book.img}" alt="${book.title}" class="img-fluid rounded">
            <h5 class="mt-2">${book.title}</h5>
            <p>${book.author}</p>
            <p class="text-warning">${book.price}</p>
            <button class="btn btn-danger w-100 remove-btn" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(bookCard);
    });

    // Remove functionality
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const index = btn.getAttribute('data-index');
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCart();
        });
    });
}

// Clear cart
if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear the cart?')) {
            localStorage.removeItem('cart');
            loadCart();
        }
    });
}

// Checkout
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        alert('Checkout successful! Thank you for your purchase.');
        localStorage.removeItem('cart');
        loadCart();
    });
}

// Initial load
loadCart();
