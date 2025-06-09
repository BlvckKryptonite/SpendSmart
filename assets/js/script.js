/* jshint esversion: 6 */
/* global Chart */

document.addEventListener('DOMContentLoaded', function () {
  // Select DOM elements
  const incomeInput = document.getElementById('income');
  const expenseInput = document.getElementById('expense');
  const categorySelect = document.getElementById('category');
  const addExpenseBtn = document.getElementById('add-expense');
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
  addExpenseBtn.addEventListener('click', function () {
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

    // Reset the expense input and category select
    expenseInput.value = '';
    categorySelect.selectedIndex = 0;
  });

  // Variable to track wellness score
  const wellnessScoreDisplay = document.getElementById("wellness-score");
  let latestScore = 0;

  // Update Wellness Score
  function updateWellnessScore(income, expense) {
    const balance = income - expense;
    let score = 0;

    if (balance > 0) {
      score = Math.round((balance / income) * 100);
    }

    latestScore = score; // Store for insight message
    document.getElementById("leftover-summary").textContent = `Leftover: $${balance.toFixed(2)}`;


    wellnessScoreDisplay.textContent = `Wellness Score: ${score}%`;
  }

  function getTotalExpenses() {
    return expenses.reduce((total, item) => total + item.expense, 0);
  }

  // Insight Button Event Listener 
  document.getElementById("get-insight").addEventListener("click", function () {
    const messageElement = document.getElementById("insight-message");

    const totalExpenses = getTotalExpenses();

    // Show error if there are no expenses
    if (totalExpenses === 0) {
      messageElement.textContent = "❌ Please enter your income and expenses first.";

      // Auto-clear this error warning after 5 seconds
      setTimeout(() => {
        if (messageElement.textContent.includes("Please enter your income")) {
          messageElement.textContent = "";
        }
      }, 5000);

      return;
    }

    // Valid score exists → Show insight message
    if (latestScore > 80) {
      messageElement.textContent = "🎉 You have a great SpendSmart wellness score — fantastic job managing your money!";
    } else if (latestScore >= 60) {
      messageElement.textContent = "👏 You're doing well, but there's room for improvement. Keep tracking those expenses!";
    } else if (latestScore >= 40) {
      messageElement.textContent = "⚠️ Your SpendSmart score is below average. Consider cutting back on non-essential expenses.";
    } else {
      messageElement.textContent = "🚨 Time to reassess your budget! Let's work toward a healthier financial balance.";
    }
  });


  // Display Expenses in a List
  function displayExpenses() {
    expenseList.innerHTML = ''; // Clear existing entries

    // Loop through expenses and create a list item for each
    expenses.forEach(function (item, index) {
      const li = document.createElement('li');
      li.textContent = `${item.category}: $${item.expense.toFixed(2)}`;

      // Create a delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Remove';
      deleteBtn.classList.add('delete-btn');

      // Add a click event to remove this expense
      deleteBtn.addEventListener('click', function () {
        expenses.splice(index, 1); // Remove from array
        displayExpenses(); // Update list
        updateChart(); // Update chart
      });

      // Add the delete button to the list item
      li.appendChild(deleteBtn);

      // Add the list item to the UL
      expenseList.appendChild(li);
    });
  }

  // Update the Chart with current expenses
  function updateChart() {
    // Calculate totals for each category
    const categoryTotals = {};
    expenses.forEach(function (item) {
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


