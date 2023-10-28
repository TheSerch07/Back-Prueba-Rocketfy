const { Router } = require('express');
const mongoose = require('mongoose');
const router = Router();
const Sensor = mongoose.connection.collection('sensor');

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id)

    const sensor = await Sensor.findOne({sensor_id: id})

    res.send(sensor)
});

module.exports = router