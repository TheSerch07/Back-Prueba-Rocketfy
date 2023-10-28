const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/rocketfy-challenge', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log("Database is connected"))
    .catch(err => console.log(err))