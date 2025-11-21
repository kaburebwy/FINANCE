require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const transactionsRouter = require('./routes/transactions');
const uploadsRouter = require('./routes/uploads');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/transactions', transactionsRouter);
app.use('/api/uploads', uploadsRouter);
const PORT = process.env.PORT || 4000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
