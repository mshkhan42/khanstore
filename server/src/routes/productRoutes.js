import express from 'express';
import { getProducts, addDemoProducts } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/demo', addDemoProducts); // For demo data setup

export default router;
