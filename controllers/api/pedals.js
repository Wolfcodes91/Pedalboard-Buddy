const Pedal = require('../../models/pedal');

module.exports = {
  index,
  create,
//   show
};

async function index(req, res) {
  const pedals = await Pedal.find({}).sort('name')
  res.json(pedals);
}

async function create(req, res) {
    console.log('create')
}

// async function show(req, res) {
//   const pedal = await Pedal.findById(req.params.id);
//   res.json(pedal);
// }
