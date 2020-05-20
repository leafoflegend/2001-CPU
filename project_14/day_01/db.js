const { Client } = require('pg');
const chalk = require('chalk');

const db = new Client('postgres://localhost:5432/project_14_day_01');

db.connect();

const seed = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS cars (
      make TEXT NOT NULL,
      model TEXT NOT NULL,
      year INTEGER NOT NULL
    );
  `);

  console.log(chalk.green('Seeding successful.'));
}

module.exports = {
  seed,
  db,
};
