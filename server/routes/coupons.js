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

router.patch('/:id', (req, res) => {
  const { status } = req.body;
  const updated = store.updateCouponStatus(req.params.id, status);
  if (!updated) return res.status(404).json({ error: 'Coupon not found' });
  res.json(updated);
});

module.exports = router;
