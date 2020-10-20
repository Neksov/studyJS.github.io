'use strict';

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];// массив 
const day = document.getElementById('fordays'); // Получаем div куда будем вставлять дни недели
const today = new Date(); // создаем обьект

const days = function(){
  week.forEach(function(item, i, week){ //перебираем массив 
    let newdiv = document.createElement('div'); //создаем переменную и туда помешаем новый элемент с заданным тегом для каждого дня недели
    if(i === today.getDay()-1){//проверка дня недели, -1 для массива так как он начинается с 0. getDay()-метод для определения дня недели
      // console.log(today.getDay());
      newdiv.classList.add('today'); //делаем текущий день жирным исходя из свойства, добавляя класс.
    }

    if(item == 'Суббота' || item == 'Воскресенье'){
      newdiv.classList.add('italic'); //делаем текущий день курсивом исходя из свойства, добавляя класс.
      newdiv.textContent = week[i]; //вставляем текст
    }else{
      newdiv.textContent = week[i]; //вставляем текст
    }
    day.appendChild(newdiv);// вставляем в наш div обновленные div
  });
};

days();