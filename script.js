// script.js
const products = [
    {
        id: 1,
        name: "Hydrating Face Serum",
        price: 1499,
        image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883"
    },
    {
        id: 2,
        name: "Vitamin C Brightening Cream",
        price: 1799,
        image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b"
    },
    {
        id: 3,
        name: "Charcoal Detox Mask",
        price: 1299,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c"
    }
];

// DOM Elements
const productGrid = document.querySelector('.product-grid');
const cartCount = document.querySelector('.cart-count');
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const newsletterForm = document.querySelector('.newsletter-form');

// Cart System
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize Page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    updateCart();
});

// Display Products
function displayProducts() {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">₹${product.price.toLocaleString()}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `).join('');

    // Add event listeners to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add to Cart Function
function addToCart(e) {
    const productId = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCart();
    showNotification(`${product.name} added to cart`);
}

// Update Cart System
function updateCart() {
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart counter
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = count;
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// Mobile Menu Toggle
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Newsletter Subscription
newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input');
    const email = emailInput.value.trim();
    
    if (validateEmail(email)) {
        showNotification('Thanks for subscribing!');
        emailInput.value = '';
    } else {
        showNotification('Please enter a valid email address');
    }
});

// Email Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}