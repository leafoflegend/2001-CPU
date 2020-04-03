
const str = '10th edition';

const newStr = str.replace(' ', '_');

console.log('>>>>>>>>> str', str);
console.log('>>>>>>>>> newStr', newStr);

const newStr2 = str.split(' ').join('_');
console.log('>>>>>>>>> newStr2', newStr2);

const newArr = str.split(' ');
console.log('>>>>>>>>> newArr', newArr);
const newStr3 = newArr.join('_');
console.log('>>>>>>>>> newStr3', newStr3);

