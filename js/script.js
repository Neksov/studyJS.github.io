'use strict';

let isNumber = function(n){ //проверка входящих prompt
  return !isNaN(parseFloat(n)) && isFinite(n)
};

const start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    expensesTitle = document.querySelector('.expenses-title'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    additionalExpensesItem = document.querySelector(".additional_expenses-item"),
    incomeItem = document.querySelectorAll('.income-items'),
    input = document.getElementsByTagName('input'),
    checkBox = document.querySelector('#deposit-checkmark');

let expensesItems= document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items');


class AppData {
  constructor(){
    this.income = {}; // доп доходы
    this.incomeMonth = 0;
    this.addIncome = []; // дополнительные доходы
    this.expenses = {}; // дополнительные расходы
    this.addExpenses = []; // возможные расходы
    this.deposit = false; 
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0; //сумма за месяц
    this.expensesMonth = 0;
  }
blockButton() { 
  if(salaryAmount !== ""){
    start.removeAttribute('disabled');
  }
};
start(){//проверка входящих данных
  if(salaryAmount === ''){
    start.setAttribute('disabled', 'true');
    return;
  }
  let allInput = document.querySelectorAll('.data input[type=text]');//блокиуем
  allInput.forEach(function (item) {  
    item.setAttribute('disabled', 'disabled');
  });

  let check = document.querySelectorAll('.data input[type=checkbox]'); //блокиуем
  check.forEach(function (item) {  
    item.setAttribute('disabled', 'disabled');
  });

  let range = document.querySelectorAll('.data input[type=range]');//блокиуем
  range.forEach(function (item) {  
    item.setAttribute('disabled', 'disabled');
  });

  incomePlus.setAttribute('disabled', 'disabled');
  expensesPlus.setAttribute('disabled', 'disabled');
  start.style.display = 'none';
  cancel.style.display = 'block';

  this.budget = +salaryAmount.value;
  this.getExpenses();
  this.getIncome();
  this.getExpensesMonth();
  this.getBudget();
  this.getAddExpenses();
  this.getAddIncome();
  this.showResult();
  this.getInfoDeposit();
  this.getStatusIncome();
};
showResult(){
  const  _this = this;//заведомо ложный this
  budgetMonthValue.value = this.budgetMonth;
  budgetDayValue.value = this.budgetDay;
  expensesMonthValue.value = this.expensesMonth;
  additionalExpensesValue.value = this.addExpenses.join(', '); //join(', ') разбиваем на строрку
  additionalIncomeValue.value = this.addIncome.join(', ');
  targetMonthValue.value = Math.ceil(this.getTargetMonth());
  incomePeriodValue.value = this.calcPeriod();//первое значение накопления за период

  periodSelect.addEventListener("change", function() {//динамическое изменение накопления за период
    incomePeriodValue.value = _this.calcPeriod();
  });
};
addIncomeBlock(){//блок плюс,для добавления новых параметров дополнительный доход
  const cloneIncomeItems = incomeItems[0].cloneNode(true);
  incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
  incomeItems = document.querySelectorAll('.income-items');//повторный поиск всех элементов
  if(incomeItems.length === 3){
    incomePlus.style.display = 'none';
  }
};
getIncome(){
  const  _this = this;//заведомо ложный this
  incomeItems.forEach(function(item){//перебираем все элементы которые находятся в incomeItems с помошью forEarh
    const itemIncome = item.querySelector('.income-title').value; //внутри item находим input с классом income-title и получаеем его значение
    const cashIncome = item.querySelector('.income-amount').value;
    if(itemIncome !== '' && cashIncome !== '' && isNumber(cashIncome)){
      _this.income[itemIncome] = cashIncome; //Записываем в appData.income itemIncome-ключ, cashIncome-значение
    }
  });
  for (let key in this.income){
    this.incomeMonth += +this.income[key];
  };
};
addExpensesBlock(){//блок плюс,для добавления новых параметров обязатнльные расходы
  const cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');//повторный поиск всех элементов
  if(expensesItems.length === 3){
    expensesPlus.style.display = 'none';
  }
};
getExpenses(){
  const  _this = this;//заведомо ложный this
  expensesItems.forEach(function(item){//перебираем все элементы которые находятся в expensesItems с помошью forEarh
    const itemExpenses = item.querySelector('.expenses-title').value; //внутри item находим input с классом expenses-title и получаеем его значение
    const cashExpenses = item.querySelector('.expenses-amount').value;
    if(itemExpenses !== '' && cashExpenses !== '' && isNumber(cashExpenses)){
      _this.expenses[itemExpenses] = cashExpenses; //Записываем в appData.expenses itemExpenses-ключ, cashIncome-значение
    }
  });
};
getAddExpenses(){ //возможные расходы
  const  _this = this;//заведомо ложный this
  const addExpenses = additionalExpensesItem.value.split(',');//обьявили переменную, и внесли данные с импута и сделали из нее массив с помощью split 
  addExpenses.forEach(function(item){
    item = item.trim();
    if(item !==''){
      _this.addExpenses.push(item);//добавляем с помощью метода push так как добавляем в массив
    }
  }); 
};
getAddIncome(){//возможные доходы
  const  _this = this;//заведомо ложный this
  additionalIncomeItem.forEach(function(item){
    const itemValue = item.value.trim();
    if(itemValue !== ''){
      _this.addIncome.push(itemValue);
    }
  });
};
getExpensesMonth(){ //Функция возвращает сумму всех обязательных расходов за месяц
  for(let key in this.expenses) {
    this.expensesMonth += +this.expenses[key];
  }
};
getBudget(){ //Функция возвращает накопления за месяц
  this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
  this.budgetDay = Math.round(this.budgetMonth/30);
};
getTargetMonth() { //Подсчитывает за какой период будет достигнута цель
  return  targetAmount.value/this.budgetMonth;
};
getStatusIncome(){ //проверка уровня дохода
  if(this.budgetDay >= 1200){
    return('У вас высокий уровень дохода');
  }else if(this.budgetDay >= 600 && this.budgetDay <= 1199 ){
    return('У вас средний уровень дохода');
  }else (this.budgetDay >= 0 && this.budgetDay <= 599)
    return('К сожалению у вас уровень дохода ниже среднего');
};
getInfoDeposit(){
  if(this.deposit){
    do{
      this.percentDeposit = prompt('Какой годовой процент?', '10');
      }while(!isNumber(this.percentDeposit))
    do{
      this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      }while(!isNumber(this.moneyDeposit))
  }
};
calcPeriod(){
  return this.budgetMonth * periodSelect.value;
};
reset(){ //сброс
  const inputData = document.querySelectorAll('input');
    inputData.forEach(function(elem){
      elem.value = '';
      elem.removeAttribute('disabled');
      periodSelect.value = '0';
      periodAmount.innerHTML = periodSelect.value;  
    });
    incomePlus.removeAttribute('disabled', 'disabled');
    expensesPlus.removeAttribute('disabled', 'disabled'); 

    for(let i = 1;i < incomeItems.length; i++){
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      incomePlus.style.display = 'block';
    }
    for(let i = 1;i < expensesItems.length; i++){
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      expensesPlus.style.display = 'block';
    }

    this.income = {}; // доп доходы
    this.incomeMonth = 0;
    this.addIncome = []; // дополнительные доходы
    this.expenses = {}; // дополнительные расходы
    this.addExpenses = []; // возможные расходы
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0; //сумма за месяц
    this.expensesMonth = 0;    

    start.style.display = 'block';
    cancel.style.display = 'none';
};
eventListener(){
  start.disabled = true;//неактивная кнопка при старте
  start.addEventListener('click', this.start.bind(this)); // вешаем обработчик события на кнопку расчитать
  cancel.addEventListener('click', this.reset.bind(this)); // вешаем обработчик события на кнопку сбросить
  
  salaryAmount.addEventListener('click', this.blockButton);
  
  expensesPlus.addEventListener('click', this.addExpensesBlock);
  incomePlus.addEventListener('click', this.addIncomeBlock);
  
  periodSelect.addEventListener("change", function() {
        periodAmount.innerHTML = periodSelect.value;
  });
  
  const expensesAmount = this.getExpensesMonth();
  this.budgetMonth = this.getBudget(), //присваеваем значени месячного накопления
  this.budgetDay = +parseInt( this.budgetMonth/30);
  
  for (let i = 0; i < this.addExpenses.length; i++){// выводим масив с каждым словом с большой буквы,слова разделены запятой и пробелом
    this.addExpenses[i] = this.addExpenses[i].trim();
    this.addExpenses[i] = this.addExpenses[i][0].toUpperCase() + this.addExpenses[i].slice(1);
  }
};
};
const appData = new AppData();//создание appData из функци конструктора
appData.eventListener();

