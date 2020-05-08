const express = require('express');
const faker = require('faker');

const server = express();

const PORT = 3000;

server.get('/random_user', (req, res) => {
  const random_user = {
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    job: faker.name.jobTitle(),
  }

  console.log('Request to server on port', PORT);

  res.send(random_user);
});

server.listen(PORT, () => {
  console.log(`Server started on PORT:${PORT}`);
});
