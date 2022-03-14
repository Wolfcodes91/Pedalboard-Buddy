const express = require('express');
const router = express.Router();
const upload = require("multer")();
const pedalsCtrl = require('../../controllers/api/pedals');
const ensureLoggedin = require("../../config/ensureLoggedIn")


// GET /api/pedals
router.get('/', ensureLoggedin, pedalsCtrl.index);
// POST /api/pedals
router.post('/', ensureLoggedin, upload.single('photo'), pedalsCtrl.create)
// GET /api/pedals/:id
router.get('/:id', ensureLoggedin,  pedalsCtrl.show);

router.put('/:id', ensureLoggedin, upload.single('photo'), pedalsCtrl.update)

router.delete('/:id', ensureLoggedin, pedalsCtrl.delete);

module.exports = router;
