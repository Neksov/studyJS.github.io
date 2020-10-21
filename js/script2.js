'use strict';

const title = document.querySelector('.title');

title.setAttribute('style', 'color: orange');
title.setAttribute('title', 'Новый title');

// title.className = 'headOne';
// console.log(title.className);
title.classList.add('headOne');

console.log(title.classList);

// title.classList.remove('salary-title');

// console.log(title.classList);
console.log(title.classList.contains('headOne'));
