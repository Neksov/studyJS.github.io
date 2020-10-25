'use strict';

let isNumber = function(n){ //проверка входящих prompt
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let start = document.getElementById('start'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('.budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('.budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('.expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('.additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('.additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('.income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('.target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems= document.querySelectorAll('.expenses-items'),
    incomeItems = document.querySelectorAll('.income-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
    depositAmount = document.querySelector('.deposit-amount'),
    depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select');

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
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0, //сумма за месяц
  expensesMonth: 0,
  start: function(){//проверка входящих данных

    if(salaryAmount.value === ''){ //проверка на пустую строку
      alert('Ошибка, полу "Месячный доход" должен быть заполнен');
      return;
    }
    appData.budget= salaryAmount.value;//присваиваем свойство импута

    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getBudget();
    // appData.showResult();
  },
  // showResult: function (){
  //   budgetMonthValue.value = appData.budgetMonth;
  //   budgetDayValue.value = appData.budgetDay;
  //   expensesMonthValue.value = appData.expensesMonth;
  // },
  addIncomeBlock: function(){//блок плюс,для добавления новых параметров обязатнльные расходы
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
      if(itemIncome !== '' && cashIncome !== ''){
        appData.income[itemIncome] = cashIncome; //Записываем в appData.income itemIncome-ключ, cashIncome-значение
      }
    });
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
      if(itemExpenses !== '' && cashExpenses !== ''){
        appData.expenses[itemExpenses] = cashExpenses; //Записываем в appData.expenses itemExpenses-ключ, cashIncome-значение
      }
    });
  },


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

  // getTargetMonth: function () { //Подсчитывает за какой период будет достигнута цель
  //   let a = Math.round(appData.mission/appData.budgetMonth);
  //   if(a < 0){
  //     console.log('Цель не будет достигнута');
  //   }else
  //     console.log('Цель будет достигнута за ' + a + ' месяцев');
  //   return(a)
  // },

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

start.addEventListener('click', appData.start);// вешаем обработчик события на кнопку расчитать 
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);

// appData.getInfoDeposit();

let expensesAmount = appData.getExpensesMonth();
appData.budgetMonth = appData.getBudget(), //присваеваем значени месячного накопления
appData.budgetDay = +parseInt( appData.budgetMonth/30);

// appData.getTargetMonth();

// console.log('Наша программа включает в себя данные:');
// for(let key in appData) {
//   console.log('Свойства: ' + key + ' Значения: ' + appData[key]);
// };

for (let i = 0; i < appData.addExpenses.length; i++){// выводим масив с каждым словом с большой буквы,слова разделены запятой и пробелом

  appData.addExpenses[i] = appData.addExpenses[i].trim();
  appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1);
}
