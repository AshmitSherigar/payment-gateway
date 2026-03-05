const createBankTable = require('../tables/bank.table');

async function initTable() {
  await createBankTable();
}

module.exports = initTable;
