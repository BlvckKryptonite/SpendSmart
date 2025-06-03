// Basic DOM elements
const incomeInput = document.getElementById('income');
const expenseInput = document.getElementById('expense');
const categorySelect = document.getElementById('category');
const addExpenseBtn = document.getElementById('add-expense');
const wellnessScore = document.getElementById('wellness-score');

// Placeholder for future chart (Chart.js)
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
  console.log('Expenses:', expenses); // For testing

  // Future: Update chart here
});

function updateWellnessScore(income, expense) {
  const balance = income - expense;
  let score = 0;

  if (balance > 0) {
    score = Math.round((balance / income) * 100);
  }

  wellnessScore.textContent = `Wellness Score: ${score}%`;
}
