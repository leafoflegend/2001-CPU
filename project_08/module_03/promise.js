console.log('-----------------');

// How do I build a Promise?
// function Dog(name) {
//   this.dogName = name;
// }
//
// Dog.prototype.bark = function() {
//   console.log(`Woof! I am ${this.dogName}`);
// };

// class Dog {
//   constructor(dogName) {
//     this.dogName = dogName;
//   }
//
//   bark() {
//     console.log(`Woof! I am ${this.dogName}!`);
//   }
// }
//
// const winston = new Dog('Winston');
//
// winston.bark();

class Promize {
  constructor(executor) {
    this.then = this.then.bind(this);
    this.catch = this.catch.bind(this);
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);

    this.resolveFunctions = [];
    this.rejectFunctions = [];

    this.status = 'unresolved';
    this.value = null;

    executor(this.resolve, this.reject);
  }

  then(resolveFunction) {
    const resolvePromise = new Promize(() => {});

    this.resolveFunctions.push({
      executor: resolveFunction,
      promise: resolvePromise,
    });

    if (this.status === 'resolved') this.resolve(this.value);
    else if (this.status === 'rejected') this.reject(this.value);

    return resolvePromise;
  }

  catch(rejectFunction) {
    const rejectPromise = new Promize(() => {});

    this.rejectFunctions.push({
      executor: rejectFunction,
      promise: rejectPromise,
    });

    if (this.status === 'rejected') this.reject(this.value);
    else if (this.status === 'resolved') this.resolve(this.value);

    return rejectPromise;
  }

  resolve(val) {
    this.status = 'resolved';
    this.value = val;

    while (this.resolveFunctions.length) {
      const { executor, promise } = this.resolveFunctions.shift();

      try {
        // .thens can return a promise, in which case, I would need to .then here as well.
        const val = executor(this.value);

        if (val instanceof Promize) {
          val
            .then((promVal) => {
              promise.resolve(promVal);
            })
            .catch((promErr) => {
              promise.reject(promErr);
            });
        } else {
          promise.resolve(val);
        }
      } catch (e) {
        promise.reject(e);
      }
    }
  }

  reject(val) {
    this.status = 'rejected';
    this.value = val;

    while (this.rejectFunctions.length) {
      const { executor, promise } = this.rejectFunctions.shift();

      try {
        const val = executor(this.value);

        if (val instanceof Promize) {
          val
            .then((promVal) => {
              promise.resolve(promVal);
            })
            .catch((promErr) => {
              promise.reject(promErr);
            });
        } else {
          promise.resolve(val);
        }
      } catch (e) {
        promise.reject(e);
      }
    }

    while (this.resolveFunctions.length) {
      const { promise } = this.resolveFunctions.shift();

      promise.reject(this.value);
    }
  }
}

// Executors power promises
const executor = function (resolve, reject) {
  const randNum = Math.random();

  if (randNum > .5) resolve(randNum);
  else reject(randNum);
};

// Executors are the argument we pass into a promise constructor
const promise = new Promize(executor);

// Promises have a final part of their API
promise
  .then(num => {
    console.log('Success: ', num);
    return true;
  })
  .then(val => {
    console.log(val);
    throw new Error('Wrong!');
  })
  .catch(err => {
    console.error('Caught Error: ', err.message);
  });
