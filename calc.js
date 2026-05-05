const display = document.getElementById("calcDisplay");
const calcButtons = document.querySelectorAll(".calc-btn");

let expression = "";

function renderDisplay(value) {
    display.textContent = value || "0";
}

function appendValue(value) {
    if (expression === "0" && value !== ".") {
        expression = value;
    } else {
        expression += value;
    }
    renderDisplay(expression);
}

function clearAll() {
    expression = "";
    renderDisplay("0");
}

function backspace() {
    expression = expression.slice(0, -1);
    renderDisplay(expression);
}

function calculate() {
    if (!expression.trim()) return;

    try {
        let safeExpr = expression
            .replace(/×/g, "*")
            .replace(/÷/g, "/")
            .replace(/%/g, "/100");

        let result = Function(`"use strict"; return (${safeExpr})`)();

        if (result === Infinity || result === -Infinity || Number.isNaN(result)) {
            throw new Error("Bad result");
        }

        expression = String(Number.isInteger(result) ? result : +result.toFixed(8));
        renderDisplay(expression);
    } catch {
        renderDisplay("Error");
        expression = "";
    }
}

calcButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const action = btn.dataset.action;
        const value = btn.dataset.value;

        if (action === "clear") return clearAll();
        if (action === "back") return backspace();
        if (action === "equals") return calculate();
        if (value) return appendValue(value);
    });
});

document.addEventListener("keydown", (e) => {
    if (/[\d+\-*/.%]/.test(e.key)) {
        appendValue(e.key);
    } else if (e.key === "Backspace") {
        backspace();
    } else if (e.key === "Enter") {
        calculate();
    } else if (e.key === "Escape") {
        clearAll();
    }
});

renderDisplay("0");


// EXPENSES
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const addExpenseBtn = document.getElementById("addExpenseBtn");
const expenseList = document.getElementById("expenseList");
const totalExpense = document.getElementById("totalExpense");

let expenses = JSON.parse(localStorage.getItem("calcExpenses")) || [];

function renderExpenses() {
    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach((item, index) => {
        total += Number(item.amount);

        const row = document.createElement("div");
        row.className = "expense-item";

        row.innerHTML = `
            <div>
                <b>${item.name}</b>
                <div class="expense-sub">${item.amount} ₸</div>
            </div>

            <button class="expense-del" data-index="${index}">✕</button>
        `;

        expenseList.appendChild(row);
    });

    totalExpense.textContent = `${total} ₸`;
    localStorage.setItem("calcExpenses", JSON.stringify(expenses));

    expenseList.querySelectorAll(".expense-del").forEach(btn => {
        btn.addEventListener("click", () => {
            const i = Number(btn.dataset.index);
            expenses.splice(i, 1);
            renderExpenses();
        });
    });
}

function addExpense() {
    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);

    if (!name || !amount || amount <= 0) return;

    expenses.unshift({ name, amount });

    expenseName.value = "";
    expenseAmount.value = "";

    renderExpenses();
}

addExpenseBtn.addEventListener("click", addExpense);

expenseAmount.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addExpense();
});

expenseName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") addExpense();
});

renderExpenses();