"use strict";

let money, time;

function start() {
    money = +prompt("Ваш бюджет на месяц?", "");
    time = prompt("Введите дату в формате YYYY-MM-DD", "");

    while (isNaN(money) || money == '' || money == null) {
        money = +prompt("Ваш бюджет на месяц?", "");
    }
}

start();

let appData = {
    budget: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    incomes: [],
    saving: true,
    chooseExpenses: function () {
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
    },
    detectDayBudget: function () {
        appData.moneyPerDay = (appData.budget / 30).toFixed();

        alert('Ежедневный бюджет: ' + appData.moneyPerDay);
    },
    checkSaving: function () {
        if (appData.saving) {
            let save = +prompt('Сумма Ваших накоплений?'),
                percent = +prompt('Под какой процент?');

            appData.monthIncome = save / 100 / 12 * percent;
            alert('Доход в месяц: ' + appData.monthIncome);
        }
    },
    detectLevel: function () {
        if (appData.moneyPerDay < 200) {
            console.log('Low Level');
        } else if (appData.moneyPerDay > 200 && appData.moneyPerDay < 2000) {
            console.log('Middle Child');
        } else if (appData.moneyPerDay > 2000) {
            console.log('High Life');
        } else {
            console.log('unexpectable error');
        }
    },
    chooseOptExpenses: function () {
        for (let i = 1; i < 4; i++) {
            let optExpenditures = prompt(
                "Введите необязательную статью расходов в этом месяце",
                ""
            );

            if ((typeof (optExpenditures) === 'string') && (typeof (optExpenditures) != null) && (optExpenditures != '') && (optExpenditures.length < 50)) {
                appData.optionalExpenses[i] = optExpenditures;
            } else {
                continue;
            }
        }
    },
    chooseIncome: function () {
        let items = prompt('Что принесёт дополнительный доход? (перечислите через запятую)', '');
        while (!(isNaN(items)) || items == '' || items == null) {
            items = prompt('Что принесёт дополнительный доход? (перечислите через запятую)', '');
        }
        appData.incomes = items.split(', ');

        let additionalItem = prompt('Ничего не забыли?', '');
        while (!(isNaN(additionalItem)) || additionalItem == '' || additionalItem == null) {
            additionalItem = prompt('Ничего не забыли?', '');
        }
        appData.incomes.push(additionalItem);

        appData.incomes.sort();

        let waysIncomes = 'Способы доп. заработка: ';
        appData.incomes.forEach(function (item, i) {
            waysIncomes += (i + 1) + ') ' + item + ' ';
        });

        alert(waysIncomes);
    }
};

console.log('Our program include: ');
for (let item in appData) {
    console.log(item);
}