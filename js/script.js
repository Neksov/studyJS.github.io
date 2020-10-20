'use strict';

let isNumber = function(n){ //проверка входящих prompt
  return !isNaN(parseFloat(n)) && isFinite(n)
};
let money ,
    start = function(){//проверка входящих данных
      do { //интвертируем с помощью оператора !- отрицание
        money = prompt('Ваш месячный доход?');
      }while (!isNumber(money))
    };
    start();

let appData = {// создали обьект со всеми переменными
  income: {}, // доп доходы
  addIncome: [], // дополнительные доходы
  expenses: {}, // дополнительные расходы
  addExpenses: [], // возможные расходы
  deposit: false, 
  mission: 50000,
  period: 12,
  asking: function(){ // методы для вопросов
    let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке? Если есть нажмите - ОК, если нет, то нажмите ОТМЕНА');

        for(let i = 0; i < 2; i ++){
          let b = 0,
                a = prompt('Введите обязательную статью расходов?');
          do{
            b = +prompt('Во сколько это обойдется?');
          }while(!isNumber(b) || b === 0 )
          appData.expenses[a] = b;
        };
        return appData.expenses;
  },
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  
  getExpensesMonth: function(){ //Функция возвращает сумму всех обязательных расходов за месяц
    for(let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
    return appData.expensesMonth;
  },

  getBudget: function(){ //Функция возвращает накопления за месяц
    return money-expensesAmount;
  },

  getTargetMonth: function () { //Подсчитывает за какой период будет достигнута цель
    let a = Math.round(appData.mission/appData.budgetMonth);
    if(a < 0){
      console.log('Цель не будет достигнута');
    }else
      console.log('Цель будет достигнута за ' + a + ' месяцев');
    return(a)
  },

  getStatusIncome: function(){ //проверка уровня дохода
    if(appData.budgetDay >= 1200){
      return('У вас высокий уровень дохода');
    }else if(appData.budgetDay >= 600 && appData.budgetDay <= 1199 ){
      return('У вас средний уровень дохода');
    }else (appData.budgetDay >= 0 && appData.budgetDay <= 599)
      return('К сожалению у вас уровень дохода ниже среднего');
  },
};

appData.asking();
let expensesAmount = appData.getExpensesMonth();

console.log('Наши расходы: ' + expensesAmount);

appData.budgetMonth = appData.getBudget(), //присваеваем значени месячного накопления
appData.budgetDay = +parseInt( appData.budgetMonth/30);

appData.getTargetMonth();
console.log(appData.getStatusIncome());

console.log('Наша программа включает в себя данные:');
for(let key in appData) {
  console.log('Свойства: ' + key + ' Значения: ' + appData[key]);
};