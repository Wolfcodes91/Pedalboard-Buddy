const Pedal = require("../../models/pedal")

module.exports = {
  index,
  create,
  show
};

async function index(req, res) {
  const pedals = await Pedal.find({}).sort('name')
  res.json(pedals);
}

async function create(req, res) {
    try {
        const pedal = await Pedal.create(req.body)
        res.json(pedal)
        console.log("this is your pedal", pedal)
    } catch (err) {
        res.status(400).json(err);
    }
}

async function show(req, res) {
  const pedal = await Pedal.findById(req.params.id);
  res.json(pedal);
}
