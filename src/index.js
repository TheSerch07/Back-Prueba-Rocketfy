const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const { createServer } = require('http');
const { Server } = require('socket.io');
const Sensor = mongoose.connection.collection('sensor');
const routes = require('./routes/index');
require('./database');
const PORT = 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

let sensorId

io.on('connection', (socket) => {
  console.log('A client has connected');

  socket.on('disconnect', () => {
    console.log('An user has disconnected')
  })

  socket.on(`select sensor`, async (id) => {
    sensorId = id
    const sensor = await Sensor.findOne({ sensor_id: Number(id) });
    socket.emit('select sensor' ,sensor)
  })

  const addDataToDatabase = (typeDataOne, typeDataTwo, indexUpdate) => {
    setInterval(async () => {
      const calculateOne = generateSensorData(typeDataOne);
      const calculateTwo = generateSensorData(typeDataTwo);
  
      const newSensorData = {
        timestamp: new Date().toISOString(),
        [typeDataOne]: calculateOne,
        [typeDataTwo]: calculateTwo
      };
  
      await Sensor.updateOne(
        { sensor_id: indexUpdate },
        { $push: { data: newSensorData } }
      );
  
      const sensor = await Sensor.findOne({ sensor_id: Number(sensorId) });
  
      console.log(sensorId);
      socket.emit(`sensor data change ${sensorId}`, sensor);
    }, 10000);
  };
  
  const generateSensorData = (sensorType) => {
    switch (sensorType) {
      case 'temperature':
        return parseFloat((Math.random() * 10 + 30).toFixed(1));
        case 'humidity':
        return parseFloat((Math.random() * 10 + 50).toFixed(1));
        case 'pressure':
          return parseFloat((Math.random() * 10 + 1000).toFixed(1)) ;
      case 'wind_speed':
        return parseFloat((Math.random() * 5 + 1).toFixed(1)) ;
      case 'noise_level':
        return parseFloat((Math.random() * 10 + 40).toFixed(1));
      case 'air_quality':
        return 'Buena';
      default:
        return null;
      }
  };
  
  addDataToDatabase('temperature', 'humidity', 1);
  addDataToDatabase('pressure', 'wind_speed', 2);
  addDataToDatabase('noise_level', 'air_quality', 3);
});

app.use(cors())
app.use(express.json());
app.use('/', routes);

server.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

