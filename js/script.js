'use strict';

let isNumber = function(n){ //проверка входящих prompt
  return !isNaN(parseFloat(n)) && isFinite(n)
};
let money ,
    start = function(){//проверка входящих данных
      do { //интвертируем с помощью оператора !- отрицание
        money = prompt('Ваш месячный доход?', 50000);
      }while (!isNumber(money))
    };
    start();

let appData = {// создали обьект со всеми переменными
  income: {}, // доп доходы
  addIncome: [], // дополнительные доходы
  expenses: {}, // дополнительные расходы
  addExpenses: [], // возможные расходы
  deposit: false, 
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0, //сумма за месяц
  expensesMonth: 0,
  asking: function(){ // методы для вопросов

    if(confirm('Если у Вас дополнительный источник заработка?')){
      let itemIncome,
      cashIncome=0;
      do{
        itemIncome = prompt('Какой у Вас дополнительный зарабаток?', 'Таксую');
      }while(isNumber(itemIncome))

      do{
        cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?',  10000);
      }while(!isNumber(cashIncome))
    }
    let addExpenses;
        do{
          addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
        }while(isNumber(addExpenses) || !addExpenses.length);//проверка на число и на пустую строку
        appData.addExpenses = addExpenses.toLowerCase().split(',');

        appData.deposit = confirm('Есть ли у вас депозит в банке? Если есть нажмите - ОК, если нет, то нажмите ОТМЕНА');

        for(let i = 0; i < 2; i ++){
          let b = 0;
          let a;

          do{
            a = +prompt('Введите обязательную статью расходов?');
          }while(isNumber(a) || a === 0 )

          do{
            b = +prompt('Во сколько это обойдется?');
          }while(!isNumber(b) || b === 0 )
          appData.expenses[a] = b;
        };
        return appData.expenses;
  },
  
  getExpensesMonth: function(){ //Функция возвращает сумму всех обязательных расходов за месяц
    for(let key in appData.expenses) {
      appData.expensesMonth += appData.expenses[key];
    }
    return appData.expensesMonth;
  },

  getBudget: function(){ //Функция возвращает накопления за месяц
    return appData.budget-expensesAmount;
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

  getInfoDeposit: function(){
    if(appData.deposit){
      do{
          appData.percentDeposit = prompt('Какой годовой процент?', '10');
        }while(!isNumber(appData.percentDeposit))

      do{
          appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        }while(!isNumber(appData.moneyDeposit))
    }
  },

  calcSavedMoney: function(){
    return appData.budgetMonth * appData.period;
  },
};

appData.asking();
appData.getInfoDeposit();
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


  for (let i=0; i<appData.addExpenses.length; i++){// выводим масив с каждым словом с большой буквы,слова разделены запятой и пробелом

    appData.addExpenses[i] = appData.addExpenses[i].trim();
    appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1);
  }
  console.log(appData.addExpenses);
