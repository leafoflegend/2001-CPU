const chalk = require('chalk');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../dist')));

app.get('/health', (req, res) => {
  res.send({
    message: 'I am healthy.',
  });
});

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log(chalk.cyan(`Client connected!`), socket.id);

  socket.on('chat', (data) => {
    console.log(socket.id, data);

    io.emit('chat', { user: socket.id, message: data.message });
  });

  let seconds = 0;

  setInterval(() => {
    ++seconds;
    socket.emit('chat', { user: 'server', message: `${seconds} minutes have passed since chat start.` });
  }, 60000);
});

server.listen(PORT, () => {
  console.log(chalk.greenBright(`Server is now listening on PORT:${PORT}`));
});
