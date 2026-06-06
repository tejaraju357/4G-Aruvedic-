const express = require('express');
const router  = express.Router();
const store   = require('../data/store');

router.get('/', (_req, res) => {
  const sales   = store.getSales14d();
  const orders  = store.getOrders();
  const products= store.getProducts();

  const totalRev = sales.reduce((s, d) => s + d.r, 0);
  const totalOrd = sales.reduce((s, d) => s + d.o, 0);
  const avgOrder = Math.round(totalRev / totalOrd);

  const bestSellers = [
    products[3], products[0], products[2], products[7], products[5]
  ].map((p, i) => ({ ...p, sold: 50 - i * 8, revenue: p.price * (50 - i * 8) }));

  const lowStock = products.filter(p => p.stock < 100).slice(0, 5);

  res.json({
    kpis: [
      { label: 'Revenue',   value: totalRev,  delta: '+18.4%', up: true },
      { label: 'Orders',    value: totalOrd,  delta: '+12.2%', up: true },
      { label: 'Avg. order',value: avgOrder,  delta: '+5.6%',  up: true },
      { label: 'Refunds',   value: 2340,      delta: '−1.1%',  up: false },
    ],
    sales14d: sales,
    bestSellers,
    recentOrders: orders.slice(0, 5),
    lowStock,
  });
});

module.exports = router;
