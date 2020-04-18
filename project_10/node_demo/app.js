const { numbers, sayHello } = require('./numbers.js');

for (let i = 0; i < numbers.length; ++i) {
  console.log(numbers[i]);
}

sayHello();
