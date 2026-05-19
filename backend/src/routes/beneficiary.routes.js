const express = require('express');
const {
  getBeneficiariesController,
} = require('../controller/beneficiary.controller');
const router = express.Router();

router.get('/beneficiaries/:userId', getBeneficiariesController);
module.exports = router;
