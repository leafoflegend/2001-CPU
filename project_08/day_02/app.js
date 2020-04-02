// Promises

// Something that gets called in the future - .then
// In a case where eventualities are uncertain, promises account for all scenarios - resolution (was it a success? was it a failure?)
// Something that gets returned in the future - resolved value

// Promises are a constructor, we call it like a function after saying the word new
// It takes one argument. A callback function (executor).
// an executor (the callback you write) is always given two arguments.
// an argument "resolve" as the 0 index argument. Its a function. You can call it.
// an argument "reject" as the 1 index argument. Its a function. You can call it.
// Purpose.
// the purpose of a promise is for US to define how UNCERTAIN behavior will resolve. Whether it be failure or success.

const API_URL = 'https://jsonplace-univclone.herokuapp.com/todos';

const genNum = () => new Promise((resolve, reject) => {
  const randNum = Math.random();
  const isFailure = randNum > .5;

  // If we get over .5, this is a failed promise.
  if (isFailure) reject(randNum);
  // Otherwise, this is a successful promise.
  else resolve(randNum);
});

// genNum()
//   // This is if it succeeded...
//   .then(num => {
//     console.log(`${num} is less than .5`);
//   })
//   // This is if it failed...
//   .catch(num => {
//     console.log(`${num} is greater than .5`);
//   });

// The function fetch
// Fetch returns a promise

// Building fetch from scratch.
// const fetch = (url) => {
//   return new Promise((resolve, reject) => {
//     const req = new XMLHttpRequest();
//
//     req.addEventListener('load', (loadEvent) => {
//       const data = loadEvent.target.response;
//
//       resolve(JSON.parse(data));
//     });
//     req.addEventListener('error', reject);
//     req.addEventListener('abort', reject);
//     req.open('GET', url);
//     req.send();
//   });
// };

// fetch(API_URL)
//   .then(data => {
//     console.log(data);
//   })
//   .catch(err => {
//     console.error(err);
//   });

fetch(API_URL)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log('Error!', err);
  });
