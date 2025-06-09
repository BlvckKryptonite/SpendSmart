document.addEventListener('DOMContentLoaded', function () {
  // Get DOM elements
  const incomeInput = document.getElementById('income');
  const expenseInput = document.getElementById('expense');
  const categorySelect = document.getElementById('category');
  const addExpenseBtn = document.getElementById('add-expense');
  const wellnessScoreDisplay = document.getElementById('wellness-score');
  const expenseList = document.getElementById('expense-list');
  const leftoverDisplay = document.getElementById('leftover-summary'); // Displays leftover balance

  // Global state
  let expenses = [];
  let latestScore = 0;

  // Chart.js setup
  const ctx = document.getElementById('budget-chart').getContext('2d');
  const expenseChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [],
      datasets: [{
        label: 'Expenses by Category',
        data: [],
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

  // Add Expense button functionality
  addExpenseBtn.addEventListener('click', function () {
    const income = parseFloat(incomeInput.value);
    const expense = parseFloat(expenseInput.value);
    const category = categorySelect.value;

    // Validate input
    if (!income || !expense || !category) {
      alert('Please enter income, expense, and select a category.');
      return;
    }

    // Add expense to list
    expenses.push({ category, expense });

    // Recalculate score and update UI
    updateWellnessScore(income);
    displayExpenses();
    updateChart();

    // Reset inputs
    expenseInput.value = '';
    categorySelect.selectedIndex = 0;
  });

  /**
   * Calculates total expenses, balance, and wellness score.
   * Updates the UI with the new score and leftover balance.
   */
  function updateWellnessScore(income) {
    const totalExpenses = expenses.reduce((acc, item) => acc + item.expense, 0);
    const balance = income - totalExpenses;
    let score = 0;

    // Calculate score only if there's a surplus
    if (balance > 0) {
      score = Math.round((balance / income) * 100);
    }

    latestScore = score;

    // Update UI with new score and leftover
    wellnessScoreDisplay.textContent = `Wellness Score: ${score}%`;
    leftoverDisplay.textContent = `Leftover: $${balance.toFixed(2)}`;
  }

  /**
   * Displays all expenses in the expense list with remove buttons.
   */
  function displayExpenses() {
    expenseList.innerHTML = '';

    expenses.forEach(function (item, index) {
      const li = document.createElement('li');
      li.textContent = `${item.category}: $${item.expense.toFixed(2)}`;

      // Create delete button for each expense
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Remove';
      deleteBtn.classList.add('delete-btn');

      deleteBtn.addEventListener('click', function () {
        // Remove expense and update everything
        expenses.splice(index, 1);
        displayExpenses();
        updateChart();
        const income = parseFloat(incomeInput.value);
        if (income) updateWellnessScore(income);
      });

      li.appendChild(deleteBtn);
      expenseList.appendChild(li);
    });
  }

  /**
   * Updates pie chart with current expense categories and amounts.
   */
  function updateChart() {
    const categoryTotals = {};

    expenses.forEach(function (item) {
      categoryTotals[item.category] = (categoryTotals[item.category] || 0) + item.expense;
    });

    expenseChart.data.labels = Object.keys(categoryTotals);
    expenseChart.data.datasets[0].data = Object.values(categoryTotals);
    expenseChart.update();
  }

  /**
   * Displays a wellness insight message based on latest score.
   */
  document.getElementById("get-insight").addEventListener("click", function () {
    const messageElement = document.getElementById("insight-message");

    const totalExpenses = expenses.reduce((acc, item) => acc + item.expense, 0);
    const income = parseFloat(incomeInput.value);

    if (!income || totalExpenses === 0) {
      messageElement.textContent = "❌ Please enter your income and at least one expense to get insights.";
      return;
    }

    if (latestScore > 80) {
      messageElement.textContent = "🎉 You have a great SpendSmart wellness score — fantastic job managing your money!";
    } else if (latestScore >= 60) {
      messageElement.textContent = "👏 You're doing well, but there's room for improvement. Keep tracking those expenses!";
    } else if (latestScore >= 40) {
      messageElement.textContent = "⚠️ Your SpendSmart score is below average. Consider cutting back on non-essential expenses.";
    } else {
      messageElement.textContent = "🚨 Time to reassess your budget! Let's work toward a healthier financial balance.";
    }

    // Clear message after 6 seconds
    setTimeout(() => {
      messageElement.textContent = '';
    }, 6000);
  });
});
