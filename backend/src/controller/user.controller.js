const STATUS_CODES = require('../constant/statusCode');
const pool = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isLegalAge } = require('../utils/helper');

const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Checks for params
    if (!username || !password) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ success: false, message: 'Missing Input Field' });
    }

    const checkQuery = `SELECT * FROM users WHERE username = ?`;
    const [checkRows] = await pool.query(checkQuery, [username]);

    if (checkRows.length === 0) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'User not found',
      });
    }

    const isUser = await bcrypt.compare(password, checkRows[0].password);
    if (!isUser) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ success: false, message: 'Username or passwords dont match' });
    }

    const accessToken = jwt.sign(
      { userId: checkRows[0].id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '1h' },
    );

    return res.status(STATUS_CODES.OK).json({
      success: true,
      message: 'User login successfully',
      userId: checkRows[0].id,
      accessToken,
    });
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

const registerController = async (req, res) => {
  try {
    const { username, password, phone_number, dob } = req.body;
    // DOB --- YYYY-MM-DD

    // Checks for params
    if (!username || !password || !phone_number || !dob) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ success: false, message: 'Missing Input Field' });
    }

    //Check for valid mobile number
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone_number)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Invalid phone number',
      });
    }

    // Checks for legal age
    try {
      if (!isLegalAge(dob)) {
        return res
          .status(STATUS_CODES.BAD_REQUEST)
          .json({ success: false, message: 'Age should be greater than 18' });
      }
    } catch (error) {
      res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ success: false, message: 'Invalid Year Format' });
    }
    // Checks for if the username or phone number existing
    const findQuery = `SELECT * FROM users WHERE username = ? OR phone_number = ?`;
    const [findRows] = await pool.query(findQuery, [username, phone_number]);

    if (findRows.length > 0) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json({ success: false, message: 'Username/Phone is already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into database
    const insertQuery = `INSERT INTO users (username,password,phone_number,DOB) VALUES (?,?,?,?)`;
    const [insertRows] = await pool.query(insertQuery, [
      username,
      hashedPassword,
      phone_number,
      dob,
    ]);

    const accessToken = jwt.sign(
      { userId: insertRows.insertId },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: '1h' },
    );

    return res.status(STATUS_CODES.ACCEPTED).json({
      success: true,
      message: 'User created successfully',
      userId: insertRows.insertId,
      accessToken,
    });
  } catch (error) {
    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
