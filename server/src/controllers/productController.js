import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addDemoProducts = async (req, res) => {
  // Only for initial setup/demo
  const demoProducts = [
    {
      name: "Pakistani Kurta",
      description: "Premium cotton kurta for men. Available in all sizes.",
      price: 2499,
      image: "/products/kurta.jpg"
    },
    {
      name: "Ladies Handbag",
      description: "Elegant leather handbag for women. Imported quality.",
      price: 3999,
      image: "/products/handbag.jpg"
    },
    {
      name: "Smart Watch",
      description: "Feature-rich smart watch with health tracking.",
      price: 5999,
      image: "/products/smartwatch.jpg"
    },
    {
      name: "Sports Shoes",
      description: "Comfortable and stylish sports shoes for all ages.",
      price: 3499,
      image: "/products/shoes.jpg"
    }
  ];
  try {
    await Product.deleteMany({});
    await Product.insertMany(demoProducts);
    res.json({ message: 'Demo products added' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
