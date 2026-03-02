const express = require('express');
const router = express.Router();

router.get('/', () => {}); // display all banks
router.get('/:id', () => {}); // displays single bank
router.post('/', () => {}); // creates new bank
router.put('/:id', () => {}); // updates bank
router.delete('/:id', () => {}); // deletes bank
module.exports = router;
