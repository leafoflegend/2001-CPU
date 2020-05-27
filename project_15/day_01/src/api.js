const express = require('express');
const { getUsers } = require('./db.js');

const apiRouter = express.Router();

apiRouter.get('/users', async (req, res) => {
  const users = await getUsers();

  res.send({
    users,
  });
});

apiRouter.get('/health', (req, res) => {
  res.send({
    message: 'Server is healthy as can be.',
  });
});

module.exports = apiRouter;
