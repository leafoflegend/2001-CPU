// Global
// JavaScript will MAKE a variable exist if it doesnt already. ALWAYS. If you assign something, it will get assigned. The final place for it to get assigned, is the global scope, so thats where it will get placed if you forget to put let or const.
// someVar = 'someVar';
//
// window.someVar = 'another thing';
// window.ourVar = 77;

// Module Scope
// let ourVar = 1;

// function outerFunction() {
//   let ourVar = 90;
//   function innerFunction() {
//     // Function Scope
//     // let ourVar = 10;
//
//     // Assignment
//     ourVar = 5;
//
//     console.log('Inner Function: ', ourVar);
//   }
//
//   innerFunction();
//
//   console.log('Outer Function: ', ourVar);
// }
//
// outerFunction();

// Reading Something
// console.log('Module: ', ourVar);

// Whats ourVar?
// 1

// Functions can always look outwards, functions can NEVER be looked into.

// const name = 'Eliot';
//
// const hello = `Hello my name is ${name}, its nice to meet you!`;
//
// console.log(hello);

// Truthy/Falsy

// There are only six falsy values in all of JS.
// NaN
// false
// ''
// null
// undefined
// 0

// let val = 0;
//
// if (val) {
//   console.log('Truthy!');
// } else {
//   console.log('Falsy!');
// }

let numByTwos = 6;

function handleInputChange() {
  numByTwos = $('#twos').val();
}

function handleRenderChanges() {
  $('.two-value').text(`Num By 2s: ${numByTwos}`);
}

function updateStateAndRender() {
  handleInputChange();
  handleRenderChanges();
}

$('#twos').on('input', updateStateAndRender);

$('document').ready(updateStateAndRender);
