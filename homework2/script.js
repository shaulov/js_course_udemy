"use strict";

let money = +prompt("Ваш бюджет на месяц?", ""),
    time = prompt("Введите дату в формате YYYY-MM-DD", "");

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    incomes: [],
    saving: false,
};

for (let i = 0; i < 2; i++) {
    let expenditures = prompt(
            "Введите обязательную статью расходов в этом месяце",
            ""
        ),
        howItCost = prompt("Во сколько обойдётся?", "");

    if ((typeof (expenditures) === 'string') && (typeof (expenditures) != null) && (typeof (howItCost != null) && (expenditures != '') && (howItCost != '') && (expenditures.length < 50))) {
        appData.expenses[expenditures] = howItCost;
    } else {
        i--;
    }
}

// let i = 0;
// while (i < 2) {
//     let expenditures = prompt(
//             "Введите обязательную статью расходов в этом месяце",
//             ""
//         ),
//         howItCost = prompt("Во сколько обойдётся?", "");

//     if ((typeof (expenditures) === 'string') && (typeof (expenditures) != null) && (typeof (howItCost != null) && (expenditures != '') && (howItCost != '') && (expenditures.length < 50))) {
//         appData.expenses[expenditures] = howItCost;
//         i++;
//     }
// }

// let i = 0;
// do {
//     let expenditures = prompt(
//             "Введите обязательную статью расходов в этом месяце",
//             ""
//         ),
//         howItCost = prompt("Во сколько обойдётся?", "");

//     if ((typeof (expenditures) === 'string') && (typeof (expenditures) != null) && (typeof (howItCost != null) && (expenditures != '') && (howItCost != '') && (expenditures.length < 50))) {
//         appData.expenses[expenditures] = howItCost;
//         i++;
//     }
// } while (i < 2);

appData.moneyPerDay = appData.budget / 30;

alert('Ежедневный бюджет: ' + appData.moneyPerDay);