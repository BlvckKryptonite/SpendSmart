# SpendSmart

SpendSmart is a responsive JavaScript-based budgeting web app designed to help users log income and expenses, visualize their spending habits, and gain real-time insight into their financial wellness.

---

## Features

- Input fields for income and categorized expenses  
- Dynamic pie chart showing expense distribution by category  
- Live wellness score calculation based on remaining balance  
- Insightful message output based on wellness score thresholds  
- Clear, styled expense log with removable entries  
- Responsive and accessible design across devices (see image below):

 ![SpendSmart Wireframe](assets/images/mockup.png)


---

## User Stories

**As a user:**

- I want to input my monthly income and track my expenses easily  
- I want to categorize my expenses (e.g., rent, food, entertainment)  
- I want to see how much money I have left visually  
- I want a score or message that gives insight into how I'm doing  
- I want the app to work well on both desktop and mobile devices  

---

## 💡 Wellness Score Calculation

The Wellness Score is calculated as the percentage of your income remaining after expenses:

**Formula:**  
`(Income - Total Expenses) ÷ Income × 100`

### Score Meaning:
- **81–100%** → Excellent
- **60–80%** → Good
- **40–59%** → Fair
- **0–39%** → Poor

A higher score means you're managing your budget well, while a lower score suggests overspending.

---

## Wireframes

The wireframe below represents the final layout structure of the SpendSmart app:
-

![SpendSmart Wireframe](assets/images/spendsmart-wireframe.png)


---
**Layout Structure:**

- Centered header and logo  
- Two-column layout for inputs on larger screens (single column on smaller screens)  
- Category dropdown, then buttons, then visual output  
- Pie chart followed by a full-width expense list  

---

## Technologies Used

- **HTML5**  
- **CSS3** (Flexbox, media queries)  
- **JavaScript** (DOM manipulation, array logic)  
- **Chart.js** (pie chart visualization)  
- **Git & GitHub** (version control & deployment)  

---

## Testing

### Browser and Device Testing 
- Tested on Chrome, Firefox, Edge, and Safari  
- Mobile responsiveness tested with Chrome DevTools and a real smartphone  
- Manual testing of all buttons, input fields, and dynamic updates  
- Accessibility: Sufficient contrast, logical heading structure, `aria-labels` where appropriate

![Lighthouse report](assets/images/lighthouse-report)



## Bugs
While I did not experience any major functional bugs, I identified a critical logic bug late in the development process. 

### Logic Bug: Incorrect Wellness Score Calculation

- **Issue:**  
  The wellness score calculation only considered the most recent expense, not the total of all expenses.

- **Impact:**  
  This led to inaccurate financial insights. For example, a user whose total expenses had already surpassed their income could still receive a congratulatory message based on a small new expense — misleading them about their actual financial status.

- **Fix:**  
  The `calculateWellnessScore()` function was updated to sum all expenses rather than referencing the latest one. This total was then used to update the `latestScore` value, which drives both the score display and the insight messages.

- **Verification:**  
  Fix verified through manual testing and visible in the [GitHub commit history](https://github.com/BlvckKryptonite/SpendSmart/commits/master).

  ### Unfixed Bugs

  No unfixed bugs.



### Code Validation 
- JavaScript validated with [JSHint](https://jshint.com/) — no major issues:

  
![JSHint validation screenshot](assets/images/jshint-validation.png)

---

- HTML validated with [W3C Validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fblvckkryptonite.github.io%2FSpendSmart%2F) — minor issues resolved:

 ![W3C validation screenshot](assets/images/w3c-validation.png)

 ---

 - CSS validated with [W3C css validation service](https://jigsaw.w3.org/css-validator/#validate_by_input)

![W3C validation screenshot](assets/images/W3C-css-validation)


 
 ### Functionality Testing

 | Feature         | Expected Outcome                             | Test Method            | Result |
| --------------- | -------------------------------------------- | ---------------------- | ------ |
| Add Income      | Income field accepts positive numbers        | Manual input test      | Pass |
| Add Expense     | Expense added to list with selected category | Click "Add Expense"    | Pass |
| Delete Expense  | Expense removed from list and recalculated   | Click "Remove" button  | Pass |
| Wellness Score  | Updated correctly after each expense         | Triggered via function | Pass |
| Chart           | Updates dynamically based on categories      | Visual chart update    | Pass |
| Insight Message | Displays based on score thresholds           | Click "Get Insight"    | Pass |

 

**User Story Testing:**

- ✅ Income and expenses can be input and cleared  
- ✅ Categories correctly tagged to expenses  
- ✅ Pie chart accurately reflects expense breakdown  
- ✅ Wellness score updates live and consistently  
- ✅ Insight messages vary with score  
- ✅ Responsive layout adapts to different screen sizes  

---

## Deployment

The site was deployed to GitHub pages. The following are the deployment steps:
- In the GitHub repository, navigate to the settings tab
- From the source section drop-down menu, select the master branch
- When the master branch has been selected, the page provided the link to the completed website

- **Live Site**: [View SpendSmart](https://blvckkryptonite.github.io/SpendSmart/)  
- **GitHub Repo**: [GitHub - SpendSmart](https://github.com/BlvckKryptonite/SpendSmart.git)   
- Assets folder includes Javascript file, images and stylesheet

---

## Development Notes

During development, commits were initially tracked through a connected local IDE. However, partway through the project, a change to the GitHub repository configuration resulted in later changes being committed directly via the GitHub web interface. As a result, some recent commits may lack descriptive messages. Despite this, all features were implemented, tested, and validated according to the project requirements.

---

## Potential Future Improvements

- Add persistent storage using localStorage or IndexedDB  
- Enable income history tracking  
- Animate transitions for added visual polish  
- Include more chart types (e.g., bar or line for monthly comparison)  

---

## Credits

- Chart.js: [https://www.chartjs.org](https://www.chartjs.org)  
- Font: Google Fonts (Lato + Oswald)  
- Logo: Created with Canva  
- Wireframe sketch: Created using hand-drawn wireframe concept and enhanced with AI (Chat GPT-4o) 

---

## Acknowledgements

This project was developed as part of the Full Stack Software Development Diploma at Code Institute.

---


_Designed and developed by Muma Kalobwe_
