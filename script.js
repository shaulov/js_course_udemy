"use strict";

let money = prompt("Ваш бюджет на месяц?", ""),
  time = prompt("Введите дату в формате YYYY-MM-DD", ""),
  expenditures = prompt(
    "Введите обязательную статью расходов в этом месяце",
    ""
  ),
  howItCost = prompt("Во сколько обойдётся?", "");

let appData = {
  budget: money,
  timeData: time,
  expenses: {
    expenditures: expenditures,
    cost: howItCost,
  },
  optionalExpenses: {},
  incomes: [],
  saving: false,
};

alert(appData.budget / 30);
