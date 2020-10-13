function table (data) {
  //проверка строки, является ли она строка с помощью операторов typeof и instanceof
  if(typeof data === 'string' || data instanceof  String){
    //удаляем пробелы в начале и в конце с помощью метода trim()
    let aftertableLength = data.length;
    data = data.trim();
    let befortableLength = data.length;
    console.log("Длина строки до: " + aftertableLength);     
    console.log("Длина строки после: " + befortableLength);  
  }else 
  return('Не строка');
};
console.log(table(' 243   '));

