"use strict";

let money = prompt("Ваш бюджет на месяц?", ""),
  time = prompt("Введите дату в формате YYYY-MM-DD", "");

let appData = {
  budget: money,
  timeData: time,
  expenses: {},
  optionalExpenses: {},
  incomes: [],
  saving: false,
};

let expenditures = prompt(
    "Введите обязательную статью расходов в этом месяце",
    ""
  ),
  howItCost = prompt("Во сколько обойдётся?", "");

console.log(appData.expenses[expenditures]);

alert(appData.budget / 30);