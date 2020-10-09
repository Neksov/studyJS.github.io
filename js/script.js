const money = 100000;
let income = 'фриланс' ;
let addExpenses = 'Продукты, ОДЕЖДА, Спортзал, ВЫХОДНЫЕ';
let deposit = true;
const mission = 500000;
const period = 12;
let budgetDay =money/30;


console.log('Тип данных параметра money: ' + typeof money);
console.log('Тип данных параметра income: ' + typeof income);
console.log('Тип данных параметра deposit: ' + typeof deposit);
console.log('addExpenses содержит: ' + addExpenses.length + ' символов');
console.log('То на что уходят наши деньги: ' +  addExpenses.toLowerCase());
console.log(addExpenses.split(','));
console.log ('Наш дневной бюджет: '+ budgetDay + ' рублей' );