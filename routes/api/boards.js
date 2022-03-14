const express = require('express');
const router = express.Router();
const boardsCtrl = require('../../controllers/api/boards');
const ensureLoggedin = require("../../config/ensureLoggedIn")


// GET /api/boards
router.get('/', ensureLoggedin, boardsCtrl.index);

// POST /api/boards
router.post('/', ensureLoggedin, boardsCtrl.create)

router.delete('/:id', ensureLoggedin, boardsCtrl.delete);


module.exports = router;