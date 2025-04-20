const form = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");
let editingExpenseId = null;

form.addEventListener("submit", async (e)=>{
    e.preventDefault();

     const expense = {
        description: document.getElementById('description').value,
        amount: document.getElementById('amount').value
     }
     console.log(expense);
     try{
      if(editingExpenseId){
         await axios.put(`http://localhost:3000/api/expense/${editingExpenseId}`, expense);
         editingExpenseId = null;
      } else{

         await axios.post('http://localhost:3000/api/expense/', expense);
      }
        
        form.reset();
        await showExpenses();
     }catch(err){
        console.error("Error adding expense: ", err);
     }

})

async function showExpenses(){
    try{
         const response = await axios.get("http://localhost:3000/api/expense/");
         const expenses = response.data;
         
         expenseList.innerHTML ='';
         expenses.forEach(expense =>{
            const li = document.createElement("li");
            const editBtn = document.createElement("button");
            const deleteBtn = document.createElement("button");
            editBtn.textContent = "Edit"
            deleteBtn.textContent = "Delete"
            editBtn.classList.add("btn", "btn-primary", "btn-sm", "float-end", "mx-2");
            deleteBtn.classList.add("btn", "btn-danger", "btn-sm", "float-end", "mx-2");
            editBtn.addEventListener("click", ()=>editExpense(expense.id));
            deleteBtn.addEventListener("click",()=> deleteExpense(expense.id));
           

            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");;
            li.textContent = `${expense.description} -$${expense.amount} `;
            li.appendChild(editBtn)
            li.appendChild(deleteBtn)
            expenseList.appendChild(li);
         })
    }catch(err){
        console.error("error while showing expenses: ", err);
    }
}

async function deleteExpense(id){
     try{
        await axios.delete(`http://localhost:3000/api/expense/${id}`)
        await showExpenses();
     }catch(err){
        console.error("Error in deleting expense in front end: ", err);
     }
}

async function editExpense(id){
    try{

        const response = await axios.get(`http://localhost:3000/api/expense/${id}`);
        const expense = response.data;
        document.getElementById("description").value = expense.description;
        document.getElementById("amount").value = expense.amount;
        editingExpenseId = id;
        
    }catch(err){
        console.error("Error in editing expense: ", err);
    }
}

document.addEventListener("DOMContentLoaded", showExpenses);