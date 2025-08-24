import express from 'express';
import { protect } from '../middleware/auth.js';
import { getCart, addToCart, updateCart, removeFromCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', protect, getCart);
router.post('/add', protect, addToCart);
router.put('/update', protect, updateCart);
router.delete('/remove', protect, removeFromCart);

export default router;
