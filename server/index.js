// ─── Aruvedic API Server ──────────────────────────────────────────────────────
require('dotenv').config();
const express = require('express');
const cors    = require('cors');

const productsRouter  = require('./routes/products');
const ordersRouter    = require('./routes/orders');
const customersRouter = require('./routes/customers');
const couponsRouter   = require('./routes/coupons');
const reviewsRouter   = require('./routes/reviews');
const dashboardRouter = require('./routes/dashboard');

const app  = express();
const PORT = process.env.PORT || 4000;

// Middleware
const corsOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: corsOrigin === '*' ? '*' : corsOrigin.split(','),
  credentials: corsOrigin !== '*'
}));
app.use(express.json());

// Logging
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/products',  productsRouter);
app.use('/api/orders',    ordersRouter);
app.use('/api/customers', customersRouter);
app.use('/api/coupons',   couponsRouter);
app.use('/api/reviews',   reviewsRouter);
app.use('/api/dashboard', dashboardRouter);

// Health check
app.get('/api/health', (_req, res) => res.json({ status: 'ok', time: new Date().toISOString() }));

// 404
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => {
  console.log(`\n🌿 Aruvedic API running at http://localhost:${PORT}\n`);
});
