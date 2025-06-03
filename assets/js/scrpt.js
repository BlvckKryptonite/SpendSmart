// Wait for the entire DOM to finish loading before running the script
document.addEventListener('DOMContentLoaded', function() {

  // Select DOM elements we'll use
  const incomeInput = document.getElementById('income');
  const expenseInput = document.getElementById('expense');
  const categorySelect = document.getElementById('category');
  const addExpenseBtn = document.getElementById('add-expense');
  const wellnessScore = document.getElementById('wellness-score');
  const expenseList = document.getElementById('expense-list');

  // Array to store expense entries
  let expenses = [];

  // When the "Add Expense" button is clicked
  addExpenseBtn.addEventListener('click', function() {
    // Get numeric values from inputs
    const income = parseFloat(incomeInput.value);
    const expense = parseFloat(expenseInput.value);
    const category = categorySelect.value;

    // Check if income or expense is empty or zero
    if (!income || !expense) {
      alert('Please enter both income and expense amounts.');
      return;
    }

    // Save this expense entry to our array
    expenses.push({ category, expense });

    // Update the wellness score
    updateWellnessScore(income, expense);

    // Display all expenses in the list
    displayExpenses();
  });

  // Function to calculate and display the wellness score
  function updateWellnessScore(income, expense) {
    const balance = income - expense;
    let score = 0;

    // Calculate percentage of money left over (wellness score)
    if (balance > 0) {
      score = Math.round((balance / income) * 100);
    }

    // Update the text on the page
    wellnessScore.textContent = `Wellness Score: ${score}%`;
  }

  // Function to display the expense entries in a list
  function displayExpenses() {
    // Clear the list before adding new items
    expenseList.innerHTML = '';

    // Create a list item for each expense entry
    expenses.forEach(function(item) {
      const li = document.createElement('li');
      li.textContent = `${item.category}: $${item.expense.toFixed(2)}`;
      expenseList.appendChild(li);
    });
  }

});
