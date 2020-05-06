// The difference is the globals.

// You're used to CDN's. We can't do that anymore - this isn't on the internet, this is on our computer.
// We need to download the things we want to use.

// This is a fully synchronous process - require will pause execution of the current file until it is done executing the required file.
// const library = require('./library.js');
//
// library.addNums(1, 2);

// Native http library.
// const http = require('http');

const path = require('path');
const express = require('express');
const chalk = require('chalk');

const server = express();

const PORT = 3000;

// get = GET
// post
// put
// delete
server.get('/', (req, res) => {
  const indexHTMLPath = path.join(__dirname, './index.html');

  console.log(chalk.red(indexHTMLPath));

  res.sendFile(indexHTMLPath);
});

server.get('/cool_stuff', (req, res) => {
  res.send({
    message: 'A coronavirus vaccine would be pretty cool.',
  });
});

server.listen(PORT, () => {
  console.log(chalk.green(`Server started on port ${PORT}`));
});
