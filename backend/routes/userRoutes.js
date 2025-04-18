const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/userController');

router.get('/', expenseController.getAllExpenses);
router.delete('/:id', expenseController.deleteExpense );
router.post('/', expenseController.addExpense);
router.put('/:id', expenseController.updateExpense );



module.exports = router;




