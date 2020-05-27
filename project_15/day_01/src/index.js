const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const { seedUsers, seedTables } = require('./db.js');
const apiRouter = require('./api.js');

const PORT = process.env.PORT || 3000;

const app = express();

// cors() required for the way i am testing the server - nothing else
app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);

const startup = async () => {
  await seedTables();

  await seedUsers();

  app.listen(PORT, () => {
    console.log(chalk.green(`Server is listening on PORT:${PORT}`));
  });
}

startup();
