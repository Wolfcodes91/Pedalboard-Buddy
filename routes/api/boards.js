const express = require('express');
const router = express.Router();
const boardsCtrl = require('../../controllers/api/boards');


// GET /api/boards
router.get('/', boardsCtrl.index);

// POST /api/boards
router.post('/', boardsCtrl.create)


module.exports = router;