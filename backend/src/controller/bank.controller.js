const pool = require('../db/connection');

const getAllBankController = async (req, res) => {
  try {
    const query = `SELECT * FROM banks`;
    const [rows] = await pool.query(query);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getBankByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM banks WHERE id = ?`;
    const [rows] = await pool.execute(query, [id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const setBankController = async (req, res) => {
  const { name, code } = req.body;
  try {
    const query = `INSERT INTO banks (name,code) VALUES (?,?)`;
    const [rows] = await pool.execute(query, [name, code]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateBankController = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `SELECT * FROM banks WHERE id = ?`;
    const [rows] = await pool.execute(query, [id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteBankController = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `DELETE FROM banks WHERE id = ?`;
    const [rows] = await pool.execute(query, [id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBankController,
  getBankByIdController,
  setBankController,
  updateBankController,
  deleteBankController,
};
