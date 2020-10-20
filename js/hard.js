console.log('1) Создать массив arr = []');
let arr = ['2345', '1234', '4321', '27432', '35483', '244309435', '480398', ];
for(let i=0; i<arr.length; i++){
  let num = String(arr[i]);
  let firstNum = num[0];
  if(firstNum == 2 || firstNum == 4){
    console.log(arr[i]);
  }
}
console.log('');
console.log('2) Вывести в столбик все простые числа от 1 до 100 (сделать при помощи цикла)');

let n = 100;

nextPrime:
for (let i = 2; i <= n; i++) { // перебиаем  n

  for (let j = 2; j < i; j++) { // проверить, делится ли число..
    if (i % j == 0) continue nextPrime; // не подходит, берём следующее
  }

  console.log('Делители числа ' + i + ' являются: ' + '1' + ' и ' + i);// простое число
}
