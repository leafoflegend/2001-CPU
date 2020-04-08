console.log('------------------');

// Errors
// What is an error?
// When something happens thats not supposed to
// an unintended outcome

// An error represents something unintended that was not supposed to happen.
// You as a programmer are in charge of defining what is "unintended".

const addTwoNums = (numOne, numTwo) => {
  if (typeof numOne !== 'number' || typeof numTwo !== 'number') {
    throw new Error('addTwoNums accepts two arguments. Both must be numbers.');
  }

  return numOne + numTwo;
};

const addAllTheNums = (arrOfNums) => {
  let total = 0;

  while (arrOfNums.length) {
    total = addTwoNums(total, arrOfNums.shift());
  }

  return total;
};

// console.log(addAllTheNums([1, 2, 3, 4, 5, {}]));

const fetchSomeData = () => {
  return fetch('https://doesnt_exist.com')
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      return data;
    })
};

const app = $('#app');

const renderSomething = (data) => {
  app.text(data);
};

// const bootstrap = () => {
//   fetchSomeData()
//     .then(data => {
//       console.log('Hello!', data);
//       renderSomething(data);
//     });
// };

// bootstrap();

// try {
//   throw new Error('Uh oh!');
// } catch (e) {
//   console.log('Something went wrong!', e);
// }

// console.log('Hello there!');

// Promises are annoying.
// Errors are hard.
// What do I do?

// C# came to JS and said "We have this really cool thing, and we think youre going to like it!"

// Async functions ALWAYS RETURN A PROMISE.
async function fetchSomeDataAsync() {
  try {
    const response = await fetch('https://chris_jones.com');

    const json = await response.json();

    return json;
  } catch (e) {
    console.log(e);

    return [];
  }
}

fetchSomeDataAsync();

// Always return a promise.
// async function nothing() {
//   return true;
// }
//
// console.log(nothing());