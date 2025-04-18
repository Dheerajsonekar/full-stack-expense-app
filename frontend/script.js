const form = document.getElementById("expenseForm");
const expenseList = document.getElementById("expenseList");

form.addEventListener("submit", async(e)=>{
    e.preventDefault();

     const expense = {
        description: document.getElementById("description").value,
        amount: document.getElementById("amount").value
     }

     try{
        await axios.post("", expense);
        form.reset();
        showExpenses();
     }catch(err){
        console.error("Error adding expense: ", err);
     }

})

async function showExpenses(){
    try{
         const response = await axios.get("");
         const expenses = response.data;
         expenseList.innerHTML ="";
         expenses.forEach(expense =>{
            const li = document.createElement("li");
            const editBtn = document.creaeElement("button");
            const deleteBtn = document.createElement("button");
            editBtn.textContent = "Edit"
            deleteBtn.textContent = "Delete"
            editBtn.classList.add("btn", "btn-primary", "btn-sm", "float-end", "mx-2");
            deleteBtn.classList.add("btn", "btn-danget", "btn-sm", "float-end", "mx-2");
            editBtn.addEventListener("click", editExpense(expense._id));
            deleteBtn.addEventListener("click", deleteExpense(expense._id));
            li.appendChild(editBtn)
            li.appendChild(deleteBtn)

            li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");;
            li.textContent = `${expense.description} -$${expense.amount} `;
            expenseList.appendChild(li);
         })
    }catch(err){
        console.error("error while showing expenses: ", err);
    }
}

async function deleteExpense(id){
     try{
        await axios.delete()
     }catch(err){
        console.error("Error in deleting expens: ", err);
     }
}

async function editExpense(id){
    try{

        const response = await axios.get(`/${id}`);
        const expense = response.data;
        document.getElementById("description").value = expense.description;
        document.getElementById("amount").value = expense.amount;

    }catch(err){
        console.error("Error in editing expense: ", err);
    }
}