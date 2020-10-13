function table (data) {
  
  //проверка строки, является ли она строка с помощью операторов typeof и instanceof
  if(typeof data === 'string' || data instanceof  String ){

    //удаляем пробелы в начале и в конце с помощью метода trim()
    let aftertableLength = data.length;
    data = data.trim();
    let befortableLength = data.length;
    console.log("Длина строки до: " + aftertableLength);     
    console.log("Длина строки после: " + befortableLength); 
  }else 
  return('Не строка');

//Если строка более 30 знаков - то после 30го символа часть текста скрывается и вместо них появляются три точки (...)
  if(data.length > 30) {
    data = data.substr(0, 30) + '...';
    console.log(data);
  }  
};
console.log(table('    12343123456789087654321345678987654321      '));

