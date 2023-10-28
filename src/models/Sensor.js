const { Schema, model } = require('mongoose');

const sensorSchema = new Schema({
    sensor_id: Number,
    sensor_name: String,
    data: Array
})

module.exports = model('Sensor', sensorSchema);