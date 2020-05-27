const { Client } = require('pg');
const faker = require('faker');
const chalk = require('chalk');

const db = new Client('postgres://localhost:5432/project_15_day_01');

db.connect();

const seedTables = async () => {
  await db.query(`
    DROP TABLE IF EXISTS users;
  `);

  await db.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE,
      password TEXT
    );
  `);
}

const seedUsers = (size = 10) => {
  const usersToCreate = [];

  for (let i = 0; i < size; ++i) {
    usersToCreate.push(`('${faker.name.firstName()}', '${faker.internet.password()}')`);
  }

  return db.query(`
    INSERT INTO users (name, password)
    VALUES ${usersToCreate.join(', ')};
  `);
}

const getUsers = async () => {
  const { rows } = await db.query(`
    SELECT name FROM users;
  `);

  return rows;
}

module.exports = {
  db,
  seedTables,
  seedUsers,
  getUsers,
}
