const express = require('express');
const { createServer } = require('http'); // Importa el módulo http
const { Server } = require('socket.io');
const routes = require('./routes/index');
require('./database');
const PORT = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A client has connected');  
});

app.use(express.json());
app.use('/', routes);

// Configura el servidor HTTP con Express

server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

