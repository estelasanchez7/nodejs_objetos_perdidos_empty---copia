const mongoose = require ('mongoose')

mongoose.connect('mongodb://Estela:1234@localhost:27017/objetosperdidos', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

module.exports = mongoose.connection