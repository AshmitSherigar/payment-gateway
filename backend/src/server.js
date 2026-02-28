require('dotenv').config();
const express = require('express');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
