const express = require('express');
const router  = express.Router();
const store   = require('../data/store');

router.get('/', (_req, res) => res.json(store.getCoupons()));

router.post('/', (req, res) => {
  const { code, off, cap, status = 'Active' } = req.body;
  if (!code) return res.status(400).json({ error: 'code required' });
  const coupon = { id: 'c-' + Date.now(), code, off, cap, uses: 0, status };
  store.addCoupon(coupon);
  res.status(201).json(coupon);
});

router.delete('/:id', (req, res) => {
  store.deleteCoupon(req.params.id);
  res.json({ ok: true });
});

module.exports = router;
