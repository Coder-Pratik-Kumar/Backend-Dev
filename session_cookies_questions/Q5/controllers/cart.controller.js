export const addToCart = (req, res) => {

  const product = req.body.product;

  // logged-in user
  if (req.session.user) {

    if (!req.session.cart) req.session.cart = [];

    req.session.cart.push(product);

    return res.json({ cart: req.session.cart });
  }

  // anonymous user
  let cart = req.cookies.cart ? JSON.parse(req.cookies.cart) : [];

  cart.push(product);

  res.cookie("cart", JSON.stringify(cart));

  res.json({ cart });
};