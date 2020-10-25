'use strict';

// Функция изменяет содержимое t2
function modifyText() {
  var t2 = document.getElementById("t2");
  if (t2.firstChild.nodeValue == "три") {
    t2.firstChild.nodeValue = "два";
  } else {
    t2.firstChild.nodeValue = "три";
  }
}

// Добавляет слушателя событий для таблицы
var el = document.getElementById("outside");
el.addEventListener("click", modifyText, false);