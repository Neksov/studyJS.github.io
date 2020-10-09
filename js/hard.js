function multiplication(num) {
  let numString = num.toString(); //записываем значения переменной в строку
  let sum = 1;
  for (var i = 0; i < numString.length; i++) { //проходим по циклу пока не закончятся значения, перемножая каждый их по индексу между ссобой 
    sum = sum * numString[i]; 
  }
  console.log('Результат числа которое ввели : ' + sum);

  var power = sum ** 3;// возводим полученное значение в степень 3
  console.log ('Полученное число возведенное в степень: ' + power);

  var str = power.toString();
  console.log('Покажем только первые 3 цифры нашего числа: ' + str.slice(0,2));
};
multiplication(266219);



