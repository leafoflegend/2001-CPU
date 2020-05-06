const chalk = require('chalk');

const library = {
  addNums: (a, b) => {
    const sum  = a + b;

    console.log(
      chalk.cyan('The sum is: '),
      chalk.green(sum),
    );

    return sum;
  },
};

module.exports = library;
