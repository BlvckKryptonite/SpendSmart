// Basic DOM elements
const incomeInput = document.getElementById('income');
const expenseInput = document.getElementById('expense');
const categorySelect = document.getElementById('category');
const addExpenseBtn = document.getElementById('add-expense');
const wellnessScore = document.getElementById('wellness-score');
const expenseList = document.getElementById('expense-list'); // New element to display list

let expenses = [];

addExpenseBtn.addEventListener('click', function() {
  const income = parseFloat(incomeInput.value);
  const expense = parseFloat(expenseInput.value);
  const category = categorySelect.value;

  if (!income || !expense) {
    alert('Please enter both income and expense amounts.');
    return;
  }

  expenses.push({ category, expense });
  updateWellnessScore(income, expense);
  displayExpenses(); // Call to display the list
});

function updateWellnessScore(income, expense) {
  const balance = income - expense;
  let score = 0;

  if (balance > 0) {
    score = Math.round((balance / income) * 100);
  }

  wellnessScore.textContent = `Wellness Score: ${score}%`;
}

function displayExpenses() {
  // Clear the list first
  expenseList.innerHTML = '';

  // Loop through the array and create list items
  expenses.forEach(function(item) {
    const li = document.createElement('li');
    li.textContent = `${item.category}: $${item.expense.toFixed(2)}`;
    expenseList.appendChild(li);
  });
}
