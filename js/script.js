const money = 100000;
let income = 'фриланс' ;
let deposit = true;
let addExpenses = 'Продукты, ОДЕЖДА, Спортзал, ВЫХОДНЫЕ';
const mission = 500000;
const period = 12;
let budgetDay = money/30;


console.log('Тип данных параметра money: ' + typeof money);
console.log('Тип данных параметра income: ' + typeof income);
console.log('Тип данных параметра deposit: ' + typeof deposit);

console.log('addExpenses содержит: ' + addExpenses.length + ' символов.');

console.log('Период равен ' +  period + ' месяцам.' );
console.log('Цель заработать ' +  mission + ' рублей.');

let arr = 'То на что уходят наши деньги: ' +  addExpenses.toLowerCase();
console.log(arr);
console.log(arr.split(','));
console.log ('Наш дневной бюджет: '+ budgetDay + ' рублей.' );