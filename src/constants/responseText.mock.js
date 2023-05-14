export const mockResponse = `
Title: Diagnosis Writer Web App - Explanation of Variables for New Developers
 
Welcome to the team! As a developer for the Diagnosis Writer Web App, understanding the existing codebase and its variables is essential for effective contributions. In this guide, we'll provide an overview of the key JavaScript variables used in the app.
 
1. Input Variables
 
These variables represent the HTML elements used for input:
 
   a. \`primal\`: Refers to the textarea element for the primary diagnosis input.
   b. \`concomitant\`: Refers to the textarea element for the concomitant diagnosis input.
   c. \`information\`: Refers to the textarea element for the discharge recommendations input.
 
2. Output Variables
 
These variables represent the HTML elements used for displaying the output:
 
   a. \`primalOut\`: A NodeList of elements displaying the primary diagnosis text.
   b. \`concomitantOut\`: A NodeList of elements displaying the concomitant diagnosis text.
   c. \`informationOut\`: Refers to the pre element displaying the discharge recommendations text.
 
3. Display Control Variables
 
These variables are used to toggle the display of concomitant diagnosis and discharge recommendations:
 
   a. \`concomitantCheck\`: Refers to the checkbox element for toggling concomitant diagnosis visibility.
   b. \`informationCheck\`: Refers to the checkbox element for toggling discharge recommendations visibility.
 
4. Print Button Variable
 
This variable represents the print button in the app:
 
   a. \`print\`: Refers to the div element acting as the print button.
 
5. Font Size Adjustment Variables
 
These variables are used for adjusting the font size of the output text:
 
   a. \`forTitle\`: Refers to the primary diagnosis text element in the title section.
   b. \`Clinical\`: Refers to the clinical diagnosis block containing primary and concomitant diagnoses.
   c. \`End\`: Refers to the concluding clinical diagnosis block containing primary and concomitant diagnoses.
   d. \`statistic\`: Refers to the statistics block containing primary and concomitant diagnoses.
 
6. Concomitant Block Variable
 
This variable represents the NodeList of elements with the class \`.concomitantBlock\`:
 
   a. \`concomitantBlock\`: A NodeList of elements that need to be hidden or shown based on the state of the \`concomitantCheck\` checkbox.
 
Understanding these variables is crucial for working with the codebase effectively. Familiarize yourself with their roles within the app and how they interact with each other. This knowledge will enable you to make meaningful contributions to the Diagnosis Writer Web App's development.
`;
