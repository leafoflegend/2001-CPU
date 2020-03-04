console.log('------------');

// Complex Types - Objects

// Arrays
// Primitives will always be the bottom most element in arrays that do anything!
// const someArr = [1, '2', 3, [1, 2]];

// Functions
// Objects - POJO: "Plain old javascript object"
// Variables? - not a type! Just a place!


// Primitives

// Strings
// Numbers
// Booleans
// Symbol
// null
// undefined

// typeof - Type of is a way to check the type of a value.

// Functions are just objects
// console.log(typeof {});
// console.log(typeof []);

// Both are objects!

// What are the purpose of objects?

// They piece together enough primitives to create a more complex idea.

// const nums = [1, 2];

const nums = [];

for (let i = 0; i < 100; ++i) {
  nums.push(i);
}

function searchArray(arr, search) {
  for (let i = 0; i < arr.length; ++i) {
    console.log('Searching!');
    if (arr[i] === search) {
      return true;
    }
  }

  return false;
}

// console.log(searchArray(nums, 115));

// Do you think FB searches through every single user when you try to log in, looking for you?

// Objects

// Why objects?
// Objects allow us to quickly retrieve and store KEYED data.

const numObj = {};

for (let i = 0; i < 100; ++i) {
  numObj[i] = i;
}

function searchObj(obj, search) {
  console.log('Searching!');
  return numObj[search] !== undefined;
}

// console.log(searchObj(numObj, 115));

// const $ = {
//   click: function(callback) {
//     callback();
//   },
// };
//
// $.click(function() {
//   console.log('Hello world!');
// });

const anArray = [2, 4, 6, 8, 10];

// anArray.forEach(function (elem) {
//   console.log(elem);
// });

const name = 'Yahya';
const tempSum = "Hello " + name + "!";
const tempLit = `Hello ${name}!`;

// console.log(tempLit);

const levels = {
  currentLevel: 1,
};

const listItems = $('li');
// Destructuring/Spreading
// const arrOfListItems = [ ...listItems ];

// const arrOfListItems = Array.prototype.slice.call(listItems);

// Each jQuery hack for forEach - really cool
// $('#the-button').click(function() {
//   ++levels.currentLevel;
//   listItems.each(function() {
//     const currentText = $(this).text();
//
//     const nameAndLevel = currentText.split(' - ');
//
//     $(this).text(`${nameAndLevel[0]} - Level ${levels.currentLevel}`);
//   });
// });

// DONT DO THIS! This is to understand how forEach works under the "hood".
// function forEach(arr, callback) {
//   for (let i  = 0; i < arr.length; ++i) {
//     callback(arr[i]);
//   }
// }
//
// const testArray = ['a', 'b', 'c'];
//
// forEach(testArray, function(elem) {
//   console.log(elem);
// });
