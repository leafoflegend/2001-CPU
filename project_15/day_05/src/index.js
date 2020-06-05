const express = require('express');
const cookieParser = require('cookie-parser');
const chalk = require('chalk');
const { Client } = require('pg');
const path = require('path');
const uuid = require('uuid');

const PORT = process.env.PORT || 3000;

const db = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/project_15_day_04');

db.connect();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(async (req, res, next) => {
  console.log('Cookies: ', req.cookies);

  if (!req.cookies.uuid) {
    const sessionId = uuid.v4();

    await db.query(`
      INSERT INTO sessions (uuid)
      VALUES ($1);
    `, [sessionId]);

    res.cookie('uuid', sessionId);
  } else {
    const { rows: [session] } = await db.query(`
      SELECT *
      FROM sessions
      WHERE "uuid"=$1
    `, [req.cookies.uuid]);

    if (!session) {
      console.log('Error, corrupt cookie!');
    } else {
      req.uuid = session.uuid;
      req.userId = session.user_id;

      console.log(`Current sessions user is: ${session.user_id}`);
    }
  }

  next();
});
app.use(express.static(path.join(__dirname, '../public')));

const seed = async (force = false) => {
  if (force) {
    console.log(chalk.yellow('Force true, dropping table and inserting user.'));

    await db.query(`
      DROP TABLE IF EXISTS sessions;
    `);

    await db.query(`
      DROP TABLE IF EXISTS users;
    `);
  }

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE IF NOT EXISTS sessions (
      uuid TEXT PRIMARY KEY,
      user_id INTEGER REFERENCES users(id)
    );
  `);

  if (force) {
    await db.query(`
      INSERT INTO users (username, password)
      VALUES ($1, $2);
    `, ['eliot@szwajkowski.com', 'password123']);
  }

  console.log(chalk.green('Success seeding database.'));
};

const login = async (userObj) => {
  const { rows: [user] } = await db.query(`
    SELECT id
    FROM users
    WHERE "username"=$1 AND "password"=$2 
  `, [userObj.username, userObj.password]);

  if (!user) return null;

  return user;
}

const startServer = () => new Promise((res) => {
  app.listen(PORT, () => {
    console.log(chalk.green(`Server is listening on PORT:${PORT}`));
    res();
  });
});

const startApp = async (force = false) => {
  await seed(force);
  await startServer();

  console.log(chalk.cyan(`Application started.`));
}

app.post('/login', async (req, res) => {
  console.log(req.body);

  const user = await login(req.body);

  if (user) {
    await db.query(`
      UPDATE sessions
      SET "user_id"=$1
      WHERE "uuid"=$2;
    `, [user.id, req.uuid]);

    console.log('Setting user on session.');
  }

  res.send({
    user,
  });
});

startApp();

/*
 What black advertising magic have i done here?

 1. I assign every single user a randomly generated uuid the FIRST TIME they visit our site.
 2. I write this uuid to the database, and to a cookie that I give to you.
 3. I then ask you to login. When you do - if successful, I attached your userId to the session in the database.

  What have I accomplished?

  A uuid I stored on your cookie, tells me that you at some point in time logged in successfully and I now know who you are.
*/


// You need to run this code with force true at least one time to seed a user - turn it off after so that we dont delete sessions.
// I am not handling the situation patricia brought up - if a user deletes a cookie i have a hard time recalibrating when they log in again.
// We will end up with a lot of crud (read: useless) sessions.
