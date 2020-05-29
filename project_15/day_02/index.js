const { Client } = require('pg');
const dotenv = require('dotenv');
const { hashingFunction, compare } = require('./hash');

dotenv.config();

const SALT = process.env.SALT;

if (!SALT) {
  throw new Error('Must include a .env file with a SALT!');
}

const db = new Client('postgres://localhost:5432/project_15_day_02');

db.connect();

const initializeTables = async () => {
  await db.query(`
    DROP TABLE IF EXISTS users;
  `);

  await db.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `);
}

const createUser = async (userObj) => {
  // With our custom hashing function
  // const hashedPass = hashingFunction(SALT, userObj.password);

  const hashedPass = await hashingFunction(userObj.password);

  await db.query(`
    INSERT INTO users (username, password)
    VALUES (
      '${userObj.username}',
      '${hashedPass}'
    );
  `);
};

const seed = async () => {
  await createUser({
    username: 'eliot',
    password: 'password',
  });
};

const login = async (userObj) => {
  // With our hashing function
  // const hashedPass = hashingFunction(SALT, userObj.password);
  //
  // const { rows } = await db.query(`
  //   SELECT id
  //   FROM users
  //   WHERE "username"='${userObj.username}' AND "password"='${hashedPass}';
  // `);

  const { rows } = await db.query(`
    SELECT password as hashed_pass, id
    FROM users
    WHERE "username"=$1
  `, [userObj.username]);

  if (!rows.length) {
    throw new Error('User not found!');
  }

  const { hashed_pass, id } = rows[0];

  const result = await compare(userObj.password, hashed_pass);

  if (result) return rows[0].id;
  else throw new Error('Incorrect password');
}

initializeTables()
  .then(seed)
  .then(() => login({
    username: 'eliot',
    password: 'password',
  }))
  .then((userId) => {
    console.log('Seeded, logged in. User ID: ', userId);
    process.exit(0);
  })
  .catch((e) => {
    console.log('Failed seed or login.');
    console.error(e);
    process.exit(1);
  });
