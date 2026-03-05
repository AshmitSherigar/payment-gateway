require('dotenv').config();
const express = require('express');
const initTable = require('./db/tables');
const bankRoutes = require('./routes/bank.routes');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use('/api/v1/banks', bankRoutes);

async function startServer() {
  try {
    await initTable();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}
startServer();
