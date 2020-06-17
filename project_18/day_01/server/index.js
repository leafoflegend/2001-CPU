const express = require('express');
const { Client } = require('pg');
const chalk = require('chalk');
const path = require('path');

const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/project_18_day_01';

const app = express();

const db = new Client(DATABASE_URL);

db.connect();

const seed = async (force = false) => {
  if (force) {
    await db.query(`
      DROP TABLE IF EXISTS syrups;
    `);
  }

  await db.query(`
    CREATE TABLE IF NOT EXISTS syrups (
      id SERIAL PRIMARY KEY,
      type TEXT NOT NULL
    );
  `);

  console.log(chalk.green(`DB successfully seeded! Force: ${force}`));
};

const startServer = () => new Promise((res) => {
  app.listen(PORT, () => {
    console.log(chalk.green(`Server is listening on PORT:${PORT}`));
    res();
  });
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/syrups', async (req, res) => {
  const { rows } =  await db.query(`
    SELECT * 
    FROM syrups;
  `);

  res.send({ syrups: rows });
});

seed()
  .then(startServer)
  .catch((e) => {
    console.error('Failed to seed or start server.');
    db.end();
    throw e;
  });
