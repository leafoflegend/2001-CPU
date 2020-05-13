const express = require('express');
const pg = require('pg');

const Client = pg.Client;

const db = new Client('postgres://localhost:5432/2001_cpu');
try {
  db.connect();
} catch (e) {
  console.error('Failed to connect to database.', e);
}

const PORT = 3000;

const app = express();

app.use(express.json());

app.get('/users', async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT username FROM users;');

    res.send({
      users: rows
        .map(({username}) => username)
    });
  } catch (e) {
    next(e);
  }
});

app.post('/user', (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);

  res.send('Ha ha!');
});

app.listen(PORT, () => {
  console.log('Server is listening!');
});

/*
hint for curl requests:

curl -X POST localhost:3000/user -d '{"username": "aidan@helps.com", "password": "cool_beans"}' -H 'Content-Type: application/json'

 */
