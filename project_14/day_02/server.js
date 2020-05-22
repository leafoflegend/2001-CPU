const express = require('express');
const chalk = require('chalk');
const path = require('path');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { Client } = require('pg');

dotenv.config();

const db = new Client('postgres://localhost:5432/project_14_day_02');

db.connect();

const app = express();

const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

app.post('/api/users/register', async (req, res, next) => {
  const { username, password } = req.body;

  await db.query(`
    INSERT INTO users (username, password)
    VALUES ($1, $2);
  `, [username, password]);

  console.log('User created!');

  const { rows: [{ id }] } = await db.query(`
    SELECT id
    FROM users
    WHERE username=$1;
  `, [username]);

  const token = jwt.sign({
    userId: id,
  }, process.env.JWT_SECRET);

  res.send({
    token,
  });
});

app.get('/api/users/my_password', async (req, res, next) => {
  const token = req.headers.authorization;

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  const { rows: [{ password }] } = await db.query(`
    SELECT password
    FROM users
    WHERE id=$1;
  `, [payload.userId]);

  res.send({
    password,
  });
});

const startup = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  app.listen(PORT, () => {
    console.log(chalk.green(`Server listening on PORT:${PORT}`));
  });
}

startup();
