const express = require('express');
const router = express.Router();
const upload = require("multer")();
const pedalsCtrl = require('../../controllers/api/pedals');

// GET /api/pedals
router.get('/', pedalsCtrl.index);
// POST /api/pedals
router.post('/', upload.single('photo'), pedalsCtrl.create)
// GET /api/pedals/:id
router.get('/:id', pedalsCtrl.show);

router.put('/:id', upload.single('photo'), pedalsCtrl.update)

router.delete('/:id', pedalsCtrl.delete);

module.exports = router;
