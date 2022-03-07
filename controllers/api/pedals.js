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
        console.log("this is your pedal", pedal)
    } catch (err) {
        res.status(400).json(err);
    }
}

async function show(req, res) {
  const pedal = await Pedal.findById(req.params.id);
  res.json(pedal);
}

async function deletePedal(req, res) {
    console.log(req.body.id, '4')
    const pedaldlt = await Pedal.findByIdAndDelete(req.body.id)
    res.json(pedaldlt)
    console.log(pedaldlt) 
}

async function update(req, res) {
    const updatedPedal = req.body.updatedName
    const id = req.body.id
    try {
        await Pedal.findById(id, (error, pedalToUpdate) => {
            pedalToUpdate.name = updatedPedal
            pedalToUpdate.save()
        })
    } catch(err) {
        console.log(err)
    }
    res.json(updatedPedal)
}