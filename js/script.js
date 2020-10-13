'use strict';
const mission = 500000,
      period = 12;
let money = prompt('Ваш месячный доход?'),
    income = 'фриланс' ,
    deposit = confirm('Есть ли у вас депозит в банке? Если есть нажмите - ОК, если нет, то нажмите ОТМЕНА'),
    addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),
    arr = addExpenses.toLowerCase(),
    expenses1 = prompt('Введите обязательную статью расходов?'),
    amount1 = +prompt('Во сколько это обойдется?'),
    expenses2 = prompt('Введите обязательную статью расходов?'),
    amount2 = +prompt('Во сколько это обойдется?');

console.log(arr.split(','));

let showTypeOf = function(data){
  console.log(data, typeof(data));
}
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


const getExpensesMonth = function(){ //Функция возвращает сумму всех обязательных расходов за месяц
  return amount1 + amount2;
}
console.log('Наши расходы: ' + getExpensesMonth());

const getAccumulatedMonth = function(){ //Функция возвращает накопления за месяц
  return money-getExpensesMonth();
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
  }else if(budgetDay >= 0 && budgetDay <= 599){
    return('К сожалению у вас уровень дохода ниже среднего');
  }else {
  return('Что то пошло не так');
  }
};
console.log(getStatusIncome());

const getTargetMonth = function () { //Подсчитывает за какой период будет достигнута цель
  return Math.round(mission/accumulatedMonth)
}
console.log('За ' + getTargetMonth() + ' месяцев');