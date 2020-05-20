const express = require('express');
const chalk = require('chalk');

const PORT = process.env.PORT || 3000;

const app = express();

const startServer = () => new Promise((res) => {
  app.listen(PORT, () => {
    console.log(chalk.green(`Server is listening on PORT:${PORT}`));
    res();
  });
});

module.exports = {
  app,
  startServer,
};
