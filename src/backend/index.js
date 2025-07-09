const express = require('express');
const db = require('./db');
require('dotenv').config();
const app = express();
app.use(express.json());

app.get('/products', async (req, res) => {
  const result = await db.query('SELECT * FROM products');
  res.json(result.rows);
});

app.post('/products', async (req, res) => {
  const { name, price } = req.body;
  await db.query('INSERT INTO products (name, price) VALUES ($1, $2)', [name, price]);
  res.send('Product added');
});

app.listen(3000, () => {
  console.log('Backend running on port 3000');
});
