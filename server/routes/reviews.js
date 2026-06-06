const express = require('express');
const router  = express.Router();
const store   = require('../data/store');

router.get('/', (_req, res) => res.json(store.getReviews()));

router.patch('/:id', (req, res) => {
  const { status } = req.body;
  const updated = store.updateReview(req.params.id, status);
  if (!updated) return res.status(404).json({ error: 'Review not found' });
  res.json(updated);
});

module.exports = router;
