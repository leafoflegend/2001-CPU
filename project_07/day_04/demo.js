console.log('---------------')
// Destructuring

// Destructuring is really meant to be a tool for the lazy. It was not intended to be something that introduced new functionality to JS, it was supposed to just make old functionality easier to use.

const anArr = [1, 2, 3];

// Eliot, I want a new array with all of those elements, but also another one!

const copyArr = anArr.slice();
copyArr.push(4);

// Same thing as above
const spreadCopyArr = [ ...anArr, 4 ];

// home grown slice
// const slice = (arr) => {
//   const newArr = [];
//
//   arr.forEach(elem => {
//     newArr.push(elem);
//   });
//
//   return newArr;
// };

// Old!
// function unknownArgs() {
//   let sum = 0;
//
//   for (let i = 0; i < arguments.length; ++i) {
//     sum += arguments[i];
//   }
//
//   return sum;
// }

function unknownArgs(...otherStuff) {
  let sum = 0;

  for (let i = 0; i < otherStuff.length; ++i) {
    sum += otherStuff[i];
  }

  return sum;
}

// console.log(unknownArgs(1, 2, 3, 4));
// console.log(unknownArgs(1, 1));

// Object Destructuring

const animalCrossingInventory = {
  treeBranches: 16,
  bells: 13000,
  happy: true,
};

// Looks cool, is terrifying
// const {
//   thing: {
//     otherThing: {
//       anotherThing: {
//         finalThing: theThing,
//       },
//       alsoMe,
//     }
//   }
// } = someLargeObject;

// The only people who read your code are other people. Write code as if its meant to be read.

// function howManyBells({ bells, happy }) {
//   console.log(`You have ${bells} Bells! You ${happy ? 'are' : 'are not'} happy!`);
// }
//
// howManyBells(animalCrossingInventory);

// Memory Leak

// const intervalId = setInterval(function () {
//   console.log('The current time is: ', new Date());
// }, 1000);
//
// const timeoutId = setTimeout(function () {
//   console.log('Finishing up!');
//   clearTimeout(timeoutId);
//   clearInterval(intervalId);
// }, 10000);

// Recursion

// Recursion is when a function calls itself.

// function sayHello() {
//   console.log('Hello!');
//   sayHello();
// }
//
// sayHello();

// Recursion is an alternative to iteration.

// Iteration (for loops) uses processing power to sequentially perform operations. It does things one at a time.

// Recursion uses memory to build a larger and larger mental image of the current state of affairs. Eventually, your computer runs out of memory.

//   start;   cond;   update;
// for (let i = 0; i < 10; ++i) {
//   console.log(i);
// }

// They need a start
// They need an end
// They need something moving them from start to end

// Invocation
// Base Case
// Recursive Case

function liftoff(startingNumber) {
  // To start to write recursion, we first MUST define its end. Base Case. When does this function NOT CALL ITSELF?
  if (startingNumber <= 0) {
    console.log('Liftoff!');
  // In every other case we must call ourselves. This is the RECURSIVE CASE.
  } else {
    // The way we UPDATE in recursion is by passing a new argument to the recursive call.
    liftoff(startingNumber - 1);
    console.log(startingNumber);
  }
}

// liftoff(10);

// Recursion is the ability to think in terms of final moments, back to the present. Humans like to think in terms of now, and each step to get us forward to a final point.

// Why the hell would I use this?

// Recursion is poorly suited to problems that are inherently sequential. Recursion is great at problems that have unknown depth and/or complexity. Because recursion can do two important things:
// Can hold a picture of everything going on (the call stack)
// Recursion can think in terms of individual steps regardless of the complexity of the entire problem set.

const findWordsOnPage = (word, elem) => {
  const { children, innerText } = elem;
  const hasWord = !!(innerText && innerText.indexOf(word) !== -1);

  if (!children) {
    return hasWord ? 1 : 0;
  }

  const totalOccurrencesInChildren = [...children]
    .map((childElem) => findWordsOnPage(word, childElem))
    .reduce((count, num) => count + num, 0);

  console.log('Total Occurrences: ', totalOccurrencesInChildren);

  return hasWord + totalOccurrencesInChildren;
};
