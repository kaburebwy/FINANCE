const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
router.get('/', async (req, res) => {
  const { from, to, category } = req.query;
  const filter = {};
  if (from || to) filter.date = {};
  if (from) filter.date.$gte = new Date(from);
  if (to) filter.date.$lte = new Date(to);
  if (category) filter.category = category;
  const items = await Transaction.find(filter).sort({ date: -1 });
  res.json(items);
});
router.post('/', async (req, res) => {
  const { description, category, date, amount, type } = req.body;
  const t = new Transaction({ description, category, date, amount, type, source: 'manual' });
  await t.save();
  res.json(t);
});
module.exports = router;
