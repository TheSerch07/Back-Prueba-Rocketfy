const mongoose = require("mongoose");
const socketIo = require('socket.io');

// Conecta a la base de datos
mongoose.connect('mongodb://localhost:27017/rocketfy-challenge', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => {
        console.log("Database is connected");
        const server = require('http').createServer();
        const io = socketIo(server);

        // Maneja las conexiones de Socket.io
        io.on('connection', (socket) => {
            console.log('A client has connected to Socket.io');

            const Sensor = mongoose.connection.collection('sensor');
            Sensor.watch().on('change', (change) => {
                if (change.operationType === 'update' || change.operationType === 'insert') {
                    socket.emit('sensorDataChange', change.fullDocument);
                }
            });
        });
    })
    .catch(err => console.log(err));
