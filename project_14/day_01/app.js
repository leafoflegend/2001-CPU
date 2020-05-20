// Entry point
// Dependency logic
const chalk = require('chalk');
const express = require('express');
const { seed, db } = require('./db');
const { startServer, app } = require('./server');
const apiRouter = require('./api');

app.use(express.json());

// Express handlers go in the order they were registered. In easier words, they go top down.

// This is our first valuable middleware, this is a logging middleware
app.use((req, res, next) => {
  console.log(chalk.cyan(req.method), chalk.blue(req.url));

  next();
});

// This is the business logic
app.use('/api', apiRouter);

// Actual initialization of the app
// This is where everything can go wrong, please have logs, and please make sure everything is promisified if needed.
seed()
  .then(startServer)
  .then(() => {
    console.log(chalk.green('Application started successfully.'));
  })
  .catch(e => {
    console.log(chalk.red('Application failed to start.'));
  });
