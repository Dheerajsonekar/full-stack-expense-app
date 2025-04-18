const expense = require('../models/expense');

exports.getAllExpenses = async (req, res)=>{
    try{
         const expenses = await expense.findAll();
         if(expenses.length ===0){
            return res.status(404).json({message: "No expenses found"})
         }
         return res.status(200).json({message: "Expenses fetched successfully", expenses})
    }catch(err){
        console.error("Error fetching expenses: ", err);
    }
}

exports.addExpense = async (req, res)=>{
    try{
     const {description, amount } = req.body;
     if(!description || !amount){
        return res.status(400).json({message: "Please provide description and amount"})
     }
     const expenseData = await expense.create({description, amount});
     return res.status(201).json({message: "Expenses added successfully", expense: expenseData})
    }catch(err){

    }
}

exports.updateExpense = async (req, res)=>{
    try{
        const {id} = req.params;
        const {description, amount} = req.body;
        if(!description || !amount){
            return res.status(400).json({message: "please provide description and amount"});
        }
        const expenseData = await expense.findByPk(id);
        if(!expenseData){
            return res.status(404).json({message: "Expense not found"})
        }
        await expenseData.updateExpense({description, amount});
        return res.status(200).json({message: "Expense updated successfully", expense: expenseData})
    }catch(err){
        console.error("Error in updating expense: ", err);
        return res.status(500).json({message: "Internal server error"});
    }
}

exports.deleteExpense = async (req, res)=>{
    try{
        const {id} = req.params;
        const expenseData = await expense.findByPk(id);
        if(!expenseData){
            return res.status(404).json({message: "Expense not found"})
        }
        await expenseData.destroy();
        return res.status(200).json({message: "Expense deleted successfully"})
    }catch(err){
        console.error("Error in deleting expense: ", err);
    }
}