import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

// 🛒 Individual Cart Item Schema
const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity must be at least 1'],
  },
  priceAtTime: {
    type: Number,
    required: false, // Optional: snapshot of price when added
  },
}, { _id: false });

// 🧺 Main Cart Schema
const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // One cart per user
  },
  items: {
    type: [cartItemSchema],
    default: [],
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0, // Optional: for promo codes or campaigns
  },
  status: {
    type: String,
    enum: ['active', 'abandoned', 'converted'],
    default: 'active',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
  versionKey: false,
});

// 🧠 Prevent OverwriteModelError
export default models.Cart || model('Cart', cartSchema);
