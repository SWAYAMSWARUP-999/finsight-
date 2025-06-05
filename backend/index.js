const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'RAMsita@30092605',
  database: 'sipdb'
});

db.connect(err => {
  if (err) {
    console.error('MySQL error:', err);
  } else {
    console.log('✅ MySQL connected');
  }
});

app.post('/api/sip', (req, res) => {
  const { monthly_investment, annual_rate, years } = req.body;
  const query = `INSERT INTO sip_records (monthly_investment, annual_rate, years) VALUES (?, ?, ?)`;
  db.query(query, [monthly_investment, annual_rate, years], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Saved', id: result.insertId });
  });
});

app.listen(5000, () => console.log('🚀 Server running at http://localhost:5000'));
