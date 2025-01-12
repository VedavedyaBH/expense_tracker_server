export const RequestBody = {
    type: "", // Type of expense ("Income"/ "Expense")
    operation: "", // Type of action to perform on expense (e.g., "add", "delete")
    description: "", // brief description about the expense/income
    today: "", // The current date when the request is made
    category: "", // The category to which the expense/income belongs (e.g., "food", "travel")
    amount: "", // The amount spent/gained (as a number)
    transaction_date: "", // The date when the given transaction happened. Give the date accordingly (e.g., "yesterday", "Last monday")
};

export const type = ["Expense", "Income"];
export const operation = ["ADD", "DELETE", "UPDATE", "VIEW"];
export const today = new Date().toISOString().substring(0, 10);

export const dateObj = (date: any) => {
    return new Date(date);
};

export const addJSONboilerPlate = {
    description: "",
    amount: 200,
    date: "",
    userId: 2,
    expenseCategoryId: 1,
};

export const expenseCategories = [
    "Food",
    "Rent",
    "Utilities",
    "Transportation",
    "Entertainment",
    "Groceries",
    "Clothing",
    "Healthcare",
    "Education",
    "Personal Care",
    "Insurance",
    "Miscellaneous",
];
