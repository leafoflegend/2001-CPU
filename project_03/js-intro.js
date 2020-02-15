// - Variables
//     - `let` vs `const`
// Demo let vs const
// reassigning variables
var myVar = 'this is confusing!';

let myLet = 'let something be this';
const myConst = 'let this never change';

let myNum = 0;
myNum = myNum + 1;
console.log(myNum);

myNum = 'Preston';
console.log(myNum);

let myName = 'Preston';
myName = myName + ' Wallace';
console.log(myName);

let newDoubleQuote = "my cat is fun";
console.log(newDoubleQuote);

let myNumString = '8';
let myNum2 = 8;
console.log(myNumString);
console.log(myNum2);

// - Data Types
//     - `string`
//     - `array`
//     - `number`
// String types, adding to strings
// Number types & operators (+, -, *, /)
// Array types
// Reassigning strings to numbers and vice versa
// Defining an array
// Arrays are zero indexed
// Accessing an element of an array

let aNewNum = 7;
console.log(typeof aNewNum);
// console.log(typeof typeof aNewNum);
// aNewNum = '8';
// console.log(typeof aNewNum);

// A few ways to increment
aNewNum = aNewNum + 1;
console.log(aNewNum);
aNewNum += 1;
aNewNum++;
console.log(aNewNum);

aNewNum = aNewNum * 5;
console.log(aNewNum);
aNewNum /= 10;
console.log(aNewNum);
aNewNum--;
console.log(aNewNum);

// Arrays
let newArr = [8, 9, 10, 'Brian', 'Sam', 2];
console.log(newArr);
console.log(newArr[0]);
console.log(newArr[2]);
console.log(newArr[4]);
newArr[6] = 'dog';
console.log(newArr[6]);
console.log(newArr);

console.log(Array.isArray(newArr));

// - Loops
//     - `for` loop
// Looping over an array
// Three different parts of a for...let/const loop
// Accessing an element within an iteration
// What is the index?
// What is the value/element?

const myNums = [1, 2, 3, 4, 5];
for(let i = 0; i < myNums.length ; i++) {
  // console.log(i);
  let myElem = myNums[i];
  myElem += 1;
  console.log(myElem);
}

const myDogs = ['Yoda', 'Buck', 'Fido', 'Barkley', 'Koya'];
for(let i = 0; i < myDogs.length ; i++) {
  // console.log(i);
  let myElem = myDogs[i];
  myElem = myElem + ' says "bark"';
  console.log(myElem);
}

const myCats = [2, 5, 3, 56, 23, 'Yoda', 'Buck', 'Fido', 'Barkley', 'Koya'];
console.log('myCats array length is ', myCats.length)
console.log('the last element of this array is', myCats[myCats.length - 1])
for(let i = 0; i < myCats.length ; i++) {
  let myElem = myCats[i];
  myElem = myElem + ' says "meow"';
  // console.log(myElem);
}

/*

< ---------------------- IF WE HAVE TIME ---------------------- >

*/

// - Conditionals
//     - `if` and `else`

// - Functions
//     - simple `function`

// < ---------------------- jQuery, IF WE HAVE MORE TIME ---------------------- >

// $('h1').css('background-color', 'yellow')
// const paragraphs = $('p');
// $('main').append($('<p>').text('hello in a p tag'))