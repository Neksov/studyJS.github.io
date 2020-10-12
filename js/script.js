const money = prompt('Ваш месячный доход?');
console.log(typeof money)

let income = 'фриланс' ;
console.log(typeof income);

let deposit = confirm('Есть ли у вас депозит в банке? Если есть нажмите - ОК, если нет, то нажмите ОТМЕНА');
console.log(typeof deposit);

let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log('addExpenses содержит: ' + addExpenses.length + ' символов.');
let arr = addExpenses.toLowerCase();
console.log(arr.split(','));

let expenses1 = prompt('Введите обязательную статью расходов?');
let expenses2 = prompt('Введите обязательную статью расходов?');

let amount1 = +prompt('Во сколько это обойдется?');
let amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money-(amount1 + amount2);
console.log('Бюджет на месяц ' + budgetMonth);

const mission = 500000;
console.log('Цель заработать ' +  mission + ' рублей.');

let month = mission/budgetMonth;
console.log('Цель будет достигнута за ' +  Math.round(month) + ' месяцев.');

const period = 12;
console.log('Период равен ' +  period + ' месяцам.' );

let budgetDay = +parseInt( budgetMonth/30);
console.log ('Наш дневной бюджет: '+ budgetDay + ' рублей.' );

if(budgetDay >= 1200){
  console.log('У вас высокий уровень дохода');
}else if(budgetDay >= 600 && budgetDay <= 1200 ){
  console.log('У вас средний уровень дохода');
}else if(budgetDay >= 0 && budgetDay <= 600){
  console.log('К сожалению у вас уровень дохода ниже среднего');
}else {
console.log('Что то пошло не так');
}
