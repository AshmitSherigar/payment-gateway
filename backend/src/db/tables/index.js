const createBankTable = require('./bank.table');
const createUserTable = require('./user.table');

async function initTable() {
  await createBankTable();
  await createUserTable();
}

module.exports = initTable;
