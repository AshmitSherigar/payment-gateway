const STATUS_CODES = require('../constant/statusCode');
const pool = require('../db/connection');

const makeTransactionController = async (req, res) => {
  const connection = await pool.getConnection();
  const { senderUpiHandle, receiverUpiHandle, amount } = req.body;

  // Getting the account id
  try {
    try {
      const query = `
        SELECT upi_handle, accountId
        FROM Upi
        WHERE upi_handle = ? OR upi_handle = ?
        `;
      const [rows] = await pool.query(query, [
        senderUpiHandle,
        receiverUpiHandle,
      ]);

      let senderAccountId;
      let receiverAccountId;

      for (const row of rows) {
        if (row.upi_handle === senderUpiHandle) {
          senderAccountId = row.accountId;
        }
        if (row.upi_handle === receiverUpiHandle) {
          receiverAccountId = row.accountId;
        }
      }
    } catch (error) {
      console.error(error);
      res.status(STATUS_CODES.BAD_REQUEST).json({
        success: false,
        message: 'Sender UPI Id or Reciever UPI Id is invalid or missing',
      });
    }
    await connection.query('START TRANSACTION');
    // deduct money
    await connection.execute(
      'UPDATE Upi SET balance = balance - ? WHERE upi_handle = ?',
      [amount, senderUpiHandle],
    );
    // add money
    await connection.execute(
      'UPDATE Upi SET balance = balance - ? WHERE upi_handle = ?',
      [amount, receiverUpiHandle],
    );
    await connection.query('COMMIT');
    return res.status(STATUS_CODES.OK).json({
      success: true,
      message: 'Payment Successfully transfered',
    });
  } catch (error) {
    console.error(error);
    await connection.query('ROLLBACK');
    return res
      .status(STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: 'Internal Server Error' });
  } finally {
    connection.release();
  }
};

module.exports = { makeTransactionController };
