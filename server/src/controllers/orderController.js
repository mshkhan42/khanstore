import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

export const placeOrder = async (req, res) => {
  const { paymentMethod } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart || cart.items.length === 0) return res.status(400).json({ message: 'Cart is empty' });
    const shippingFee = 199;
    const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0) + shippingFee;
    const order = await Order.create({
      user: req.user.id,
      items: cart.items.map(i => ({ product: i.product._id, quantity: i.quantity })),
      shippingFee,
      total,
      paymentMethod,
      status: 'Pending',
    });
    await Cart.deleteOne({ user: req.user.id });
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
