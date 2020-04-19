'use strict';

let startBtn = document.getElementById('start'),
    budgetValue = document.getElementsByClassName('budget-value')[0],
    dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
    levelValue = document.getElementsByClassName('level-value')[0],
    expensesValue = document.getElementsByClassName('expenses-value')[0],
    optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
    incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],
    expensesItem = document.querySelectorAll('.expenses-item'),
    expensesBtn = document.getElementsByTagName('button')[0],
    optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBudgetBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
    incomeItem = document.querySelector('.choose-income'),
    savingsCheckbox = document.querySelector('#savings'),
    sumItem = document.querySelector('#sum'),
    percentItem = document.querySelector('#percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;

expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBudgetBtn.disabled = true;

startBtn.addEventListener('click', function () {
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");

    while (isNaN(money) || money == '' || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDate();

    expensesBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBudgetBtn.disabled = false;
});

expensesBtn.addEventListener('click', function () {
    let sum = 0;

    for (let i = 0; i < expensesItem.length; i++) {
        let expenditures = expensesItem[i].value,
            howItCost = expensesItem[++i].value;

        if ((typeof (expenditures) === 'string') && (typeof (expenditures) != null) && (typeof (howItCost != null) && (expenditures != '') && (howItCost != '') && (expenditures.length < 50))) {
            appData.expenses[expenditures] = howItCost;
            sum += +howItCost;
        } else {
            i--;
        }
    }
    expensesValue.textContent = sum;
});

optionalExpensesBtn.addEventListener('click', function () {
    for (let i = 0; i < optionalExpensesItem.length; i++) {
        let optExpenditures = optionalExpensesItem[i].value;

        if ((typeof (optExpenditures) === 'string') && (typeof (optExpenditures) != null) && (optExpenditures != '') && (optExpenditures.length < 50)) {
            appData.optionalExpenses[i] = optExpenditures;
            optionalExpensesValue.textContent += optExpenditures + ' ';
        } else {
            continue;
        }
    }
});

countBudgetBtn.addEventListener('click', function () {
    if (appData.budget != undefined) {

        appData.moneyPerDay = ((appData.budget - +expensesValue.innerHTML) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;

        if (appData.moneyPerDay <= 100) {
            levelValue.textContent = 'Низкий уровень достатка';
        } else if (appData.moneyPerDay > 100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = 'Средний уровень достатка';
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = 'Высокий уровень достатка';
        } else {
            levelValue.textContent = 'Произошла ошибка!';
        }
    } else {
        dayBudgetValue.textContent = 'Ошибка';
    }
});

incomeItem.addEventListener('input', function () {
    let items = incomeItem.value;
    appData.incomes = items.split(', ');
    incomeValue.textContent = appData.incomes;
});

savingsCheckbox.addEventListener('click', function () {
    if (appData.saving == true) {
        appData.saving = false;
    } else {
        appData.saving = true;
    }
});

sumItem.addEventListener('input', function () {
    if (appData.saving) {
        let sum = +sumItem.value,
            percent = +percentItem.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

percentItem.addEventListener('input', function () {
    if (appData.saving) {
        let sum = +sumItem.value,
            percent = +percentItem.value;

        appData.monthIncome = sum / 100 / 12 * percent;
        appData.yearIncome = sum / 100 * percent;

        monthSavingsValue.textContent = appData.monthIncome.toFixed(1);
        yearSavingsValue.textContent = appData.yearIncome.toFixed(1);
    }
});

const appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    incomes: [],
    saving: false,
};