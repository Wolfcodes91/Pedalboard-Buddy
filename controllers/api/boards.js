const Board = require("../../models/board")

module.exports = {
    index,
    create,
    delete: deleteBoard,
    update
  };


async function index(req, res) {
    const boards = await Board.find({user: req.user._id}).sort('name')
    res.json(boards);
  }

  async function create(req, res) {
      const board = await Board.create(req.body)
      console.log('I am the server', board)
      res.json(board)
}

async function deleteBoard(req, res) {
    const boarddlt = await Board.findByIdAndDelete(req.body.id)
    res.json(boarddlt)
}

async function update(req, res) {
    const board = await Board.findByIdAndUpdate(req.params.id, req.body, { new: true })
    console.log('im in the server, dawg', board)
    res.json(board)
  }