console.log('1) Создать массив arr = []');
let arr = ['2345', '1234', '4321', '27432', '35483', '244309435', '480398'];
for(let i=0; i<arr.length-1; i++){
  let num = String(arr[i]);
  let firstNum = num[0];
  if(firstNum == 2 || firstNum == 4){
    console.log(arr[i]);
  }
}
console.log('');
console.log('2) Вывести в столбик все простые числа от 1 до 100 (сделать при помощи цикла)');
let n = 100;
for (let i = 2; i <= n; i++) {
    let flag = 1;
    if (i > 2 && i % 2 != 0)
    {
        for (let j = 3; j*j <= i ; j=j+2)
        {
            if (i%j==0)
            {
                flag=0;
                break;
            }
        }
    }
    else if (i != 2) flag = 0;
    if (flag==1) {
      console.log('Делители числа ' + i + ' являются: ' + '1' + ' и ' + i);
    }
}
