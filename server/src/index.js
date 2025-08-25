import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config.js';

import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('✅ Khan Store API is running');
});

// MongoDB Connection + Server Start
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    app.listen(config.port, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://0.0.0.0:${config.port}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  });
