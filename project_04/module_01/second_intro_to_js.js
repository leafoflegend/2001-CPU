// What are programming languages?
console.log('BEGIN');

// All programming languages are comprised of the same 3 key functionalities:
// 1. Storage - variables
// 2. Control Flow - for loops - iteration/recursion
// 3. Logic Gates - if/thens/else - the ability to make decisions based on values

// Variables

// holds something
// assigned a value
// let and const

// Address. 300 Main St.
// Variables are really just a place. They always reference something that stays constant, but the thing at that place changes all the time, or sometimes, not at all.
// Not at all: Mt. Everest
// Your house address

let myLetVar = 5; // can be changed
const myConstVar = 5; // Error!!!

// declaration declarationName assignmentOperator Value
// let/const cool = ???

// What are values?

// Values are types of data
// string | number | array

// String
// Text inside of quotes
// Something inside of quotes?
// Unicode!!!
// ASCII!!!
// Unicode is international - it contains every languages characters
// It defaults to having all characters properly sorted
// it has emojis

// 01

// 4 - 100

// We use quotes. Quotes are our way to tell a computer to look up a binary encoding for a character.

// Number

// Numbers are really just numbers.

// Array

// We rarely if ever deal with values in isolation... we almost always only care about numbers in groups.

// Arrays can be groups of any types. Even mixes of types!

const anArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const otherArray = ['a', 1, 'b', 2, 'c'];
const deepArray = [[1, 2], ['a', 'b']];

// Boolean

// True / False

const aTruth = true;
const aFalsehood = false;

// Conditional

if (anArray.length >= 10) {
  for (let i = 0; i < anArray.length; ++i) {
    // console.log(anArray[i]);
  }
}

// Functions

// You wanted to add two numbers together.
// const numOne = 5;
// const numTwo = 6;
// const addedNum = numOne + numTwo;
// console.log(addedNum);

function addTwoNumbers(numOne, numTwo) {
  return numOne + numTwo;
}

const returnedValue = addTwoNumbers(5, 6);
console.log(returnedValue);

console.log('END');
