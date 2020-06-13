const express = require('express');
const path = require('path');
const chalk = require('chalk');

const app = express();

const PORT = process.env.PORT || 3000;

const BUILD_DIR = path.join(__dirname, '../build');

app.use(express.static(BUILD_DIR));

app.get('/api/pokemon/:name', (req, res) => {
  res.send({
    name: 'Squirtle',
    level: 15,
    type: 'Water',
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(BUILD_DIR, './index.html'));
});

app.listen(PORT, () => {
  console.log(chalk.green(``))
});
