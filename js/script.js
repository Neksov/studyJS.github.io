'use strict';

let isNumber = function(n){ //проверка входящих prompt
  return !isNaN(parseFloat(n)) && isFinite(n)
};

const mission = 500000,
      period = 12;
let money ,
    income = 'фриланс' ,
    deposit = confirm('Есть ли у вас депозит в банке? Если есть нажмите - ОК, если нет, то нажмите ОТМЕНА'),
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    expenses = [];

let start = function(){//проверка входящих данных

  do { //интвертируем с помощью оператора !- отрицание
    money = prompt('Ваш месячный доход?');
  }while (!isNumber(money))

};
start();

console.log(addExpenses.toLowerCase().split(','));

let showTypeOf = function(data){
  console.log(data, typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


const getExpensesMonth = function(){ //Функция возвращает сумму всех обязательных расходов за месяц

  let all = 0,
      sum = 0;

  for(let i = 0; i < 2; i ++){

    expenses[i] = prompt('Введите обязательную статью расходов?');

    do {
      sum = +prompt('Во сколько это обойдется?');
    }while(!isNumber(sum) || sum === 0 )
    all += sum;
  }
  return all;
}

let expensesAmount = getExpensesMonth();

console.log('Наши расходы: ' + expensesAmount);

const getAccumulatedMonth = function(){ //Функция возвращает накопления за месяц
  return money-expensesAmount;
}
console.log('Накопления за месяц: ' + getAccumulatedMonth());

let accumulatedMonth = getAccumulatedMonth(), //присваеваем значени месячного накопления
    budgetDay = +parseInt( accumulatedMonth/30);

console.log ('Наш дневной бюджет: '+ budgetDay + ' рублей.' );

let getStatusIncome = function(){ //проверка уровня дохода
  if(budgetDay >= 1200){
    return('У вас высокий уровень дохода');
  }else if(budgetDay >= 600 && budgetDay <= 1199 ){
    return('У вас средний уровень дохода');
  }else (budgetDay >= 0 && budgetDay <= 599)
    return('К сожалению у вас уровень дохода ниже среднего');
  
};
console.log(getStatusIncome());

const getTargetMonth = function () { //Подсчитывает за какой период будет достигнута цель
  let a = Math.round(mission/accumulatedMonth);
  if(a < 0){
    console.log('Цель не будет достигнута');
  }else
    console.log('Цель будет достигнута за ' + a + ' месяцев');
  return(a)
}
getTargetMonth();