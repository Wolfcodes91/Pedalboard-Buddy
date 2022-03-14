const Board = require("../../models/board")

module.exports = {
    index,
    create,
    delete: deleteBoard,
  };


async function index(req, res) {
    console.log('im in the index controller', req.user._id)
    const boards = await Board.find({user: req.user._id}).sort('name')
    console.log(boards)
    res.json(boards);
  }

  async function create(req, res) {
      console.log('some random string', req.body)
      const board = await Board.create(req.body)
      console.log('I am the server', board)
      res.json(board)
}

async function deleteBoard(req, res) {
    const boarddlt = await Board.findByIdAndDelete(req.body.id)
    res.json(boarddlt)
}