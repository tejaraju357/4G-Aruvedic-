const express = require('express');
const router  = express.Router();
const store   = require('../data/store');

// GET /api/products?cat=&sort=
router.get('/', (req, res) => {
  let list = store.getProducts();
  const { cat, sort, q } = req.query;

  if (cat && cat !== 'all') list = list.filter(p => p.cat === cat);
  if (q) list = list.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));

  if (sort === 'price-low')  list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
  if (sort === 'rating')     list = [...list].sort((a, b) => b.rating - a.rating);

  res.json({ products: list, categories: store.getCategories() });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
  const product = store.getProductById(req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

module.exports = router;
