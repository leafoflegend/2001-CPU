/* 
  QUESTIONS COVERED:
  - setInterval
  - objects and game state reset
  - arrow functions: Justified Use Case
  - objects: destructuring & looping over objects with `for ... in` loops
*/

// setInterval

// This can cause problems.
// setInterval(function(){
//   console.log('hello')
// }, 500)

let intervalId;

const startButton = $(`<button>START</button>`).click(function() {
  intervalId = setInterval(function(){
    console.log('hello')
  }, 500)
})

const endButton = $(`<button>STOP</button>`).click(function() {
  clearInterval(intervalId);
})

$('body').append(startButton)
$('body').append(endButton)

// objects and game state reset

let gameState = {
  player: 'defaultPerson',
  direction: '',
  board: [],
};

const defaultState = {
  player: 'defaultPerson',
  direction: '',
  board: [],
};

gameState.player = 'Preston'

console.log(gameState);

gameState = defaultState;

console.log(gameState);

gameState.player = 'Eliot';

console.log(gameState);

gameState = defaultState;

console.log(gameState)

console.log('--------');

function newGameState() {
  return {
    player: 'defaultPerson',
    direction: '',
    board: [],
  };
}

gameState = newGameState();

console.log(gameState);

const board = [4, 4, 4, 4, 0, 4, 4, 4, 0];

let lastIndex;

// map gives us an index
// for...let i = 0... gives us an index
// figure out which index we are at using the for loop
// when we map, use that index to know where we are starting next

// for(const i=4; i>0; --i){
//     let elem = arr[i];
//     if(i)
// }

// arrow functions: Justified Use Case

const dogs = [
  {
    name: 'fido'
  },
  {
    name: 'butch'
  },
  {
    name: 'zeus'
  },
  {
    name: 'milo'
  },
  {
    name: 'otis'
  },
]

const cats = {
  whiskers: {
    name: 'whiskers'
  },
  mick: {
    name: 'mick'
  },
  vader: {
    name: 'vader'
  },
  mittens: {
    name: 'mittens'
  },
  frisky: {
    name: 'frisky'
  },
  // ...
}

console.log(dogs);

const newDogs = dogs.map(function(dog){return dog.name;});

console.log(newDogs);

// const thirdDogsArr = dogs.map((dog) => {
//   return dog.name;
// });

// this is a bit complex. 
const fourthDogsArr = dogs.map((dog, index) => {
  console.log('dog index', index)
  return dog.name === 'fido' ? dog.name : 'notFido'
});

const thirdDogsArr = dogs.map(dog => dog.name)

console.log(fourthDogsArr);

// destructuring

fifthDogsArr = dogs.map(({name}) => name);

console.log('>>>>>>> fifthDogsArr', fifthDogsArr);

// object.keys
console.log(Object.keys(cats));
console.log(Object.values(cats));

console.log(cats['whiskers']);
cats['garfield'] = {name: 'garfield'}
cats['garfield'] = 'garfield'

// Looping over objects with `for ... in` loops
for(const key in cats) {
  // current value = cats[key]
  // to reset a value 
  console.log('key', key);
  cats[key] = key;
}

console.log(cats)

const newCat = cats.mittens;
