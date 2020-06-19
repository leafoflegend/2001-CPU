const express = require('express');
const chalk = require('chalk');
const path = require('path');

const DIST_PATH = path.join(__dirname, '../../dist');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(DIST_PATH));
app.use(express.json());

const startServer  = () => new Promise((res) => {
  app.listen(PORT, () => {
    console.log(chalk.green(`Server is listening on PORT:${PORT}`));
    res();
  });
});

module.exports = { app, startServer };
