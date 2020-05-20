const express = require('express');
const chalk = require('chalk');
const carRouter = require('./cars');

const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
  console.log(chalk.yellow(`Request to API @ URL: ${req.url}`));

  next();
});

apiRouter.use('/cars', carRouter);

module.exports = apiRouter;
