const Pedal = require("../../models/pedal")

module.exports = {
  index,
  create,
  show,
  delete: deletePedal, 
  update, 
};

async function index(req, res) {
  const pedals = await Pedal.find({}).sort('name')
  res.json(pedals);
}

async function create(req, res) {
    try {
        const pedal = await Pedal.create(req.body)
        res.json(pedal)
    } catch (err) {
        res.status(400).json(err);
    }
}

async function show(req, res) {
  const pedal = await Pedal.findById(req.params.id);
  res.json(pedal);
}

async function deletePedal(req, res) {
    const pedaldlt = await Pedal.findByIdAndDelete(req.body.id)
    res.json(pedaldlt)
}

async function update(req, res) {
    console.log('HELLLOOOOO')
    const pedalToUpdate = await Pedal.findByIdAndUpdate(req.body.id)
    res.json(pedalToUpdate)
}