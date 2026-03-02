const express = require('express');
const {
  getAllBankController,
  getBankByIdController,
  setBankController,
  updateBankController,
  deleteBankController,
} = require('../controller/bank.controller');
const router = express.Router();

router.get('/', getAllBankController); // display all banks
router.get('/:id', getBankByIdController); // displays single bank
router.post('/', setBankController); // creates new bank
router.put('/:id', updateBankController); // updates bank
router.delete('/:id', deleteBankController); // deletes bank
module.exports = router;
