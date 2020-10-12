let ru = [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ];
let en = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
let arr = [];
let lang = prompt('Выберите язык указав в поле ввода формат [ru] - русский, [en] - английский');

if(lang === 'ru'){
  console.log(ru);
}else if(lang === 'en'){
  console.log(en);
}else
console.log('Что то пошло не так');

switch(lang){
  case 'ru':
    console.log(ru);
    break;
  case 'en':
    console.log(en);
    break;
  default:
    console.log('Что то пошло не так');
}

arr['ru'] = ru;
arr['en'] = en;
console.log(arr[lang]);

let namePerson = prompt("Введите в поле ввода имя Артем или Максим");
let result = (namePerson =='Артем')? 'директор' : (namePerson =='Максим')? 'преподаватель': (namePerson ==' ')? ' ': 'студент';
console.log(result);