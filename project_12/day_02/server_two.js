const express = require('express');
const axios = require('axios');

const server = express();

const PORT = 3001;

const EXTERNAL_API = 'http://localhost:3000/random_user';

server.get('/users', async (req, res) => {
  const numUsers = Math.ceil(Math.random() * 10);

  const users = [];

  for (let i = 0; i < numUsers; ++i) {
    const user = await axios.get(EXTERNAL_API);

    users.push(user.data);
  }

  console.log('Request to server on port', PORT);

  res.send({
    users,
  });
});

server.listen(PORT, () => {
  console.log(`Server started on PORT:${PORT}`);
});
