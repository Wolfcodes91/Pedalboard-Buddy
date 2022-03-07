const express = require('express');
const router = express.Router();
const pedalsCtrl = require('../../controllers/api/pedals');

// GET /api/items
router.get('/', pedalsCtrl.index);
// POST /api/pedals/new
router.post('/', pedalsCtrl.create)
// GET /api/items/:id
router.get('/:id', pedalsCtrl.show);

router.put('/:id', pedalsCtrl.update)

router.delete('/:id', pedalsCtrl.delete);

module.exports = router;
