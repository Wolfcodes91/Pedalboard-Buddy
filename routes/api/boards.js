const express = require('express');
const router = express.Router();
const boardsCtrl = require('../../controllers/api/boards');
const ensureLoggedin = require("../../config/ensureLoggedIn")

router.get('/', ensureLoggedin, boardsCtrl.index);

router.post('/', ensureLoggedin, boardsCtrl.create)

router.delete('/:id', ensureLoggedin, boardsCtrl.delete);

router.put('/:id', ensureLoggedin, boardsCtrl.update)

module.exports = router;