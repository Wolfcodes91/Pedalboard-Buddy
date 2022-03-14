const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const pedalSchema = new Schema({
    brand: { type: String, required: true },
    name: { type: String, required: true },
    size: { type: String, enum: ['mini', 'regular', 'doublewide', 'wah/volume'] },
    photo: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Pedal', pedalSchema)