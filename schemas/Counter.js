const { Schema, model } = require('mongoose')

const CounterSchema = new Schema({

    counterId: {
        type: Number,
    },
    homeCounter: {
        type: Number,
    },
    committeeCounter: {
        type: Number,
    },

}, { timestamps: true })

module.exports = model('Counter', CounterSchema, 'Counter')
