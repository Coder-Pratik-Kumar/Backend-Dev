const express = require('express');
const session = require('express-session');

const app = express();
app.use(express.json());

app.use(session({
    secret: 'cart-secret',
    resave: false,
    saveUninitialized: false
}));

// Initialize cart middleware
const initCart = (req, res, next) => {
    if (!req.session.cart) {
        req.session.cart = [];
    }
    next();
};

app.use(initCart);

// Add item to cart
app.post('/cart/add', (req, res) => {
    const { productId, name, price, quantity } = req.body;

    if (!productId || !name || !price || !quantity) {
        return res.status(400).json({ error: "All fields required" });
    }

    const cart = req.session.cart;

    const existingItem = cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ productId, name, price, quantity });
    }

    return res.status(200).json({
        message: "Item added to cart",
        cart
    });
});

// Update item quantity
app.put('/cart/update/:productId', (req, res) => {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = req.session.cart;

    const item = cart.find(item => item.productId === productId);

    if (!item) {
        return res.status(404).json({ error: "Item not found in cart" });
    }

    if (quantity <= 0) {
        return res.status(400).json({ error: "Quantity must be greater than 0" });
    }

    item.quantity = quantity;

    return res.status(200).json({
        message: "Cart updated",
        cart
    });
});

// Remove item from cart
app.delete('/cart/remove/:productId', (req, res) => {
    const { productId } = req.params;

    let cart = req.session.cart;

    const newCart = cart.filter(item => item.productId !== productId);

    if (cart.length === newCart.length) {
        return res.status(404).json({ error: "Item not found" });
    }

    req.session.cart = newCart;

    return res.status(200).json({
        message: "Item removed",
        cart: newCart
    });
});

// Get cart with total price
app.get('/cart', (req, res) => {
    const cart = req.session.cart;

    const total = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

    return res.status(200).json({
        cart,
        total
    });
});

// Clear cart
app.delete('/cart/clear', (req, res) => {
    req.session.cart = [];

    return res.status(200).json({
        message: "Cart cleared"
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});