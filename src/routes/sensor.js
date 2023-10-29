const { Router } = require('express');
const mongoose = require('mongoose');
const router = Router();
const Sensor = mongoose.connection.collection('sensor');
const socketIo = require('socket.io');
const io = socketIo();

io.on('connection', (socket) => {
    console.log('A client has connected to Socket.io');

    // const Sensor = mongoose.connection.collection('sensor');
    // Sensor.watch().on('change', (change) => {
    //     if (change.operationType === 'update' || change.operationType === 'insert') {
    //         socket.emit('sensorDataChange', change.fullDocument);
    //     }
    // });
});

router.get('/connect-to-socket', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html'); // Debes crear este archivo HTML
});

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    const sensor = await Sensor.findOne({ sensor_id: id });
    res.send(sensor);
});

module.exports = router;