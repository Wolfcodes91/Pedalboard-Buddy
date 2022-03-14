const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const boardSchema = new Schema({
    name: { type: String, required: true },
    layout: { type: Array, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true,
})

module.exports = mongoose.model('Board', boardSchema)