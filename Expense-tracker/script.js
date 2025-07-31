
const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalExpensesEl = document.getElementById('total-expenses');

let expenses = [];

// Function to render expenses list
function renderExpenses() {
    expenseList.innerHTML = '';

    expenses.forEach((expense, index) => {
        const li = document.createElement('li');

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('expense-info');

        const descriptionEl = document.createElement('span');
        descriptionEl.classList.add('expense-description');
        descriptionEl.textContent = expense.description;

        const dateEl = document.createElement('span');
        dateEl.classList.add('expense-date');
        dateEl.textContent = new Date(expense.date).toLocaleDateString();

        infoDiv.appendChild(descriptionEl);
        infoDiv.appendChild(dateEl);

        const amountEl = document.createElement('span');
        amountEl.classList.add('expense-amount');
        amountEl.textContent = `$${expense.amount.toFixed(2)}`;

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = '×';
        deleteBtn.title = 'Delete expense';
        deleteBtn.addEventListener('click', () => {
            deleteExpense(index);
        });

        li.appendChild(infoDiv);
        li.appendChild(amountEl);
        li.appendChild(deleteBtn);

        expenseList.appendChild(li);
    });

    updateTotal();
}

// Function to update total expenses
function updateTotal() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    totalExpensesEl.textContent = total.toFixed(2);
}

// Function to delete an expense
function deleteExpense(index) {
    expenses.splice(index, 1);
    renderExpenses();
}


expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const date = document.getElementById('date').value;

    if (description === '' || isNaN(amount) || amount <= 0 || date === '') {
        alert('Please fill in all fields with valid values.');
        return;
    }

    const expense = { description, amount, date };
    expenses.push(expense);

    expenseForm.reset();
    renderExpenses();
});

renderExpenses();
