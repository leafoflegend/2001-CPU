console.log('----------------');

// console.log(addTwoNumbers(2, 8));
// Only possible because of hoisting.
// console.log(ourVar);

// Functions

// ???
// - Kind of object
// - It does something
// - Block of code that executes commands
// - Made to be reusable

// Functions in JS are objects that represent reusable chunks of code. Sometimes they are named, sometimes they are not (these are called anonymous functions), and maybe most importantly, they can return a value. Functions can receive arguments to vary the code path and return value of their body.

function addTwoNumbers(numOne, numTwo) {
  return numOne + numTwo;
}

// console.log(addTwoNumbers(2, 2));
// console.log(addTwoNumbers(2, 3));

// Hoisting

// When javascript makes a function available for use before its definition.
// When javascript receives code, the first thing it does is inspect the entire document looking for variable definitions. It makes these names that we use to define variables available when it takes a second look at the file, to run it.

var ourVar = 5;

// arguments is unsafe and maybe deprecated
function addAllArgs() {
  const arrayArgs = [...arguments];

  let sum = 0;

  for (let i = 0; i < arrayArgs.length; ++i) {
    sum += arrayArgs[i];
  }

  return sum;
}

// console.log(addAllArgs(3, 3, 3));

// this
// Nobody knows what the heck it is.

// this is supposed to refer to the thing that you currently "belong" to.

function showMeThis() {
  console.log(this);
}

// Global!
// showMeThis();

// If we make that function belong to something else.

const parentObject = {
  owner: 'Eliot',
  func: showMeThis,
};

// parentObject.func();

// Functions will change the meaning of this based on "where" they are when they are called.

// Arrow Functions
// Parens around arguments
// An arrow to signify the end of arguments
// Curly brace to signify the body

// Equivocally the same
// function(numOne, numTwo, numThree) {
//   return numOne + numTwo + numThree;
// };
//
// (numOne, numTwo, numThree) => {
//   return numOne + numTwo + numThree;
// };

// console.log(addThreeNums(1, 2, 3));

// Works just like a function! Or does it?

// Hoisting - Arrow functions dont have.
// This
// arguments

// Cant hoist!
// console.log(someArrow);

// const someArrow = () => {};

// const wheresThis = () => {
//   console.log(this);
// };
//
// const here = {
//   owner: 'Chris',
//   func: wheresThis,
// };

// here.func();

// Arrow functions do a really fancy (or atleast named really fancily) called "lexical binding". Heres the laymans version: it takes the this context from wherever it was DEFINED not where it was USED.

// Arguments

// const argFunc = () => {
//   console.log(arguments);
// };
//
// argFunc('hi');

// Does not work with arrow functions.

// Why use arrow functions? They seem to do less?

// Arrow functions were created because functions were too confusing in their many behaviors. Arrow functions are meant to streamline and simplify how functions behave. No magic arguments word. No magical this context, just the one. No ability to use it before its defined. Because that breaks with every other programming language ever. Its super confusing.

// We made some cute little hacks to make them even easier and lazier.

// Implicit Returns

const implicitArrow = (numOne, numTwo) => numOne + numTwo;

// console.log(implicitArrow(1, 1));

// You didnt write the return word!
// If you dont use a { } for an arrow function, it returns whatever comes after the arrow.

// Single Argument Arrow

const echo = arg => arg;

console.log(echo('hi'));

// This time i didnt use ( ) around the args. The rule is this: if there is only one argument, you can omit the parenthesis. Why? Becuase were so lazy we didnt want to write parenthesis.

const implicit = () => 10;

const noParens = arg => arg;

const normalFunc = (numOne, numTwo) => {
  console.log('Look im normal!');
  return numOne + numTwo;
};
