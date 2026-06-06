const express = require('express');
const router  = express.Router();
const store   = require('../data/store');

router.get('/', (_req, res) => res.json(store.getCustomers()));

module.exports = router;
