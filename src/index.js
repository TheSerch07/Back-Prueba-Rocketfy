const express = require('express');
const mongoose = require('mongoose');
const { createServer } = require('http');
const { Server } = require('socket.io');
const Sensor = mongoose.connection.collection('sensor');
const routes = require('./routes/index');
require('./database');
const PORT = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);

let sensorId

io.on('connection', (socket) => {
  console.log('A client has connected');

  socket.on('disconnect', () => {
    console.log('An user has disconnected')
  })

  socket.on(`select sensor`, async (id) => {
    sensorId = id
    const sensor = await Sensor.findOne({ sensor_id: Number(id) });
    io.emit('select sensor' ,sensor)
  })

  const addDataToDatabase = (typeDataOne, typeDataTwo, calculateOne, calculateTwo, indexUpdate) => {
    setInterval(async () => {
      const newSensorData = {
        timestamp: new Date().toISOString(),
        [typeDataOne]: calculateOne,
        [typeDataTwo]: calculateTwo
      };

      
      await Sensor.updateOne(
        { sensor_id: indexUpdate },
        { $push: { data: newSensorData } }
      );

      const sensor = await Sensor.findOne({ sensor_id: Number(sensorId)})
      
      console.log(sensorId)
      io.emit(`sensor data change ${sensorId}`, sensor);
    }, 10000);
  };

  addDataToDatabase('temperature', 'humidity', Math.random() * 10 + 30, Math.random() * 10 + 50, 1);
  addDataToDatabase('pressure', 'wind_speed', Math.random() * 10 + 1000, Math.random() * 5 + 1, 2)
  addDataToDatabase('noise_level', 'air_quality', Math.random() * 10 + 40, "Buena", 3)
});

app.use(express.json());
app.use('/', routes);

// Configura el servidor HTTP con Express

server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

