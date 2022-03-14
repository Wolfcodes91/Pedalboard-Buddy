const Board = require("../../models/board")

module.exports = {
    index,
    create,
  };


async function index(req, res) {
    console.log('im in the index controller')
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