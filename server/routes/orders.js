const express = require('express');
const router  = express.Router();
const store   = require('../data/store');

// GET /api/orders?status=
router.get('/', (req, res) => {
  let list = store.getOrders();
  if (req.query.status && req.query.status !== 'All') {
    list = list.filter(o => o.status === req.query.status);
  }
  res.json(list);
});

// GET /api/orders/:id
router.get('/:id', (req, res) => {
  const order = store.getOrderById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Order not found' });
  res.json(order);
});

// POST /api/orders  — place a new order
router.post('/', (req, res) => {
  const { items, address, payment, customer } = req.body;
  if (!items || !items.length) return res.status(400).json({ error: 'No items in order' });

  const products = store.getProducts();
  const sub      = items.reduce((s, i) => {
    const p = products.find(p => p.id === i.id);
    return s + (p ? p.price * i.qty : 0);
  }, 0);
  const shipping = sub > 999 ? 0 : 80;
  const tax      = Math.round(sub * 0.05);
  const total    = sub + shipping + tax;

  const newOrder = {
    id:       'AR-' + (10430 + Math.floor(Math.random() * 1000)),
    date:     new Date().toISOString().slice(0, 10),
    customer: customer?.name || 'Guest',
    email:    customer?.email || '',
    items:    items.map(i => ({ p: i.id, q: i.qty })),
    total,
    status:   'Processing',
    city:     address?.city || 'India',
    pay:      payment || 'UPI',
  };

  store.addOrder(newOrder);
  res.status(201).json(newOrder);
});

// PATCH /api/orders/:id  — update status (admin)
router.patch('/:id', (req, res) => {
  const { status } = req.body;
  const updated = store.updateOrderStatus(req.params.id, status);
  if (!updated) return res.status(404).json({ error: 'Order not found' });
  res.json(updated);
});

module.exports = router;
