const express = require('express');
const router = express.Router();
const upload = require("multer")();
const pedalsCtrl = require('../../controllers/api/pedals');
const ensureLoggedin = require("../../config/ensureLoggedIn")

router.get('/', ensureLoggedin, pedalsCtrl.index);

router.post('/', ensureLoggedin, upload.single('photo'), pedalsCtrl.create)

router.get('/:id', ensureLoggedin,  pedalsCtrl.show);

router.put('/:id', ensureLoggedin, upload.single('photo'), pedalsCtrl.update)

router.delete('/:id', ensureLoggedin, pedalsCtrl.delete);

module.exports = router;
