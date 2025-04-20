const expense = require('../models/expense');

exports.getAllExpenses = async (req, res)=>{
    try{
         const expenses = await expense.findAll();
         if(expenses.length ===0){
             res.status(404).json({message: "No expenses found"})
         }
          res.status(200).json(expenses)
    }catch(err){
        console.error("Error fetching expenses: ", err);
         res.status(500).json({ message: "Internal server error" });
        
    }
}

exports.getExpenseById = async (req, res)=>{
    try{
        const {id} = req.params;
        const expenseData = await expense.findByPk(id);
        res.status(200).json(expenseData);

    }catch(err){
        console.error("error in fetching expense by id in controllers: ", err);
        res.status(500).json({message: "internal server error"});
    }
}

exports.addExpense = async (req, res)=>{
    console.log("Received data: ", req.body);
    try{
     
    
     const expenseData = await expense.create(req.body);
      res.status(201).json(expenseData);
    }catch(err){
        console.error("Error in adding expense: ", err);
         res.status(400).json({message: "Internal server error"})
    }
}

exports.updateExpense = async (req, res)=>{
    try{
        const {id} = req.params;
        const {description, amount} = req.body;
        if(!description || !amount){
             res.status(400).json({message: "please provide description and amount"});
        }
        const expenseData = await expense.findByPk(id);
        if(!expenseData){
             res.status(404).json({message: "Expense not found"})
        }
        await expenseData.update({description, amount});
         res.status(200).json({message: "Expense updated successfully", expense: expenseData})
    }catch(err){
        console.error("Error in updating expense: ", err);
         res.status(500).json({message: "Internal server error"});
    }
}

exports.deleteExpense = async (req, res)=>{
    console.log("received id by params: ", req.params);
    try{
        const {id} = req.params;
        const expenseData = await expense.findByPk(id);
        if(!expenseData){
             res.status(404).json({message: "Expense not found"})
        }
        await expenseData.destroy();
         res.status(200).json({message: "Expense deleted successfully"})
    }catch(err){
        console.error("Error in deleting expense: ", err);
         res.status(500).json({ message: "Internal server error" });
    }
}