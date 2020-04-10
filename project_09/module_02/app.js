console.log('-----------------------');

// Destructuring

// Its a convenience. Its a way for us to pull properties or indexes out of objects and/or arrays.

const names = ['Eliot', 'Preston'];

const dogs = {
  winston: 'smells like coconuts',
  clifford: 'the big red dog',
};

// Objects

// Traditional
// console.log(dogs.winston);

// Destructure
const { winston, clifford } = dogs;

// console.log('Winston: ', winston);
// console.log('Clifford: ', clifford);

// Arrays

// Traditional
// console.log(names[0]);


// Destructure
// const [eliot, preston] = names;

// console.log(eliot, preston);

// Deep Destructuring

const mockRes = {
  success: true,
  error: null,
  data: {
    list: [
      {
        post: 'Cool blog post about diy face masks',
      },
    ],
  },
};

const {
  data: {
    list: [
      { post: destructuredPost }
    ]
  }
} = mockRes;

// console.log(destructuredPost);

// Promise.all

// Engineers often make multiple requests to websites at the same time, it was hard to manage all of those promises, so what if we could take many promises and make it one promise?

// Welcome to promise.all.

// Promise.all takes an array of promises, and returns an array with the resolved values of each promise. Importantly, Promise.all returns a promise that will resolve into that array.

// Promise.all will fail on all promises if any promise you give it fails.

// const promOne = new Promise(res => res(5));
// const promTwo = new Promise((res, rej) => rej(6));
//
// const promOneAndTwo = Promise.all([promOne, promTwo]);
//
// promOneAndTwo
//   .then(vals => console.log(vals))
//   .catch(e => console.log(e));

const API_URL = 'https://jsonplace-univclone.herokuapp.com/todos';

const fetchData = () => fetch(API_URL)
  .then(res => res.json());

const bootstrapApp = async () => {
  console.time('Bootstrap');

  // [fetchOneData, fetchTwoData]
  try {
    const [fetchOne, fetchTwo] = await Promise.all([
      fetchData(),
      fetchData(),
    ]);

    console.log('Fetches: ', fetchOne, fetchTwo);
  } catch (e) {
    console.error(e);
  } finally {
    console.timeEnd('Bootstrap');
  }
}

// bootstrapApp();

const deepObj = {
  objOne: {
    name: 'eliot',
  },
};

const deepClone = obj => {
  const newObj = {};

  // Base Case is this a loop, has a finite end.
  for (let key in obj) {
    const val = obj[key];

    if (typeof val === 'object') {
      // Recursive Case
      newObj[key] = deepClone(val);
    } else {
      // Normal Case
      newObj[key] = val;
    }
  }

  return newObj;
}

const copy = deepClone(deepObj);

console.log('Are different: ', copy !== deepObj);
