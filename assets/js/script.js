document.addEventListener('DOMContentLoaded', function() {
  // Select DOM elements
  const incomeInput = document.getElementById('income');
  const expenseInput = document.getElementById('expense');
  const categorySelect = document.getElementById('category');
  const addExpenseBtn = document.getElementById('add-expense');
  const wellnessScore = document.getElementById('wellness-score');
  const expenseList = document.getElementById('expense-list');

  let expenses = [];

  // Initialize Chart.js
  const ctx = document.getElementById('budget-chart').getContext('2d');
  const expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [], // Categories
      datasets: [{
        label: 'Expenses by Category',
        data: [], // Expense amounts
        backgroundColor: ['#1a7bff', '#28a745', '#ffc107', '#dc3545', '#6f42c1'],
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    }
  });

  // Add Expense button click
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
    displayExpenses();
    updateChart();
  });

  // Update Wellness Score
  function updateWellnessScore(income, expense) {
    const balance = income - expense;
    let score = 0;

    if (balance > 0) {
      score = Math.round((balance / income) * 100);
    }

    wellnessScore.textContent = `Wellness Score: ${score}%`;
  }

  // Display Expenses in a List
  function displayExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach(function(item) {
      const li = document.createElement('li');
      li.textContent = `${item.category}: $${item.expense.toFixed(2)}`;
      expenseList.appendChild(li);
    });
  }

  // Update the Chart with current expenses
  function updateChart() {
    // Calculate totals for each category
    const categoryTotals = {};
    expenses.forEach(function(item) {
      if (categoryTotals[item.category]) {
        categoryTotals[item.category] += item.expense;
      } else {
        categoryTotals[item.category] = item.expense;
      }
    });

    // Update chart data
    expenseChart.data.labels = Object.keys(categoryTotals);
    expenseChart.data.datasets[0].data = Object.values(categoryTotals);
    expenseChart.update();
  }
});
