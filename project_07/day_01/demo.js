console.log('---------------------');

// One
// Define an initial representation of an application
// State - Initial State
// What data do we need initially before people play, to represent the game?

// Boxes with borders as a state

const PLAYER_X = 'X';
const PLAYER_O = 'O';

const state = {
  grid: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  turn: PLAYER_X,
};

// Two
// Visually represent the state

// Eliot writes amazingly styled html
// Preston loves JS, keep using it

// Interaction
// What can users do?

// Specs
// Users can click on an empty space on the board
// Users can reset the board after someone has won
// STRETCH: Users can select a space, without confirming it, there is a confirm button to accept the space they selected. Selecting the space again removes the piece if they have not confirmed.

// Grooming/Decomposition

// Users can click on an empty space on the board
// Tic Tac Toe Boxes are clickable
// On click, IF EMPTY, place the current turns piece in the space
// Check if user has won
// If not, go to alternate players turn
// If yes, show a gif explosion and declare which player has won in the counter strike narrator voice

// Users can reset the board after someone has won
// If the win has occured, place a button on the DOM that resets the state to the initial state, and re-renders

// Loop and Repeat

// We repeat steps 2 and 3 until they inevitably lead back to step 1
// We represent state, we allow people to interact with the representation of state TO CHANGE STATE, we represent state, ...

// All of javascript is just objects
// If all apps are just state being represented everything is an object

// Map
// A loop over an array to create and return a new array by inspecting each element of an initial array

// const arrayToMap = [1, 2, 3, 4, 5];

// const mappedArray = arrayToMap.map(function (elem) {
//   return elem * 2;
// });

// mappedArray.push(12);
//
// console.log('Original Array: ', arrayToMap);
// console.log('Mapped Array: ', mappedArray);

// Doesnt work...
// state.copyGrid = state.grid.map(function (row, y) {
//   return row.map(function (cell, x) {
//     if (x === clickX && y === clickY) {
//       return CURRENT_PLAYER;
//     }
//
//     return cell;
//   });
// });

// const someArr = [1, 2, 3];
//
// const newArr = [];
// someArr.forEach(function (elem) {
//   newArr.push(elem * 2);
// });
//
// console.log('Original: ', someArr);
// console.log('New: ', newArr);

// Reduce
// The most complex and powerful array method
// Reduce can do whatever the heck it wants
// Reduce takes a look at any list, and creates a new VALUE

// const someArr = [1, 2, 3, 4, 5];
//
// const sum = someArr.reduce(
//   function (accum, next) {
//     accum[next] = next * 2;
//     return accum;
//   },
//   {}
// );
//
// console.log(sum);

// Reduce is a really really good method to know if you want to write js really really fast. It doesnt solve anything you cant do another way. As you get more comfortable doing operations on arrays, reduce will seem more and more useful.
