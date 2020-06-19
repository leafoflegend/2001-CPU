const { Client } = require('pg');
const chalk = require('chalk');

const db = new Client(process.env.DATABASE_URL || 'postgres://localhost:5432/project_18_day_02');

db.connect();

const seed = async (force = false) => {
  try {
    if (force) {
      await db.query(`
      DROP TABLE IF EXISTS cheese;
    `);
    }

    await db.query(`
    CREATE TABLE IF NOT EXISTS cheese (
      id SERIAL PRIMARY KEY,
      name TEXT UNIQUE NOT NULL,
      stinky BOOLEAN NOT NULL,
      meltable BOOLEAN NOT NULL
    );
  `);

    console.log(chalk.green('DB seeded successfully!'));
  } catch (e) {
    console.log(chalk.red('Failed to seed DB.'));
    throw e;
  }
};

module.exports = { db, seed };
