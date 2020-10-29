'use strict';

let isNumber = function(n){ //проверка входящих prompt
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let start = document.getElementById('start'),
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
    expensesItems= document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
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




let appData = {// создали обьект со всеми переменными
  income: {}, // доп доходы
  incomeMonth: 0,
  addIncome: [], // дополнительные доходы
  expenses: {}, // дополнительные расходы
  addExpenses: [], // возможные расходы
  deposit: false, 
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0, //сумма за месяц
  expensesMonth: 0,

  blockButton: function () { 
    if(salaryAmount !== ""){
      start.removeAttribute('disabled');
    }
  },
  start: function(){//проверка входящих данных
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
  },
  showResult: function (){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', '); //join(', ') разбиваем на строрку
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcPeriod();//первое значение накопления за период

    periodSelect.addEventListener("change", function() {//динамическое изменение накопления за период
      incomePeriodValue.value = appData.calcPeriod();
    });

  },
  addIncomeBlock: function(){//блок плюс,для добавления новых параметров дополнительный доход
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');//повторный поиск всех элементов
    if(incomeItems.length === 3){
      incomePlus.style.display = 'none';
    }
  },
  getIncome: function(){
    incomeItems.forEach(function(item){//перебираем все элементы которые находятся в incomeItems с помошью forEarh
      let itemIncome = item.querySelector('.income-title').value; //внутри item находим input с классом income-title и получаеем его значение
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== '' && isNumber(cashIncome)){
        appData.income[itemIncome] = cashIncome; //Записываем в appData.income itemIncome-ключ, cashIncome-значение
      }
    });
    for (let key in this.income){
      this.incomeMonth += +this.income[key];
    };
  },
  addExpensesBlock: function(){//блок плюс,для добавления новых параметров обязатнльные расходы
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');//повторный поиск всех элементов
    if(expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  },
  getExpenses: function(){
    expensesItems.forEach(function(item){//перебираем все элементы которые находятся в expensesItems с помошью forEarh
      let itemExpenses = item.querySelector('.expenses-title').value; //внутри item находим input с классом expenses-title и получаеем его значение
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== '' && isNumber(cashExpenses)){
        appData.expenses[itemExpenses] = cashExpenses; //Записываем в appData.expenses itemExpenses-ключ, cashIncome-значение
      }
    });
  },
  getAddExpenses: function(){ //возможные расходы
    let addExpenses = additionalExpensesItem.value.split(',');//обьявили переменную, и внесли данные с импута и сделали из нее массив с помощью split 
    addExpenses.forEach(function(item){
      item = item.trim();
      if(item !==''){
        appData.addExpenses.push(item);//добавляем с помощью метода push так как добавляем в массив
      }
    }); 
  },
  getAddIncome: function(){//возможные доходы
    additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if(itemValue !== ''){
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function(){ //Функция возвращает сумму всех обязательных расходов за месяц
    for(let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },
  getBudget: function(){ //Функция возвращает накопления за месяц
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.round(this.budgetMonth/30);
  },
  getTargetMonth: function () { //Подсчитывает за какой период будет достигнута цель
    return  targetAmount.value/this.budgetMonth;
  },
  getStatusIncome: function(){ //проверка уровня дохода
    if(this.budgetDay >= 1200){
      return('У вас высокий уровень дохода');
    }else if(this.budgetDay >= 600 && this.budgetDay <= 1199 ){
      return('У вас средний уровень дохода');
    }else (this.budgetDay >= 0 && this.budgetDay <= 599)
      return('К сожалению у вас уровень дохода ниже среднего');
  },
  getInfoDeposit: function(){
    if(this.deposit){
      do{
        this.percentDeposit = prompt('Какой годовой процент?', '10');
        }while(!isNumber(this.percentDeposit))
      do{
        this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
        }while(!isNumber(this.moneyDeposit))
    }
  },
  calcPeriod: function(){
    return this.budgetMonth * periodSelect.value;
  },

  reset :function(){ //сброс

    let inputData = document.querySelectorAll('input');
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
  },
};

start.disabled = true;//неактивная кнопка при старте
start.addEventListener('click', appData.start.bind(appData)); // вешаем обработчик события на кнопку расчитать
cancel.addEventListener('click', appData.reset.bind(appData)); // вешаем обработчик события на кнопку сбросить

salaryAmount.addEventListener('click', appData.blockButton);

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener("change", function() {
      periodAmount.innerHTML = periodSelect.value;
});

let expensesAmount = appData.getExpensesMonth();
appData.budgetMonth = appData.getBudget(), //присваеваем значени месячного накопления
appData.budgetDay = +parseInt( appData.budgetMonth/30);


for (let i = 0; i < appData.addExpenses.length; i++){// выводим масив с каждым словом с большой буквы,слова разделены запятой и пробелом

  appData.addExpenses[i] = appData.addExpenses[i].trim();
  appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1);
}
