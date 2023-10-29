const mongoose = require("mongoose");
const socketIo = require('socket.io');

// Conecta a la base de datos
mongoose.connect('mongodb://localhost:27017/rocketfy-challenge', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => {
        console.log("Database is connected");
    })
    .catch(err => console.log(err));
