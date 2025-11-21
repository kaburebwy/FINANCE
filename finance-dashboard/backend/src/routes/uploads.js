const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParser = require('../utils/pdfParser');
const Transaction = require('../models/Transaction');
const upload = multer({ dest: 'uploads/' });
router.post('/invoice', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;
    const parsed = await pdfParser.parseInvoice(filePath);
    const t = new Transaction({
      description: parsed.description || 'Fatura PDF',
      category: parsed.category || 'Fatura',
      date: parsed.date ? new Date(parsed.date) : new Date(),
      amount: parsed.amount || 0,
      type: parsed.amount > 0 ? 'expense' : 'income',
      source: 'pdf',
      rawPdfData: parsed
    });
    await t.save();
    res.json({ success: true, transaction: t });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao processar PDF' });
  }
});
module.exports = router;
