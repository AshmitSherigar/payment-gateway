const STATUS_CODES = require('../constant/statusCode');
const pool = require('../db/connection');

const getBeneficiariesController = async (req, res) => {
  try {
    const { userId } = req.params;

    const query = `
      SELECT
        Beneficiary.beneficiaryId,
        Upi.upiId,
        Upi.upi_handle,
        Beneficiary.created_at
      FROM Beneficiary

      INNER JOIN Upi
      ON Beneficiary.upiId = Upi.upiId

      WHERE Beneficiary.userId = ?
    `;

    const [rows] = await pool.query(query, [userId]);

    return res.status(STATUS_CODES.OK).json({
      success: true,
      beneficiaries: rows,
    });
  } catch (error) {
    console.error(error);

    return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

module.exports = {
  getBeneficiariesController,
};
