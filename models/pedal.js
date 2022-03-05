const Schema = require('mongoose').Schema;

const pedalSchema = new Schema({
    brand: { type: String, required: true },
    name: { type: String, required: true },
    size: { type: String, enum: ['small', 'medium', 'large'] }
}, {
    timestamps: true
})

module.exports = pedalSchema