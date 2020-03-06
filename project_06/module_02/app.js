// console.log('---------------');

// Arrays

// kind of object
// a collection of things
// something inside of square brackets
// a list of things <----
// Order

// An ordered list of things, inside of brackets - it just happens to be an object

const anArr = [1, 2, 3];

// Arrays are dynamic, and can change over time.

// anArr might grow or shrink.

// Objects
// Objects can store keys and values, values can be functions.

// const someObj = {
//   doThing: function() {
//     console.log('I did a thing!');
//   }
// };
//
// someObj.doThing();

// Arrays have keys and values within them, and today we are going to cover 4 very serious ones.

// Array modification methods

// Push
// add to the end of an array - returns the new length of the array

// Pop
// remove from the end of the array - return what was removed

// Shift
// removes from the beginning of the array - returns removed item

// Unshift
// add to the beginning - return new length

// const arrayOfNums = [];
//
// for (let i = 0; i < 10; ++i) {
//   arrayOfNums.push(i);
// }
//
// console.log(arrayOfNums);
//
// const nine = arrayOfNums.pop();
//
// console.log('Popped element: ', nine);
//
// console.log(arrayOfNums);
//
// const zero = arrayOfNums.shift();
//
// console.log('Shifted Element: ', zero);
//
// console.log('After shift: ', arrayOfNums);
//
// arrayOfNums.unshift(nine);
//
//
//
// console.log('After Unshift: ', arrayOfNums);

// jQuery

const counterBox = $('.counter-box');
const incrementButton = $('#increment');

function updateCounterBox() {
  counterBox.text(jQuery.data(counterBox, 'count'));
}

function incrementCounter() {
  const currentCount = jQuery.data(counterBox, 'count');
  jQuery.data(counterBox, 'count', currentCount + 1);
}

function incrementAndUpdate() {
  incrementCounter();
  updateCounterBox();
}

$(document).ready(function () {
  jQuery.data(counterBox, 'count', 0);
  updateCounterBox();
});

incrementButton.click(incrementAndUpdate);

// const objNum = {
//   num: 5,
// };

// Allowed
// objNum.num = 3;

// Not allowed!
// objNum = 3;
